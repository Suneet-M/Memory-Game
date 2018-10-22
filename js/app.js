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

let CardList = document.querySelector('.deck'); //card deck for click event
let openCards = []; //for number of opened cards 
let cardIcons = []; //for icon matching

CardList.addEventListener('click' , 
	function (e) {

		//click to show
		const card = e.target;
		card.classList.add('open','show');
		openCards.push(card);

		//fetch clicked card's icon's class to compare
		let icon = card.firstElementChild.classList.value;
		cardIcons.push(icon);

		if (openCards.length == 2) {
			
			//reset cards
			openCards[0].classList.remove('open','show');
			openCards[1].classList.remove('open','show');

			//if cards match
			if (cardIcons[0] == cardIcons[1]){
				openCards[0].classList.add('match');
				openCards[1].classList.add('match');
			}
		}
});