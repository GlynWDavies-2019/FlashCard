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

const cardData = [
    {
        question: 'What must a variable begin with?',
        answer: 'A letter, $ or _'
    },
    {
        question: 'What is a variable?',
        answer: 'Container for a piece of data'
    },
    {
        question: 'Example of case-sensitive variable',
        answer: 'thisIsAVariable'
    }
];

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
    cardElements.push(card);
    cardsContainer.appendChild(card);
}

createCards();