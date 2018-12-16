import * as OfficeHelpers from '@microsoft/office-js-helpers';
import * as Tone from 'tone'

$("#run").click(() => tryCatch(run));

// var CurValue = (<HTMLSelectElement>opt).value;
//create a synth and connect it to the master output (your speakers)

async function run() {
    await Excel.run(async (context) => {

        const range = 
        context.workbook.getSelectedRange();
        range.load("values");

        var sheetSelectHTMLElement = (document.getElementById("sheet_select")) as HTMLSelectElement;
        var sheetChoice = sheetSelectHTMLElement.options[sheetSelectHTMLElement.selectedIndex].value;
        const sheet = context.workbook.worksheets.getItem(sheetChoice).getUsedRange();
        sheet.load('values');

        await context.sync();

        highlightSheet(sheet)

        // PlaySound(range.values.toString().split(','))

        // var flattenedValues = range.values
        // if (flattenedValues.length > 1) { flattenedValues = [].concat(flattenedValues) }
        // else flattenedValues = flattenedValues[0]
        // loopSequence(flattenedValues, 1)

        console.log(sheet.values)
        // console.log('Getting turtle')
        // turtle("a1,r m11, 1", sheet.values);
        // turtle("a1,r m11, 1.02", sheet.values);
        runTurtles(sheet.values)
        console.log(`The range values "${range.values}".`);
    });
}

function isNote(val) {
    var re = new RegExp('^[A-Z](#|b|)[1-9]$');
    return re.test(val)
}

function isTurtle(val) {
    var re = new RegExp('^(!turtle\().*(\))$');
    return re.test(val)
}

function highlightSheet(sheet) {
    var sheetVals = sheet.values
    var rows = sheetVals.length
    var cols = sheetVals[0].length

    var row, col
    for (row = 0;
        row < rows;
        row++){
        for (col = 0;
            col < cols;
            col++){
            var value = sheetVals[row][col]
                if (isNote(value)) {
                    sheet.getCell(row,col).format.fill.color = "#FFada5";
                }
                if (isTurtle(value)) {
                    sheet.getCell(row, col).format.fill.color = "#a8ffd0";
                }
        }
    }
}

function PlaySound(cell_value) {

    console.log(`The cell contents is "${(cell_value)}".`);


    for (let i in cell_value) {
        console.log(i)
    }
    var synth = new Tone.Synth().toMaster();
    synth.triggerAttackRelease(cell_value[0], 0.5);
}

function makeSeqWithTimes(values) {
    var len = values.length
    var i: number = 0;
    var seq = new Array(len)

    for (i = 0; i <= len; i++) {
        seq[i] = ["0:" + i,values[i]]
    }

    return seq
}

function loopSequence(values, speedFactor) {
    // console.log(values)
    var synth = new Tone.Synth().toMaster();

    var seq = new Tone.Sequence(function (time, note) {
        synth.triggerAttackRelease(note, "8n", time);
    }, values, "8n").start();

    seq.playbackRate = speedFactor

    Tone.Transport.start("+0.1");
}

function lettersToNumber(letters) {
    var num = 0, len = letters.length;
    letters = letters.toUpperCase();
    var i;
    for (i = 0; i < len; i++) {
        num += (letters.charCodeAt(num) - 64) * Math.pow(26, len - i - 1);
    }
    return num;
}

function getCellCoords(battleship) {
    var x = battleship.match(/[a-zA-Z]+|[0-9]+/g)
    return [lettersToNumber(x[0]) - 1, +x[1] - 1];
}

function isDirChange(s) {
    return s.match(/^(r|l|n|e|s|w)$/)
}

function dirChange(current, move) {
    if (move.match(/^(n|e|s|w)$/)) {
        return move
    }
    else {
        // Assert
        if (move == 'r') {
            switch (current) {
                case 'n': return 'e'
                case 'e': return 's'
                case 's': return 'w'
                case 'w': return 'n'
            }
        }
        else {
            // move == 'l'
            switch (current) {
                case 'n': return 'w'
                case 'e': return 'n'
                case 's': return 'e'
                case 'w': return 's'
        }
    }
    }    
}

function move(current, dir) {
    switch (dir) {
        case 'n': return [Math.max(current[0]-1,0), current[1]]
        case 'e': return [current[0], current[1]+1]
        case 's': return [current[0]+1, current[1]]
        case 'w': return [current[0], Math.max(current[1]-1,0)]
    } 
}

function getTurtleSequence(start, moves, sheetVals) {

    var startCoords = getCellCoords(start)
    // console.log(startCoords)

    var notes = [sheetVals[startCoords[1]][startCoords[0]]]
    // console.log(notes)
    // console.log(moves.length)

    var dir = 'n'
    var pos = [startCoords[1],startCoords[0]]

    for (let entry of moves) {
        console.log(entry);
        if (isDirChange(entry)) {
            dir = dirChange(dir, entry)

        }
        else {
            var steps = entry.substring(1)
            var steps_int = +steps
            console.log(steps_int)
            var i
            for (i = 0; i < steps_int; i++) {
                pos = move(pos, dir)
                notes.push(sheetVals[pos[0]][pos[1]])
            }
        }

    }
    // console.log(notes)
    return notes
}

function turtle(instructions, sheetVals) {

    var instructionsArray = instructions.split(',')
    var start = instructionsArray[0]
    var moves = instructionsArray[1].split(" ")
    var speedFactor = +instructionsArray[2].replace(/\s/g, "");
    
    var notes = getTurtleSequence(start, moves, sheetVals)
    loopSequence(notes, speedFactor)
}

function runTurtles(sheetVals) {
    var rows = sheetVals.length
    var cols = sheetVals[0].length

    var row, col
    for (row = 0; row < rows; row++) {
        for (col = 0; col < cols; col++) {
            var value = sheetVals[row][col]
            if (isTurtle(value)) {
              var  instructions = value.substring(8, value.length - 1)
                turtle(instructions, sheetVals)
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
