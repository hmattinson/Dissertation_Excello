# Excel Music

University of Cambridge final dissertation.

The aim of this project is to take Microsoft's Excel, one of the most omnipresent pieces of software, and create a system for music composition and performance within it.

## Set up

Clone the repo

npm run from within the repo

Open Excel online (example notebook included in examples)

Add an Add-in

Add the manifest from this project

This is helpful: https://docs.microsoft.com/en-us/office/dev/add-ins/tutorials/excel-tutorial?tutorial-step=1

## Current Usage

#### Cells

A single note can be defined in a cell, this currently only of the form "A4". Options for volume and other features will be added later. Notes are sustained by placing "s" in the next cell in the path. A rest is simply an empty cell.

In most musical interfaces one axis is time (and the other is normally pitch). In this case we wanted to explore the use of both axes as just space - ideomatic to Excel. As a result the user is free to arrange the data as they wish.

It is also possible to subdivide cells e.g. "C3,D3,E3" would create triplets or "s,s,,F4" which would sustain the previous notes for an additional 2 quarter measures, a quarter measure rest and then F4 for the last quarter of the beat.

#### Turtles

##### Documentation

Notes are played by defining turtles to navigate the spreadsheet. Turtles are defined as follow

```
!turtle(<Starting Cell>, <Instructions>, <Speed>, <Number of loops>)
```
###### Starting Cell

e.g. B2. As with normal Excel formulae, you provide a reference to a cell by using the battleship style coordinates of the cell. This is where the turtle will start. This cell will also be played and forms the first cell in the path of the turtle. 

###### Instructions

The following expressions can be used:

* Relative turning:
  * r: turn right
  * l: turn left
* Absolute turning:
  * n: turn to face up/north
  * e: turn to face right/east
  * s: turn to face down/south
  * w: turn to face left/west
* movement:
  * m: move the number of cells specified forward e.g. m3
* Dynamics:
  * ppp, pp, p, mp, mf, f, ff, fff
* Jumps
  * j: jump to a cell (that cell will also be played) e.g. jB2

The turtle starts facing north by default. 

###### Speed

Default 1.

This is a relative speed factor that can be used to define turtles to move at different speeds. A turtle defined with speed 2 will move through the grid twice as fast as one with speed 1.

###### Number of loops

Default 0 - which creates an infinite loop

The number of times the turtle will travel through the path defined. If left blank or defined as 0, it will loop infinitely.

###### Shorthands

The following shorthands also exist.

To define multiple turtles following paths immediately on top of each other, rather than writing a cell per turtle you can define a range of starting cells:

```
!turtle(E6:E11, r m2 r m2 l m3, 1)
```

If a single turtle is following a straight line (e.g. Christmas example) the start and end cells can be given instead:

```
!turtle(B13, EL13)
```

##### Examples

```
!turtle(E6, r m2 r m2 l m3, 1, 2)
```

This turtle will start in cell E6 facing north. It will then turn right, move two steps forward, turn right again, move two steps forward, turn left, then move 3 steps forward. This path will be repeated twice (starting from E6 each time). The path is 8 cells long.

```
!turtle(d6, ff r m3 pp jG8 w m3)
```

This turtle will start in cell d6 facing north with fortissimo (loud) volume. It will then turn to face east. The note of that cell and the 3 cells to its right will be played fortissimo. It's volume is then reduced to pianissimo (quiet) and it jumps to cell G8. It turns to face west. The cell G8 and the 3 cells to its left will then be played. The following path is followed: D6 (pp), E6 (pp), F6 (pp), G6 (pp), G8 (ff), F8 (ff), E8 (ff), D8 (ff).

Have a look at my examples: https://universityofcambridgecloud-my.sharepoint.com/:x:/g/personal/hcm50_cam_ac_uk/EVb6PSwmFlFFoaR6hFjEw4YBh-cy3NiEI20enqYcTovRrQ?e=BtarK1

## Features to add

* Chords
* Turtles deployed by turtles
* Definable tempo
* Turtle tracking
* Input sanitisation
* Different Synths - in a more sustainable way, and such that they can be selected
* turtle(A1:A5, EL1)
* Live (https://github.com/Tonejs/Tone.js/blob/master/examples/stepSequencer.html is helpful)

## Issues

Number of playback loops is wrong by factor of speed.

## Log

| Date            | Goals                                                        | Time | Progress                                                     | Next Steps                                                   |
| --------------- | ------------------------------------------------------------ | ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Tuesday 9/10    | Clarify tasks for the project with Alan<br><br>Read Advait's paper | 1.5  | Clarified project detials with Alan<br><br>Read recent paper<br><br>Emailed clarifications to overseers | Write up notes on the paper<br><br>Look into other things discussed in meeting e.g. MusicXML |
| Wednesday 10/10 | Begin proposal draft<br><br>Notes from Alan meeting          | 2    | As goals<br>Also installed and wrote some TypeScript. Seems easy | Still need to get more info from Advait before proposal can be fully completed. Still work to do on proposal<br><br>Tomorrow: Read excel for music paper and type up notes on both<br><br>Complete as much of proposal as possible |
| Thursday 11/10  | Write up notes on both Advait's papers<br><br>Complete first draft of proposal<br><br> | 4    | Typed notes from Advait SheetMusic and CV paper<br><br>Completed first draft of proposal | Substance, Evaluation need adding to and discussing with Advait. As such plan of work will probably also be changed. |
| Friday 12/10    | Meeting with Advait                                          | 2    | Discussed direction of project and technical details. See meeting notes | Evaluation and methods for live coding still need finalising |
| Wednesday 17/10 | Implement changes to proposal                                | 2    | Taking the comments from my meeting with Advait I changed my proposal and began preparations for the final draft |                                                              |
| Thursday 18/10  | Finish proposal                                              | 2    | Got some comments from my email to Advait which I wrote up   |                                                              |
| Friday 19/10    | Submit Project                                               | 0.5  | Got signature from Alan and submitted                        |                                                              |
| Sunday 21/10    | Start exploring use of add-ins and sound library             | 1    | Found 2 libraries that seem promising for synthesising sound - Tones and Tone | Later excel version required for Adding - have asked Advait.<br><br>The sound API not working in explorer may be a problem however |
| Thursday 25/10  | Get an add in working which I can make changes to            | 3    | Following the instructions Advait sent, got Excel Add in working. This is done in a web version of Excel. This is very basic but it shows I can make changes to an add in | Need to verify that I can indeed make sound. <br><br> Need to find a way to find out what the Library functions are and if there is a better environment for making this changes. Shall ask tomorrow |
| Friday 26/10    | Meeting with Advait                                          | 1    | ScriptLab and VSCode for dev environment<br><br>Dissertation shall lead thought on what live coding / a program is. e.g. musicXML can be compiled to music, is it a program though... probably not<br><br> Can always use Google sheets if web sound API will be an issue | Make noises, research what concepts should be expressible in musical notation, build musician network for testing / feedback, Read through sheetMusic references<br><br>Musician network will require ethics committee sign off |
| Monday 29/10    | Read 2 papers from Sheet Music<br><br>Do add-in tutorial for actually building one | 1.5  | Read and typed up Manhattan paper<br><br>Used Scriptlab and some basic JS to make a beep on button click | Try and add actual beep synthesis, not just calling a sound file. |
| Wednesday 31/10 | Integrate Tones library and make beep via that               | 2    | Integrated the Tones library to the Scriptlab add-in. It also plays the note that is written in the active cell | Still figuring out the typescript stuff. Could do with some resources for that. <br><br>ScriptLab is useful but it's a bad dev environment not least because it's tiny. I'll have to find a new way of doing things.<br><br>Briefly tried doing chords / sequences but neither completely successfully. |
| Thursday 1/11   | Meeting with Advait                                          | 1    | Can use turtles to navigate space and trigger playback - gives abstraction of tick value and allows space to be used flexibly. Can vary speeds and have empty cells as rests<br/>Would be good to compare to time bounded systems (Manhattan)<br/> | Ethics form                                                  |
| 21/11           | Make a controllable beep                                     | 3    | Can now define notes in cells and call play(A1:A6) and it will loop the notes in the selected Cells. Buggy if there is gaps but good progress towards turtle implementation. | NLP coursework is time-consuming so work has been limited and will be for the rest of term. |
| 22/11           | Meeting with Advait                                          | 1    | Formatting the colour of cells depending on if it's a note/turtle would be helpful</br> For comparison we can think of CDN of other systems. Also have usability studies and | Have basic turtles working by next meeting. Piano Phases would be a good benchmark for something we can perform. </br>Ethics form corrections |
| 6/12            | Playback (Piano Phases)                                      | 5    | Can now define turtles in the grid. Upon running they will be detected, their note sequences worked out and these loops triggered via tones. Still behaves oddly if there are gaps. Colouring also implemented | Use tones examples to find more stable methods for playback. A method that also allows for it not necessarily being a loop would be good too. Can then have turtles triggering turtles without madness |
| 7/12            | Meeting with Advait                                          | 1    | Regarding chords, defining each note separately has a cleanness. You can then just define multiple turtles. If the system could add in the notes for chords for you that would be helpful and give the best of both worlds. Could then also do !turtle(A1:A6, path, speed)</br>Keep subdividing of cells rare but possible (e.g. if there is one fill) </br>Ishall give a talk to Excel team - existing, objectives, design decision, implementation. Use demos.</br> Good to keep Excel things rather than making my own alternatives. E.g for chord completion have it fill in downwards and let user transpose rather than adding extra complexity to chord methods.</br>Being able to track the turtles would be useful. | Convert to VS code, add to github, and get working outside of Scriptlab. Then share to Advait.</br> Things to implement over the holiday: Chord system, input checks (sanitation),  turtle tracking, stopping the playback, longer notes, rests |
| 16/12           | Make the conversions to proper development and share with Advait. | 5    | Lots of time wrestling with dependencies and web stuff for the add-in (this is all quite unfamiliar). Got this working so code is now edited in VS code, run on localhost and then manifest added to Excel online and run there. Also spent a lot of time setting up Windows virtual machine as we thought that maybe manifest based running could only be done in Edge. Turns out Chrome is fine, but the hint about requiring it running locally isn't shown in chrome >:( | Next step, more stable playback method. Then I can start making the cool extras! |
| 20/12           | Clean up code. Define non looping turtles, rests and sustained notes - may require deleting existing play sequence method. | 4    | Rests are now handled as they should be by loops</br>Highlighting refreshes upon running of the sheet</br>Familiarised myself with the Tone transport system and have a better idea of how I will reimplement playing/turtles. | Reimplement general turtle playback to be more flexible.     |
| 21/12           | Reimplement turtle playback then start on other features     | 7    | Stopping now removes previously defined loops - needed to clear context</br>Basic playback of sequences with rests and sustained notes now supported, with or without looping (number of times, or infinite definable)</br>Can define turtle with moves or an end cell.</br>Can define multiple turtles with turtle(A1:A5, \<moves>,..) - multiple with an end cell not implemented yet. | Move into multiple files, defining multiple turtles with an end cell + other loose ends outlined in code. |
| 22/12           | Look into getting nicer sounds                               | 2.5  | Used a sampler and some piano sounds to replace the existing playback synth with a much nicer piano. The Christmas example sounds pretty nice now! | This does cause some delay for it to be loaded and currently the context is cleared every time playback is stopped so that may need to be changed so the synths/samplers don't need to be reloaded on every playback. |
| 6/1/2019        | Write consent form                                           | 0.5  | Wrote consent form, sent in for approval.                    | Some minor changes to make.                                  |
| 8/1/2019        | Dynamics and Turtle jumps.</br></br>Subdividing of cells.</br></br>Edit consent form.</br></br>Separate regex into different file | 5    | Dynamics and Turtle jumps both implemented. Both defined within the instruction part of the turtle definition e.g. !turtle(d6, ff r m3 pp jG8 r r m3, 1)</br></br>Subdividing of cells now possible for just notes. Can now put e.g. "C3,D3" in a cell and it will play 2 notes equal time each. Still works with rests and sustains.</br></br>Updated consent form and asked Advait if he had any more advice</br></br>Put regex function in a new file | action feedback from Advait                                  |
| 9/1/2019        | Read a computer music paper                                  | 1    | As part of another project, I was writing some python to manipulate an Excel spreadsheet. I think that a python program exporting to a csv, would be a good way of doing a conversion from e.g. MIDI to the spreadsheet format | Didn't read a paper                                          |
| 10/1/2019       | Read The programming language as a musical instrument</br></br>Fix speed and looping bug</br></br>Chord inputting and make it look a bit nicer | 5    | Read paper with various extra researches occurring on the way.</br></br>Edited way speed is handled from turtle so arbitrary mathematical expressions can be given.</br></br>Fixed speed and looping bug</br></br>Found and added tonal library and added functionality for basic chord entry | Could define speed by reference to reduce mental operations.</br></br>Look s rubbish and requires specific cell selection to work. I'll make it cleverer and wrestle with the html and css later. |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |

