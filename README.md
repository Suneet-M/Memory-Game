# Memory Game
Simply click [here](https://suneet-m.github.io/Memory-Game/) to launch the game.\
This game is playable on mobile devices as well, but are not completely optimized for the screen size. Optimizations are WIP.\
Please go through [instructions](#instructions) before playing.

## Instructions

- The game consists of 16 cards in total each having a icon on the other side. 
- Each card can be flipped over by clicking on it which will reveal the icon.
- Only two cards can be flipped in a move. If the two cards match they will turn green or else they will flip over again.
- If cards do not match, be sure to remember the card locations. The cards flip quickly after the second card is clicked for added difficulty, so be aware.
- The aim of the game is to match all cards in the least moves possible.
- Number of moves will be shown in the score panel which will reflect on the star rating for your game.
- A timer is displayed on the score panel but be at ease as it doesnt reflect on the star rating, it is displayed for personal performance tracking.
- Star rating is as follows:
  - 3 Stars under 14 moves
  - 2 Stars under 18 moves
  - 1 Star under 22 moves
  - 0 Stars above 22 moves
- Reset button on the score-panel can be used anytime to reset star rating, timer and moves.
- On completion, your score will be displayed along with an option to play the game again with a fresh set of card sequence.

## Animations
All animations in code use animate.css.\
A very nice and easy way to animate elements, developed by [Daniel Eden](https://github.com/daneden).\
Github repo can be found [here](https://github.com/daneden/animate.css).
  
## Future Updates

- [x] Use animations for card show, match and no-match.
- [ ] Apply animation to modal using animate.css
- [ ] Check code for ES6 guideline compliance.
- [ ] A start page for instructions and selecting difficulty.
- [ ] Store scores of each game and show best score in modal.
