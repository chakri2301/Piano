var q5 = new Q5();
let synth = null;


q5.createCanvas(windowWidth, windowHeight);
//Width for the lane of each note
const noteW = windowWidth / 8;
// length of a 1 sec length note
const dPerS = windowHeight / 2;
// the yellow collector bar size
const collecterHeight = windowHeight * 0.02;

const notes = ["a", "s", "d", "f", "g", "h", "j", "k"];
//Keyboard mapping
const noteValues = {
    "a": "C4",
    "s": "D4",
    "d": "E4",
    "f": "F4",
    "g": "G4",
    "h": "A4",
    "j": "B4",
    "k": "C5"
}
console.log("WIndow height is" + windowHeight);
console.log("WIndow width is" + windowWidth);
// Tiles array
let pKeys = [];

function start() {
    const len = 0.5;
    const keys = [2, 1, 0, 1, 2, 2, 2, 1, 1, 1, 2, 4, 4, 2, 1, 0, 1, 2, 2, 2, 1, 1, 2, 1, 0];
    console.log(keys);
    keys.forEach((k, i) => {
        createNote(k, i * len, len * 0.8);
    });
    synth = new Tone.Synth().toDestination();
}
//Tiles class
class Note {
    constructor(n, time) {
        this.n = n;
        this.y = -time * dPerS;
        this.height = time * dPerS;
        this.active = 1;
    }
}
//Creates a node and sets play after 'start' seconds
function createNote(n, start, time) {
    setTimeout(() => {
        const note = new Note(n, time);
        pKeys.push(note);
    }, start * 1000);
}

q5.draw = function () {
    background('white');
    //collector
    fill('yellow');
    rect(0, windowHeight * 0.9, windowWidth, collecterHeight);
    const dy = deltaTime * dPerS / 1000;
    //tiles updater
    pKeys.forEach((note) => {
        if (note.active == 1) {
            note.y += dy;
            if (note.n < 8) {
                fill('black');
                rect(note.n * noteW + noteW * 0.05, note.y, noteW * 0.9, note.height);
                if (note.y > windowHeight) {
                    note.active = 0;
                }
            } else {
                fill('grey');
                rect((note.n - 8) * noteW, note.y, noteW, note.height);
            }
        }
    });
    //delete tiles out or screen
    if (pKeys.length != 0 && pKeys[0].active == 0) {
        pKeys.shift();
    }

    fill("green");
    // keyboard check
    notes.forEach((n, i) => {
        if (keyIsDown(n)) {
            rect(i * noteW, windowHeight * 0.9, noteW, collecterHeight);
        }
    });

}

function keyPressed(note) {
    //console.log(note.key);
    if (noteValues[note.key]) {
        synth.triggerAttackRelease(noteValues[note.key], "8n");
    } else {
        if (note.key == "q") {
            //start tiles
            start();
        }
    }
}