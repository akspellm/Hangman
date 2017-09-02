$("#got-it").click(function() {
  $("#instructions").toggle();
});

$("#hint").click(function() {
  $("#hint-photo").toggle();
});

$("#hint-ok").click(function() {
  $("#hint-photo").toggle();
});

$("#accept").click(function() {
  $("#message-box").toggle();
});

var eatMouse = function() {
    $("#animate-mouse").fadeToggle()
    catSound.src = "assets/bite.wav"
    setTimeout(function() {
        $('#animate-mouse').toggle();
        catSound.play();
        $("#animate-cat").animate({ width: "+=10px" })
    }, 1000);
}


// VARIABLES

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

  var catSound = new Audio();


// CHOOSE WORD

var pickWord = function() {

    var wordChoices = Object.keys(cats);

    var randomWord = function() {
        randomIndex= Math.round(Math.random() * (wordChoices.length-1));
        return wordChoices[randomIndex];
    }

    chosenWord = randomWord();
    console.log(chosenWord);
    catPhoto.src = cats[chosenWord];

    // SET UP WORD HOLDER

    var wordHash = function(word) {
        wordHolder = "";
        for (i = 0; i < word.length; i++) {
            wordHolder += "_";
        };
    }

    // HASH CHOSEN WORD

    wordHash(chosenWord);

    // DISPLAY WORD HASH

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
$(document).ready(function(){
    $(document).keyup(function (){
    var letter = event.key.toLowerCase();


    function correctGuess(n, c, string) {
        return (string.substr(0, n) + c + string.substr(n + 1))
    }

    // not in guessed array

    if (lettersGuessed.includes(letter) === false) {

      // replace letter

    if (chosenWord.includes(letter)) {
        for (i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] == letter) {
                wordHolder = correctGuess(i, letter, wordHolder);
                eatMouse();
            }
        }
        

      } else {
        guessesLeft--;
        lettersGuessed.push(letter);
        $("#animate-cat").effect("bounce", "slow");
    };

      // game over

    if (guessesLeft < 1){
      catSound.src = "assets/meow.wav"
      catSound.play();
      reset();
      $("#message-box").toggle();
      $("#message").html("You lose \n Better luck next time!");
    }


      // game won

    if (wordHolder == chosenWord) {
        catSound.src = "assets/purr.wav"
        catSound.play();
        $("#message-box").toggle();
        $("#message").html("You win! Let's play again!");
        gamesWon++;
        reset();
    }

        // wrong guess


    wordBlanks.textContent = wordHolder;
    guessedLetters.textContent = lettersGuessed;
    guessCounter.textContent = guessesLeft;
    wonGames.textContent = gamesWon;
}

})

})