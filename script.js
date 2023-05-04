/*----- constants -----*/

// color guess options: [red, orange, yellow, green, blue, purple]
const guessColors = {
    '0': 'silver',
    '1': 'rgb(251, 143, 109)',
    '2': 'rgb(251, 231, 144)',
    '3': 'rgb(183, 215, 146)',
    '4': 'rgb(126, 189, 195)',
    '5': 'rgb(173, 156, 214)',
    '6': 'plum'
};
// correct or partially correct peg colors?
const pegColors = [null, 'red', 'black'];

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
// hints (four peg slots next to each guess - correct, somewhat correct, or wrong)
let hints;
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
// document.querySelector('#guessButton').addEventListener('click', /*function*/)
/*----- functions -----*/

// go back to starting screen when first visiting or refreshing page
start();
// define the start page function
function start() {
    // no guesses have been made
    guessNumber = 0
    guesses = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, // col 0
        0, 0, 0, 0, 0, 0, 0, 0, 0, // col 1
        0, 0, 0, 0, 0, 0, 0, 0, 0, // col 2
        0, 0, 0, 0, 0, 0, 0, 0, 0  // col 3
        // r0 r1 r2 r3 r4 r5 r6 r7 r8
    ]
    // no red or black pegs have been filled in
    hints = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 1
        //r0    r1    r2    r3    r4    r5    r6    r7    r8    r9   r10    r11   r12   r13   r14   r15   r16   r17
    ]
    // secret code is re-randomized and hidden
    /*for (color of codeBox) {
        color = color + (Math.floor(Math.random) * 6)
    }*/
    // renderCode();
    randomize0();
    randomize1();
    randomize2();
    randomize3();
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
/*function guessRed() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 1
    renderRed();
}*/
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
// when you click the guess button, if there are not four circles filled out, an alert of some kind will pop up and say 'guess needs to be four colors long' and it will not reveal the red and black hint pegs OR maybe instead, the guess button will be un-clickable or invisible until you have four colors filled in
// if the guess is four colors long, and you click the guess button,
// if the guess matches the secret code, the secret code is revealed and a message pops up and replaces the body, saying something like "you win! play again for another code" and reveals a play again button that re-renders the init board
// if the guess does not match the secret codem AND it is the 9th/last guess, the secret code is revealed and a message pops up saying something like, "you lose! sorry, try again" and reveals the play again button that re-renders the init board
// if the guess does not match the secret code, and it is NOT the 9th/last turn, black and red pegs are revealed in the right-side small four circle space - one black peg for each color that is in the correct space and the correct color, and one red peg for each color that is in the secret code, but in the wrong space

// render function for board, render color picked, revealing black and red pegs, win or lose message, secret code revealing, and guess button appearing?

// render board function

// render color picked function
function renderColor() {
    guesses.forEach(function (clrVal, Idx) {
        const cellId = `${Idx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = guessColors[clrVal]
    })
}

// function for revealing black and red pegs

// render win or lose message function

// secret code revealing function

// guess button appearing function