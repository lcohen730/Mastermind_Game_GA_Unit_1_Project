/*----- constants -----*/

// color guess options: [red, orange, yellow, green, blue, purple]
const guessColors = [red, yellow, green, teal, purple, magenta]
// correct or partially correct peg colors?
const pegColors = [red, black]

/*----- state variables -----*/

// guess number (out of 9, starts at 1)
let guessNumber;
// entire game board including guesses and hints
let board;
// guesses (starts with gray or empty circles, will be filled in one row at a time, starting at bottom, with every guess)
let guesses;
// hints (four peg slots next to each guess - correct, somewhat correct, or wrong)
let hints;
// secret code box (covered while playing, slides open or reveals when guessed correctly, or 9 guesses have been made - whichever comes first)
let codeBox;
// win or loss?
let outcome;

/*----- cached elements  -----*/

// colors to select (buttons that will fill in first available empty board space with that color when clicked)


/*----- event listeners -----*/

// when colored buttons on bottom are clicked, fill in first available empty board space with that color
// when instructions drop-down is clicked, instructions will drop down, filling out left side of page
// when you click on one of the circles filled in on the top row on the board (guess currently being made), the color will be removed (if you decided to play a different color)
// when you click the 'guess' button, the red and black pegs will appear depending on how good the guess was

/*----- functions -----*/

// go back to starting screen when first visiting or refreshing page

// define the start page function
// no guesses have been made
// no red or black pegs have been filled in
// rest of board is rendered
// secret code is re-randomized and hidden

// when you click a color on the bottom, the first available empty space on the board is filled in with that color

// when you click the guess button, if there are not four circles filled out, an alert of some kind will pop up and say 'guess needs to be four colors long' and it will not reveal the red and black hint pegs OR maybe instead, the guess button will be un-clickable or invisible until you have four colors filled in
// if the guess is four colors long, and you click the guess button,
// if the guess matches the secret code, the secret code is revealed and a message pops up and replaces the body, saying something like "you win! play again for another code" and reveals a play again button that re-renders the init board
// if the guess does not match the secret codem AND it is the 9th/last guess, the secret code is revealed and a message pops up saying something like, "you lose! sorry, try again" and reveals the play again button that re-renders the init board
// if the guess does not match the secret code, and it is NOT the 9th/last turn, black and red pegs are revealed in the right-side small four circle space - one black peg for each color that is in the correct space and the correct color, and one red peg for each color that is in the secret code, but in the wrong space

// render function for board, revealing black and red pegs, win or lose message, secret code revealing, and guess button appearing

// render board function

// function for revealing black and red pegs

// render win or lose message function

// secret code revealing function

// guess button appearing function