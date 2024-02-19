document.addEventListener('DOMContentLoaded', function () {
    const okButton = document.getElementById('okButton');
    const instructionModal = document.getElementById('instructionModal');

    // Function to close the modal
    function closeModal() {
        instructionModal.style.display = "none";
    }

    // Event listener for the OK button
    okButton.addEventListener('click', closeModal);

    // Display the modal initially
    instructionModal.style.display = "block";  // Add this line

    const wordList = [
        'hangman', 
        'javascript', 
        'computer', 
        'programming', 
        'developer', 
        'algorithm', 
        'variable', 
        'function', 
        'loop', 
        'array', 
        'object', 
        'string', 
        'boolean', 
        'integer', 
        'float', 
        'conditional', 
        'iteration', 
        'debugging', 
        'algorithm', 
        'interface', 
        'database', 
        'framework', 
        'backend', 
        'frontend', 
        'version', 
        'repository', 
        'iteration', 
        'recursion', 
        'parameter', 
        'argument', 
        'syntax', 
        'declaration', 
        'assignment', 
        'comparison', 
        'concatenation', 
        'interpretation', 
        'execution', 
        'asynchronous', 
        'synchronous', 
        'iteration', 
        'recursion', 
        'asymptotic', 
        'efficiency', 
        'optimization', 
        'compiler', 
        'interpreter', 
        'syntax', 
        'semantics', 
        'declaration', 
        'initialization', 
        'compilation', 
        'interpretation', 
        'runtime', 
        'type', 
        'static', 
        'dynamic', 
        'polymorphism', 
        'inheritance', 
        'encapsulation', 
        'abstraction', 
        'interface', 
        'implementation', 
        'module', 
        'package', 
        'library', 
        'API', 
        'testing', 
        'debugging', 
        'refactoring'
    ];
    
    let chosenWord = '';
    let guessesRemaining = 6;
    let guessedLetters = [];
    let wordDisplay = [];

    const hangmanImage = document.getElementById('hangmanImage');
    const wordToGuess = document.getElementById('wordToGuess');
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const restartButton = document.getElementById('restartButton');
    const guessesRemainingDisplay = document.getElementById('remainingGuesses');
    const messageDisplay = document.getElementById('message');
    const correctSound = document.getElementById('correctSound');
    const incorrectSound = document.getElementById('incorrectSound');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const muteButton = document.getElementById('muteButton');
    let isMuted = false;

    // Mute Button
    muteButton.addEventListener('click', function () {
        if (isMuted) {
            backgroundMusic.play();
            correctSound.volume = 1;
            incorrectSound.volume = 1;
            muteButton.textContent = 'Mute';
        } else {
            backgroundMusic.pause();
            correctSound.volume = 0;
            incorrectSound.volume = 0;
            muteButton.textContent = 'Unmute';
        }
        isMuted = !isMuted;
    });

    // Function to start or restart the game
    function startGame() {
        // Choose a random word from the wordList
        chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
        guessedLetters = [];
        wordDisplay = [];

        // Initialize word display
        for (let i = 0; i < chosenWord.length; i++) {
            wordDisplay.push('_');
        }

        // Update the display
        updateDisplay();

        // Reset guesses remaining
        guessesRemaining = 6;
        updateGuessesRemaining();

        // Clear message display
        messageDisplay.textContent = '';

        // Play background music
        if (!isMuted) {
            backgroundMusic.play();
        }
    }

    // Function to update the word display
    function updateDisplay() {
        wordToGuess.textContent = wordDisplay.join(' ');
    }

    // Function to update remaining guesses display
    function updateGuessesRemaining() {
        guessesRemainingDisplay.textContent = guessesRemaining;
    }

    // Function to check if the guessed letter is in the word
    function checkGuess(letter) {
        if (guessedLetters.includes(letter)) {
            messageDisplay.textContent = 'You already guessed that letter!';
            return;
        }

        guessedLetters.push(letter);

        if (chosenWord.includes(letter)) {
            // Correct guess
            for (let i = 0; i < chosenWord.length; i++) {
                if (chosenWord[i] === letter) {
                    wordDisplay[i] = letter;
                }
            }
            updateDisplay();
            playCorrectSound();
            checkWin(); // Check if the word has been completely guessed
        } else {
            // Incorrect guess
            guessesRemaining--;
            updateGuessesRemaining();
            playIncorrectSound();
        }

        // Check for lose
        if (guessesRemaining === 0) {
            messageDisplay.textContent = `You lost! The word was "${chosenWord}".`;
            backgroundMusic.pause();
        }
    }

    // Event listener for guess button
    guessButton.addEventListener('click', function () {
        const guess = guessInput.value.toLowerCase();
        if (guess.length === 1 && guess.match(/[a-z]/i)) {
            checkGuess(guess);
        } else {
            messageDisplay.textContent = 'Please enter a valid single letter.';
        }
        guessInput.value = '';
    });

    // Event listener for restart button
    restartButton.addEventListener('click', startGame);

    // Correct and Incorrect Sounds
    function playCorrectSound() {
        correctSound.currentTime = 0;
        correctSound.play();
    }

    function playIncorrectSound() {
        incorrectSound.currentTime = 0;
        incorrectSound.play();
    }

    // Function to create the sky cracker effect
    function createSkyCrackerEffect() {
        const colors = ['#FFD700', '#FF6347', '#00FFFF', '#00FF00']; // Add more colors as needed
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        for (let i = 0; i < 50; i++) { // Adjust the number of crackers as needed
            const skyCracker = document.createElement('div');
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            skyCracker.classList.add('sky-cracker');
            skyCracker.style.backgroundColor = randomColor;
            skyCracker.style.left = Math.random() * screenWidth + 'px';
            skyCracker.style.top = Math.random() * screenHeight + 'px';
            document.body.appendChild(skyCracker);

            setTimeout(() => {
                skyCracker.remove();
            }, 2000); // Adjust duration as needed
        }
    }

    // Function to check if the word has been completely guessed
    function checkWin() {
        if (!wordDisplay.includes('_')) {
            // Display "Yo Won" message at the top
            const winMessage = document.createElement('div');
            winMessage.textContent = 'You Won!';
            winMessage.classList.add('glowing-text'); // Apply glowing effect
            winMessage.classList.add('glowing-color'); 
            document.body.insertBefore(winMessage, document.body.firstChild);

            messageDisplay.textContent = 'Congratulations! You Won!';
            backgroundMusic.pause();
            createSkyCrackerEffect(); // Create the sky cracker effect
        }
    }
    function checkWin() {
        if (!wordDisplay.includes('_')) {
            // Display "Yo Won" message at the top
            const winMessage = document.createElement('div');
            winMessage.textContent = 'Yo Won!';
            winMessage.classList.add('glowing-text'); // Apply glowing effect
            document.body.insertBefore(winMessage, document.body.firstChild);
    
            messageDisplay.textContent = 'Congratulations! You Won!';
            messageDisplay.classList.add('congratulations');
            backgroundMusic.pause();
            createSkyCrackerEffect(); // Create the sky cracker effect
            playFireworksSound(); // Play fireworks sound
        }
    }
    
    // Function to play the fireworks sound
    function playFireworksSound() {
        firecrackerSound.currentTime = 0; // Reset sound to beginning
        firecrackerSound.play(); // Play the fireworks sound
    }
    // Start the game initially
    startGame();
});
