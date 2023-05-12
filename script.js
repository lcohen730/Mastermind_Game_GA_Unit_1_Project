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
// secret code box (covered while playing, slides open or reveals when guessed correctly, or 9 guesses have been made - whichever comes first)
let codeBox = [0, 0, 0, 0];
// win or loss?
// let outcome;

/*----- cached elements  -----*/

const instructions = document.querySelector('#instructions');
const instructionsCloseButton = document.querySelector('#instructionsClose');
const instructionsH3 = document.querySelector('#instructionsClose > h3');
const instructionsP = document.querySelector('#instructionsClose > p');
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
const guessButtonContainer = document.querySelector('#guessButtonContainer');

const outcome = document.querySelector('#outcome');

const playAgainButtonContainer = document.querySelector('#playAgainButtonContainer');
const playAgainButton = document.querySelector('#playAgainButton');

const originalColorsHTML = document.querySelector('#colors');

/*----- event listeners -----*/

// when instructions drop-down is clicked, instructions will drop down, filling out left side of page
instructions.addEventListener('click', instructionsDrop)
instructionsCloseButton.addEventListener('click', instructionsClose)
// when colored buttons on bottom are clicked, fill in first available empty board space with that color
redButton.addEventListener('click', guessRed)
yellowButton.addEventListener('click', guessYellow)
greenButton.addEventListener('click', guessGreen)
tealButton.addEventListener('click', guessTeal)
purpleButton.addEventListener('click', guessPurple)
magentaButton.addEventListener('click', guessMagenta)
redButton.addEventListener('click', revealGuessButton)
yellowButton.addEventListener('click', revealGuessButton)
greenButton.addEventListener('click', revealGuessButton)
tealButton.addEventListener('click', revealGuessButton)
purpleButton.addEventListener('click', revealGuessButton)
magentaButton.addEventListener('click', revealGuessButton)
// colorButtons.addEventListener('click', guessColor)

// when you click on one of the circles filled in on the top row on the board (guess currently being made), the color will be removed (if you decided to play a different color)

// when you click the 'guess' button, the red and black pegs will appear depending on how good the guess was
guessButton.addEventListener('click', guessCode)

// when you click on the 'play again' button, the game is re-started with a new code
playAgainButton.addEventListener('click', restart)

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
    /*hints = [
        0, 0, 0, 0, // guess 1 hints
        0, 0, 0, 0, // guess 2 hints
        0, 0, 0, 0, // guess 3 hints
        0, 0, 0, 0, // guess 4 hints
        0, 0, 0, 0, // guess 5 hints
        0, 0, 0, 0, // guess 6 hints
        0, 0, 0, 0, // guess 7 hints
        0, 0, 0, 0, // guess 8 hints
        0, 0, 0, 0  // guess 9 hints
    ]*/
    hints = []
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
    hideSecretCode();
    hidePlayAgain();
    hideGuessButton();
    console.log(codeBox)
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

function hidePlayAgain() {
    playAgainButton.style.visibility = 'hidden'
    playAgainButtonContainer.style.visibility = 'hidden'
}

function hideGuessButton() {
    guessButton.style.visibility = 'hidden'
    guessButtonContainer.style.visibility = 'hidden'
}

function revealGuessButton() {
    if (guesses.indexOf(0) === guessesIdx+4 || guesses[35] !== 0) {
        guessButton.style.visibility = 'visible'
        guessButtonContainer.style.visibility = 'visible'
        /*colors.innerHTML =
        `<div id="redDiv"></div>
        <div id="yellowDiv"></div>
        <div id="greenDiv"></div>
        <div id="tealDiv"></div>
        <div id="purpleDiv"></div>
        <div id="magentaDiv"></div>`
        const redDiv = document.querySelector('#redDiv');
        const yellowDiv = document.querySelector('#yellowDiv');
        const greenDiv = document.querySelector('#greenDiv');
        const tealDiv = document.querySelector('#tealDiv');
        const purpleDiv = document.querySelector('#purpleDiv');
        const magentaDiv = document.querySelector('#magentaDiv');
        redDiv.style.backgroundColor = 'rgb(250, 177, 154)'
        redDiv.style.borderRadius = '50%'
        redDiv.style.width = '36px'
        redDiv.style.height = '36px'
        redDiv.style.border = '2px solid gray'
        yellowDiv.style.backgroundColor = 'rgb(251, 241, 195)'
        yellowDiv.style.borderRadius = '50%'
        yellowDiv.style.width = '36px'
        yellowDiv.style.height = '36px'
        yellowDiv.style.border = '2px solid gray'
        greenDiv.style.backgroundColor = 'rgb(203, 215, 189)'
        greenDiv.style.borderRadius = '50%'
        greenDiv.style.width = '36px'
        greenDiv.style.height = '36px'
        greenDiv.style.border = '2px solid gray'
        tealDiv.style.backgroundColor = 'rgb(169, 192, 194)'
        tealDiv.style.borderRadius = '50%'
        tealDiv.style.width = '36px'
        tealDiv.style.height = '36px'
        tealDiv.style.border = '2px solid gray'
        purpleDiv.style.backgroundColor = 'rgb(207, 205, 213)'
        purpleDiv.style.borderRadius = '50%'
        purpleDiv.style.width = '36px'
        purpleDiv.style.height = '36px'
        purpleDiv.style.border = '2px solid gray'
        magentaDiv.style.backgroundColor = 'rgb(221, 208, 221)'
        magentaDiv.style.borderRadius = '50%'
        magentaDiv.style.width = '36px'
        magentaDiv.style.height = '36px'
        magentaDiv.style.border = '2px solid gray'*/
    }
    /*else {
        colors.innerHTML = originalColorsHTML
    }*/
}

function restart() {
    location.reload();
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

function instructionsDrop() {
    instructions.innerHTML = 
    `<h3>How to Play</h3>
    <ol>
        <li>Guess a combination of colors by clicking on the colors in the order you want your guess.</li>
        <li>The game will fill in empty peg slots with a black peg for the amount of colors you guessed correct
            color and correct location and a white peg for amount of colors you guessed correct color but wrong
            location.</li>
        <li>Using logic, determine what to guess next and make your next several guesses (up to 9) to figure out
            what the secret code of colors is.</li>
        <li>If you guess the secret code in 9 moves or less, you win! If not, you lose.</li>
    </ol>`
    instructions.style.height = '550px'
    instructions.style.fontSize = '14px'
    instructionsCloseButton.style.visibility = 'visible'
}

function instructionsClose() {
    instructions.innerHTML = 
    `<h3>How to Play</h3>
    <p>Click to View Instructions</p>`
    instructions.style.height = '85px'
    instructions.style.fontSize = '16px'
    /*instructionsH3.style.fontSize = '20px'
    instructionsP.style.fontSize = '16px'*/
    instructionsCloseButton.style.visibility = 'hidden'
}

// when you click a color on the bottom, the first available empty space on the board is filled in with that color
function guessRed() {
    /*if (guessButton.style.visibility = 'visible') {
        return;
    }*/
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
    guessButton.style.visibility = 'hidden'
    guessButtonContainer.style.visibility = 'hidden'
    if (guesses.indexOf(!0) % 4) {
        // if the guess matches the secret code, the secret code is revealed and a message pops up and replaces the body, saying something like "you win! play again for another code" and reveals a play again button that re-renders the init board
        if (guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+2] === codeBox[2] && guesses[guessesIdx+3] === codeBox[3]) {
            revealSecretCode();
            setTimeout(()=> {
                outcome.style.visibility = 'visible'
                outcome.innerHTML = '<strong>You win!</strong><br>Play again for another code.'
                outcome.style.fontSize = '30px'
                outcome.style.textAlign = 'center'
                outcome.style.fontFamily = '"Courier New", Courier, monospace'
                outcome.style.paddingTop = '23px'
                playAgainButton.style.visibility = 'visible'
                playAgainButtonContainer.style.visibility = 'visible'
                }, 500)
        }
        // if the guess does not match the secret code AND it is the 9th/last guess, the secret code is revealed and a message pops up saying something like, "you lose! sorry, try again" and reveals the play again button that re-renders the init board
        else if (guesses[35] !== 0) {
            revealSecretCode();
            setTimeout(()=> {
                outcome.style.visibility = 'visible'
                outcome.style.backgroundColor = 'rgb(215, 141, 141)'
                outcome.innerHTML = '<strong>You lose!</strong><br>Sorry, try again.'
                outcome.style.fontSize = '30px'
                outcome.style.textAlign = 'center'
                outcome.style.fontFamily = '"Courier New", Courier, monospace'
                outcome.style.paddingTop = '23px'
                playAgainButton.style.visibility = 'visible'
                playAgainButtonContainer.style.visibility = 'visible'
                }, 500)
        }
        // if the guess does not match the secret code, and it is NOT the 9th/last turn, black and white pegs are revealed in the right-side small four circle space - one black peg for each color that is in the correct space and the correct color, and one white peg for each color that is in the secret code, but in the wrong space
        else {
            const leftoverCodeBox = [...codeBox];
            for(let i = guessesIdx; i < (guessesIdx+4); i++) {
                const indexOfI = leftoverCodeBox.indexOf(guesses[i])
                if(guesses[i] === codeBox[(i%4)]) {
                    hints.push(2)
                    leftoverCodeBox.splice(indexOfI, 1)
                }
            }
            for(let i = guessesIdx; i < (guessesIdx+4); i++) {
                const indexOfI = leftoverCodeBox.indexOf(guesses[i])
                if(guesses[i] === codeBox[(i%4)]) {
                    continue;
                }
                else if (leftoverCodeBox.includes(guesses[i])) {
                    hints.push(1)
                    leftoverCodeBox.splice(indexOfI, 1)
                }
            }
            for(let i = 0; i < leftoverCodeBox.length; i++) {
                if (!leftoverCodeBox.includes(guesses[guessesIdx]) || 
                !leftoverCodeBox.includes(guesses[guessesIdx+1]) ||
                !leftoverCodeBox.includes(guesses[guessesIdx+2]) ||
                !leftoverCodeBox.includes(guesses[guessesIdx+3])) {
                    hints.push(0)
                }
            }
            //console.log('hints after empties', hints)
            //const thisGuessArr = hints.splice(guessesIdx, 4)
            //thisGuessArr.sort(sortHints);
            //console.log('this guess hints sorted', thisGuessArr)
            renderHint();
        }
        guessesIdx +=4
    }
}

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

function sortHints (a, b) {
    return b - a;
}

function renderHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    cell0.style.backgroundColor = pegColors[hints[guessesIdx]]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[hints[guessesIdx+1]]
    const cell2 = document.getElementById(`${guessesIdx+2}guess`);
    cell2.style.backgroundColor = pegColors[hints[guessesIdx+2]]
    const cell3 = document.getElementById(`${guessesIdx+3}guess`);
    cell3.style.backgroundColor = pegColors[hints[guessesIdx+3]]
}

/*function renderHint() {
    hints.forEach(function (guessesIdx, Idx) {
        const cellId = `${Idx}guess`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = pegColors[hints[guessesIdx]]
        guessesIdx+=1
    })
    for(let i = guessesIdx; i < (guessesIdx+4); i++) {
        const cellId = `${i}guess`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = pegColors[hints[i]]
    }
}*/

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