import * as OfficeHelpers from '@microsoft/office-js-helpers';
import * as Tone from 'tone'

$("#run").click(() => tryCatch(run));
$("#stop").click(() => tryCatch(stop));

Tone.Transport.bpm.value = 120;

/**
 * Run when play button pressed. Starts playback of music
 */
async function run() {
    await Excel.run(async (context) => {

        const selectedRange = context.workbook.getSelectedRange();
        selectedRange.load("values");

        var sheetSelectHTMLElement = (document.getElementById("sheet_select")) as HTMLSelectElement;
        var sheetChoice = sheetSelectHTMLElement.options[sheetSelectHTMLElement.selectedIndex].value;
        const sheet: Excel.Range = context.workbook.worksheets.getItem(sheetChoice).getUsedRange();
        sheet.load('values');

        await context.sync();

        highlightSheet(sheet);

        Tone.Transport.start("+0.1");

        runTurtles(sheet.values);
        console.log(`The range values "${selectedRange.values}".`);
    });
}

/**
 * Stops music playback
 */
async function stop() {
    await Excel.run(async (context) => {
        Tone.Transport.stop();
        Tone.Transport.unsyncSignal();
        Tone.Transport.clear();
    });
}

/**
 * Returns if a string is a definition of a note. e.g. 'A4'
 * @param val Contents of a cell as a string
 * @return If val is a definition of a note
 */
function isNote(val: string): boolean {
    var re = new RegExp('^[A-Z](#|b|)[1-9]$');
    return re.test(val);
}

/**
 * Returns if a string is a definition of a turtle. e.g. '!turtle(A1, r m3, 0.5)'
 * @param val Contents of a cell as a string
 * @return If val is a definition of a turtle
 */
function isTurtle(val: string): boolean {
    var re = new RegExp('^(!turtle\().*(\))$');
    return re.test(val);
}

/**
 * Checks selected sheet for cells that can be highlighted
 * @param val Used range of the worksheet
 */
function highlightSheet(sheet: Excel.Range): void {
    var sheetVals = sheet.values;
    var rows = sheetVals.length;
    var cols = sheetVals[0].length;

    var row, col;

    for (row = 0; row < rows; row++){
        for (col = 0; col < cols; col++){
            var value = sheetVals[row][col]
                // Highlight notes red
                if (isNote(value)) {
                    sheet.getCell(row,col).format.fill.color = "#FFada5";
                }
                // Highlight turtles green
                else if (isTurtle(value)) {
                    sheet.getCell(row, col).format.fill.color = "#a8ffd0";
                }
                // Else remove highlighting
                else {
                    sheet.getCell(row, col).format.fill.clear();
                }
        }
    }
}

// May not be needed but if it's required to define timings more precisely for a sequence
function makeSeqWithTimes(values: string[]): [string, number][]{
    var len = values.length;
    var i: number = 0;
    var seq = new Array(len);

    for (i = 0; i <= len; i++) {
        seq[i] = ["0:" + i,values[i]];
    }

    return seq;
}

/**
 * Takes a list of notes and plays them via Tone
 * @param values List of notes as strings e.g. ['A4','A5']
 * @param speedFactor Multipication factor for playback speed
 * @return If val is a definition of a note
 */
function loopSequence(values: string[], speedFactor: number = 1): void {
    console.log(values);
    var synth = new Tone.PolySynth(4, Tone.Synth, {
        "volume" : -8,
        "oscillator" : {
            "partials" : [1, 2, 1],
        },
        "portamento" : 0.05
    }).toMaster();

    var seq = new Tone.Sequence(function (time, note) {
        synth.triggerAttackRelease(note, "8n", time);
    }, values, "8n").start();

    seq.playbackRate = speedFactor;
}

/**
 * Gives the index of the column of given letters
 * @param letters column e.g. AB
 * @return index of this column
 */
function lettersToNumber(letters: string): number {
    var num = 0, len = letters.length;
    letters = letters.toUpperCase();
    var i;
    for (i = 0; i < len; i++) {
        num += (letters.charCodeAt(num) - 64) * Math.pow(26, len - i - 1);
    }
    return num;
}

/**
 * Gives the index coordinates of a cell using Excel coordinates
 * @param letters cell position e.g. B1
 * @return coordinates with 0 indexing
 */
function getCellCoords(battleship: string): [number, number] {
    var x = battleship.match(/[a-zA-Z]+|[0-9]+/g);
    return [lettersToNumber(x[0]) - 1, +x[1] - 1];
}

/**
 * If a string is defining a change or direction for a turtle
 * @param s a string
 * @return if it is a turtle direction change definition
 */
function isDirChange(s: string): boolean {
    return RegExp(/^(r|l|n|e|s|w)$/).test(s);
}

/**
 * Next direction of a turtle given current direction and instruction
 * @param current current compass direction being faced
 * @param move next way to turn/look
 * @return direction facing after following instruction
 */
function dirChange(current: string, move: string): string {
    if (RegExp(/^(n|e|s|w)$/).test(move)) {
        return move;
    }
    else {
        // TODO: Check that the moves defined are legal
        if (move == 'r') {
            switch (current) {
                case 'n': return 'e';
                case 'e': return 's';
                case 's': return 'w';
                case 'w': return 'n';
            }
        }
        else {
            // move is l TODO: assert / make sure
            switch (current) {
                case 'n': return 'w';
                case 'e': return 'n';
                case 's': return 'e';
                case 'w': return 's';
        }
    }
    }    
}

/**
 * Given current coordinates and direction, return coordinates after step forwards
 * @param current current coordinates
 * @param dir compass direction turtle is facing
 * @return new coordinates of turtle
 */
function move(current: [number, number], dir: string): [number, number] {
    switch (dir) {
        case 'n': return [Math.max(current[0]-1,0), current[1]];
        case 'e': return [current[0], current[1]+1];
        case 's': return [current[0]+1, current[1]];
        case 'w': return [current[0], Math.max(current[1]-1,0)];
    } 
}

/**
 * Given current coordinates and direction, return coordinates after step forwards
 * @param current current coordinates
 * @param dir compass direction turtle is facing
 * @return new coordinates of turtle
 */
function getTurtleSequence(start: string, moves: string[], sheetVals: any[][]): string[] {

    var startCoords: [number, number] = getCellCoords(start);

    var notes: string[] = [sheetVals[startCoords[1]][startCoords[0]]];

    var dir: string = 'n';
    var pos: [number, number] = [startCoords[1],startCoords[0]];

    for (let entry of moves) {
        console.log(entry);
        if (isDirChange(entry)) {
            dir = dirChange(dir, entry);
        }
        else {
            var steps = entry.substring(1);
            var steps_int = +steps;
            console.log(steps_int);
            var i
            for (i = 0; i < steps_int; i++) {
                pos = move(pos, dir);
                var sheetVal = sheetVals[pos[0]][pos[1]];
                if (sheetVal == "") {
                    sheetVal = null;
                }
                notes.push(sheetVal);
            }
        }

    }
    // console.log(notes)
    return notes;
}

/**
 * Runs a turtle that plays the notes in the cells it passes through
 * @param instructions Instructions as defined by the user in the cell: !turtle(<instrutions>)
 * @param sheetVals The values in the used spreadsheet range
 */
function turtle(instructions: string, sheetVals: any[][]): void {

    var instructionsArray: string[] = instructions.split(',');
    var start: string = instructionsArray[0];
    var moves: string[] = instructionsArray[1].split(" ");
    var speedFactor: number = +instructionsArray[2].replace(/\s/g, "");
    
    var notes: string[] = getTurtleSequence(start, moves, sheetVals);
    loopSequence(notes, speedFactor);
}

/**
 * Finds all turtle declarations in the spreadsheet and runs them
 * @param sheetVals values in the spreadsheet
 */
function runTurtles(sheetVals: any[][]): void {
    var rows: number = sheetVals.length;
    var cols: number = sheetVals[0].length;

    var row: number, col: number;
    for (row = 0; row < rows; row++) {
        for (col = 0; col < cols; col++) {
            var value = sheetVals[row][col];
            if (isTurtle(value)) {
                var  instructions = value.substring(8, value.length - 1);
                turtle(instructions, sheetVals);
            }
        }
    }
}

/** Default helper for invoking an action and handling errors. */
async function tryCatch(callback) {
    try {
        await callback();
    }
    catch (error) {
        OfficeHelpers.UI.notify(error);
        OfficeHelpers.Utilities.log(error);
    }
}
