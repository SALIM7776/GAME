const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cardsChosen = [];
let cardsChosenId = [];
let cardsMatched = [];
const grid = document.getElementById('game-grid');

// Function to shuffle the cards array
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to create game board
function createBoard() {
    shuffleCards(cardsArray);
    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}

// Function to flip card
function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardsArray[cardId]);
    cardsChosenId.push(cardId);
    this.textContent = cardsArray[cardId];
    this.classList.add('selected');
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

// Function to check for card match
function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstCardId, secondCardId] = cardsChosenId;
    const [firstCard, secondCard] = cardsChosen;
    if (firstCard === secondCard) {
        cards[firstCardId].classList.add('matched');
        cards[secondCardId].classList.add('matched');
        cardsMatched.push(cardsChosen);
    } else {
        cards[firstCardId].textContent = '';
        cards[secondCardId].textContent = '';
    }
    cardsChosen = [];
    cardsChosenId = [];
    const matchedCards = document.querySelectorAll('.matched');
    if (matchedCards.length === cardsArray.length) {
        alert('Congratulations! You have matched all the cards!');
    }
}

// Function to reset game
function resetGame() {
    grid.innerHTML = '';
    cardsChosen = [];
    cardsChosenId = [];
    cardsMatched = [];
    createBoard();
}

createBoard();
