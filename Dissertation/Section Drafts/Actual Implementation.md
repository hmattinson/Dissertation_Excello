# Actual Excello Implementation

In this section I shall discuss the underlying implementation of the final prototype following the participatory design. Excello consists of two main parts. The first, and larger, is the implementation of the turtle system for playing music that has been defined in the grid. The second is the method by which the notes of chords can be inserted into the grid. 

When the play button in the add-in window is pressed, the turtle definitions within the grid are identified. For each turtle that is identified, the starting cell and movement instructions are used to establish the contents of the cells which it passes through. Along with the speed parameter, this is converted to a series of note definitions - pitch, start time, duration, volume. This is built in a format such that the Tone.js library can then be used to schedule and initiate playback. An overview of the data flow and subtasks required to create the musical playback is show in figure\ref{fig:overview}

Diagram

The drop-down menu for sheet selection is populated with the current sheets in the workbook. When a user presses play, the cell values from the selected sheet are loaded using the Office API. An extension of the Tone instrument class is a Sampler. This interpolates between a set of pitched samples to create notes of arbitrary pitch and length. The Salamander piano sample pack includes four pitches (out of a possible 12) per octave. This allows for accurate interpolation whilst reducing loading times and storage requirements. 