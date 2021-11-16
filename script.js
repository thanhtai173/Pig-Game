'use strict';

// Ideas for this game :
// 1. Click roll dice -> Generating random number between (1,6) -> Figure of dice is changed between (1,6) depending on random number
// 2. Current score = current score + random number , if (random number = 1) -> current score = 0 and change player 
// 3. Click hold = player score + current score 
// 4. Player is playing having lighter pink background 
// 5. Plare get 100 point , background changes to black -> roll dice and hold is not clickable -> remove image of dice 
// 6. New game is used to reset every parameters

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const player = document.querySelector('.player');

const imgDice = document.querySelector('.dice');

const currentScore1 = document.querySelector('#current--0');
const playerScore1 = document.querySelector('#score--0');
const currentScore2 = document.querySelector('#current--1');
const playerScore2 = document.querySelector('#score--1');

// Initialize none image of dice
imgDice.style.display = 'none';

// Assign zero to playerscore
const InitPlayerScore = 0;
playerScore1.textContent = playerScore2.textContent = InitPlayerScore;

const AddOrRemovePlayerActive = (player) => {
    if (player === 1) {
        player0.classList.add('player--active');
        player1.classList.remove('player--active');
    } else {
        player1.classList.add('player--active');
        player0.classList.remove('player--active');
    }
}
// Can replace this one by player.classList.toggle('player--active')

const ChangePlayer = (numberplayer) => {
    if (numberplayer === 1) {
        AddOrRemovePlayerActive(2);
        return 2;
    } else {
        AddOrRemovePlayerActive(1);
        return 1;
    }
}

const WhoWin = (PlayerScore1, PlayerScore2) => {
    if (PlayerScore1 >= 100) {
        document.getElementById('name--0').style.color = '#c7365f';
        player0.classList.add('player--winner'); // dont have . in the string
    }
    if (PlayerScore2 >= 100) {
        document.getElementById('name--1').style.color = '#c7365f';
        player1.classList.add('player--winner'); // dont have . in the string
    }

    if (PlayerScore1 >= 100 || PlayerScore2 >= 100) {
        imgDice.style.display = 'none';
    }
}

// Who will play first ? 1 - player1 and 2 - player2 
let WhoFirst = Math.trunc(Math.random() * 2) + 1; console.log(WhoFirst);
AddOrRemovePlayerActive(WhoFirst);

btnNew.addEventListener('click', function () {
    currentScore1.textContent = currentScore2.textContent = 0;
    playerScore1.textContent = playerScore2.textContent = InitPlayerScore;
    player0.classList.remove('player--winner'); player1.classList.remove('player--winner');
    const NewWhoFirst = Math.trunc(Math.random() * 2) + 1;
    WhoFirst = NewWhoFirst;
    AddOrRemovePlayerActive(WhoFirst);
    imgDice.style.display = 'none';
});

// Iteracting with btn roll 
btnRoll.addEventListener('click', function () {
    // Check playerscore first
    if (Number(playerScore1.textContent) >= 100 || Number(playerScore2.textContent) >= 100) { return; }
    // Generating random number between (1,6)
    const RandomNumber = Math.trunc(Math.random() * 6) + 1; //console.log(`Random: ${RandomNumber}`);
    // Processing for images to make them coresspond to random number
    imgDice.style.display = 'block';
    imgDice.src = `dice-${RandomNumber}.png`;

    let Score = [Number(currentScore1.textContent), Number(currentScore2.textContent)];
    if (RandomNumber === 1) {
        WhoFirst = ChangePlayer(WhoFirst);
        currentScore1.textContent = 0;
        currentScore2.textContent = 0;
    } else {
        if (WhoFirst === 1) {
            Score[0] = Score[0] + RandomNumber;
            currentScore1.textContent = Score[0];
        } else {
            Score[1] = Score[1] + RandomNumber;
            currentScore2.textContent = Score[1];
        }
    }
})

// Interacting with hold btn
btnHold.addEventListener('click', function () {
    if (Number(playerScore1.textContent) >= 100 || Number(playerScore2.textContent) >= 100) { return; }
    //WhoFirst = ChangePlayer(WhoFirst);
    let PScore = [Number(playerScore1.textContent), Number(playerScore2.textContent)];
    if (WhoFirst === 1) {
        PScore[0] = PScore[0] + Number(currentScore1.textContent);
        playerScore1.textContent = PScore[0];
    } else {
        PScore[1] = PScore[1] + Number(currentScore2.textContent);
        playerScore2.textContent = PScore[1];
    }
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;

    WhoWin(PScore1, PScore2);

    if (PScore[0] < 100 && PScore[1] < 100) WhoFirst = ChangePlayer(WhoFirst);
})
