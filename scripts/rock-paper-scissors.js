let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
  tie: 0
};

const resultElement = document.querySelector('.js-result');
const moveElement = document.querySelector('.js-move');

updateScoreElement();

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 's') {
    stopAutoPlay();
  } else if (event.key === 'Backspace') {
    confirmationMessageDisplay();
  } else if (event.key === 'y' || event.key === 'Enter') {
    resetScore();
    confirmationMessageBox.innerHTML = '';
  } else if (event.key === 'n') {
    confirmationMessageBox.innerHTML = '';
  }
});

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      autoPlayButton.innerHTML = 'Stop Playing';
      isAutoPlaying = true;
      
    } else {
      stopAutoPlay();
    }
}

function stopAutoPlay() {
  clearInterval(intervalId);
  autoPlayButton.innerHTML = 'Auto Play';
  isAutoPlaying = false;
}

function resetScore() {
  score.win = 0;
  score.lose = 0;
  score.tie = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  resultElement.innerHTML = '';
  moveElement.innerHTML = '';
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });


const autoPlayButton = document.querySelector('.js-auto-play-button');

autoPlayButton.addEventListener('click', () => {
    autoPlay();
  });

const confirmationMessageBox = document.querySelector('.js-confirmation-message-box');

function confirmationMessageDisplay() {
  confirmationMessageBox.innerHTML = `
      <div class="confirmation-message-box">
        <p>Are you sure you want to reset the score?</p>
        <button class="js-confirm-yes-button">Yes</button>
        <button class="js-confirm-no-button">No</button>
      </div>
    `;

  document.querySelector('.js-confirm-yes-button')
    .addEventListener('click', () => {
      resetScore();
      confirmationMessageBox.innerHTML = '';
    })
  
  document.querySelector('.js-confirm-no-button')
    .addEventListener('click', () => {
      confirmationMessageBox.innerHTML = '';
    })
}

function confirmYes() {
  document.querySelector('.js-confirm-yes-button')
    .addEventListener('click', () => {
      resetScore();
      confirmationMessageBox.innerHTML = '';
    })
}

function confirmNo() {
  document.querySelector('.js-confirm-no-button')
    .addEventListener('click', () => {
      confirmationMessageBox.innerHTML = '';
    })
}

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    confirmationMessageDisplay();
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
  let computerMove = pickComputerMove();
  let result = '';
  
  if (playerMove == 'rock') {
    if (computerMove == 'rock') {
      result = 'Tie.';
    } else if (computerMove == 'paper') {
      result = 'You lose.';
    } else if (computerMove == 'scissors') {
      result = 'You win.';
    }
  } else if (playerMove == 'paper') {
      if (computerMove == 'rock') {
        result = 'You win.';
      } else if (computerMove == 'paper') {
        result = 'Tie.';
      } else if (computerMove == 'scissors') {
        result = 'You lose.';
      }
  } else if (playerMove == 'scissors') {
      if (computerMove == 'rock') {
        result = 'You lose.';
      } else if (computerMove == 'paper') {
        result = 'You win.';
      } else if (computerMove == 'scissors') {
        result = 'Tie.';
      }
  }
  
  if (result === 'You win.') {
    score.win += 1;
  } else if (result === 'You lose.') {
    score.lose += 1;
  } else if (result === 'Tie.') {
    score.tie += 1;
  }
  
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  resultElement.innerHTML = result;

  moveElement.innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove;
  
  if (randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber < 2/3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }
  
  return computerMove;
}