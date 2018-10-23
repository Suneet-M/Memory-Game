/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const cardDeck = document.querySelector('.deck'); //for click event
const cardList = Array.from(cardDeck.querySelectorAll('li'));
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
let count = 0; //move counter
let openCards = []; //tracking number of opened cards 
let cardIcons = []; //for icon matching

function onclick (target) {
	if (!openCards.includes(target)) {
		show(target);
		//after 2 clicks
		if (openCards.length == 2) {
			updateMoves();
			setTimeout(twoClicks,300);
		}
	}
}

function show (clickedCard) {
	//click to show
	clickedCard.classList.add('open','show');
	openCards.push(clickedCard);
	fetchIcon(clickedCard);
}

function fetchIcon (clickedCard) {
	//fetch clicked card's icon class to compare
	let icon = clickedCard.firstElementChild.classList.value;
	cardIcons.push(icon);
}

function updateMoves (custom) {
	count++;
	moves.textContent = count;
	//for resetting
	if (custom == 0) {
		moves.textContent = custom;
		count = 0;
	}
}

function twoClicks () {
	hideCard(openCards[0]);
	hideCard(openCards[1]);

	//if cards match
	if (cardIcons[0] == cardIcons[1]){
		matchCard(openCards[0]);
		matchCard(openCards[1]);
	}
	resetTracking();
}

function hideCard (openCard) {
	openCard.classList.remove('open','show');
}

function matchCard (openCard) {
	openCard.classList.add('match');
}

function resetTracking () {
	//reset number of opened cards and icons
	openCards = [];
	cardIcons = [];
}

function resetGame () {
	//reset cards
	for (let card of cardList) {
		card.classList.remove('open','show','match');
	}
	updateMoves(0);
	resetTracking();
}

cardDeck.addEventListener('click' , function (e){
	if (e.target.nodeName === 'LI') {
		onclick(e.target);
	}
});

restart.addEventListener('click' , resetGame);