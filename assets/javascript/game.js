var wordBlanks = document.getElementById("word-blanks");
var guessCounter = document.getElementById("guess-counter");
var guessedLetters = document.getElementById("guessed-letters")


// CHOOSE WORD
var chosenWord = ""
var wordChoices = ["cat", "dog"];

var randomWord = function() {
    return wordChoices[Math.round(Math.random()) * (wordChoices.length - 1)];
}

chosenWord = randomWord();


// SET UP WORD HOLDER

wordHolder = "";


for (i = 0; i < chosenWord.length; i++) {
    wordHolder += "_";
};

wordBlanks.textContent = wordHolder;



// GUESS FUNCTION

var lettersGuessed = [];

var guessesMade = 0;

document.onkeyup = function(event) {
    var letter = event.key;


    function correctGuess(n, c, string) {
        return (string.substr(0, n) + c + string.substr(n + 1))
    }

    if (chosenWord.includes(letter)) {
        for (i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] == letter) {
                wordHolder = correctGuess(i, letter, wordHolder);
            }
        }
    } else {
        guessesMade++;
        lettersGuessed.push(letter);
    }

    wordBlanks.textContent = wordHolder;
    guessedLetters.textContent = lettersGuessed;
    guessCounter.textContent = guessesMade;
}