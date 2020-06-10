const cardsContainer = document.getElementById('cards-container');
const previousButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const currentElement = document.getElementById('current');
const showButton = document.getElementById('show');
const hideButton = document.getElementById('hide');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const addCardButton = document.getElementById('add-card');
const clearButton = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

let currentActiveCard = 0;

const cardElements = [];

const cardData = getCardData();

function createCards() {
    cardData.forEach((data,index) => createCard(data,index));
}

function createCard(data,index) {
    const card = document.createElement('div');
    card.classList.add('card');
    if(index === 0) {
        card.classList.add('active');
    }
    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>
                    ${data.question}
                </p>
            </div>
            <div class="inner-card-back">
                <p>
                   ${data.answer}
                </p>
            </div>
        </div>
    `;
    card.addEventListener('click',() => {
        card.classList.toggle('show-answer');
    });
    cardElements.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
}

function updateCurrentText() {
    currentElement.innerText = `${currentActiveCard + 1}/${cardElements.length}`;
}

function getCardData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function setCardData(cards) {
    localStorage.setItem('cards',JSON.stringify(cards));
    window.location.reload();
}

createCards();

// Event Listeners

nextButton.addEventListener('click', () => {
    cardElements[currentActiveCard].className = 'card left';
    currentActiveCard = currentActiveCard + 1;
    if(currentActiveCard > cardElements.length - 1) {
        currentActiveCard = cardElements.length - 1;
    }
    cardElements[currentActiveCard].className = 'card active';
    updateCurrentText();
});

previousButton.addEventListener('click', () => {
    cardElements[currentActiveCard].className = 'card right';
    currentActiveCard = currentActiveCard - 1;
    if(currentActiveCard < 0) {
        currentActiveCard = 0;
    }
    cardElements[currentActiveCard].className = 'card active';
    updateCurrentText();
});

showButton.addEventListener('click', () => addContainer.classList.add('show'));

hideButton.addEventListener('click', () => addContainer.classList.remove('show'));

addCardButton.addEventListener('click', () => {
    const question = questionElement.value;
    const answer = answerElement.value;
    if(question.trim() && answer.trim()) {
        const newCard = {question,answer};
        createCard(newCard);
        questionElement.value = '';
        answerElement.value = '';
        addContainer.classList.remove('show');
        cardData.push(newCard);
        setCardData(cardData);
    }
});

clearButton.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});