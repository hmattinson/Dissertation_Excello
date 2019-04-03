# Extra features implemented

### Dynamics in cell

*Dynamics in turtle makes it harder to extract the path that the turtle follows and to work out which volume different notes are played at. Hard to visualise / figure out where the dynamics should go within the turtle to correspond to different notes. No way to attach dynamics to first note.* 

Why in turtle initially. space then definition of note in the cell. Persists for following notes. 

Same notes can't be different volume but same turtles can be different volume. 

Manhattan

### Continuous dynamics

*Dynamic marking less intuitive + more limiting for just thinking in terms of how loud / quiet.* 

value between 0 and 1 with correspondence. Different order of magnitude to speed. 

### Absolute tempo

*Unsure if speed was e.g. 3x as fast or 3x as long. Relative tempo unhelpful for giving exact tempo. Dividing by 160 is unnecessary work.* 

Absolute cells per minute. Initially relative - phase composition. < 10 for backwards compatibility. 

### Custom Excel functions

*Forgot which arguments go where in the turtle. Would forget what the different arguments (speed, loops) are. Wasn't sure where to put spaces within the turtle instructions.*

Custom Excell.turtle instruction. Gives parameters. optional. Can reference other cells (global speed)

*User unfamiliar with actual note names and positions so had to count them manually ("Every good boy deserves food"). Have to rewrite out an entire section again if it's a modulation of an existing section. User thinks in terms of intervals not absolute notes when writing a melody.* 

Previous note and modulation. Drag fill. 

Is there something citable here. 

### Nested instructions with repeats

*Can be hard to parse what's going on in the turtle instruction if there is lots of letters and numbers. Instruction can also get quite long. - also solved by removing dynamics from turtle instructions.* *Repeating subsections would require repetition.*

### - as sustain

*"s" in turtle instruction was interpreted as sustain.*

Simple change remaining backwards capacity. 

### Where active turtles are

*Having clicked play he wasn't sure if it had been registered - plus Green button Seeing where turtle is would be nice. Knowing which cells are currently active is hard and requires scanning the entire sheet.* 

On playback displays the coordinates of the active turtles. 

### Proceed as far as there is music

*Counting path length required mental work and changing it every time notes are added is a pain.*

m*. Proceed to the last note in that line, can be intermediate rests. Explicit rest? Can now just add notes and play again. Why not an explicit stopping symbol. 

### Infer octave 

*Writing out the octave number every time is tedious given it stays the same a lot.*

### Chords

*Confusion over what the numbers for chords pertained to.* **Better labels**

*Hard to find the chord desired within all the available ones.* **Separated common chords**

*Chords were inputted the wrong way round compared to what people were used it.*  **Fixed chord order**

### Toggle activation

*Adding and removing the exclamation marks was time consuming and fiddly.  Turing off all turtles would be handy and is currently a slow process - Active turtle locations*

highlight area in spreadsheet, button toggles the activation of any turtles in that area. More of a problem for tutorial. 