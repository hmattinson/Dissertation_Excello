# Actual Excello Implementation

In this section I shall discuss the underlying implementation of the final prototype following the participatory design. Excello consists of two main parts. The first, and larger, is the implementation of the turtle system for playing music that has been defined in the grid. The second is the method by which the notes of chords can be inserted into the grid. 

When the play button in the add-in window is pressed, the turtle definitions within the grid are identified. For each turtle that is identified, the starting cell and movement instructions are used to establish the contents of the cells which it passes through. Along with the speed parameter, this is converted to a series of note definitions - pitch, start time, duration, volume. This is built in a format such that the Tone.js library can then be used to schedule and initiate playback. An overview of the data flow and subtasks required to create the musical playback is show in figure\ref{fig:overview}

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

This works in two main steps. First the deepest bracketed expression (one containing no brackets within it) is identified and stored in an array with the brackets removed. This expression is replaced in the original string with the string $\_\_\_x\_\_\_\_$ where $x$ is the index expression stored in the array. This is repeated until the original string contains no brackets. Secondly, a recursive algorithm uses the indices places between the "$\_\_\_$" to reconstruct the string in the desired array format. The algorithm is shown in \ref{alg:parenthesis}. APPENDIX

Having submitted an issue on the Parenthesis Github reporting the bug, and implemented my own method for parsing the turtle movement instructions, I implemented a fix to the Parenthesis library. The existing function performed the initial replacement with the string $\_\_\_x$. Therefore the $x$ and following numbers would concatenate forming a single number, causing the library to fail. By modifying the existing Parenthesis code so that it utilised my method of having an identifier before and after the index number I was able to fix the issue. I added additional tests to the project to verify that this worked and ensured that previous tests all passed before submitted a pull request to the developers. This has since been merged and published. 

I wrote an additional recursive method to unnest the outputted array of this function into a single stream of instructions. An empty string, s, is initialised. For each item in the array, if it is an array, unnest the contents recursively. If not, it will be one or more single movement instructions. If the first one is a number and the last item in the array was an array, the result of the array being unnested is added to s that number of times. The remaining instructions are added to s. \ref{alg:unnest} APPENDIX

##### Getting Cells in Turtle's path

If the first argument in the turtle is defining a range of starting cells the cell addresses within this range are calculated. For each starting cell, the unnested instructions and sheet values are used to determine the contents of the cells the turtle passes through. When dynamics were defined within the turtle instructions this also returned the volume at which each cell was returned. Volume is now handled in the next step. This process models the movement of the turtle within the grid. Keeping track of where it is positioned and which was it is facing. For each instruction the position and direction is updated as required and the contents of any new cells entered added to a list of notes. 

Additional computation is required when the "m*" instruction is used, as the number of steps the turtle should take must be computed. Given the current position of the turtle and direction it is facing, all the cells  in front of it are taken from the sheet values. The turtle should step to the last cell that defined a note, sustain or explicitly defines a rest. The number of steps is the length of the array minus the index of the first element satisfying this criteria in the array reversed. 

##### Creating Note Times

For each turtle, for each starting cell, the cells moved through are calculated. This is used to create a data structure containing the information required for each note for playback to be initiated using the Tone library. For each turtle, the following array is produced "[<Note 1>,…,<Note N>], <number of cells>]". Each note is as follows: [<start time>, [<pitch>, <duration>, <volume>]]. This is also the point at which the dynamics and the octave are added to each note if it had been omitted from a cell. 

The Tone library has many different ways in which time can be represented. I opted to use Transport Time for all time measurements - start times and durations. This is in the form "BARS:QUARTERS:SIXTEENTHS" where the numbers used do not have to be integer values. This allowed me to simply use the quarters value to represent number of cells and not have to worry about exact times, ticks or what musical note a length corresponded to (tricky for arbitrary subdivisions). 

The note sequence array is initiated by counting the number of notes that are defined in the cells passed to the method. This is done using the regular expressions for identifying notes and multi-note cells. The cells are iterated through in one scan keeping track of the active note and adding it to a sequence of notes when it ends.  Outside of this loop, Variables are defined to keep count of how many cells and notes through the process the algorithm is and whether the current value is a rest or note. Variables keep track of the note currently being played - when it started, the pitch and volume. As they are defined within the cells but can also be omitted, variables are also required to keep track the current volume and octave number. 

The following table outlines the actions carried out when a cell is read: 

| Cell Contents | Current State | Action                                                       |                                                              |                                                              |
| ------------- | ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Note          | Note          | Note, octave and volume established from cell contents and previous values | [currentStart, [currentNote, "0:" + noteLength + ":0", currentVolume]] added to note sequence | currentStart = "0:" + beatCount + ":0";<br/>            currentNote = value;
            noteLength = 1;
            currentVolume = volume; |
| Note          | Rest          | Note, octave and volume established from cell contents and previous values | inRest = false;                                              | currentStart = "0:" + beatCount + ":0";<br/>            currentNote = value;
            noteLength = 1;
            currentVolume = volume; |
| Sustain       | Note          | noteLength++;<br/>            currentVolume = volume;        |                                                              |                                                              |
| Sustain       | Rest          | Nothing                                                      |                                                              |                                                              |
| Rest          | Note          | noteSequence[noteCount++] = [currentStart, [currentNote, "0:" + noteLength + ":0", currentVolume]];<br/>                inRest = true;
                currentVolume = volume; |                                                              |                                                              |
| Rest          | Rest          | Nothing                                                      |                                                              |                                                              |

The same method can be used for multi-note cells, except the note length and cell count must be incremented by the appropriate fraction of a cell rather than by one for each note that is processed. 

If at the end of the final cell, the state is in a note, this must be finished and added to the note sequence. 

The notes definitions in the note sequence are sufficient to play a note using the piano sampler using the triggerAttackRelease function. The Tone.Part allows a set of calls to this method to be defined which can be started, stopped and looped as a single unit. Using the note sequence ("noteTimes"), and number of cells ("beatsLength") from creating the note times, playback is scheduled with the following code:

```typescript
var turtlePart = new Tone.Part(function(time: string, note: [string, string, number]){
  piano.triggerAttackRelease(note[0], note[1], time, note[2]);
}, noteTimes).start();

if (repeats>0){
  turtlePart = turtlePart.stop("0:" + (repeats*beatsLength/speedFactor) + ":0");
}

turtlePart.loop = true;
turtlePart.loopEnd = "0:" + beatsLength + ":0";
turtlePart.playbackRate = speedFactor;
```

##### Chord Input

When the insert chord button is pressed the note, type, inversion\footnote{which note of the chord is the lowest, the chord ascends from this. No inversion is root position, then first inversion, second inversion, etc.} and octave of the chord are extracted from their HTML elements. The tonal library can then be used to generate the notes of the scale: 

```typescript
var chordNotes = Chord.notes(chordNote, chordType).map(x => Note.simplify(x));
```

The tonal simplify function is used to simplify reduce note definition involving multiple accidentals to contain at most one, thereby conforming to the notation interpreted by Excello. This provides a list of notes in ascending order but without octave or taking into account the inversion of the chord. In order to reach the correct inversion of the chord, the array of notes is rotated by the inversion number.

Octave numbers are added by iterating through the notes produced. A dictionary matches note names to position in the chromatic scale starting at C (the first note of the octave in scientific pitch notation). This is also accounts for enharmonic notes\footnote{Notes that are the same pitch but different names, such as Ab and G#}. The given octave number is appended to the first note in the chord. For each preceding note, if it appears in an equal or lower position in the octave than its predecessor, the octave number is incremented before appending it to the note name. Otherwise, it is in the same octave and hence the octave number is appended without modification. 

The Office API is used to acquire the range that has been selected by the user. The notes of the chord will be entered starting at the top-left corner of this range. If the hight of the range is greater or equal to its width, the notes are entered vertically going down from the starting cell. Otherwise they are entered horizontally going right. This is done by building the 2D array where the chord will be entered and setting that range using the Office API. 

##### Custom Excel Functions

I built another Excel add-in in order to implement custom functions. As opposed to offering a separate window as the main Excello add-in does, this one allows additional functions to be used by users in the cells using the prefix "=EXCELLO.". The file structure was generated with the Yeomann generator. The name, description, result type, and parameter names and types are store in a JSON schema. This is used by Excel to provide argument prompts and autofill to the user when editing the formula. Functions were also given an identifier used to link them to a typescript file where the functions were defined. 

The turtle argument simply concatenates the given arguments into the correct format for Excello to recognise as a turtle. This allows other cells to be referenced, for example the speed variable can reference a global tempo variable as shown in figure \ref{fig:functionTurtle}.

The modulate function first establishes if the cell if a note or multi-note. For a note, if there is a volume defined, the note is separated, modulated using the tonal transpose function and then combined back with the volume. This is performed for every element in the multi-note that is a note definition. This allows the drag fill feature of Excel to be employed by the user for transposing sections or to define melodic lines using the interval between notes as shown in figure \ref{fig:functionModulate}.

