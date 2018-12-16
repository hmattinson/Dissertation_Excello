# Excel Music

University of Cambridge final dissertation.

The aim of this project is to take Microsoft's Excel, one of the most omnipresent pieces of software, and create a system for music composition and performance within it.

## Set up

Clone the repo
npm run from within the repo
Open Excel online (example notebook included)
Add an Add-in
Add the manifest from this project

## Current Usage

A single note can be defined in a cell, this currently only of the form "A4". Options for volume and length will be added later.
In most musical interfaces one axis is time (and the other is normally pitch). In this case we wanted to explore the use of both axes as just space - ideomatic to Excel. As a result the user is free to arrange the data as they wish.
Notes are played by defining turtles to navigate the spreadsheet. Turtles are defined as follow

```
!turtle(<Starting Cell>, <Instructions>, <Speed>)
!turtle(E6, r m2 r m2 l m3, 1)
```
The turtle in the above example will start in cell E6 facing North. It will then turn right, move two steps forward, turn right again, move two steps forward, turn left, then move 3 steps forward. This path will be repeated (starting from E6 each time). 
Speed is default 1. This is currently not very explicit but allows for defining differences as in Steve Reich's Piano Phase.

## Log

| Date            | Goals                                                        | Time | Progress                                                     | Next Steps                                                   |
| --------------- | ------------------------------------------------------------ | ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Tuesday 9/10    | Clarify tasks for the project with Alan<br><br>Read Advait's paper | 1.5  | Clarified project detials with Alan<br><br>Read recent paper<br><br>Emailed clarifications to overseers | Write up notes on the paper<br><br>Look into other things discussed in meeting e.g. MusicXML |
| Wednesday 10/10 | Begin proposal draft<br><br>Notes from Alan meeting          | 2    | As goals<br>Also installed and wrote some TypeScript. Seems easy | Still need to get more info from Advait before proposal can be fully completed. Still work to do on proposal<br><br>Tomorrow: Read excel for music paper and type up notes on both<br><br>Complete as much of proposal as possible |
| Thursday 11/10  | Write up notes on both Advait's papers<br><br>Complete first draft of proposal<br><br> | 4    | Typed notes from Advait SheetMusic and CV paper<br><br>Completed first draft of proposal | Substance, Evaluation need adding to and discussing with Advait. As such plan of work will probably also be changed. |
| Friday 12/10    | Meeting with Advait                                          | 2    | Discussed direction of project and technical details. See meeting notes | Evaluation and methods for live coding still need finalising |
| Wednesday 17/10 | Implement changes to proposal                                | 2    | Taking the comments from my meeting with Advait I changed my proposal and began preparations for the final draft |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |
|                 |                                                              |      |                                                              |                                                              |

