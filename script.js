let gameBoard = document.getElementById('game-board');
let scoreElement = document.getElementById('score');
let highScoreElement = document.getElementById('high-score');
let gameOverElement = document.getElementById('game-over');
let snake = [];
let food = null;
let score = 0;
let highScore = 0;
let direction = 'right';
let gameOver = false;

// Initialize game board
for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    let cell = document.createElement('div');
    cell.className = 'game-cell';
    gameBoard.appendChild(cell);
  }
}

// Initialize snake
snake.push({ x: 10, y: 10 });
snake.push({ x: 11, y: 10 });
snake.push({ x: 12, y: 10 });

// Function to render game board
function renderGameBoard() {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      let cell = gameBoard.children[i * 20 + j];
      cell.className = 'game-cell';
      if (snake.find((s) => s.x === j && s.y === i)) {
        cell.className += ' snake-cell';
      }
      if (food && food.x === j && food.y === i) {
        cell.className += ' food-cell';
      }
    }
  }
}

// Function to generate food
function generateFood() {
  let x = Math.floor(Math.random() * 20);
  let y = Math.floor(Math.random() * 20);
  while (snake.find((s) => s.x === x && s.y === y) || x < 0 || x >= 20 || y < 0 || y >= 20) {
    x = Math.floor(Math.random() * 20);
    y = Math.floor(Math.random() * 20);
  }
  food = { x, y };
  renderGameBoard(); // Add this line to render the food cell
}

// Function to handle user input (up, down, left, right)
function handleInput(newDirection) {
  if (gameOver) return;
  if (newDirection === 'up' && direction !== 'down') direction = 'up';
  if (newDirection === 'down' && direction !== 'up') direction = 'down';
  if (newDirection === 'left' && direction !== 'right') direction = 'left';
  if (newDirection === 'right' && direction !== 'left') direction = 'right';
  moveSnake();
}

// Function to move snake
function moveSnake() {
  const [headX, headY] = [snake[0].x, snake[0].y]; // Fix the destructuring
  let newX = headX;
  let newY = headY;

  switch (direction) {
    case 'up':
      newY -= 1;
      break;
    case 'down':
      newY += 1;
      break;
    case 'left':
      newX -= 1;
      break;
    case 'right':
      newX += 1;
      break;
    default:
      console.error(`Invalid direction: ${direction}`);
      return;
  }

  // Check for collision with boundaries
  if (newX < 0 || newX >= 20 || newY < 0 || newY >= 20) {
    gameOver = true;
    return;
  }

  // Check for collision with self
  if (snake.find((s) => s.x === newX && s.y === newY)) {
    gameOver = true;
    return;
  }

  // Update the snake's position
  snake.unshift({ x: newX, y: newY });

  // Check if snake has eaten food
  if (food && food.x === newX && food.y === newY) {
    score++;
    scoreElement.textContent = score;
    generateFood(); // Generate new food
  } else {
    snake.pop(); // Remove the tail
  }

  renderGameBoard(); // Render the updated game board
}

// Initialize game
generateFood();
renderGameBoard();

// Add event listeners for user input
document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        handleInput('up');
        break;
      case 'ArrowDown':
        handleInput('down');
        break;
      case 'ArrowLeft':
        handleInput('left');
        break;
      case 'ArrowRight':
        handleInput('right');
        break;
      case ' ':
        if (gameOver) {
          gameOver = false;
          score = 0;
          scoreElement.textContent = score;
          snake = [{ x: 10, y: 10 }]; // assuming the initial y-coordinate is 10
        }
        break; // move the break statement outside the if block
    }
  });