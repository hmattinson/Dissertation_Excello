# Evaluation

This chapter shall discuss the effectiveness of the Excello implementation with regards to the success criteria and by showcasing examples. The conversion of an existing MIDI corpus to the Excello notation using the converter from MIDI will demonstrate the expressiveness of the notation. Next I shall explain the summative evaluation and use the data from this to assess the features implemented in the participatory design process and to reason about Excello using the Cognitive Dimensions of Notation framework \cite{blackwell:tutorial}. Finally, the ethics and data handling procedures shall be covered.

### Excello Success **

Both a notation for music expression and a program integrated into Excel for the playback of this expression has been implemented. As required by the success criteria, users can play multiple notes and chords of different durations. These can be combined into looped sequences with a defined tempo. In the participatory design process additional features were added as extensions. Defining multiple successive notes in a cell, turtles calculating how far they should move and nested instructions with repeats are additional features facilitating more efficient notation. Custom Excel functions, a chord adding tool and faster turtle toggling allows users to work more efficiently. Figure \ref{fig:franz} shows Excello in use with participant's arrangement. 

![Screenshot 2019-04-20 at 19.40.13](/Users/henrymattinson/Desktop/Screenshots/Screenshot 2019-04-20 at 20.12.47.png)

The first section of Piano Phase by Steve Reich consists of two equal piano melodies, one slightly faster than the other. The two parts move out of phase before aligning at different offsets. This is included as an example for many end-user programming tools. This is implemented in Manhattan using three rows of 24 columns \cite{nash:manhattan} as shown in figure \reg{fig:manhattanPhase}. Sonic Pi defined the notes in one line and eight additional lines are required for playback as shown in \ref{fig:sonicPiPhase}. Piano Phase can not be concisely notated by western staff notation. Excello only requires two cells to define two turtles of different speeds in addition to the notes. This more efficient notation is shown in figure \ref{fig:excelloPhase}.

![Screenshot 2019-04-20 at 20.25.34](/Users/henrymattinson/Desktop/Screenshots/Screenshot 2019-04-20 at 20.25.34.png)

![Screenshot 2019-04-20 at 20.25.09](/Users/henrymattinson/Desktop/Screenshots/Screenshot 2019-04-20 at 20.25.09.png)

![Screenshot 2019-04-20 at 20.51.44](/Users/henrymattinson/Desktop/Screenshots/Screenshot 2019-04-20 at 20.51.44.png)

### MIDI Corpus Conversion

Whilst being able concisely notate music western notation and other end-user programming systems do not facilitate, Excello can exactly express any combination of concurrent note onset and offsets. Therefore any piece defined in MIDI can be expressed in Excello. In MIDI allows tempo can be redefined within a track, this is not be accounted for. If instead the time between note onsets and offsets is adjusted, the uncompressed file will account for this but compressing algorithm will fail as the difference between notes may become a non-integer multiple of the minimum. Instrument specific effects such as piano pedals are not supported. This naive conversion can result in unwieldy spreadsheet sizes. One conversion method compresses the representation by dividing the difference between notes by the minimum difference in not onset between any two notes. Provided the difference between any two notes is a multiple of the minimum difference, this compression method is lossless, whilst resulting in spreadsheets using orders of magnitude fewer cells. Therefore this method would not accurately convert quavers against triplets (three notes played in the same time as two) provided these notes were not multiples of a smaller note. Given the lengths of MIDI notes can be different to the time the note occupies in notation, to automate the compression, an assumption on the ratio of note lengths was required. The modal compression algorithm is lossy if the minimum note distance is not the modal distance. This is useful if there are ornaments or note within a piece that dramatically decrease the minimum distance but occur infrequently. Therefore their loss may be tolerable for a more efficient representation. 

I have converted three MIDI corpora. The first is a collection of 497 Bach chorales\footnote{accessed from <https://github.com/jamesrobertlloyd/infinite-bach/tree/master/data/chorales/midi>} made by Margaret Greentree. The second is 277 piano pieces\footnote{<http://piano-midi.de/midis.htm>} help by Bernd Krueger  under a creative commons license. Finally 194 Bach pieces made available from "A Johann Sebastian Bach Midi Page"\footnote{<http://www.bachcentral.com/midiindex.html>}. This is not all the files available from this site as some were not readable by the python MIDI reader. All 968 MIDI files were converted using all three methods.

The language of Excello is expressive enough to represent MIDI files and can do so concisely provided the condition of minimum note onset differences is maintained. 

### Summative Evaluation Sessions

Of the 21 users who participated in formative evaluation, 19 had continued using Excello. These users all filled out a summative evaluation questionnaire. First a review of the features that had been added since the initial sessions was given. To ensure users had a sufficient understanding of the interface before giving feedback, a short transcription task involving some original composition by the users was given. 

The questionnaire first assessed the success of the features added during the participatory design process by comparing the interface before and after a feature had been added. Seven-point Lichard scale questions were given to test if the issues had been solved and if overall the change rendered the system more preferable. The remaining questions were based on Blackwell and Green's cognitive dimensions questionnaire \cite{blackwell:questionnaire}. Cognitive dimensions of notations can be used to analyse musical notation \cite{blackwell:notation} in addition to software systems \cite{green:cdn}, therefore it is a suitable tool for the discussion of the Excello notation and interface. Because dimensions have different significances for the different activities\cite{blackwell:tutorial}, users identified what percentage of their time they spent carrying out the five different user activities (searching for information, translating, incrementation, modification and exploratory design). Questions focusing on closeness of mapping, consistency, secondary notation, viscosity and visibility were used as planned in the project proposal. Usage and cognitive dimensions questions were also answered with respect to the user's preferred interface for music manipulation, composition or transcription. 12 users chose Sibelius, which shall be used for comparison. 

### Success of Participatory Design

Dynamics in Cell

Inferred octave

Nested Instructions

Active turtles

Continuous Volume

Automatic stepping

Absolute tempo