# Actual Excello Implementation

In this section I shall discuss the underlying implementation of the final prototype following the participatory design. Excello consists of two main parts. The first, and larger, is the implementation of the turtle system for playing music that has been defined in the grid. The second is the method by which the notes of chords can be inserted into the grid. 

When the play button in the add-in window is pressed, the turtle definitions within the grid are identified. For each turtle that is identified, the starting cell and movement instructions are used to establish the contents of the cells which it passes through. Along with the speed parameter, this is converted to a series of note definitions - pitch, start time, duration, volume. This is built in a format such that the Tone.js library can then be used to schedule and initiate playback. An overview of the data flow and subtasks required to create the musical playback is show in figure\ref{fig:overview}

Diagram

The drop-down menu for sheet selection is populated with the current sheets in the workbook. When a user presses play, the cell values from the selected sheet are loaded using the Office API. An extension of the Tone instrument class is a Sampler. This interpolates between a set of pitched samples to create notes of arbitrary pitch and length. The Salamander piano sample pack includes four pitches (out of a possible 12) per octave. This allows for accurate interpolation whilst reducing loading times and storage requirements. 

##### Identifying Cells

Once the sheet contents have been loaded, the cell contents can be analysed for highlighting and calculating turtle paths. Cells containing at least one definition of a note are highlighted red. A cell defining a note must contain a note name. There may also be an accidental, octave number, or a volume instruction in the form of a dynamic marking or number between 0 and 1. This is tested using the following regular expression:

```javascript
RegExp('^[A-G](#|b|)?[1-9]?( (0(\.\[0-9]+)?|1(\.0)?|ppp|pp|p|mp|mf|f|ff|fff))?$');
```

Cells containing multiple note definitions are split using commas. All subsequent strings are trimmed of starting and ending whitespace and then must either ratify the test for a note or be a sustain ("-" or "s"), explicit rest (".") or an empty string from an implicit rest. Cells matching "-","." or "s" are highlighted a lighter red. Turtle definitions are tested using: 

```javascript
RegExp('^(!turtle\().*(\))$')
```

and cells containing turtle definitions are highlighted green. The same regex is used to identify definitions of turtles. The address of cells containing a turtle definition are added as text nodes to the live turtle section of the add-in window.

##### Parsing Movement Instructions

The arguments given in the turtle are separated. First the movement instructions are converted to a single list of movements, without bracketed instructions, e.g. ("(r m2)2" -> "r m2  r m2") so that the path of the turtle can be established. It initially seemed that the "parse" method of the Parenthesis\footnote{<https://www.npmjs.com/package/parenthesis>} library would be suitable for aiding in this string manipulation. This parses strings containing parenthesis into an array with nested format.

```
parse('a(b[c{d}])')
// ['a(', ['b[', ['c{', ['d'], '}'], ']'], ')']
```

This suggests that a string like "(r m2)2" would become ['(', ['r m2'], ')2'].  By removing the brackets from the strings within the array, a simple recursive method could be built to output 'r m2 r m2' from [['r m2'], '2']. However upon testing this, an array with undefined contents was outputted. From further tests and investigation of the source code I established that strings with a number following a closing parenthesis would all cause such an error. A possible solution allowing the library to be used would be to substitute characters for numbers or place a symbol before all numbers and then to later revert this change. Instead, using the method employed by the Parenthesis function as inspiration, I implemented my own parsing function. 

This works in two main steps. First the deepest bracketed expression (one containing no brackets within it) is identified and stored in an array with the brackets removed. This expression is replaced in the original string with the string $\_\_\_x\_\_\_\_$ where $x$ is the index expression stored in the array. This is repeated until the original string contains no brackets. Secondly, a recursive algorithm uses the indices places between the "$\_\_\_$" to reconstruct the string in the desired array format. The algorithm is shown in \ref{alg:parenthesis}. 

Having submitted an issue on the Parenthesis Github reporting the bug, and implemented my own method for parsing the turtle movement instructions, I implemented a fix to the Parenthesis library. The existing function performed the initial replacement with the string $\_\_\_x$. Therefore the $x​$ and following numbers would concatenate forming a single number, causing the library to fail. By modifying the existing Parenthesis code so that it utilised my method of having an identifier before and after the index number I was able to fix the issue. I added additional tests to the project to verify that this worked and ensured that previous tests all passed before submitted a pull request to the developers. This has since been merged and published. 

##### Getting cells in turtle's path

Start cells(s), instructions, sheet -> cell contents. getTurtleInstructions. 