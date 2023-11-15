    // const score = {
    //   Wins: 0,
    //   Lose: 0,
    //   Ties: 0
    // };

    let score = JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      lose: 0,
      ties: 0
    };
    // Above is a shortcut which is Operator 'OR (||)'
    // if (!score) {
    //   score = {
    //     wins: 0,
    //     lose: 0,
    //     ties: 0
    //   };
    // }

      updateScoreElement();

      let isAutoPlaying = false;
      let intervalId;
      function autoPlay() {
        if (!isAutoPlaying) {
         intervalId = setInterval(function() {
            const playerMove = pickComputerMove();
            playGame(playerMove);
          }, 1000);
          isAutoPlaying = true;
        } else {
          clearInterval(intervalId);
          isAutoPlaying = false;
        }
      }

      document.querySelector('.js-rock-button').addEventListener('click', () => {
        playGame('rock');
      });

      document.querySelector('.js-paper-button').addEventListener('click', () => {
        playGame('paper');
      });

      document.querySelector('.js-scissors-button').addEventListener('click', () => {
        playGame('scissors');
      });

      document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
          playGame('rock');
        } else if (event.key === 'p') {
          playGame('paper');
        } else if (event.key === 's') {
          playGame('scissors');
        }
      });
    function playGame(playerMove) {
      const computerMove = pickComputerMove()
      
      let result = '';

      if (playerMove === 'rock') {
        if (computerMove === 'rock') {
          result = 'Tie!';
        } else if (computerMove === 'paper') {
          result = 'You Lose!';
        } else if (computerMove === 'scissors') {
          result = 'You Win!';
        }

      } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
          result = 'You Win!';
        } else if (computerMove === 'paper') {
          result = 'Tie!';
        } else if (computerMove === 'scissors') {
          result = 'You Lose!';
        }
        
      } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
          result = 'You Lose!';
        } else if (computerMove === 'paper') {
          result = 'You Win!';
        } else if (computerMove === 'scissors') {
          result = 'Tie!';
        }
      }

      if (result === 'You Win!') {
        score.wins += 1;
      } else if (result === 'You Lose!') {
        score.lose += 1;
      } else if (result === 'Tie!') {
        score.ties += 1;
      }

      localStorage.setItem('score', JSON.stringify(score));

      updateScoreElement();

      document.querySelector('.js-result').innerHTML = result;

      document.querySelector('.js-moves').innerHTML = `You
      <img src="/Images/${playerMove}-emoji.png" alt="Rock" class="move-icon">
      <img src="/Images/${computerMove}-emoji.png" alt="Scissor" class="move-icon">
      Computer`;

      // alert(`You picked: ${playerMove}. Computer picked: ${computerMove}. Result: ${result}
      // Wins : ${score.wins}, Losses: ${score.lose}, Ties: ${score.ties}`);
    }

    function updateScoreElement() {
      document.querySelector('.js-score').innerHTML = `Wins : ${score.wins}, Losses: ${score.lose}, Ties: ${score.ties}`;
    }

    function pickComputerMove() {
      const randomNumber = Math.random();

      let computerMove = '';

      if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
      } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
      } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
      }
      return computerMove;
    }
