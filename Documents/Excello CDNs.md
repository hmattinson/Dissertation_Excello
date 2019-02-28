# Excello CDNs

### Activities

- Exploration - manipulating information or structure
- Modification - change structure only
- Transcription - from one notation to another
- Incrementation - adding one more
- Reading - seeking information

### CDNs

- Role Expressiveness - How much elements suggest their purpose [ROLE]
- Consistency - Similar meanings, similar syntax [CONS]
- Premature Commitment - Constraints on order of decisions [PREM]
- Viscosity - Resistance to change [VISC]
- Diffuseness - The spread-out-ness of information [DIFF]
- Useful Awkwardness - Thinking hard is sometimes useful [UAWK]
- Abstraction - Mechanisms for generality [ABST]
- Synopsie - Provides an understanding of the whole [SYNO]
- Hidden Dependencies - Unexpected relationships [HIDD]
- Hard Mental Operations - Some things are just hard [HMOS]
- Provisionality - Degree of commitment to marks [PROV]
- Legibility - Readability of the notation [LEGI]
- Closeness of Mapping - Correspondence to the domain being expressed [CLOS]
- Progressive Evaluation - Feedback along the way [PROG]
- Secondary Notation - Escape from formality [SECN]
- Juxtaposition - Simultaneous comparison [VIJU]
- Error Proneness? [ERRP]

| Dimension   | Exploration                                                  | Modification                                                 | Transcription                                                | Incrementation                                               | Reading                                                      |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ROLE        | <span style="color:green">Custom functions + Excel editor saying arguments helps</span><br/>Depends on turtle familiarity. Movement instructions could be unclear. Chord part very factual. | <span style="color:green">Manipulation is easy</span><br/>
Should be easy to tell where notes and turtles are | <span style="color:green"></span><br/>
Very little to the notation so with the examples you have all you need. Dynamic number not obvious | <span style="color:green">Layout of grid already suggests it's simply adding more</span><br/>
Exactly the same format used | <span style="color:green">Excel</span><br/>
Highlighting helps show things are part of scheme. Multinotes could be interpreted to mean chord or note lengths stay the same. |
| CONS        | <span style="color:green"></span><br/>
I removed start and end cell notation. Dynamics always in cell. | Same repetition is used for blocks  (...)n as for individual instructions m3. | <span style="color:green"></span><br/>
Different dynamics can be used 0.6 vs  mf. They go in exactly the same place. Speed can currently be low and high |                                                              | <span style="color:green">Excel</span><br/>
Turtles can miss arguments and cells dynamics but meaning the same. |
| PREM        | <span style="color:green"> </span><br/>Can run turtles without all the notes and place notes without turtles. Easy to (de)activate turtles. | <span style="color:green">Inserting new lines easily facilitated, would be inconvenient for many lines. Adding lines for markup is easy. Undo stack is broken.</span> <br/>May have to decide number of parts. | <span style="color:green">Grid is very flexible with where notes go</span><br/>Order of turtles and notes doesn't matter. Dynamics can be done anytime. | <span style="color:green">Function ranges easily extended</span><br/>Can easily add to turtle range |                                                              |
| VISC        | <span style="color:green">Cells easily changed and moved</span><br/>Notes easily changed | <span style="color:green">Modifying layout can require multiple operations</span><br/>Changing individual notes / turtle instructions is easy. Toggling turtles. Transposing now easier. | Keeping octave and dynamics context makes it much easier to change octaves and write out melodic lines faster. | <span style="color:green">Easy to add new functions</span><br/>Easy to add extra functions. m* makes adding notes easier. If notes layout is changed, turtle instruction must be also |                                                              |
| DIFF        | <span style="color:green"> </span><br/>May be hard to see correspondence between notes and turtles | <span style="color:green">Cells easily changed and moved</span><br/>Turtles and notes must both be modified and they may not be close. | <span style="color:green">Double click allows columns to be the ideal width</span><br/>Tradeoff between how concise the cell and the turtle notations are. e.g. clapping music. Brackets can reduce the space needed to describe. |                                                              | <span style="color:green"> </span><br/>Volume now with the notes it's associated with. |
| ABST        | <span style="color:green">Cells can accomodate all types of musical notation</span><br/>Turtles handle different elements in the same way. | <span style="color:green"> </span><br/>Notes easily changed. Multinote cells have the same types of notes/sustains/rests | <span style="color:green">Abstraction of spreadsheets is lacking</span><br/>Multiple turtles can be defined with the range notation. Don't have to start by defining new terms. |                                                              | <br/>Bracket notation allows ideas to be expressed more concisely. |
| HIDD        | <span style="color:green">Excel already has large hidden depencies but with trackers</span><br/>Reference to start cell, instructions, speed and loops can be defined elsewhere. | <span style="color:green">Responsible for high error frequency</span><br/>One way pointer of turtle to notes. Required due to many-to-many relation of notes and turtles. | <span style="color:green"> </span><br/>Dynamic and octave could be dependent on a previous cell. Don't know turtle paths so may not know. Intrinsically unavoidable. Many-to-many. | <br/>Have to track a turtles path to figure out which notes. This allows for separation though. This relation is known though. | Brown and Gould (1987)                                       |
| HMOS        |                                                              | <br/>Figuring out which notes are in a chord is streamlined. Transposing. | <br/>Main challenge was clouting number of cells to move.    |                                                              | Unwrapping nested instructions could be hard. But may make easier. |
| PROV        | <span style="color:green">Entire areas of spreadsheet easily removed and edited</span><br/>Don't require a full track to play, can easily "what-if" | <span style="color:green">Can easily copy and try something new</span><br/>New turtles easily defined and others muted. Chords can quickly be added to pad. | <span style="color:green">Can markup where different things are defined</span><br/>New turtles easily defined and others muted | <span style="color:green"> </span><br/>Can update turtle path but define exact notes later. |                                                              |
| CLOS        | <span style="color:green"> </span><br/>Notes are just an existing notation. Turtle instructions map exactly to how it moves. Very close | <span style="color:green"> </span><br/>Dynamics may be slightly arbitrary. | Absolute tempo more closely mapping existing notation than being relative to 160cpm. |                                                              | <br/>Contextual clues loses Closeness a little               |
| PROG        | Play button now lights up so you know it's been registered.  | <br/>Can test individual areas                               | <span style="color:green">By using markup you can see how much of the space you have filled</span><br/>Turtles can be played before everything has been transcribed to check progress. m* allows easy checking. | <br/>Notes are highlighted giving feedback they're noted.    |                                                              |
| SECN<br>Big | <span style="color:green">Parts can be grouped</span><br/>Notes and turtles are coloured. | <span style="color:green"></span><br/>Single parts can be split over different lines, have gaps etc. Grouping of chord and turtle part of side menu. | <span style="color:green">Parts can be grouped and layed out as the user wishes.</span><br/>Time is abstracted away so any cell can be used for anything. |                                                              | <span style="color:green">Arbitrary labelling can be added. Different formatting can be used - underlines, text, shading.</span><br/> |
| VIJU        |                                                              | <br/>Previously was hard to see what dynamics corresponded to what note. | <span style="color:green">Visability highly dependent on layout user chooses</span><br/> |                                                              | <span style="color:green">Large number of cells can be viewed concurrently</span><br/>Can view live turtles in menu an by shaded cells. |
| LEGI        |                                                              | <span style="color:green">Visability highly dependent on layout user chooses</span><br/>Turtle instruction can sometimes be a little hard to parse. But are space separated. |                                                              |                                                              |                                                              |
| UAWK        |                                                              |                                                              |                                                              |                                                              |                                                              |
| SYNO        |                                                              |                                                              | <span style="color:green"> </span><br/>Can markup            | <span style="color:green">Existing grid structure means for a lot of cases the direction can be inferred</span><br/>Colouring makes it easier to see where notes and turtles are | <span style="color:green">Overall can be good if user uses a good layout</span> |
| ERRP        |                                                              | <span style="color:green"> </span><br/>Won't highlight if not parsed as a note | <br/>Mistakes were usually getting the octave wrong.         |                                                              |                                                              |

https://www.microsoft.com/en-us/research/wp-content/uploads/2016/07/excel-1.pdf

http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.128.270&rep=rep1&type=pdf

https://www.cl.cam.ac.uk/~afb21/CognitiveDimensions/CDtutorial.pdf