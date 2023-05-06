/*----- constants -----*/

// color guess options: red, yellow, green, teal, purple, magenta
const guessColors = {
    '0': 'silver',
    '1': 'rgb(251, 143, 109)',
    '2': 'rgb(251, 231, 144)',
    '3': 'rgb(183, 215, 146)',
    '4': 'rgb(126, 189, 195)',
    '5': 'rgb(173, 156, 214)',
    '6': 'plum'
};
// correct or partially correct peg colors
const pegColors = ['silver', 'white', 'black'];

/*----- state variables -----*/

// guess number (out of 9, starts at 0)
let guessNumber;
// guesses (starts with gray or empty circles, will be filled in one row at a time, starting at bottom, with every guess)
let guesses = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, // col 0
    0, 0, 0, 0, 0, 0, 0, 0, 0, // col 1
    0, 0, 0, 0, 0, 0, 0, 0, 0, // col 2
    0, 0, 0, 0, 0, 0, 0, 0, 0  // col 3
// r0 r1 r2 r3 r4 r5 r6 r7 r8
];
let guessesIdx = 0;
// hints (four peg slots next to each guess - correct, somewhat correct, or wrong)
let hints;
let code1hints = [];
// secret code box (covered while playing, slides open or reveals when guessed correctly, or 9 guesses have been made - whichever comes first)
let codeBox = [0, 0, 0, 0];
// win or loss?
let outcome;

/*----- cached elements  -----*/

// colors to select (buttons that will fill in first available empty board space with that color when clicked)
// const colorButtons = [...document.querySelectorAll('#colors > button')];
const redButton = document.querySelector('#red');
const yellowButton = document.querySelector('#yellow');
const greenButton = document.querySelector('#green');
const tealButton = document.querySelector('#teal');
const purpleButton = document.querySelector('#purple');
const magentaButton = document.querySelector('#magenta');

// const secretCode = [...document.querySelectorAll('#secretCode > div')];
const secretCode0 = document.querySelector('#code0');
const secretCode1 = document.querySelector('#code1');
const secretCode2 = document.querySelector('#code2');
const secretCode3 = document.querySelector('#code3');

const guessButton = document.querySelector('#guessButton');

const playAgainButton = document.querySelector('#playAgainButton');

/*----- event listeners -----*/

// when colored buttons on bottom are clicked, fill in first available empty board space with that color
redButton.addEventListener('click', guessRed)
yellowButton.addEventListener('click', guessYellow)
greenButton.addEventListener('click', guessGreen)
tealButton.addEventListener('click', guessTeal)
purpleButton.addEventListener('click', guessPurple)
magentaButton.addEventListener('click', guessMagenta)
// colorButtons.addEventListener('click', guessColor)
// when instructions drop-down is clicked, instructions will drop down, filling out left side of page

// when you click on one of the circles filled in on the top row on the board (guess currently being made), the color will be removed (if you decided to play a different color)

// when you click the 'guess' button, the red and black pegs will appear depending on how good the guess was
guessButton.addEventListener('click', guessCode)

// when you click on the 'play again' button, the game is re-started with a new code
playAgainButton.addEventListener('click', start)

/*----- functions -----*/

// go back to starting screen when first visiting or refreshing page
start();
// define the start page function
function start() {
    // no guesses have been made
    guessNumber = 0
    guesses = [
        0, 0, 0, 0, // r0
        0, 0, 0, 0, // r1
        0, 0, 0, 0, // r2
        0, 0, 0, 0, // r3
        0, 0, 0, 0, // r4
        0, 0, 0, 0, // r5
        0, 0, 0, 0, // r6
        0, 0, 0, 0, // r7
        0, 0, 0, 0  // r8
    //  c0 c1 c2 c3 
    ]
    emptyGuesses();
    // no white or black pegs have been filled in
    hints = [
        0, 0, 0, 0, // guess 1 hints
        0, 0, 0, 0, // guess 2 hints
        0, 0, 0, 0, // guess 3 hints
        0, 0, 0, 0, // guess 4 hints
        0, 0, 0, 0, // guess 5 hints
        0, 0, 0, 0, // guess 6 hints
        0, 0, 0, 0, // guess 7 hints
        0, 0, 0, 0, // guess 8 hints
        0, 0, 0, 0  // guess 9 hints
    ]
    emptyHints();
    // secret code is re-randomized and hidden
    /*for (color of codeBox) {
        color = color + (Math.floor(Math.random) * 6)
    }*/
    // renderCode();
    randomize0();
    randomize1();
    randomize2();
    randomize3();
    // hideSecretCode();
}

function emptyGuesses() {
    guesses.forEach(function (clrVal, Idx) {
        const cellId = `${Idx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = guessColors[clrVal]
    })
}

function emptyHints() {
    hints.forEach(function (clrVal, Idx) {
        const cellId = `${Idx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = guessColors[clrVal]
    })
}

function randomize0() {
    codeBox[0] = Math.floor(Math.random() * 6 + 1)
    renderCode0();
}

function randomize1() {
    codeBox[1] = Math.floor(Math.random() * 6 + 1)
    renderCode1();
}

function randomize2() {
    codeBox[2] = Math.floor(Math.random() * 6 + 1)
    renderCode2();
}

function randomize3() {
    codeBox[3] = Math.floor(Math.random() * 6 + 1)
    renderCode3();
}

function hideSecretCode() {
    secretCode0.style.visibility = 'hidden'
    secretCode1.style.visibility = 'hidden'
    secretCode2.style.visibility = 'hidden'
    secretCode3.style.visibility = 'hidden'
}

// function renderCode() {
    /*for (color of codeBox) {
        color = color + (Math.floor(Math.random) * 6)
    }*/
    /*codeBox.forEach(function (clrVal, Idx) {
        const cellId = `code${Idx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = guessColors[clrVal]
    })
}*/

function renderCode0() {
    const cellEl = document.getElementById('code0');
    cellEl.style.backgroundColor = guessColors[codeBox[0]]
}

function renderCode1() {
    const cellEl = document.getElementById('code1');
    cellEl.style.backgroundColor = guessColors[codeBox[1]]
}

function renderCode2() {
    const cellEl = document.getElementById('code2');
    cellEl.style.backgroundColor = guessColors[codeBox[2]]
}

function renderCode3() {
    const cellEl = document.getElementById('code3');
    cellEl.style.backgroundColor = guessColors[codeBox[3]]
}

// when you click a color on the bottom, the first available empty space on the board is filled in with that color
function guessRed() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 1
    renderColor();
}

function guessYellow() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 2
    renderColor();
}

function guessGreen() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 3
    renderColor();
}

function guessTeal() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 4
    renderColor();
}

function guessPurple() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 5
    renderColor();
}

function guessMagenta() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 6
    renderColor();
}

function guessCode() {
    /*guessCode1();
    guessCode2();
    guessCode3();
    guessCode4();
    guessCode5();
    guessCode6();
    guessCode7();
    guessCode8();
    guessCode9();*/
    if (guesses.indexOf(!0) % 4) {
        // if the guess matches the secret code, the secret code is revealed and a message pops up and replaces the body, saying something like "you win! play again for another code" and reveals a play again button that re-renders the init board
        if (guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+2] === codeBox[2] && guesses[guessesIdx+3] === codeBox[3]) {
            revealSecretCode();
            setTimeout(()=> alert('You win! Play again for another code.'), 500)
        }
        // if the guess does not match the secret codem AND it is the 9th/last guess, the secret code is revealed and a message pops up saying something like, "you lose! sorry, try again" and reveals the play again button that re-renders the init board
        else if (guesses[35] !== 0) {
            revealSecretCode();
            setTimeout(()=> alert('You lose! Sorry, try again.'), 500)
        }
        // if the guess does not match the secret code, and it is NOT the 9th/last turn, black and white pegs are revealed in the right-side small four circle space - one black peg for each color that is in the correct space and the correct color, and one white peg for each color that is in the secret code, but in the wrong space
        else if (
            (guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+2] === codeBox[2]) || 
            (guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+3] === codeBox[3]) || 
            (guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+2] === codeBox[2] && guesses[guessesIdx+3] === codeBox[3]) ||
            (guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+2] === codeBox[2] && guesses[guessesIdx+3] === codeBox[3])) {
            /*if (guesses[0] === codeBox[0] || guesses[guessesIdx+1] === codeBox[1] || guesses[guessesIdx+2] === codeBox[2] || guesses[guessesIdx+3] === codeBox[3]) {
                renderHint1();
            }*/
            // code1hints.push(codeBox.filter((idx) => (guesses[idx] === codeBox[idx])))
            render3BlackHint();
        }
        /*else if (
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+1] === codeBox[1]) && (codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+2] === codeBox[2]) && (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+3] === codeBox[3]) && (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2]))) ||
            ((guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+2] === codeBox[2]) && (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+3] === codeBox[3]) && (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+2]))) ||
            ((guesses[guessesIdx+2] === codeBox[2] && guesses[guessesIdx+3] === codeBox[3]) && (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1])))) {
            render2Black2WhiteHint();
        }*/
        else if (
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+1] === codeBox[1]) &&
            (guesses[guessesIdx+2] !== codeBox[0]) && (guesses[guessesIdx+2] !== codeBox[1]) && (guesses[guessesIdx+3] !== codeBox[0]) && (guesses[guessesIdx+2] !== codeBox[1]) &&
            (codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+2] === codeBox[2]) &&
            (guesses[guessesIdx+1] !== codeBox[0]) && (guesses[guessesIdx+1] !== codeBox[2]) && (guesses[guessesIdx+3] !== codeBox[0]) && (guesses[guessesIdx+3] !== codeBox[2]) &&
            (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+3] === codeBox[3]) &&
            (guesses[guessesIdx+1] !== codeBox[0]) && (guesses[guessesIdx+1] !== codeBox[3]) && (guesses[guessesIdx+2] !== codeBox[0]) && (guesses[guessesIdx+2] !== codeBox[3]) &&
            (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2]))) ||
            ((guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+2] === codeBox[2]) &&
            (guesses[guessesIdx] !== codeBox[1]) && (guesses[guessesIdx] !== codeBox[2]) && (guesses[guessesIdx+3] !== codeBox[1]) && (guesses[guessesIdx+3] !== codeBox[2]) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+3] === codeBox[3]) &&
            (guesses[guessesIdx] !== codeBox[1]) && (guesses[guessesIdx] !== codeBox[3]) && (guesses[guessesIdx+2] !== codeBox[1]) && (guesses[guessesIdx+2] !== codeBox[3]) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+2]))) ||
            ((guesses[guessesIdx+2] === codeBox[2] && guesses[guessesIdx+3] === codeBox[3]) &&
            (guesses[guessesIdx] !== codeBox[2]) && (guesses[guessesIdx] !== codeBox[3]) && (guesses[guessesIdx+1] !== codeBox[2]) && (guesses[guessesIdx+1] !== codeBox[3]) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1])))) {
            render2Black2WhiteHint();
        }
        /*else if (
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+1] === codeBox[1]) && (codeBox.includes(guesses[guessesIdx+2]) || codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+2] === codeBox[2]) && (codeBox.includes(guesses[guessesIdx+1]) || codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+3] === codeBox[3]) && (codeBox.includes(guesses[guessesIdx+1]) || codeBox.includes(guesses[guessesIdx+2]))) ||
            ((guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+2] === codeBox[2]) && (codeBox.includes(guesses[guessesIdx]) || codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+3] === codeBox[3]) && (codeBox.includes(guesses[guessesIdx]) || codeBox.includes(guesses[guessesIdx+2]))) ||
            ((guesses[guessesIdx+2] === codeBox[2] && guesses[guessesIdx+3] === codeBox[3]) && (codeBox.includes(guesses[guessesIdx]) || codeBox.includes(guesses[guessesIdx+1])))) {
            render2Black1WhiteHint();
        }*/
        else if (
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+1] === codeBox[1]) &&
            (guesses[guessesIdx+2] !== codeBox[0]) && (guesses[guessesIdx+2] !== codeBox[1]) && (guesses[guessesIdx+3] !== codeBox[0]) && (guesses[guessesIdx+2] !== codeBox[1]) &&
            (codeBox.includes(guesses[guessesIdx+2]) || codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+2] === codeBox[2]) &&
            (guesses[guessesIdx+1] !== codeBox[0]) && (guesses[guessesIdx+1] !== codeBox[2]) && (guesses[guessesIdx+3] !== codeBox[0]) && (guesses[guessesIdx+3] !== codeBox[2]) &&
            (codeBox.includes(guesses[guessesIdx+1]) || codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+3] === codeBox[3]) &&
            (guesses[guessesIdx+1] !== codeBox[0]) && (guesses[guessesIdx+1] !== codeBox[3]) && (guesses[guessesIdx+2] !== codeBox[0]) && (guesses[guessesIdx+2] !== codeBox[3]) &&
            (codeBox.includes(guesses[guessesIdx+1]) || codeBox.includes(guesses[guessesIdx+2]))) ||
            ((guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+2] === codeBox[2]) &&
            (guesses[guessesIdx] !== codeBox[1]) && (guesses[guessesIdx] !== codeBox[2]) && (guesses[guessesIdx+3] !== codeBox[1]) && (guesses[guessesIdx+3] !== codeBox[2]) &&
            (codeBox.includes(guesses[guessesIdx]) || codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+3] === codeBox[3]) &&
            (guesses[guessesIdx] !== codeBox[1]) && (guesses[guessesIdx] !== codeBox[3]) && (guesses[guessesIdx+2] !== codeBox[1]) && (guesses[guessesIdx+2] !== codeBox[3]) &&
            (codeBox.includes(guesses[guessesIdx]) || codeBox.includes(guesses[guessesIdx+2]))) ||
            ((guesses[guessesIdx+2] === codeBox[2] && guesses[guessesIdx+3] === codeBox[3]) &&
            (guesses[guessesIdx] !== codeBox[2]) && (guesses[guessesIdx] !== codeBox[3]) && (guesses[guessesIdx+1] !== codeBox[2]) && (guesses[guessesIdx+1] !== codeBox[3]) &&
            (codeBox.includes(guesses[guessesIdx]) || codeBox.includes(guesses[guessesIdx+1])))) {
            render2Black1WhiteHint();
        }
        else if (
            (guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+1] === codeBox[1]) ||
            (guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+2] === codeBox[2]) ||
            (guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+3] === codeBox[3]) ||
            (guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+2] === codeBox[2]) ||
            (guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+3] === codeBox[3]) ||
            (guesses[guessesIdx+2] === codeBox[2] && guesses[guessesIdx+3] === codeBox[3])) {
            render2BlackHint();
        }
        /*else if (
            ((guesses[guessesIdx] === codeBox[0]) && (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+1] === codeBox[1]) && (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+2] === codeBox[2]) && (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+3] === codeBox[3]) && (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2])))) {
            render1Black3WhiteHint();
        }*/
        else if (
            ((guesses[guessesIdx] === codeBox[0]) &&
            (guesses[guessesIdx+1] !== codeBox[0]) &&
            (guesses[guessesIdx+2] !== codeBox[0]) &&
            (guesses[guessesIdx+3] !== codeBox[0]) &&
            (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+1] === codeBox[1]) &&
            (guesses[guessesIdx] !== codeBox[1]) &&
            (guesses[guessesIdx+2] !== codeBox[1]) &&
            (guesses[guessesIdx+3] !== codeBox[1]) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+2] === codeBox[2]) &&
            (guesses[guessesIdx+0] !== codeBox[2]) &&
            (guesses[guessesIdx+1] !== codeBox[2]) &&
            (guesses[guessesIdx+3] !== codeBox[2]) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+3] === codeBox[3]) &&
            (guesses[guessesIdx] !== codeBox[3]) &&
            (guesses[guessesIdx+1] !== codeBox[3]) &&
            (guesses[guessesIdx+2] !== codeBox[3]) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2])))) {
            render1Black3WhiteHint();
        }
        else if (
            ((guesses[guessesIdx] === codeBox[0]) &&
            (guesses[guessesIdx+1] !== codeBox[0]) &&
            (guesses[guessesIdx+2] !== codeBox[0]) &&
            (guesses[guessesIdx+3] !== codeBox[0]) &&
            ((codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2])) ||
            (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+3])) ||
            (codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3])))) ||
            ((guesses[guessesIdx+1] === codeBox[1]) &&
            (guesses[guessesIdx] !== codeBox[1]) &&
            (guesses[guessesIdx+2] !== codeBox[1]) &&
            (guesses[guessesIdx+3] !== codeBox[1]) &&
            ((codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+2])) ||
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+3])) ||
            (codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3])))) ||
            ((guesses[guessesIdx+2] === codeBox[2]) &&
            (guesses[guessesIdx+0] !== codeBox[2]) &&
            (guesses[guessesIdx+1] !== codeBox[2]) &&
            (guesses[guessesIdx+3] !== codeBox[2]) &&
            ((codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1])) ||
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+3])) ||
            (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2])))) ||
            ((guesses[guessesIdx+3] === codeBox[3]) &&
            (guesses[guessesIdx] !== codeBox[3]) &&
            (guesses[guessesIdx+1] !== codeBox[3]) &&
            (guesses[guessesIdx+2] !== codeBox[3]) &&
            ((codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1])) ||
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+2])) ||
            (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2]))))) {
            render1Black2WhiteHint();
        }
        else if (
            ((guesses[guessesIdx] === codeBox[0]) &&
            (guesses[guessesIdx+1] !== codeBox[0]) &&
            (guesses[guessesIdx+2] !== codeBox[0]) &&
            (guesses[guessesIdx+3] !== codeBox[0]) &&
            (codeBox.includes(guesses[guessesIdx+1]) || codeBox.includes(guesses[guessesIdx+2]) || codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+1] === codeBox[1]) &&
            (guesses[guessesIdx] !== codeBox[1]) &&
            (guesses[guessesIdx+2] !== codeBox[1]) &&
            (guesses[guessesIdx+3] !== codeBox[1]) &&
            (codeBox.includes(guesses[guessesIdx]) || codeBox.includes(guesses[guessesIdx+2]) || codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+2] === codeBox[2]) &&
            (guesses[guessesIdx+0] !== codeBox[2]) &&
            (guesses[guessesIdx+1] !== codeBox[2]) &&
            (guesses[guessesIdx+3] !== codeBox[2]) &&
            (codeBox.includes(guesses[guessesIdx]) || codeBox.includes(guesses[guessesIdx+1]) || codeBox.includes(guesses[guessesIdx+3]))) ||
            ((guesses[guessesIdx+3] === codeBox[3]) &&
            (guesses[guessesIdx] !== codeBox[3]) &&
            (guesses[guessesIdx+1] !== codeBox[3]) &&
            (guesses[guessesIdx+2] !== codeBox[3]) &&
            (codeBox.includes(guesses[guessesIdx]) || codeBox.includes(guesses[guessesIdx+1]) || codeBox.includes(guesses[guessesIdx+2])))) {
            render1Black1WhiteHint();
        }
        else if (guesses[guessesIdx] === codeBox[0] || guesses[guessesIdx+1] === codeBox[1] || guesses[guessesIdx+2] === codeBox[2] || guesses[guessesIdx+3] === codeBox[3]) {
            render1BlackHint();
        }
        else if (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3])) {
            render4WhiteHint();
        }
        else if (
            ((guesses[guessesIdx+3] !== codeBox[0]) && (guesses[guessesIdx+3] !== codeBox[1]) && (guesses[guessesIdx+3] !== codeBox[2]) && (guesses[guessesIdx+3] !== codeBox[3])) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2])) ||
            ((guesses[guessesIdx+2] !== codeBox[0]) && (guesses[guessesIdx+2] !== codeBox[1]) && (guesses[guessesIdx+2] !== codeBox[2]) && (guesses[guessesIdx+2] !== codeBox[3])) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+3])) ||
            ((guesses[guessesIdx+1] !== codeBox[0]) && (guesses[guessesIdx+1] !== codeBox[1]) && (guesses[guessesIdx+1] !== codeBox[2]) && (guesses[guessesIdx+1] !== codeBox[3])) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3])) ||
            ((guesses[guessesIdx] !== codeBox[0]) && (guesses[guessesIdx] !== codeBox[1]) && (guesses[guessesIdx] !== codeBox[2]) && (guesses[guessesIdx] !== codeBox[3])) &&
            (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3]))) {
            render3WhiteHint();
        }
        else if (
            ((guesses[guessesIdx+2] !== codeBox[0]) && (guesses[guessesIdx+3] !== codeBox[0]) && (guesses[guessesIdx+2] !== codeBox[1]) && (guesses[guessesIdx+3] !== codeBox[1])) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+1])) ||
            ((guesses[guessesIdx+1] !== codeBox[0]) && (guesses[guessesIdx+3] !== codeBox[0]) && (guesses[guessesIdx+1] !== codeBox[2]) && (guesses[guessesIdx+3] !== codeBox[2])) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+2])) ||
            ((guesses[guessesIdx+1] !== codeBox[0]) && (guesses[guessesIdx+2] !== codeBox[0]) && (guesses[guessesIdx+1] !== codeBox[3]) && (guesses[guessesIdx+2] !== codeBox[3])) &&
            (codeBox.includes(guesses[guessesIdx]) && codeBox.includes(guesses[guessesIdx+3])) ||
            ((guesses[guessesIdx] !== codeBox[1]) && (guesses[guessesIdx+3] !== codeBox[1]) && (guesses[guessesIdx] !== codeBox[2]) && (guesses[guessesIdx+3] !== codeBox[2])) &&
            (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+2])) ||
            ((guesses[guessesIdx] !== codeBox[1]) && (guesses[guessesIdx+2] !== codeBox[1]) && (guesses[guessesIdx] !== codeBox[3]) && (guesses[guessesIdx+2] !== codeBox[3])) &&
            (codeBox.includes(guesses[guessesIdx+1]) && codeBox.includes(guesses[guessesIdx+3])) ||
            ((guesses[guessesIdx] !== codeBox[2]) && (guesses[guessesIdx+1] !== codeBox[2]) && (guesses[guessesIdx] !== codeBox[3]) && (guesses[guessesIdx+1] !== codeBox[3])) &&
            (codeBox.includes(guesses[guessesIdx+2]) && codeBox.includes(guesses[guessesIdx+3]))) {
            render2WhiteHint();
        }
        else if (
            
            codeBox.includes(guesses[guessesIdx]) ||
            
            codeBox.includes(guesses[guessesIdx+1]) ||
            
            codeBox.includes(guesses[guessesIdx+2]) ||
            
            codeBox.includes(guesses[guessesIdx+3])) {
            render1WhiteHint();
        }
        guessesIdx +=4
    }
}

// function guessCode1() {
// when you click the guess button, if there are not four circles filled out, an alert of some kind will pop up and say 'guess needs to be four colors long' and it will not reveal the red and black hint pegs OR maybe instead, the guess button will be un-clickable or invisible until you have four colors filled in
    // if ((guesses.indexOf(!0) - 1)
// if the guess is four colors long, and you click the guess button
    /*if (guesses.indexOf(!0) % 4) {
        // if the guess matches the secret code, the secret code is revealed and a message pops up and replaces the body, saying something like "you win! play again for another code" and reveals a play again button that re-renders the init board
        if (guesses[0] === codeBox[0] && guesses[1] === codeBox[1] && guesses[2] === codeBox[2] && guesses[3] === codeBox[3]) {
            alert('You win! Play again for another code.')
        }*/
        // if the guess does not match the secret codem AND it is the 9th/last guess, the secret code is revealed and a message pops up saying something like, "you lose! sorry, try again" and reveals the play again button that re-renders the init board
        /*else if {

        }*/
        // if the guess does not match the secret code, and it is NOT the 9th/last turn, black and white pegs are revealed in the right-side small four circle space - one black peg for each color that is in the correct space and the correct color, and one white peg for each color that is in the secret code, but in the wrong space
        /*else if (
            (guesses[0] === codeBox[0] && guesses[1] === codeBox[1] && guesses[2] === codeBox[2]) || 
            (guesses[0] === codeBox[0] && guesses[1] === codeBox[1] && guesses[3] === codeBox[3]) || 
            (guesses[0] === codeBox[0] && guesses[2] === codeBox[2] && guesses[3] === codeBox[3]) ||
            (guesses[1] === codeBox[1] && guesses[2] === codeBox[2] && guesses[3] === codeBox[3])) {*/
            /*if (guesses[0] === codeBox[0] || guesses[1] === codeBox[1] || guesses[2] === codeBox[2] || guesses[3] === codeBox[3]) {
                renderHint1();
            }*/
            // code1hints.push(codeBox.filter((idx) => (guesses[idx] === codeBox[idx])))
            // render3BlackHint1();
        //}
        /*else if (
            ((guesses[0] === codeBox[0] && guesses[1] === codeBox[1]) && (codeBox.includes(guesses[2]) && codeBox.includes(guesses[3]))) ||
            ((guesses[0] === codeBox[0] && guesses[2] === codeBox[2]) && (codeBox.includes(guesses[1]) && codeBox.includes(guesses[3]))) ||
            ((guesses[0] === codeBox[0] && guesses[3] === codeBox[3]) && (codeBox.includes(guesses[1]) && codeBox.includes(guesses[2]))) ||
            ((guesses[1] === codeBox[1] && guesses[2] === codeBox[2]) && (codeBox.includes(guesses[0]) && codeBox.includes(guesses[3]))) ||
            ((guesses[1] === codeBox[1] && guesses[3] === codeBox[3]) && (codeBox.includes(guesses[0]) && codeBox.includes(guesses[2]))) ||
            ((guesses[2] === codeBox[2] && guesses[3] === codeBox[3]) && (codeBox.includes(guesses[0]) && codeBox.includes(guesses[1])))) {
            render2Black2WhiteHint1();
        }
        else if (
            ((guesses[0] === codeBox[0] && guesses[1] === codeBox[1]) && (codeBox.includes(guesses[2]) || codeBox.includes(guesses[3]))) ||
            ((guesses[0] === codeBox[0] && guesses[2] === codeBox[2]) && (codeBox.includes(guesses[1]) || codeBox.includes(guesses[3]))) ||
            ((guesses[0] === codeBox[0] && guesses[3] === codeBox[3]) && (codeBox.includes(guesses[1]) || codeBox.includes(guesses[2]))) ||
            ((guesses[1] === codeBox[1] && guesses[2] === codeBox[2]) && (codeBox.includes(guesses[0]) || codeBox.includes(guesses[3]))) ||
            ((guesses[1] === codeBox[1] && guesses[3] === codeBox[3]) && (codeBox.includes(guesses[0]) || codeBox.includes(guesses[2]))) ||
            ((guesses[2] === codeBox[2] && guesses[3] === codeBox[3]) && (codeBox.includes(guesses[0]) || codeBox.includes(guesses[1])))) {
            render2Black1WhiteHint1();
        }
        else if (
            (guesses[0] === codeBox[0] && guesses[1] === codeBox[1]) ||
            (guesses[0] === codeBox[0] && guesses[2] === codeBox[2]) ||
            (guesses[0] === codeBox[0] && guesses[3] === codeBox[3]) ||
            (guesses[1] === codeBox[1] && guesses[2] === codeBox[2]) ||
            (guesses[1] === codeBox[1] && guesses[3] === codeBox[3]) ||
            (guesses[2] === codeBox[2] && guesses[3] === codeBox[3])) {
            render2BlackHint1();
        }
        else if (
            ((guesses[0] === codeBox[0]) && (codeBox.includes(guesses[1]) && codeBox.includes(guesses[2]) && codeBox.includes(guesses[3]))) ||
            ((guesses[1] === codeBox[1]) && (codeBox.includes(guesses[0]) && codeBox.includes(guesses[2]) && codeBox.includes(guesses[3]))) ||
            ((guesses[2] === codeBox[2]) && (codeBox.includes(guesses[0]) && codeBox.includes(guesses[1]) && codeBox.includes(guesses[3]))) ||
            ((guesses[3] === codeBox[3]) && (codeBox.includes(guesses[0]) && codeBox.includes(guesses[1]) && codeBox.includes(guesses[2])))) {
            render1Black3WhiteHint1();
        }
        else if (
            ((guesses[0] === codeBox[0]) &&
            ((codeBox.includes(guesses[1]) && codeBox.includes(guesses[2])) ||
            (codeBox.includes(guesses[1]) && codeBox.includes(guesses[3])) ||
            (codeBox.includes(guesses[2]) && codeBox.includes(guesses[3])))) ||
            ((guesses[1] === codeBox[1]) &&
            ((codeBox.includes(guesses[0]) && codeBox.includes(guesses[2])) ||
            (codeBox.includes(guesses[0]) && codeBox.includes(guesses[3])) ||
            (codeBox.includes(guesses[2]) && codeBox.includes(guesses[3]))))
            ((guesses[2] === codeBox[2]) &&
            ((codeBox.includes(guesses[0]) && codeBox.includes(guesses[1])) ||
            (codeBox.includes(guesses[0]) && codeBox.includes(guesses[3])) ||
            (codeBox.includes(guesses[1]) && codeBox.includes(guesses[2]))))
            ((guesses[3] === codeBox[3]) &&
            ((codeBox.includes(guesses[0]) && codeBox.includes(guesses[1])) ||
            (codeBox.includes(guesses[0]) && codeBox.includes(guesses[2])) ||
            (codeBox.includes(guesses[1]) && codeBox.includes(guesses[2]))))) {
            render1Black2WhiteHint1();
        }
        else if (
            guesses[0] === codeBox[0] ||
            guesses[1] === codeBox[1] ||
            guesses[2] === codeBox[2] ||
            guesses[3] === codeBox[3]) {
            // one black one white
        }
        else if (guesses[0] === codeBox[0] || guesses[1] === codeBox[1] || guesses[2] === codeBox[2] || guesses[3] === codeBox[3]) {
            render1BlackHint1();
        }
        else if (codeBox.includes(guesses[0]) && codeBox.includes(guesses[1]) && codeBox.includes(guesses[2]) && codeBox.includes(guesses[3])) {
            render4WhiteHint1();
        }*/
        /*else if () {
            // three white
        }
        else if () {
            // two white
        }
        else if () {
            // one white
        }
        else {
            // no hints; no correct colors were guessed
        }*/
    //}
//}

/*function guessCode2() {
    if (guesses.indexOf(!0) % 4) {
        if (guesses[4] === codeBox[0] && guesses[5] === codeBox[1] && guesses[6] === codeBox[2] && guesses[7] === codeBox[3]) {
            alert('You win! Play again for another code.')
        }
        else {
            if (guesses[0] === codeBox[0] || guesses[1] === codeBox[1] || guesses[2] === codeBox[2] || guesses[3] === codeBox[3]) {
                renderHint0();
            }
        }
    }
}

function guessCode3() {
    if (guesses.indexOf(!0) % 4) {
        if (guesses[8] === codeBox[0] && guesses[9] === codeBox[1] && guesses[10] === codeBox[2] && guesses[11] === codeBox[3]) {
            alert('You win! Play again for another code.')
        }
        else {
            if (guesses[0] === codeBox[0] || guesses[1] === codeBox[1] || guesses[2] === codeBox[2] || guesses[3] === codeBox[3]) {
                renderHint0();
            }
        }
    }
}

function guessCode4() {
    if (guesses.indexOf(!0) % 4) {
        if (guesses[12] === codeBox[0] && guesses[13] === codeBox[1] && guesses[14] === codeBox[2] && guesses[15] === codeBox[3]) {
            alert('You win! Play again for another code.')
        }
        else {
            if (guesses[0] === codeBox[0] || guesses[1] === codeBox[1] || guesses[2] === codeBox[2] || guesses[3] === codeBox[3]) {
                renderHint0();
            }
        }
    }
}

function guessCode5() {
    if (guesses.indexOf(!0) % 4) {
        if (guesses[16] === codeBox[0] && guesses[17] === codeBox[1] && guesses[18] === codeBox[2] && guesses[19] === codeBox[3]) {
            alert('You win! Play again for another code.')
        }
        else {
            if (guesses[0] === codeBox[0] || guesses[1] === codeBox[1] || guesses[2] === codeBox[2] || guesses[3] === codeBox[3]) {
                renderHint0();
            }
        }
    }
}

function guessCode6() {
    if (guesses.indexOf(!0) % 4) {
        if (guesses[20] === codeBox[0] && guesses[21] === codeBox[1] && guesses[22] === codeBox[2] && guesses[23] === codeBox[3]) {
            alert('You win! Play again for another code.')
        }
        else {
            if (guesses[0] === codeBox[0] || guesses[1] === codeBox[1] || guesses[2] === codeBox[2] || guesses[3] === codeBox[3]) {
                renderHint0();
            }
        }
    }
}

function guessCode7() {
    if (guesses.indexOf(!0) % 4) {
        if (guesses[24] === codeBox[0] && guesses[25] === codeBox[1] && guesses[26] === codeBox[2] && guesses[27] === codeBox[3]) {
            alert('You win! Play again for another code.')
        }
        else {
            if (guesses[0] === codeBox[0] || guesses[1] === codeBox[1] || guesses[2] === codeBox[2] || guesses[3] === codeBox[3]) {
                renderHint0();
            }
        }
    }
}

function guessCode8() {
    if (guesses.indexOf(!0) % 4) {
        if (guesses[28] === codeBox[0] && guesses[29] === codeBox[1] && guesses[30] === codeBox[2] && guesses[31] === codeBox[3]) {
            alert('You win! Play again for another code.')
        }
        else {
            if (guesses[0] === codeBox[0] || guesses[1] === codeBox[1] || guesses[2] === codeBox[2] || guesses[3] === codeBox[3]) {
                renderHint0();
            }
        }
    }
}

function guessCode9() {
    if (guesses.indexOf(!0) % 4) {
        if (guesses[32] === codeBox[0] && guesses[33] === codeBox[1] && guesses[34] === codeBox[2] && guesses[35] === codeBox[3]) {
            alert('You win! Play again for another code.')
        }
        else {
            if (guesses[0] === codeBox[0] || guesses[1] === codeBox[1] || guesses[2] === codeBox[2] || guesses[3] === codeBox[3]) {
                renderHint0();
            }
        }
    }
}
*/
// render function for board, render color picked, revealing black and white pegs, win or lose message, secret code revealing, and guess button appearing?

// render board function

// render color picked function
function renderColor() {
    guesses.forEach(function (clrVal, Idx) {
        const cellId = `${Idx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = guessColors[clrVal]
    })
}

// function for revealing black and white pegs
/*function renderHint1() {
    hints.forEach(function (clrVal, Idx) {
        const cellId = `${Idx}guess`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = guessColors[clrVal]
    })
}*/

function render3BlackHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[2]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[2]
    const cell2 = document.getElementById(`${guessesIdx+2}guess`);
    cell2.style.backgroundColor = pegColors[2]
}

function render2Black2WhiteHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[2]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[2]
    const cell2 = document.getElementById(`${guessesIdx+2}guess`);
    cell2.style.backgroundColor = pegColors[1]
    const cell3 = document.getElementById(`${guessesIdx+3}guess`);
    cell3.style.backgroundColor = pegColors[1]
}

function render2Black1WhiteHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[2]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[2]
    const cell2 = document.getElementById(`${guessesIdx+2}guess`);
    cell2.style.backgroundColor = pegColors[1]
}

function render2BlackHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[2]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[2]
}

function render1Black3WhiteHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[2]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[1]
    const cell2 = document.getElementById(`${guessesIdx+2}guess`);
    cell2.style.backgroundColor = pegColors[1]
    const cell3 = document.getElementById(`${guessesIdx+3}guess`);
    cell3.style.backgroundColor = pegColors[1]
}

function render1Black2WhiteHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[2]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[1]
    const cell2 = document.getElementById(`${guessesIdx+2}guess`);
    cell2.style.backgroundColor = pegColors[1]
}

function render1Black1WhiteHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[2]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[1]
}

function render1BlackHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[2]
}

function render4WhiteHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[1]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[1]
    const cell2 = document.getElementById(`${guessesIdx+2}guess`);
    cell2.style.backgroundColor = pegColors[1]
    const cell3 = document.getElementById(`${guessesIdx+3}guess`);
    cell3.style.backgroundColor = pegColors[1]
}

function render3WhiteHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[1]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[1]
    const cell2 = document.getElementById(`${guessesIdx+2}guess`);
    cell2.style.backgroundColor = pegColors[1]
}

function render2WhiteHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[1]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[1]
}

function render1WhiteHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[1]
}
// render win or lose message function

// secret code revealing function
function revealSecretCode() {
    secretCode0.style.visibility = 'visible'
    secretCode1.style.visibility = 'visible'
    secretCode2.style.visibility = 'visible'
    secretCode3.style.visibility = 'visible'
}

// guess button appearing function

// play again button appearing function
// playAgainBtn.style.visibility = winner ? 'visible' : 'hidden'