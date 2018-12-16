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