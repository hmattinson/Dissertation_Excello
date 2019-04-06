# Dissertation Skeleton

40 pages, 12,000 words. 

## 1) Introduction

"possible that more people program with spreadsheets than any other programming environment" [Manhattan - 5]

Hypothesis: affordances of the spreadsheet enable new ways to interact with musical notation. Spreadsheets allow incremental learning with a low threshold [Manhattan]. 

Ubiquitous. 

Introduce Excel and music coding and the motivation for the task.

Introduce Excello to give context.

end-user programmers vs professional programmers. [Nar93]

Similar music systems: 

- https://hackaday.com/2019/02/02/never-mind-the-sheet-music-heres-spreadsheet-music/
-  Advait's Sheet Music - introduces the abstraction of time, formulae in cells are evaluated
- Manhattan (time bounded). Like sequencing, columns are tracks and rows are times. 

*Lead thoughts on what (live) programming is.*

*Crossover with programming style of games?* 

Notation vs instrument increasingly indistinct. [The Programming Language as a Musical Instrument]

Outline of the work:

1. Creation of prototype adhering to success criteria
2. Participatory design sessions and formative evaluations with implementation extensions
   1. Participants help identify difficulties and opportunities.
3. Converter

## 2) Preparation (+ intro) - 26% (3620 words)

*Work before code was written, refining the project proposal. Demonstrate professional approach / prep to development.*<br>*Requirements analysis*<br>*Cite new programming languages / systems.* Excel add-in in Typescript. <br>

### 2.1) Making Noise

Add-in

Done in ScriptLab (built in library support). Called a sound file. Made a beep with Tones. play(A1:A6). Web audio API. 

VSCode, Node and local host. Basic pipeline for making noise. 

### 2.2) Turtles and Excello language

Al-Jazzari. LoGo + graphics. 

Cleanness of defining notes separately. If there was a way of adding the notes or a chord/arpeggio then best of both worlds. 

Dual formalism tradeoffs. 

### 2.3) Software Engineering

##### 2.1.1) Requirements

Success criteria. 

##### 2.1.2) Tools and Technologies Used

How Excel Add-ins work, Excel API. NodeJS. Written in Typescript. 

- Tone.js (MIT) - Web Audio API, compare to tones. 
- tonal.js (MIT) - Notes in chords. (remember that I extended this for octave). 

Discuss licenses. 

MIDI converter in Python using mido (MIT) to read MIDI tracks. Had to understand MIDI. 

##### 2.1.3) Starting Point

Yeoman generator to create empty Excel add-in.

##### 2.1.4) Evaluation Practices

Participatory Design / Formative Evaluation. How it fits with software development - Spiral model

Summative Evaluation.

### 2.4 ) Previous Work

Sibelius

### 2.5) MIDI files

structure of files

evaluation corpus

## 3) Implementation - 40% (5580)

*Design strategies and description of what was actually produced.*

*Repository Overview (1 page) - high level overview of source code in repository. If written from scratch or built on an existing repository.* 

*Any design strategies that looked ahead to the testing stage might profitably be referred to* ???

Reasons for making design decisions. Link to research. 

Explain order in which I will talk about things (breadcrumbs) to ensure the examiner knows that actual implementation is coming. Functionality of the initial prototype, Evaluation sessions and issues, Features and solutions implemented, how it all works. Converter. 

### 3.1) Initial Prototype

- Turtle
  - Start cell
    - Multiple turtles
  - Instructions for path
    - Dynamics in instructions
    - As above except that () hadn't been implemented in the initial prototype.
  - Speed
    - Relative
    - Arbitrary maths (Javascript)
  - Loops
  - ! - activation
- Notes in cells
  - sustains
  - multinotes
- Highlighting
- Piano sample
- Chord input

### 3.2) Evaluation Sessions / Formative Evaluation

##### 3.2.1) Session format

Ethics and data handling are discussed in evaluation chapter. 

Tutorial, review, exercise, review. Things that are unintuitive, require mental effort. 

##### 3.2.2) Issues and suggestions that arose

See evaluation session document.

### 3.3) Solving Issues

See new features document.

### 3.4) How it works

Overview. 

How it actually works. Secondary notation supported. Tones transport system. Conversion to the Tones system. 

Transport, Part. 

Not treated as a context free grammar so that extra gaps can be easily dealt with and because the format of the instruction is quite exact, CFG overkill. 

Chord input: tonal library but made changes myself for octave. 

Custom Excel functions. Tonal library. 

##### 3.4. ) Parenthesis

Problems, solutions + tests, merged and published in open source. 

### 3.5) Converter

How MIDI messages work a little more. 

Requirements of the MIDI: constant tempo. Exact notes on and off? 

Lossy converter. 

How this works

### 3.6) Repo Overview

Licenses and what I'm releasing under. 

## 4) Evaluation (+ Conclusion) - 20% (2790)

*Photographs of workstation screens. Graphs should indicate confidence intervals.* 

*How many of the goals were achieved. Proved to have been achieved. Did it really work.* 

### 4.1) Excello overview (/ advantages / example showcase)

Success Criteria: 

- Play individual notes and chords and define their durations.
- Defining multiple parts.
- Play loops.
- Define sequences of notes and chords and be able to call these for playback.
- Define the tempo of playback.

Advantages of Excello, example showcase e.g. Piano Phase (Manhattan requires 23*3)

##### 4.1. ) Midi conversion

Corpus that was converted

### 4.2) Formative Evaluation

How evaluation worked. 

### 4.3) Success of New Features

For each feature added:

- Show the distribution of answers.
- Fishers test
- Mode
- Anything not staircase, interpret. 
- Is it overall preferable. 

### 4.4) CDNs

Cognitive Dimensions of Notations can be used to analyse musical notation \cite{blackwell:notation} in addition to software systems  \cite{green:cdn}, therefore it is a suitable tool for the discussion of live coding systems. The names of Cognitive Dimensions are written in italics. During a live coding performance, the activities of incrementation and modification shall be treated as the most important, and therefore most considered when discussing the dimensions. 

Nesting and collapsing of rows. 

##### 4.4.1) Matrix for all but [CLOS, CONS, VISC, SECN, VIJU, HMOS]

increment, modify, transcribe, exploratory design with respect to the CDNs (matrix). 

Comparisons to other interfaces. 

##### 4.4.2) Comparisons for [CLOS, CONS, VISC, SECN, VIJU, HMOS]

For each question:

- Look at all responses just for Excello (19).
- Comparison with Sibelius (12).
- Wilcoxon significance. 
- Discuss Excello vs Excel contributing factors. Comparisons with other interfaces. 

### 4.5) Ethics and Data handling

Ethics review, consent form, storage of data (de-anonymisation), pilot sessions. 

## 5) Conclusion

*Social and Ethical impact*

Parenthesis reminder

Extensions:

- ixi lang
- Live
- tracking

## Bibliography

## Appendices

Should be < 10 pages including some sample code. 








