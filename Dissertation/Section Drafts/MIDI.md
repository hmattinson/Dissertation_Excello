# MIDI

The following section shall document how the Python converter from a MIDI file to CSV file suitable for Excello playback works. A MIDI file is divided into up to 16 parallel channels \cite{midiSpec}. Each channel contains a series of messages defined using predefined status bytes and data bytes. I used the Python Mido library to read MIDI files and abstract away from the underlying byte representations. The onset and offset of notes are treated as two separate events with two separate messages \cite{midiSpec}. A note onset or offset message includes the note pitch and velocity, channel and time in ticks since the last message \cite{midoSpec}. The channel is not relevant for this conversion. Other messages define information not relevant for the conversion for Excello, but the message times must still be taken into account. 

The first step converts a list of messages to a list of notes defined by onset and offset time, pitch and velocity. For each track, the messages are iterated through, using the time value in every message to update a variable tracking time. This is performed for every message as piano pedal presses or meta messages have non-zero time. If the message defines a note onset, this is added to a dictionary mapping pitches to a list of currently active notes. Lists are used because a pitch can be active multiple times at once. For a note offset message, or onset message with zero velocity, the note popped from the active notes at that pitch has its end time added and then it is added to the list of all notes defined in the file. 

As each turtle can only define one note at a time, the notes are then split into separate lists such that no list contains two notes which are playing at the same time. As long as the list of notes is non empty, a new list is created. The first remaining note is added to the new note and removed from the list of all notes. The next remaining note starting after the previous note ends is added to this new list. All remaining notes are iterated over. The number of iterations required corresponds to the number of turtles required, $n​$.

It would be simple to have a tick correspond to a cell. With this, any combination of note onsets and offsets could be accurately represented in Excello. In order to achieve better compression, start and end times are converted to the cell number within the path of the turtle. For many MIDI files, the duration of a notes, will be different to the time it is notated to occupy. For example, a note immediately followed by another note may have an end time significantly less than the start time of the next note. As a result a method is required to account for this. For all notes, before separation into the streams for different turtles, the length of the notes in ticks and differences between consecutive start times are found. The minimum or modal values for these times are calculated depending on the level of compression giving the $lengthStat$ and $differenceStat$. 
$$
ratio = \max(lengthStat, differenceStat)/\min(lengthStat, differenceStat) \\
ratio_{int} = \lfloor ratio \rfloor \\
correction = ratio/ratio_{int}
$$
For each note, the times are adjusted as follows:
$$
length \gets (start - end) / lengthStat \text{ (rounded to the nearest 0.1)}\\
start \gets start / difference \times ratio_{int} \text{ (rounded to the nearest 0.1)}\\
end \gets start +length
$$
The next step converts the streams, with note start and end times corresponding to cells, into a CSV file to be run with Excello. The path for each turtle is an array of empty strings is initialised. The length of these arrays is the maximum end time for a note in any turtle, $T​$.  For each note the turtle plays, this is entered into the corresponding cell. MIDI defines pitch using the integers. I used the library audiolazy \footnote{audiolazy library} to convert from MIDI number to scientific pitch notation. If the velocity of the note if different to the previous note played by the turtle (or the first note played), the eight-bit velocity as defined by MIDI is mapped to the range [0,1] as used by Excello. If the note is greater than one cell, a sustain is placed in the following cells so the note will be the correct length. These paths go right starting in column A, with the first in row 2. 

Finally the definition of the turtle must be placed in the spreadsheet. The start cell range is 'A2:A$(n+1)$'. The movement instruction is "r m$T$". The MIDI file contains meta data for the tempo (milliseconds per beat) and ticks_per_beat. Cells per minute is calculated as follows:
$$
cells\ per\ tick \times ticks\ per\ beat \times beat\ per\ minute \\
= \frac{ratio_{int}}{mode\ difference} \times \texttt{ticks_per_beat} \times \frac{60 \times 10^6}{\texttt{tempo}}
$$
Using one as the number of repeats, the turtle definition is placed in cell A1 and the CSV exported. 