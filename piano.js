var q5 = new Q5();
q5.createCanvas(windowWidth, windowHeight);
const noteW = windowWidth / 8;
const dPerS = windowHeight / 2;
console.log("WIndow height is" + windowHeight);
console.log("WIndow width is" + windowWidth);
let pKeys = [];
createNote(0, 0, 1);
createNote(1, 1, 1);
createNote(2, 2, 1);
createNote(3, 3, 1);
createNote(4, 4, 1);
createNote(5, 5, 1);
createNote(6, 6, 1);
createNote(7, 7, 1);

class Note {
    constructor(n, time) {
        this.n = n;
        this.y = -time * dPerS;
        this.height = time * dPerS;
        this.active = 1;
    }
}
function createNote(n, start, time) {
    setTimeout(() => {
        const note = new Note(n, time);
        pKeys.push(note);
    }, start * 1000);
}

q5.draw = function () {
    background('white');
    const dy = deltaTime * dPerS / 1000;
    pKeys.forEach((note) => {
        if (note.active == 1) {
            note.y += dy;
            if (note.n < 8) {
                fill('black');
                rect(note.n * noteW, note.y, noteW, note.height);
                if (note.y > windowHeight) {
                    note.active = 0;
                    console.log(pKeys);
                }
                //console.log(note.y);
            } else {
                fill('grey');
                rect((note.n - 8) * noteW, note.y, noteW, note.height);
            }
        }
    });
    if (pKeys.length != 0 && pKeys[0].active == 0) {
        pKeys.shift();
    }
}


