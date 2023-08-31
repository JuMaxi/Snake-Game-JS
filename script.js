
let snakeDirection = 4; // Four directions: 1 UP, 2 DOWN, 3 LEFT, 4 RIGHT
let snakeParts = []; // An array of snake parts, for drawing the body. Each snake part is an object with ROW and COLUMN:
snakeParts.push({row: 1, column: 3}); 
snakeParts.push({row: 1, column: 4});
snakeParts.push({row: 1, column: 5});
let fruit = {row:0, column:0}; 
let score = 0;
let interval = 0;

function drawSnake(){
  checkTableLimits();
  checkSnakeHeadHitSnakeBody()

    for(let i = 0; i < snakeParts.length; i++){
        let snake = snakeParts[i];
        let p = document.getElementById('PartSnake').rows[snake.row].cells[snake.column];

        p.style.backgroundColor = "#8F3700";
    }

    let t = document.getElementById('PartSnake').rows[fruit.row].cells[fruit.column];
    t.style.backgroundColor = "red";
}

function moveSnake(){
  let r = snakeParts[snakeParts.length - 1].row;
  let c = snakeParts[snakeParts.length -1].column;

 if(snakeDirection == 1){
    r--;
 }
 else{
  if(snakeDirection == 2){
    r++;
  }
  else{
    if(snakeDirection == 3){
      c--;
    }
    else{
      c++;
    }
  }
 }
  snakeParts.push({row: r, column: c});
}

function gotFruit(){
  if(snakeParts[snakeParts.length -1].row == fruit.row 
    && snakeParts[snakeParts.length - 1].column == fruit.column){
      return true;
    }
    return false;
}

function deleteTail(tail){
  let t = document.getElementById('PartSnake').rows[tail.row].cells[tail.column];
  t.style.backgroundColor = "#FFFFFF";
}

document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 38: // Up arrow key - less one row
      snakeDirection = 1;
      break;
    case 40: // Down arrow key - plus one row
      snakeDirection = 2;
      break;
    case 37: // Left arrow key - less one column
      snakeDirection = 3;
      break;
    case 39: // Right arrow key - plus one column
      snakeDirection = 4;
      break;
  }
});

function newFruit(){
  fruit = {row: Math.floor(Math.random() * 25), column: Math.floor(Math.random() * 25)};

  if(checkNewFruitIndexIsPartsSnake()){
    newFruit()
  }
  else{
    let t = document.getElementById('PartSnake').rows[fruit.row].cells[fruit.column];
    t.style.backgroundColor = "red";
  }
}

function checkNewFruitIndexIsPartsSnake(){
  snakeParts.forEach(part => {
    if(part.row == fruit.row && part.column == fruit.column){
      return true;
    }
  });
  return false;
}

function checkSnakeHeadHitSnakeBody(){
  for(let i = 0; i < snakeParts.length -1; i++){
    if(snakeParts[snakeParts.length - 1].row == snakeParts[i].row
      && snakeParts[snakeParts.length - 1].column == snakeParts[i].column){
      alert("Game over :(");
      clearInterval(interval);
    }
  }
}

function sumScore(){
  score = score + 1;
  let sum = document.getElementById('score').innerText = "Score: " + score;
}

function checkTableLimits(){
  if(snakeParts[snakeParts.length - 1].row == 29
    || snakeParts[snakeParts.length - 1].column == 32
    || snakeParts[snakeParts.length - 1].row == -1
    || snakeParts[snakeParts.length - 1].column == -1)
    {
      alert("Game over :(");
      clearInterval(interval);
  }
}
const mainFunction = () => {
  moveSnake();
  if(gotFruit()){
    sumScore();
    newFruit();
  }
  else{
    let tail = snakeParts.shift();
    deleteTail(tail);
  }
  drawSnake();
};

function startGame(){
  interval = setInterval(mainFunction, 150);
  newFruit();

  let hide = document.getElementsByTagName('button')[0];
  hide.style.display = "none";

  let hideinstructions = document.getElementById('instructions');
  hideinstructions.style.display = "none";
}
