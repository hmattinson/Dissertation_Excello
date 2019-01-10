# Research

## Papers

### Calculation View: multiple-representation editing in spreadsheets

_Advait Sarkar, Andrew D. Gordon, Simon Peyton Jones, Neil Toronto_

_2018 IEEE Symposium on Visual Languages and Human-Centric-Computing (VL/HCC)_

_978-1-5386-4235-1/18/$33.00_

_pp 85 - 94_

Calculation View design to show the computational structure of a spreadsheet. From this more abstract operations on ranges within the grid could be available. These multiple representation can enable new experiences in spreadsheets. 

Edits in one view are instantly propagated to the other and the grid is recalculated. This is live.

CV offers a new textual syntax called range assignment for copying a single formula into a block of cells. There is a syntax for naming these cells/ranges. These names can then be referred to in other formulas.

```ocaml
Cell ::= A1-notation
Range ::= Cell | Cell:Cell

Literal ::= number | string
Name ::= identifer
Fun ::= SUM | SQRT | ...
Formula ::= Literal | Range | Name | Fun(Formula1, ..., FormulaN) | ...

Assignment ::= 
	Range = Formula |
	Name Range = Formula
Program ::= Assignment1 ... AssignmentN
```

To name a cell or range: $\text{Name Cell = Formula}$. Range assignment is the primary strategy in CV instead of copy/pasting / drag-fill

No 2 assignments can target the same cell. Each range targets a non-empty set of cells.

CV does not have functionality for adjusting cell formatting, or viewing the spatial grid layout of formulas.

CV is generated each time the spreadsheet is opened, or when the grid is edited. It doesn't add new information to the spreadsheet. 

<!--Is this a problem for populating the spreadsheet via CV?-->

| View   | Activies enables                                            | Data Content                                  |
| ------ | ----------------------------------------------------------- | --------------------------------------------- |
| CV     | Editing ranges with shared formulae<br/><br/>Fluid naming   |                                               |
| Shared | Cell assignment<br/></br>Names                              | Cell formulae<br/></br>Names                  |
| Grid   | 2D spatial display<br/></br>Secondary Notation<br/></br>... | Cell formatting<br/>Images<br/>Charts<br/>... |

CV works by block detection. First grouping all cells with the equivalent R1C1. Greedy flood filling algorithm used:

* top left cell chosen as seed
* extend block to the right as much as can whilst preserving equivalence
* grow downwards as much as possible whilst preserving equivalence
* remove block when it can't be grown any more
* Pick new seed and repeat until all equivalent cells have been assimilated



### Towards spreadsheet tools for end-user music programming

_Advait Sarkar_

_Computer Laboratory_

SheetMusic explored how formulae with music sound effect can be included within the spreadsheet paradigm. It is implemented as a webpage and each cell is able to contain arbitrary Javascript. On top of the web audio API is a library of note and sequence synthesis functions. There is additional library functionality for notes of chords and scales.

Global incrementing tick variable editable using the global tempo variable. Spreadsheet evaluated at each tick. stretching/squeezing and offsets can be used for sub-tick durations. time elapsing independently with formulae recalculating is the key idea for stream processing in spreadsheets. The same implementation is used in Excel's Real Time Data (RTD) feature. 

```javascript
if(tick%2==0) p('snare') else p('kick')
```

Arbitrary Javascript can be inserted in each cell. This arbitrarily-scriptable nature will remain whilst being possible to create sophisticated musical programs without large Javascript knowledge.

Rich secondary notation in spreadsheets.

Manhattan (Nash, 2014) - each column represents parallel stream of execution. Enrichment to control flow with e.g. branching and loops possible. The commitment to parallelism sacrifices layout flexibility. SheetMusic instead brings better capabilities for musical programming to spreadsheet users. Use of secondary notation is maintained. 

Piet and Al-Jazari (McLean, Griffiths, Collins, Wiggins, 2010) - cells of grid can't freely store data and code interchangeably. agents explore the grid and 'play' the cells they move into.

Texture - a visual dataflow language.

Debate whether tool for composition, musical instrument or programming language. 

Application: Custom data signification and musical prototyping.



### Manhattan: End-user programming for music

*Nash, C.*

*In Caramiaux,B. Tahirolu, K., Fiebrink, R. and Tana, A., eds (2014) Proceedings of the International Conference on New Interfaces for Musical Expression*

*London, UK: Goldsmiths, University of London, pp 221-226.*

Combines formulae with a grid (like established spreadsheets) style of musical sequencer. Intermediate between generative/algorithmic music and traditional methods for music editing.

for loops, goto, if-then-else

CDN evaluation with early feedback from artists.

Traditional: static detailed specification
Recording: capturing a live performance
Music Programming: define abstract processes, compose dynamically. Increasing abstraction leads to decreased lower-level control. Lose freedom to deviate from algorithms

Dynamic effects e.g. rand

Digital creativity [14]
End user programming [13]
CDNs [4]

####Spreadsheets

"possible that more people program with spreadsheets than any other programming environment" [5]

Spreadsheet UI: table (flexible) with formulae added for relationship definitions. Cells: variables, functions: relationships between cells. Spreadsheets allow users to learn incrementally with a low threshold. Closeness of mapping of spreadsheets let users bring knowledge from different domains to spreadsheets to solve problems. 

In spreadsheets in general: rapid editing (low viscosity) -> reduces premature commitment from planning and offsets error proneness. There is a fast feedback cycle

Formulae lower the threshold but still allow for high level as they extend not replace the workflow. 

####Manhattan

Manhattan combines sequencing (direct) and end-user music programming. 
Tracker: columns = tracks, rows = times
C#5 01 64 D01 - C#5, voice 1, volume 64, slow diminuendo

Parallelism in music: counter-point, polyrhythms, polytempi.
Musicians also more familiar with iteration that recursion

Scripting at cell-level.

Can give custom name to co-ordinates *Could CV be used for something similar?*

Manhattan has two modes for different level of visualisation of dependencies. In a strict spreadsheet setting this isn't as feasible. 

Formulae can provide automation but also random variation to help mimic true human performance.

End user programming tools to help make generative music more mainstream. 

Live playback so users can change things mid playback and not have to play again from the start.

Extension: 

* graphical debugging
* meta-programming
* self-modifying code
* function calling and recursion
* **modularity (custom abstractions or groupings)**



### The Programming Language as a Musical Instrument

*Alan Blackwell and Nick Collins*

Live coding introduces a new class of users to traditional programmers / software engineers. Imaginative programming language developments generally arise from satisfying the needs of novel user classes. People who's understanding is different to mathematical formalisms / compiler understanding of mathmos/compscis. Experts in their own domain. Solving unusual needs can yield new creative solutions.

Hartree 1950: "Programming is the process of drawing up the schedule of the sequence of individual operations required to carry out the calculation"

McCracken 1957: "a process of translating from the language convenient to human being to the language convenient to the computer"

Power 2004 - spreadsheet was created to service the need of business school students.

Music notation can share many features with programming languages in the context of CDNs. Can express concerns common to both domains. We should view the users of music notation systems as composers and editors rather than musicians.

Composition vs performance, notation vs instrument distinction is increasingly indistinct with the rise of different contemporary music systems. Attention Investment Model (Blackwell and Burnett 2002) for describing cognitive effects of transition.

Laptop music is a characteristic of contemporary performance practice in electronic music, not a genre. Gestural rate is often disconnected from the output event rate.

Abelton Live, Reason - sequencing triggering and rigid interface. Lack algorithmic manoeuvrability and customisation potential. Graphical packages may offer more customisation e.g. Cycling 74s Max/MSSP, Miller Puckette's PD. Programming languages e.g. for SuperCollider, ChucK - hard to master but more exploratory potential. 

#### ChucK

low level enough that you have to define sin Oscilators and connect to DAC - <u>this info not from paper.</u>

A new user will have to always check the manual - very poor **closeness of mapping**

Operations have identical presentation even if they offer completely different musical function - terrible **role expressiveness**

**Abstraction Hungry** -> **Hard mental operations**

editor -> command line. High memory load.

**Error prone** as you cannot see the likely scope of your actions as in Abelton. (This is why better turtle tracking would be better).

Why the challenge - "embrace the challenge of live coding; the virtuosity of the required cognitive load, the error-proneness, the diffuseness" - all part of the skills required and reward. 

#### Abelton

Time against track event sequencer - virtual mixer paradigm. Higher **Closeness of mapping** but at the expense of creative exploration. 

**provisionality** - mappings and shortcut keys

Due to the controls all having direct consequences there is immediate commitment to action, potentially causing **premature commitment**

Biased towards the established layout and styles of audio products. Doesn't facilitate experimental designs or algorithmic music. 



Music design notations needn't support the arbitrary restructuring of the kind enabled by UML. However, they may reflect different musical existing structural concepts such as staff notation, chord tablature. 

Musicians used to a tight feedback loop. - **Progressive evaluation** from being able to support immediate feedback. 

Noble and Biddle 2002 - "programming as creativity, as performance, as striving towards an undefinable product, fragmentary and abstract, free from narrative, constructive the final work by scavenging through the scrap-heap of the Internet."

<u>A thought I had</u>- Problem solving is part of programming. Coming up with a neat representation for performing a piece is very similar to coming up with a low complexity or concise solution to an algorithmic problem.

#### further reading:

* Blackwell an Burnett 2002 - Applying attention investment to end-user programming
* Blackwell and Green 2002 - A cognitive dimensions questionnaire optimised for users
* Blackwell, Green and Nunn 2002 - Cognitive Dimensions and Musical Notation Systems Paper
* Costello/White - A man out of time beats the clock
* Hartree 1950 - Calculating instruments and machines
* McCarthney 2002 - Rethinking the computer music language
* Power 2004 - Brief History of Spreadsheets