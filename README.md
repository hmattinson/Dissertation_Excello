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
