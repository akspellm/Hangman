var wordBlanks = document.getElementById("word-blanks");
var guessCounter = document.getElementById("guess-counter");
var guessedLetters = document.getElementById("guessed-letters")
var wonGames = document.getElementById("won-games");
var catPhoto = document.getElementById("cat-photo");

var gamesWon = 0;
var chosenWord = "";
var lettersGuessed = [];
var guessesLeft = 10;
guessCounter.textContent = guessesLeft;
wonGames.textContent = gamesWon;

  var cats = {
    "abyssinian" : "assets/images/abyssinian.jpg",
    "bengal" : "assets/images/bengal.jpg",
    "birman" : "assets/images/birman.jpg",
    "burmese" : "assets/images/burmese.jpg",
    "manx" : "assets/images/manx.jpg",
    "ocicat" : "assets/images/ocicat.jpg",
    "persian" : "assets/images/persian.jpg",
    "ragdoll" : "assets/images/ragdoll.jpg",
    "siamese" : "assets/images/siamese.jpg",
    "siberian" : "assets/images/siberian.jpg",
    "sphynx" : "assets/images/sphynx.jpg",
    "tonkinese" : "assets/images/tonkinese.jpg",
  }


// CHOOSE WORD

var pickWord = function() {

    var wordChoices = Object.keys(cats);
    console.log(wordChoices);

    // var cats = ["assets/images/BritishShorthair.jpg"];
    // console.log(cats);
    // catPhoto.src = cats[0];
    // var wordChoices = ["Brittish Shorthair", "Siamese", "Persian", "Ragdoll", "Maine Coon", "Bengal", "Sphynx", "Abyssinian", "Russian Blue", "American Bobtail"];

    var randomWord = function() {
        randomIndex= Math.round(Math.random() * (wordChoices.length-1));
        return wordChoices[randomIndex];
    }

    chosenWord = randomWord();
    catPhoto.src = cats[chosenWord];

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
    var letter = event.key.toLowerCase();


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
    wonGames.textContent = gamesWon;
}

}