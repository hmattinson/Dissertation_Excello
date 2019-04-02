# Preparation

Firstly in this section, the refinements made to the project proposal shall be covered. Then I shall explain the tests that were performed to establish Excel's suitability for musical development. The design decisions for Excello itself shall be explained along with the software engineering tools and techniques employed. Finally, the research that was conducted in order to be able to implement a converter from MIDI to Excello shall be explained. 

### 2.1) Proposal Refinements

The project shall invent a notation by which music can be defined within a spreadsheet along with a system for interpreting the notation in the spreadsheet to produce audio output. This shall continue to explore ways in which time can be abstracted away from the grid. 

The aim shall be to implement the project as an Excel add-in - a web application displayed within Excel that is able to read and write to the spreadsheet using the Office Javascript API. All of the data for spreadsheets used for conventional data handling is all maintained within the sheet. Similarly, no information beyond the spreadsheet shall need providing to the add-in for playback to be possible. Tests shall be carried out to verify that suitable audio output can be produced. 

A sizeable addition to the project, that was not included in the initial proposal, was to carry out participatory design \cite{muller:pd} in order inform improvements that can be made beyond the initial prototype. The prototype would be introduced to users and from this, new features and improvements implemented. A subset of these participants who gain sufficient familiarity with the project can then be used for more informed summative evaluation. As a result, the proposed extension of incorporating live-coding will only be implemented if there are no other features believed to be more helpful for the user base. 

MIDI shall be the formal notation that is converted to the notation of the project through the implementation of a program that translates MIDI files into a CSV file that can then be opened in Excel. MIDI is a suitable choice as there exist large corpuses of MIDI files suitable for testing \cite{huang:deep}.  

### 2.2) Initial Tests

The following section outlines the libraries that I made use of and the tests that I carried out in order to establish how I would synthesise notes from Excel and how the data in the spreadsheet would affect this. All tests were carried out in Excel Online using Script Lab, an add-in that allows users to create and test simple add-ins experimenting with the Office Javascript API. These add-ins have an HTML front end and run Javascript which can access libraries and data elsewhere online. 

A simple add-in that played a wav file was used to verify that an add-in was capable of making a call to the Web Audio API. 

##### 2.2.1) Note Synthesis Library

The Web Audio API allows audio to be synthesised from the browser using Javascript. To create a program for users to define and play musical structures this requires synthesising arbitrary length, pitch and volume notes. In order to avoid the lower-level audio components (e.g. oscillators), I researched libraries that would allow me to deal with higher level musical abstractions of the synthesised notes. Sarkar's SheetMusic used the library tones \footnote{https://github.com/bit101/tones} which provides a very simple API where only the pitch and sound envelope \footnote{explain what this is} of all notes. Other limitations included no definition of volume and being limited to simple waveform synthesisers. 

Tone.js \footnote{https://tonejs.github.io/} is a library built on top of the Web Audio API. An *Instrument* such as a *Synth* or *Sampler* is defined. The *triggerattackrelease* release method of these instruments allows a note of a given pitch, volume and duration to be triggered at a particular time. Notes are defined using scientific pitch notation (e.g. F#4), the notes name (F#) combined with the its octave (4). Script Lab is able to reference libraries in the Node Package Manager (NPM). Therefore, I was able to test create notes with pitches defined in Javascript to confirm Tone.js was suitable for an add-in. 

##### 2.2.2) Office Javascript API

In order to create a program for users to produce music from within Excel, the musical output must be informed by the data in the spreadsheet. To test the Excel Javascript API, I outputted a note with the Tone.js library, the pitch of which was defined in the spreadsheet. This was extended to the playing of the note, not just the pitch, being defined within a cell. 

Next, I was able to played a series of notes of constant length with the notes defined in consecutive cells.  The range of cells was accessed using the Excel API and the values were played using the Tone *sequence* object. Having carried out the above tests, I confirmed Tone.js has the functionality required to assist in meeting the success criteria of the project in additional to features that can be used to implement extensions.

### 2.3) Excello Design and Language

##### Abstracting Time

Dave Griffith's Al-Jazari \cite{Visualisation of Live Code} takes place in a three-dimensional worlds where robotic agents navigate around a two-dimensional grid. The hight and colour of the blocks over which the  agents traverse determines the sound that they produce. Whilst there are more complex conditional instructions, the basic instructions have the agents rotate and move forwards and backwards in the direction that they are facing. The hight and colour of the blocks can be changed by the user whilst the agents are moving. There therefore exists a dual formalism as both the instructions given to an agent and the state of each block. This design is intended to make live coding more accessible, both when viewing performances and becoming a live coder. 

In Al-Jazari, the agents are programmed visually by placing symbols corresponding to different instructions in thought bubbles that appear above them. This is not suitable for programming within spreadsheets where all data must exist alphanumerically within cells. What's more if an agent was to continue moving forwards many times in a row, it would become tiresome to keep adding the move forward symbol. This is less of an issue in Al-Jazari where the grid within which the agents navigate only measure ten cells wide and long. 

The concept of having a curser navigate around a cartesian plane is the method used by turtle graphics. Just as this concept is used in Al-Jazari to play the cell the agents occupy rather than colour it, it is suitable for spreadsheets. The turtle abstraction is employed by Excello by having notes defined in cells and defining agents, known as turtles, to move through the spreadsheet activating them. In order to play a chord, multiple turtles must be defined to pass through multiple cells corresponding to the note of the chord. This method maintains high consistency in the notation sacrifices the abstractions for musical structures that are available in languages like Sonic Pi - "chord('F#', 'maj7')". By implementing these as methods in the add-in to add notes to the grid, the use of the abstractions in maintained whilst preserving consistency and cleanness in the spreadsheet itself. 

The turtle is the crux of the Logo programming language \cite{goldman:turtle}. In Logo, turtles are programmed entirely by text. For example "repeat 4 [forward 50 right 90]" has a turtle move forwards 50 units and turn 90 degrees to the right. This is repeated four times to draw a square \cite{https://el.media.mit.edu/logo-foundation/what_is_logo/logo_primer.html}. A similar method is employed in Excello. 

##### Initial Prototype Design

In Excello, notes are placed in the cells of the spreadsheet and pathways through the grid are defined using a grammar for describing turtle movement. The notes in the cells will be played when a turtle moves through that cell. When the program is run, the melodic lines produced by all turtles defined in the grid will be played concurrently. Turtles are defined with a start cell, movement instructions, the speed with which they move through the grid (cells per minute) and the number of times they repeat their path. As in Al-Jazari, distance in space maps to time \cite{mclean:texture}, Excello extends upon this by allowing different turtles to navigate at different speeds. 

As in Logo, turtles begin facing up/north. The move command "m" moves the turtle forward one cell in the direction that it is facing. Just like in Logo, the turtle always moves in the direction it is facing. The command "l" and "r" turn the turtle 90 degrees to the left or right respectively. Repeats are implemented in Logo with the command "repeat" followed by the number of repeats and the instructions to be repeated \cite{goldman:turtle}. In order to create more concise instructions, commands can be repeated in succession by placing a number immediately after it. For example, the command "m4" will have the turtle move forwards four cells in the direction that it is facing. The direction a turtle is facing can be defined absolutely using the commands "n", "e", "s" and "w" to face the turtle north, east, south and west. In order to change the volume notes are played at, dynamics (ppp,pp,p,mp,mf,f,ff,fff) can be placed within the turtle instructions. Any notes played after this will be played at that dynamic. In order to repeat multiple instruction sequences, these are placed in brackets and the number of repeats put immediately after the bracket. For example, "(r m3)4" would define a path going clockwise around a three by three square. The ability to repeat larger series of instruction is why the relative movements "l" and "r" are included in the language despite being less explicit than the compass based directions. 

It may not be convenient for each melodic line to be defined by consecutive paths, just as conventional music often spans across multiple lines. This requires the turtle to navigate to non-consecutive cells and then proceed playing. For graphic drawing in Logo, the pen can be lifted, allowing the turtle to navigate without colouring the space beneath it. This is suitable for a graphical output where the number of steps the turtle takes has no effect on the output, only the cells it colours. However for a musical output, dependent on when the turtle is in certain cells, this would not be convenient as it would introduce large rests. Analogous to lifting the pen for graphical turtles, one could set the turtle in a mode where it doesn't play the cells it navigates through and navigates through them immediately until it is placed back in a playing mode. However, in this case the actual path that the turtle takes is insignificant only the cell it ends up in. I have therefore added jumps to the language. This can be defined in absolute terms where the destination cell is given (e.g. jA5), or relatively (e.g. j-7+1), where the number of rows and columns jumped is given instead. An absolute jump is clearer to human reader but defining jumps relatively allows them to be repeated jumping to different cells in each repeat. For example "r (m7 j-7+1)9 m7" plays 10 rows of 8 cells from top to bottom playing each row left to right. 

The language of turtle movement instructions can be summarised by the following context-free grammar:
$$
S \rightarrow Y \\
Y \rightarrow X |X\ Y \\
X \rightarrow (Y)z|I \\
I \rightarrow mz|R|Rz|A|D|jc|jPnPn \\
R \rightarrow l|r \\
A \rightarrow n|e|s|w \\
P \rightarrow +|- \\
D \rightarrow ppp|pp|p|mp|mf|f|ff|fff \\
\\
z \in \Z, n \in \N
$$
Notes are defined using scientific pitch notation. Empty cells are interpreted as rests. In order to create notes longer than a single cell, the character 's' in will sustain the note that came before it. This is used to create notes longer than the duration of a single cell. A cell can be divided time-wise into multiple notes by placing multiple notes separated by a comma into a cell. The motivation for this design decision was so the length each cell corresponds to is not bound by the length of the smallest note in the piece. For example, a piece defined primarily with crotchets (one unit) but with a single instance of a quaver (half a unit) and dotted crotchet (one and a half units) can define these two notes with "C4,C4" and "s" in two cells. Without this, representing this single quaver would require double the number of cells and introducing many additional "s" cells. 

### 2.4) Software Engineering

##### 2.1.1) Requirements

The success criteria of the project are as follows:

1. Implementation of an API for music playback within a spreadsheet allowing users to:
   - Play individual notes and chords and define their durations.
   - Defining multiple parts.
   - Play loops.
   - Define sequences of notes and chords and be able to call these for playback.
   - Define the tempo of playback.
2. Implementation of a converter from formal music notation to the spreadsheet representation.
3. Carry out participatory design sessions.
4. Usability testing for music generation implementation using participants who have gained familiarity with the system. 
5. Extensions:
   - Implement additional features as issues and requests arise from participatory design. 
   - Explore a compressive conversion from MIDI to Excello. 

##### 2.1.2) Tools and Technologies Used

Initial tests were written in Javascript in the Script Lab add-in for Excel. Excello was written in Typescript as this is readily compiled into the Javascript required to run the add-in but provides static type-checking. It also allows the large collection of existing Javascript libraries to be utilised. Using the Yeoman generator I created a blank Excel add-in project. This uses NodeJS to manage dependencies to other Javascript libraries. During development I ran the add-in on a localhost. To allow participants to run Excello on their own machines, I hosted a version of the add-in online using Surge. To run the add-in in Excel, a manifest.xml file is imported which instructs Excel where the add-in is hosted. 

The converter from MIDI to Excello was implemented in Python using Jupyter Notebooks. 

The tone.js library was used to synthesis and schedule sound production via the Web Audio API. The Javascript music theory library tonal was used to produce the notes that make up chords. This prevented the hardcoding of the intervals present in the 109 chords available. The Python library Mido was employed to read python files. All of these libraries have an MIT license. 

##### 2.1.3) Starting Point

Having used the Yeoman generator to create an empty Excel add-in, all of the code used to produce Excello and the MIDI converter is produced from scratch using the tools and technologies described above. 

I had prior experience writing Javascript only for simple web pages, never using Node or building a larger project. I had never used any of the libraries before therefore reviewing the documentation was required before and during development. I had gained significant experience with Python and Jupyter Notebooks from a summer internship. 

##### 2.1.4) Evaluation Practices

In order to best tune the design of Excello to the needs of potential users, formative evaluation sessions were carried out with participants. As a result, the project followed a spiral development methodology. Due to the number of participants involved and the timeframe of the project, there were only two major development iterations. The first prototype following the design described above, and the second fixing issues and implementing requests brought up by the participants. 

The users from the participatory design phase of the project were involved in summative evaluation at the end of the project. By using the same users, I could carry out tests using experienced users of Excello despite the product is not released in the public domain. 

### 2.4) MIDI files

Musicical Instrument Digital Interface (MIDI) details a communications protocol to connect electronic musical instruments with devices for playing, editing and recording music. A MIDI file consists of event messages describing on/off triggerings for a device or program to control audio \cite{huber:midimanual}. MIDI files were designed to be produced by MIDI controllers such as an electric keyboard. As such, a MIDI file contains a lot of controller specific information that is not necessary for the creation of an Excello file. There exist musical formats such as MusicXML that specific the musical notation and as such may be more suitable for conversion to Excello. The choice of MIDI was motivated by participants who wished to be able to integrate Excello in to their use of digital audio workstations such as Logic Pro, Ableton Live and GarageBand. 

Many musical programs support the importing and exporting of MIDI files. By allowing MIDI files to be converted to the Excello notation, Excello is more integrated into the environment of computer programs for playing, editing and composing music. Furthermore, there exist many datasets available for MIDI \cite{huang:deep} which can immediately be played back for comparison.