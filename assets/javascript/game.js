var wordBlanks = document.getElementById("word-blanks");
var guessCounter = document.getElementById("guess-counter");
var guessedLetters = document.getElementById("guessed-letters")
var wonGames = document.getElementById("won-games");

var gamesWon = 0;
var chosenWord = "";
var lettersGuessed = [];
var guessesLeft = 10;
guessCounter.textContent = guessesLeft;
wonGames.textContent = gamesWon;



// CHOOSE WORD

var pickWord = function() {

    var wordChoices = ["British Shorthair"]

    // var wordChoices = ["Brittish Shorthair", "Siamese", "Persian", "Ragdoll", "Maine Coon", "Bengal", "Sphynx", "Abyssinian", "Russian Blue", "American Bobtail"];

    var randomWord = function() {
        return wordChoices[Math.round(Math.random()) * (wordChoices.length - 1)];
    }

    chosenWord = randomWord();

    // SET UP WORD HOLDER

    var wordHash = function(word) {
        wordHolder = "";
        for (i = 0; i < word.length; i++) {
            wordHolder += "_";
        };
    }

    wordHash(chosenWord);

    wordBlanks.textContent = wordHolder;
};

// RESET GAME

var reset = function () {
  chosenWord = "";
  lettersGuessed = [];
  guessesLeft = 10;
  wordBlanks.textContent = wordHolder;
  guessedLetters.textContent = lettersGuessed;
  guessCounter.textContent = guessesLeft;
  pickWord();
};


pickWord();


// GAME

document.onkeyup = function(event) {
    var letter = event.key;


    function correctGuess(n, c, string) {
        return (string.substr(0, n) + c + string.substr(n + 1))
    }

    // not in guessed array

    if (lettersGuessed.includes(letter) == false) {

      // replace letter

    if (chosenWord.includes(letter)) {
        for (i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] == letter) {
                wordHolder = correctGuess(i, letter, wordHolder);
            }
        }

        // wrong guess

    } else {
        guessesLeft--;
        lettersGuessed.push(letter);
    }

      // game over

    if (guessesLeft < 1){
      reset();
      alert("Game Over");
    }

    // game won

    if (wordHolder == chosenWord){
      alert("You win!!")
      gamesWon++;
      reset();
    }

    wordBlanks.textContent = wordHolder;
    guessedLetters.textContent = lettersGuessed;
    guessCounter.textContent = guessesLeft;
}

}