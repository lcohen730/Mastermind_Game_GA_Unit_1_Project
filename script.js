// huge thanks to the Connect Four game and general guide to building a browser game for helping me get started

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

// guesses (starts with gray or empty circles, will be filled in one row at a time, starting at bottom, with every guess)
let guesses = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, // col 0
    0, 0, 0, 0, 0, 0, 0, 0, 0, // col 1
    0, 0, 0, 0, 0, 0, 0, 0, 0, // col 2
    0, 0, 0, 0, 0, 0, 0, 0, 0  // col 3
// r0 r1 r2 r3 r4 r5 r6 r7 r8
];
// start counting guesses index with column 0, row 0 (this variable will increase by four so that every guess starts with column zero)
let guessesIdx = 0;
// hints (four peg slots next to each guess - correct, somewhat correct, or wrong)
let hints;
// secret code box (covered while playing, slides open or reveals when guessed correctly, or 9 guesses have been made - whichever comes first)
let codeBox = [0, 0, 0, 0];

/*----- cached elements  -----*/

// elements for instructions box
const instructions = document.querySelector('#instructions');
const instructionsCloseButton = document.querySelector('#instructionsClose');
const instructionsH3 = document.querySelector('#instructionsClose > h3');
const instructionsP = document.querySelector('#instructionsClose > p');
// colors to select (buttons that will fill in first available empty board space with that color when clicked)
// const colorButtons = [...document.querySelectorAll('#colors > button')] did not work, so all colors are selected below
const redButton = document.querySelector('#red');
const yellowButton = document.querySelector('#yellow');
const greenButton = document.querySelector('#green');
const tealButton = document.querySelector('#teal');
const purpleButton = document.querySelector('#purple');
const magentaButton = document.querySelector('#magenta');
// const secretCode = [...document.querySelectorAll('#secretCode > div')] did not work so each color for the secret code is selected below
const secretCode0 = document.querySelector('#code0');
const secretCode1 = document.querySelector('#code1');
const secretCode2 = document.querySelector('#code2');
const secretCode3 = document.querySelector('#code3');
// guess button elements
const guessButton = document.querySelector('#guessButton');
const guessButtonContainer = document.querySelector('#guessButtonContainer');
// win or lose pop-up box
const outcome = document.querySelector('#outcome');
// play again button elements
const playAgainButtonContainer = document.querySelector('#playAgainButtonContainer');
const playAgainButton = document.querySelector('#playAgainButton');

const originalColorsHTML = document.querySelector('#colors');

/*----- event listeners -----*/

// when instructions drop-down is clicked, instructions will drop down, filling out left side of page
instructions.addEventListener('click', instructionsDrop)
// when caret button is clicked, isntructions will close up
instructionsCloseButton.addEventListener('click', instructionsClose)
// when colored buttons on bottom are clicked, the guess function for that color is called
redButton.addEventListener('click', guessRed)
yellowButton.addEventListener('click', guessYellow)
greenButton.addEventListener('click', guessGreen)
tealButton.addEventListener('click', guessTeal)
purpleButton.addEventListener('click', guessPurple)
magentaButton.addEventListener('click', guessMagenta)
// when colored buttons are clicked, the reveal guess button function is called
redButton.addEventListener('click', revealGuessButton)
yellowButton.addEventListener('click', revealGuessButton)
greenButton.addEventListener('click', revealGuessButton)
tealButton.addEventListener('click', revealGuessButton)
purpleButton.addEventListener('click', revealGuessButton)
magentaButton.addEventListener('click', revealGuessButton)
// when you click the 'guess' button, the guess code function is called
guessButton.addEventListener('click', guessCode)
// when you click on the 'play again' button, the game is re-started with a new code
playAgainButton.addEventListener('click', restart)

/*----- functions -----*/

// go back to starting screen when first visiting or refreshing page
start();
// define the start page function
function start() {
    // no guesses have been made
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
    // no white or black pegs have been filled in
    hints = []
    // secret code is re-randomized and hidden
    randomize0();
    randomize1();
    randomize2();
    randomize3();
    hideSecretCode();
    // play again and guess buttons are hidden
    hidePlayAgain();
    hideGuessButton();
}

function randomize0() {
    // syntax from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
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
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    // if the first 0 in the guesses array is a multiple of four or you have filled out the colors for your ninth guess
    if (guesses.indexOf(0) === guessesIdx+4 || guesses[35] !== 0) {
        // reveal the guess button so it can be clicked
        guessButton.style.visibility = 'visible'
        guessButtonContainer.style.visibility = 'visible'
    }
}

function restart() {
    // https://www.w3schools.com/jsref/met_loc_reload.asp
    location.reload();
}

function renderCode0() {
    const cellEl = document.getElementById('code0');
    // the first circle in the secret code will be filled in with the associated key for the value of that color in the guessColors object
    cellEl.style.backgroundColor = guessColors[codeBox[0]]
}

function renderCode1() {
    const cellEl = document.getElementById('code1');
    // the second circle in the secret code will be filled in with the associated key for the value of that color in the guessColors object
    cellEl.style.backgroundColor = guessColors[codeBox[1]]
}

function renderCode2() {
    const cellEl = document.getElementById('code2');
    // the third circle in the secret code will be filled in with the associated key for the value of that color in the guessColors object
    cellEl.style.backgroundColor = guessColors[codeBox[2]]
}

function renderCode3() {
    const cellEl = document.getElementById('code3');
    // the fourth circle in the secret code will be filled in with the associated key for the value of that color in the guessColors object
    cellEl.style.backgroundColor = guessColors[codeBox[3]]
}

function instructionsDrop() {
    instructions.innerHTML = 
    `<h3>How to Play</h3>
    <ol>
        <li>Guess a combination of colors by clicking on the colors in the order you want your guess, then click the guess button to lock in your guess.</li>
        <li>The game will fill in the four empty peg slots to the right of your guess with a black peg for every color you guessed correctly
            in the correct location and a white peg for every color you guessed correctly but in the wrong location.</li>
        <li>Using logic, determine what to guess next and make your next several guesses (up to 9) to figure out
            what the secret code of colors is.</li>
        <li>If you guess the secret code in 9 moves or less, you win! If not, you lose.</li>
    </ol>`
    instructions.style.height = '550px'
    instructions.style.fontSize = '14px'
    // reveals a close button to the right of the instructions
    instructionsCloseButton.style.visibility = 'visible'
}

function instructionsClose() {
    // instructions returns to original box's html and hides the closing arrow button
    instructions.innerHTML = 
    `<h3>How to Play</h3>
    <p>Click to View Instructions</p>`
    instructions.style.height = '85px'
    instructions.style.fontSize = '16px'
    instructionsCloseButton.style.visibility = 'hidden'
}
// the first 0 in the guesses array becomes a 1
function guessRed() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 1
    renderColor();
}
// the first 0 in the guesses array becomes a 2
function guessYellow() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 2
    renderColor();
}
// the first 0 in the guesses array becomes a 3
function guessGreen() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 3
    renderColor();
}
// the first 0 in the guesses array becomes a 4
function guessTeal() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 4
    renderColor();
}
// the first 0 in the guesses array becomes a 5
function guessPurple() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 5
    renderColor();
}
// the first 0 in the guesses array becomes a 6
function guessMagenta() {
    const guessesIdx = guesses.indexOf(0);
    guesses[guessesIdx] = 6
    renderColor();
}

function guessCode() {
    //after you click the guess button, the button is hidden again
    guessButton.style.visibility = 'hidden'
    guessButtonContainer.style.visibility = 'hidden'
    // if the index of the first 0 in the guesses array is divisible by 4
    if (guesses.indexOf(!0) % 4) {
        // if the guess matches the secret code exactly, the secret code is revealed, a win message pops up, and the play again button is revealed
        if (guesses[guessesIdx] === codeBox[0] && guesses[guessesIdx+1] === codeBox[1] && guesses[guessesIdx+2] === codeBox[2] && guesses[guessesIdx+3] === codeBox[3]) {
            revealSecretCode();
            // win message and play again button are revealed after 500 milliseconds
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
        // if the guess does not match the secret code AND it is the 9th/last guess, the secret code is revealed, a lose message pops up, and the play again button is revealed
        else if (guesses[35] !== 0) {
            revealSecretCode();
            // lose message and play again button are revealed after 500 milliseconds
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
        // if the guess does not match the secret code, and it is NOT the 9th/last turn
        else {
            // create a copy of the secret code array
            // from https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array/
            const leftoverCodeBox = [...codeBox];
            // loop through the current guess (the four new numbers in the guesses array) to look for blacks first so that the blacks show up first in the four hints pegs next to the guess
            for (let i = guessesIdx; i < (guessesIdx+4); i++) {
                // create a variable to tell the below splice method what number to remove from the leftover secret code
                const indexOfI = leftoverCodeBox.indexOf(guesses[i])
                // if the guess number is the same exact number in the same exact spot in the secret code array
                if(guesses[i] === codeBox[(i%4)]) {
                    // add a 2 to the hints array (which will show up black after the renderhint function below
                    hints.push(2)
                    // remove the given number from the leftover code array so that the rest of the guess colors are only compared to what is not already accounted for by a 2 (black)
                    leftoverCodeBox.splice(indexOfI, 1)
                }
            }
            // now loop through the current guess to look for whites
            for (let i = guessesIdx; i < (guessesIdx+4); i++) {
                const indexOfI = leftoverCodeBox.indexOf(guesses[i])
                // if the color is already accounted for by a black, just move on to the next iteration of the loop
                if(guesses[i] === codeBox[(i%4)]) {
                    continue;
                }
                // if the colors leftover from the secret code that have not been accounted for include the guess color
                else if (leftoverCodeBox.includes(guesses[i])) {
                    // add a 1 to the hints array (which will show up white after the renderhint function below
                    hints.push(1)
                    leftoverCodeBox.splice(indexOfI, 1)
                }
            }
            // now loop a number of times equal to the length of the leftover secret code array to add zeros to the hints array for each leftover
            for (let i = 0; i < leftoverCodeBox.length; i++) {
                hints.push(0)
            }
            renderHint();
        }
        // increase the index of the guesses array by four so that all of the functions still work for the 2nd guess, and the 3rd, and so on
        guessesIdx +=4
    }
}
// render color picked function
function renderColor() {
    // for each index of the guesses array, fill in the respective circle with the ID name of that index with the color value of that number's key in the guessColors object
    guesses.forEach(function (clrVal, Idx) {
        const cellId = `${Idx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = guessColors[clrVal]
    })
}
// function for rendering black and white pegs
function renderHint() {
    const cell0 = document.getElementById(`${guessesIdx}guess`);
    // fill in the respective ID's circle with the color associated with the pegColors index of the number in the hints array
    cell0.style.backgroundColor = pegColors[hints[guessesIdx]]
    const cell1 = document.getElementById(`${guessesIdx+1}guess`);
    cell1.style.backgroundColor = pegColors[hints[guessesIdx+1]]
    const cell2 = document.getElementById(`${guessesIdx+2}guess`);
    cell2.style.backgroundColor = pegColors[hints[guessesIdx+2]]
    const cell3 = document.getElementById(`${guessesIdx+3}guess`);
    cell3.style.backgroundColor = pegColors[hints[guessesIdx+3]]
}
// secret code revealing function
function revealSecretCode() {
    secretCode0.style.visibility = 'visible'
    secretCode1.style.visibility = 'visible'
    secretCode2.style.visibility = 'visible'
    secretCode3.style.visibility = 'visible'
}