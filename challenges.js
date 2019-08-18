



var scores, roundScore, activePlayer, gamePlaying;

init();
var lastDice;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

document.querySelector('.btn-roll').addEventListener('click', function(){

    if (gamePlaying) {
        var dice = Math.floor(Math.random()*6) + 1;

        var diceDOM = document.querySelector('.dice');
        
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        if (dice === 6 && lastDice === 6) {
            //Player loses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

        } else if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
    
        }

        lastDice = dice;
    }

   

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
    //ADD CURRENT SCORE TO GLOBAL SCORE
    scores[activePlayer] += roundScore; 


    // UPDATE UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;
    // All the values of undefined, 0, null or empty string '' are coerced to false.
    // Anything else is coerced to TRUE
    if(input) {
        winningScore = input;

    } else {
        winningScore = 100;
    }
    //CHECK IF PLAYER WON THE GAME
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;

    } else {
        nextPlayer();
    }
    }
    

});

function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    gamePlaying = true;

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');



}