# Implementation

In this chapter I shall first explain how the turtles, using the movement instructions defined previously, are defined and controlled. The remaining features in the initial prototype will be explained. The format and results of the formative evaluation using this initial prototype shall be summarised. I shall then cover the design decisions and changes that were made to the Excello prototype during the participatory design process. Then, how Excello has been implemented will be described followed by the MIDI to Excello converter. The chapter concludes with an overview of the project repository. 

### Initial Prototype

Notes and turtles can be defined in any cell in the spreadsheet. When the Excello add-in is opened, a window will open in the right side of Excel. This contains a play and stop button which can be used to launch all the turtles defined in the spreadsheet and initiate playback. Playback is a realistic piano sound.

A summary of the musical elements that can be put in cells and that will be interpreted by turtles is shown in table \ref{tab:cells}

| Interpretation                    | Format                                                       |
| --------------------------------- | ------------------------------------------------------------ |
| Note                              | Note name (A-G#) and octave number e.g. F#4                  |
| Sustain                           | s                                                            |
| Multiple notes subdivided in time | notes, rests or sustains separated by a comma. Within a multi-note cell, rests must be a space or an empty string e.g. E4,,C4,s |
| Rest                              | Any cell not interpreted as a note or sustain will be interpreted as a rest. |

##### Turtles

Notes are played by defining and launching turtles to navigate the spreadsheet. Turtles are defined as follows:

```
!turtle(<Starting Cell>, <Movement>, <Speed>, <Number of Loops>)
```

###### Activation

The "!" dictates that the turtle will be activated when the play button in the add-in window is pressed. Just like many digital audio workstations allow muting and soloing of tracks, this can be used to quickly modify which turtles will play without losing the definition of the turtle. 

###### Starting Cell

The starting cell of the turtle is given by the cell reference. As with conventional Excel formulae, columns are defined in base 26 using the letters of the alphabet and rows are numbered using the integers. A cell is defined by the concatenation of the column letters and row number. This cell will be played and is the first cell in the path of the turtle. 

As each turtle only plays one note at a time, multiple turtles must be defined to play polyphonic music such as chords. It was believed that in these cases the turtles may follow identical paths but in adjacent rows or columns. Multiple turtles following identical paths but starting from adjacent cells can be defined using the existing Excel range notation to define the starting cells. "A2:A5" would define four turtles in the cells A2,A3,A4,A5. This prevents the writing of multiple turtle definitions differing in only the start cell row. 

###### Movement

The turtles start facing north. The design of the language used to define turtle movement has been discussed in the preparation chapter. Using brackets to repeat multiple instructions within the turtle's instructions was not implemented by the start of the participatory design process. 

###### Speed

An optional third argument can be provided to defined the speed at which the turtle moves through the grid. If the argument is not provided, the turtle moves at 160 cells per minute through the grid. The speed argument defines the speed relative to 160 cells per minute. Therefore if the argument "2" was provided, this would move through the grid at 320 cells per minute. This relative system was used so it would be easier to tell the speed relation between two turtles. This would be particularly beneficial for phase music. Arbitrary maths can be provided for this argument and it will be evaluated. This can be used to define a turtle  speed is an irrational multiple of another's. 

###### Number of Loops

An optional fourth argument defines the number of times the path of the turtle is played. If committed the turtle will loop infinitely. This was included so that repeating parts (e.g. the cello part of Pachabel's Canon in D) need only defining once but can be played repetitively. 

##### Highlighting

In order to assist in the recognition of notes and turtles, when the play button is pressed, cells are highlighted depending on their contents. Cells containing activated or deactivated definitions of turtles are highlighted green. Cells containing definitions of notes, or multiple notes, are highlighted red, with cells only containing a sustain highlighted a lighter red. 

##### Chord input

In order to maintain musical abstractions of chords and arpeggios \footnote{Where the notes of a chord are played in rising or descending order} whilst keeping to paradigm of a turtle being responsible for up to one note at any time, a tool to add chords and arpeggios is available. The note, type (over 100 available), inversion and starting octave of the chord are inputted in four drop-down selectors and the notes making up that chord are entered into the grid using the insert button. If a single cell or range taller than it is wide is highlighted in the spreadsheet, the notes will be inserted in adjacent vertical cells starting at the top-left of the range. Otherwise, the notes will be inserted horizontally. This means whether the turtles are moving horizontally or vertically both chords and arpeggios can be easily defined. As a result, helpful musical abstractions are still available whilst keeping the cleanness of the turtle system. 

### Formative Evaluation

In order to guide the development of the project to best suite the users, participants were involved in formative evaluation. 21 participants took place in the participatory design process. Initially, individual meetings were held with each participant. A tutorial of the initial prototype was given followed by the carrying out of a short exercise lasting 15-20 minutes in most cases. After both the tutorial and the exercise, users were asked to comment on how they found Excello. Particular attention was drawn to actions that they found particularly unintuitive or required notable mental effort. Comparisons were also made to the musical interfaces that participants were already familiar with. The sessions were audio recorded in order to prevent the jotting down of notes causing delays, and later notes were made from these recordings. The ethical and data handling procedures that were carried out shall be discussed in the evaluation chapter.

In order to simulate the most likely ways in which Excello would be used, participants were given the freedom to carry out an exercise of their choice. In many cases this was transcribing an exiting piece from memory or from traditional western notation into the Excello notation. Two tasks were provided to choose from if participants had no immediate inspiration. These were to transcribe a piece of music from western notation or to make changes to an existing piece in the Excello notation. 

These sessions were carried out at the beginning of Lent term 2019. Participants were asked if they would be willing to continue using Excello personally from their initial session until the end of the term, eight weeks later, when summative evaluation would be carried out. This gave time for additional feedback to be given as participants used Excello in their own time. It also ensured that the evaluation carried out would be done so by users with sufficient experience of the interface. Participants were encouraged to get in contact with any additional issues or suggestions they had during this time. 

##### Issues and Suggestions

The issues and suggestions that arose during the participatory design period have been categorised and summarised below.

###### Turtle Notation

Having dynamic instructions within the turtle was found to make it harder to extract the path that the turtle followed as not all instructions related to the way in which the turtle moves. As the dynamics weren't next to the notes they corresponded to, it was challenging to establish which volume a given note would be played at or where to place the dynamic instructions within the turtle to correspond to a certain note positioned elsewhere in the spreadsheet. In the initial prototype there was no way to assign a dynamic to the first note without having the starting cell being empty. The addition of this empty cell could be inconvenient for looping parts as this empty cell would be included in the loop. Users who were not familiar with the dynamic markings of western notation found them unintuitive. Furthermore, it was noted that these discrete markings do not make available the continuous volume scale that could be possible with the interface. 

When trying to transcribe a piece in an exact tempo, having to divide the speed by 160 in order to enter a relative speed caused unnecessary work. There was forgetfulness as to the whether relative speed referred to how long or how quickly the turtle moved. 

Having completed the tutorial, users often has to check which arguments appeared where within the turtle definition or what the arguments were. 

When parsing the instruction, as the number of dynamics and movement instructions grew and the instruction became long, it could become quite tough to establish how the turtle would behave. As "s" could be used to indicate sustain within cells, some users confused the "s" within the turtle instructions to mean sustain and not south. 

###### Feedback

Having clicked the play button it was often not clear if this had been registered. Especially if the Excel workbook was saving, and this caused a delay in Excello being able to access the spreadsheet. It was also requested if it would be possible to see a summary of where the active turtle were in addition to them being highlighted green. If a turtle had accidentally been left activated, the entire grid had to be searched in order to locate it. 

###### MIDI conversions

Many users, especially those who used production software such as GarageBand and Logic, said that it would be helpful to be able to interact with MIDI files. Being able to use Excello to create their chord sequences and bass lines before adding additional effects and recorded lines in their digital audio work stations would require a MIDI export. In addition, if working with an existing MIDI file, it would be convenient to be able to convert that into the Excello notation. 

###### Sources of effort when writing

Once notes had been inputted into the grid, often in a single straight line, the number of cells had to be counted so the turtle could be moved the correct number of cells. Whilst Excel allows users to highlight a selection of cells and have an immediate output of how many cells are highlighted without any formula being written, this is still an unproductive use of time. Some users would simply instruct the turtle to move forward significantly more steps than required to prevent this counting, but this is not feasible for looping parts. It was suggested that turtles could figure out how far they should move so that the instruction didn't need editing when more notes were added. This was particularly inconvenient when users were writing out a piece and periodically testing what they had written so far. 

If instructions involved repeats such as repeatedly moving to the end of a line and jumping down a few cells and back to the beginning of the line, instructions within the turtles required a lot of repetition. 

If writing out a melodic line consisting of small movements, many of the notes would take place in the same octave. As such, it was tiresome to have to repeatedly write out the octave number when this was barely changing. One user made a comparison to LilyPond \footnote{A program for music notation using text notation.} \cite{sandberg:lily} where if the length of a note is not defined, the last defined note length would be used. 

Some users said they would find it more intuitive to think of a melodic line in terms of the intervals between notes as opposed to the name of each note. If a piece contained a melodic line that was modulated \footnote{Where every note has been moved up or down in pitch by the same amount.}, the modulated part had to be written out again and could not be derived quicker from the original version. 

###### Chords

Whilst the variety of available chord types was appreciated, most users used a very small subset of these but still had to scroll through the whole list to find these. Separating the more common chords for easier access was requested. In the initial prototype, the notes were inserted from low to high. This meant that notes inserted in a vertical line had the lowest note at the top with notes increasing in pitch proceeding down the column. In western staff notation, higher pitch notes appear higher up the staff. As a result, it was suggested that inverting the order would be more intuitive. In the initial interface it was also unclear what the different drop downs corresponded to, with some users selecting the "7" from the octave number in order to try and insert a Maj7 chord. 

###### Activation of turtles

When toggling the activation of a turtle, it was very tedious to have to enter the edit mode for each cell containing a turtle definition and add or remove the exclamation mark. This was particularly so if a piece had multiple turtle definitions. 

### Second Prototype

Following the formative evaluation sessions carried out with the participants and the feedback that was received, a series of additions and modifications were made to the prototype to solve the problems and opportunities brought up. 

##### Dynamics

In order to assist users in extracting the path that the turtles follow from the instructions and pairing notes with their volume, dynamics are instead inserted in the cells along with the notes. A dynamic instruction is added after the note, separated by a space as in Manhattan \cite{nash:manhattan}. As before, this will persist for all following notes until the volume is redefined. By moving the dynamics into the cell there is a tradeoff. A single turtle definition with multiple start cells can now play parts of different volume. However, notes in the grid are limited to only being played at the given volume. To play the same notes at a different volume would require a different path to be followed by the turtle where the cells defining the volume are missed and other cells are played. Overall, the new system was believed to be more preferable. 

In order to be able to make use of a full continuous dynamic scale, in addition to the existing dynamic symbols available, a number between 0 and 1 can be provided where 0 will be silent and 1 is equivalent to fff. 

##### Nested Instructions

The initial language design included the use of nested instruction in order to allow for easy repetition of turtle movements. This was not implemented when the first formative evaluation sessions took place. However, this should help reduce the length of turtle instructions and allow for repeated sections or movements to be more easily incorporated. A series of instructions placed within parentheses with a number immediately following the closing parenthesis will be repeated that number of times. Whilst the fourth argument of the turtle will simply repeat the musical output of the turtle, repetitions within the turtle instruction allow paths to be defined more concisely. 

##### Absolute Tempo

The speed at which the turtle moves is now defined by cells per minute, rather than the relative value used initially. However, values less than 10 were interpreted in the original relative way to maintain backwards compatibility for the participant's existing work. To maintain consistency in a production version, this would be removed so speed must be defined absolutely. This also ensures that the values given for speed and dynamics will be of different orders of magnitude and hence reduce the confusion that can occur between them. 

##### Custom Excel Functions

Two custom Excel functions were implemented to aid in the composition of music within Excel. One to aid with inserting turtles into the grid and a second to transpose notes. 

###### Excello.Turtle

Many users had commented they forgot which arguments go where within the turtle. By adding custom Excel functions the existing formulae writing tools provided within Excel can be utilised. When using a built in formula, a prompt appears informing users which arguments go where and whether they are optional. The output of this function is text used to define a turtle if written manually. This also allows other cells to be referenced for the arguments of the turtle function. For example a cell could have speed defined that all other turtles reference. As a result, the speed of all turtles could be modified by changing this single value. This also allows relative tempos to be easily implemented again as the speed argument of the turtle could be defined as relative_speed * (globally defined absolute speed) . 

###### Excello.Modulate

The implementation of a function to modulate notes both allows for the easy modulation of existing sections of a piece and also the definition of a melodic line by the intervals between the notes. The function takes the contents of a cell where a note is defined and an interval and outputs the note transposed by that interval. A section can be modulated by calling this function on the first note with a provided interval and using the existing drag-fill functionality of Excel to modulate all notes. By using the previous note that has just been transposed and one of a series of intervals as the arguments, a melodic line can quickly be produced from a starting note and a series of intervals. 

\ref{examples}

##### Sustain

In order to prevent confusion between the instruction for a turtle to face south and for a note to be sustained. The symbol "-" has been chosen to sustain a note. This was chosen because it is light and also has some similarity to a tie \footnote{A line to increase the length of a note by joining to another.}. The use of an "s" is still interpreted as a sustain to maintain backwards compatibility for the existing work of the participants. 

##### Active Turtles

In order to provide feedback that turtle definitions have been recognised, in addition to green highlighting, a list of the active turtles is given below the play button. This also assists in finding any spurious turtles that were not intended to be activated. 

##### Automatic Movement

To prevent the number of cells in a line needing counting, a turtle can be instructed to move as far as there are notes defined in the direction it is currently facing. This means that if more notes are added on this line, the turtle instructions do not need editing before pressing play. There may be cases where a part is meant to finish with a number of rests. As a rest is notated with a blank cell, a method of increasing the length of the path to include these rests is required. A rest can be given explicitly with a "." allowing the distance distance travelled by the turtle when moving automatically to be increased. This would be required if multiple turtles were defining a repeating section where one does not have the final cell of the section being a note, sustain or multi-note cell. Without an explicit rest the turtle would stop and repeat too soon and the parts would be out of phase. 

##### Inferred Octave

To prevent the octave number needing writing every time a note in defined, the octave number can be inferred by the program if it is omitted. There were two methods under consideration. Firstly, given that most intervals within music are small, the nearest note could be inferred. This means that a scale would only need the octave defining in the first note. Whilst this method would likely require the least explicit statement of octave number it would be non-trivial to figure out the octave a given note is played in. The last defined octave in the path would need finding and then the subsequent notes would have to be walked through keeping track of which octave is being played. The second consideration was to always use the last defined octave. Whilst this may require reasonable octave definition around the boundary between octaves, it is easier to find what octave a note is played at as it is simply the last defined octave in the path. 

##### Chords

In order to assist in the entering of common chords, common chord types are repeated in a separate group  at the top of the type selection drop-down. The layout of the chord drop-downs was improved with labels added to make it clearer what the different values would refer to. If the notes were entered vertically, the order was reversed to have a greater correspondence with traditional staff notation.  

##### Activation of turtles

A "Toggle Activation" button was added to the add-in window. When a cell or range is highlighted in the spreadsheet, the activation of any turtle definitions in this range will be toggled when the button is pressed.  This significantly increases the ease with which turtles can be deselected as only two clicks are required as opposed to having to enter the cell edit mode and add or remove an exclamation mark. 