# Excel Music

University of Cambridge final dissertation.

The aim of this project is to take Microsoft's Excel, one of the most omnipresent pieces of software, and create a system for music composition and performance within it.

## Set up

Clone the repo
npm run from within the repo
Open Excel online (example notebook included)
Add an Add-in
Add the manifest from this project

This is helpful: https://docs.microsoft.com/en-us/office/dev/add-ins/tutorials/excel-tutorial?tutorial-step=1

## Current Usage

A single note can be defined in a cell, this currently only of the form "A4". Options for volume and other features will be added later. Notes are sustained by placing "s" in the next cell in the path. A rest is simply an empty cell.
In most musical interfaces one axis is time (and the other is normally pitch). In this case we wanted to explore the use of both axes as just space - ideomatic to Excel. As a result the user is free to arrange the data as they wish.
Notes are played by defining turtles to navigate the spreadsheet. Turtles are defined as follow

```
!turtle(<Starting Cell>, <Instructions>, <Speed>)
!turtle(E6, r m2 r m2 l m3, 1)
```
The turtle in the above example will start in cell E6 facing North. It will then turn right, move two steps forward, turn right again, move two steps forward, turn left, then move 3 steps forward. This path will be repeated (starting from E6 each time). 
Speed is default 1. This is currently not very explicit but allows for defining differences as in Steve Reich's Piano Phase.

## Features to add

* Not just restless loops:
  * Turtles that repeat n times
* Chords
* Turtles deployed by turtles
* Definable tempo
* Turtle tracking
* Input sanitisation
* Different Synths
* Turtle(A1:A5, ...)
* Turtle Jumps
* Easier way of playing a long line (i.e. not counting)

## Issues

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
| 21/12           | Reimplement turtle playback then start on other features     | 3.5  | Stopping now removes previously defined loops - needed to clear context</br>Basic playback of loops with rests and sustained notes now supported</br> | Neaten that stuff.                                           |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |

