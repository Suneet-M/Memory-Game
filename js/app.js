/*
 *
 * SHUFFLE CARDS
 *
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

const cardDeck = document.querySelector('.deck');
shuffleCards();

function shuffleCards () {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	const shuffledCards = shuffle(cardsToShuffle);

	for (let card of shuffledCards) {
		cardDeck.appendChild(card);
	}
}

/*
 *
 * CARDs SHOW & MATCH and MOVES FUNCTIONALITY
 *
 */

const moves = document.querySelector('.moves');
let count = 0; //move counter
let openCards = []; //tracking number of opened cards 
let cardIcons = []; //for icon matching

cardDeck.addEventListener('click' , function (e){
	if (e.target.nodeName === 'LI') {
		onclick(e.target);
		if (timerId == undefined) {
			startTimer();
		}
	}
});

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
	//for star rating
	checkCount();
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
	checkCompletion();
}

function resetTracking () {
	//reset number of opened cards and icons
	openCards = [];
	cardIcons = [];
}

/*
 *
 * STAR RATING
 *
 */

let rating = Array.from(document.getElementsByClassName('fa-star'));

function checkCount () {
	if (count > 24) {
		reduceStar(0);
	}

	if (count > 20) {
		reduceStar(1);
	}

	if (count > 16) {
		reduceStar(2);
	}
}

function reduceStar (i) {
	rating[i].classList.add('invisible');
}

function resetStars () {
	for (let star of rating) {
		star.classList.remove('invisible');
	}
}

/*
 *
 * TIMER
 *
 */

const timer = document.querySelector('.timer');
let time = 0;
let timerId;
function startTimer () {
	timerId = setInterval(function () {
		time++;
		timer.textContent = time;
	}, 1000)
}

function stopTimer () {
	clearTimeout(timerId)
}

function resetTimer () {
	stopTimer();
	timer.textContent = 0;
}

/*
 *
 * GAME RESET
 *
 */

const restart = document.querySelector('.restart');
const cardList = Array.from(cardDeck.querySelectorAll('li'));
restart.addEventListener('click' , resetGame);

function resetGame () {
	//reset cards
	for (let card of cardList) {
		card.classList.remove('open','show','match');
	}
	shuffleCards();
	updateMoves(0);
	resetTracking();
	resetStars();
	resetTimer();
}

/*
 * GAME COMPLETE
 */

let complete;//to hold completion value
const modal = document.querySelector('.modal-body');
function checkCompletion () {
	//iterate over cards
	for (let card of cardList) {
		//check card for class match
		if (card.classList.contains('match')) {
			complete = true;
		}
		else {
			complete = false;
			return;//exit loop
		}
	}

	if (complete == true) {
		gameComplete();
	}
}

function gameComplete () {
	const rating = modal.querySelector('.rating');
	const finalMoves = modal.querySelector('.final-moves')
	const finalTime = modal.querySelector('.final-time')

	//fetch rating from score panel
	rating.innerHTML =
		document.querySelector('.stars').innerHTML;
	//use previously defined variables for moves and time
	finalMoves.textContent = `${count} Moves`;
	finalTime.textContent = `${time} Secs`;

	stopTimer();
	toggleModal();
}

modal.querySelector('#reset').addEventListener('click',
	function () {
		resetGame();
		toggleModal();
	});

function toggleModal () {
	document.querySelector('.modal')
			.classList.toggle('show');
}

modal.querySelector('#close').addEventListener('click', toggleModal);