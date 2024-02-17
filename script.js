document.addEventListener('DOMContentLoaded', function () {
    var words = ["program", "javascript", "programming", "computer", "algorithm", "developer","coding","flutter","dart","python",
                  "analyst","input","output","java","sql","database","monitor"];

    var wordToGuess = words[Math.floor(Math.random() * words.length)];
    var guessedWord = "_".repeat(wordToGuess.length);

    var remainingGuesses = 6;
    var guessedLetters = [];

    document.getElementById('wordToGuess').textContent = guessedWord;
    document.getElementById('remainingGuesses').textContent = remainingGuesses;

    document.getElementById('guessButton').addEventListener('click', function () {
        var guessInput = document.getElementById('guessInput').value.toLowerCase();

        if (guessInput.length !== 1 || !/[a-z]/.test(guessInput)) {
            document.getElementById('message').textContent = "Please enter a valid letter.";
            return;
        }

        if (guessedLetters.includes(guessInput)) {
            document.getElementById('message').textContent = "You've already guessed that letter.";
            return;
        }

        guessedLetters.push(guessInput);

        if (wordToGuess.includes(guessInput)) {
            for (var i = 0; i < wordToGuess.length; i++) {
                if (wordToGuess[i] === guessInput) {
                    guessedWord = guessedWord.substr(0, i) + guessInput + guessedWord.substr(i + 1);
                }
            }

            document.getElementById('wordToGuess').textContent = guessedWord;

            if (!guessedWord.includes('_')) {
                document.getElementById('message').textContent = "Congratulations! You guessed the word.";
                document.getElementById('guessButton').disabled = true;
                return;
            } else {
                document.getElementById('correctSound').play();
            }
        } else {
            remainingGuesses--;
            document.getElementById('remainingGuesses').textContent = remainingGuesses;
            if (remainingGuesses === 0) {
                document.getElementById('message').textContent = "Game over! The word was: " + wordToGuess;
                document.getElementById('guessButton').disabled = true;
                return;
            } else {
                document.getElementById('incorrectSound').play();
                updateHangmanImage(remainingGuesses);
            }
        }

        document.getElementById('message').textContent = "";
    });

    document.getElementById('restartButton').addEventListener('click', function () {
        wordToGuess = words[Math.floor(Math.random() * words.length)];
        guessedWord = "_".repeat(wordToGuess.length);
        remainingGuesses = 6;
        guessedLetters = [];

        document.getElementById('wordToGuess').textContent = guessedWord;
        document.getElementById('remainingGuesses').textContent = remainingGuesses;
        document.getElementById('message').textContent = "";
        document.getElementById('guessInput').value = "";
        document.getElementById('guessButton').disabled = false;
        resetHangmanImage();
    });

    function updateHangmanImage(remainingGuesses) {
        var hangmanImage = document.getElementById('hangmanImage');
        hangmanImage.className = 'hangman-image hangman-image-' + remainingGuesses;
    }

    function resetHangmanImage() {
        var hangmanImage = document.getElementById('hangmanImage');
        hangmanImage.className = 'hangman-image';
    }
});
