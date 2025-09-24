// Global variables to track game state
let score = 0;
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = 8;

// Function to create and shuffle card values
function createCardValues() {
    const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cardValues = [...values, ...values]; // Duplicate for pairs
    return shuffleArray(cardValues);
}

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to create card elements
function createCardElement(value, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.dataset.index = index;

    const front = document.createElement('div');
    front.classList.add('card-face', 'card-front');
    front.textContent = value;

    const back = document.createElement('div');
    back.classList.add('card-face', 'card-back');

    card.appendChild(front);
    card.appendChild(back);
    return card;
}

// Function to initialize the game
function initializeGame() {
    const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = ''; // Clear existing cards
    score = 0;
    flippedCards = [];
    matchedPairs = 0;
    updateScore();

    const cardValues = createCardValues();
    cardValues.forEach((value, index) => {
        const card = createCardElement(value, index);
        card.addEventListener('click', () => handleCardClick(card));
        cardGrid.appendChild(card);
    });
}

// Function to update score display
function updateScore() {
    document.getElementById('score').textContent = score;
    return score; // Return value for potential reuse
}

// Function to handle card click
function handleCardClick(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Function to check if flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    score++;
    updateScore();

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === totalPairs) {
            setTimeout(() => alert('Congratulations! You won the game!'), 500);
        }
    } else {
        card1.classList.add('shake');
        card2.classList.add('shake');
        setTimeout(() => {
            card1.classList.remove('flipped', 'shake');
            card2.classList.remove('flipped', 'shake');
            flippedCards = [];
        }, 1000);
    }
}

// Initialize game on page load
document.addEventListener('DOMContentLoaded', initializeGame);

// Reset game on button click
document.getElementById('reset-button').addEventListener('click', initializeGame);