import * as OfficeHelpers from '@microsoft/office-js-helpers';
import * as Tone from 'tone';
import {tryCatch} from '../src/index';

export async function insertChord() {
    await Excel.run(async (context) => {

        const selectedRange = context.workbook.getSelectedRange();
        selectedRange.load("values");

        // var sheetSelectHTMLElement = (document.getElementById("sheet_select")) as HTMLSelectElement;
        // var sheetChoice = sheetSelectHTMLElement.options[sheetSelectHTMLElement.selectedIndex].value;
        // const sheet: Excel.Range = context.workbook.worksheets.getItem(sheetChoice).getUsedRange();
        // sheet.load('values');

        await context.sync();

        console.log('Inserting Chord')
        console.log(`The range values "${selectedRange.address}".`);
    });
}
