document.addEventListener('DOMContentLoaded', function () {
    const okButton = document.getElementById('okButton');
    const instructionModal = document.getElementById('instructionModal');

    
    function closeModal() {
        instructionModal.style.display = "none";
    }

    
    okButton.addEventListener('click', closeModal);

    
    instructionModal.style.display = "block";  

    const wordList = [
        'java', 
        'python',
        'ruby',
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

    
    function startGame() {
       
        chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
        guessedLetters = [];
        wordDisplay = [];

       
        for (let i = 0; i < chosenWord.length; i++) {
            wordDisplay.push('_');
        }

        
        updateDisplay();

        
        guessesRemaining = 6;
        updateGuessesRemaining();

        
        messageDisplay.textContent = '';

        
        if (!isMuted) {
            backgroundMusic.play();
        }
    }

    
    function updateDisplay() {
        wordToGuess.textContent = wordDisplay.join(' ');
    }

    
    function updateGuessesRemaining() {
        guessesRemainingDisplay.textContent = guessesRemaining;
    }

    
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
            checkWin(); 
        } else {
            
            guessesRemaining--;
            updateGuessesRemaining();
            playIncorrectSound();
        }

       
        if (guessesRemaining === 0) {
            messageDisplay.textContent = `You lost! The word was "${chosenWord}".`;
            backgroundMusic.pause();
        }
    }

   
    guessButton.addEventListener('click', function () {
        const guess = guessInput.value.toLowerCase();
        if (guess.length === 1 && guess.match(/[a-z]/i)) {
            checkGuess(guess);
        } else {
            messageDisplay.textContent = 'Please enter a valid single letter.';
        }
        guessInput.value = '';
    });

    restartButton.addEventListener('click', startGame);

    function playCorrectSound() {
        correctSound.currentTime = 0;
        correctSound.play();
    }

    function playIncorrectSound() {
        incorrectSound.currentTime = 0;
        incorrectSound.play();
    }

    
    function createSkyCrackerEffect() {
        const colors = ['#FFD700', '#FF6347', '#00FFFF', '#00FF00'];
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        for (let i = 0; i < 50; i++) { 
            const skyCracker = document.createElement('div');
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            skyCracker.classList.add('sky-cracker');
            skyCracker.style.backgroundColor = randomColor;
            skyCracker.style.left = Math.random() * screenWidth + 'px';
            skyCracker.style.top = Math.random() * screenHeight + 'px';
            document.body.appendChild(skyCracker);

            setTimeout(() => {
                skyCracker.remove();
            }, 2000); 
        }
    }

   
    function checkWin() {
        if (!wordDisplay.includes('_')) {
           
            const winMessage = document.createElement('div');
            winMessage.textContent = 'You Won!';
            winMessage.classList.add('glowing-text'); 
            winMessage.classList.add('glowing-color'); 
            document.body.insertBefore(winMessage, document.body.firstChild);

            messageDisplay.textContent = 'Congratulations! You Won!';
            backgroundMusic.pause();
            createSkyCrackerEffect(); 
        }
    }
    function checkWin() {
        if (!wordDisplay.includes('_')) {
            
            const winMessage = document.createElement('div');
            messageDisplay.textContent = 'Congratulations! You Won!';
            messageDisplay.classList.add('congratulations');
            backgroundMusic.pause();
            createSkyCrackerEffect(); 
            playFireworksSound(); 
    }
    
    
    function playFireworksSound() {
        firecrackerSound.currentTime = 0; 
        firecrackerSound.play(); 
    }
}
    startGame();
});
