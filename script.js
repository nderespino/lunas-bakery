let game = document.querySelector(".game");
let character = document.querySelector(".character");
let fruits = document.querySelector(".fruits");
let badFruits = document.querySelector(".badFruits");
let fruitsPic = document.querySelector('img[name="fruitsPic"]');
let badFruitsPic = document.querySelector('img[name="badFruitsPic"]');
let score = 0;
let charLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
let charBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
let charTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
let gameStart = document.querySelector('.start-screen');
//let fruitBottom = parseInt(window.getComputedStyle(fruits).getPropertyValue("bottom"));
let running = false;

//function for how much character moves left
function moveCharLeft() {
  if (charLeft > 0) {
    charLeft -= 25;
    character.style.left = charLeft + 'px';
  }
}

//how character moves right
function moveCharRight() {
  if (charLeft < 450) {
    charLeft += 25;
    character.style.left = charLeft + 'px';
  }
}

//player controls with arrow keys
function control(event) {
  if (event.key == "ArrowLeft") {
    moveCharLeft();
  }
  if (event.key == "ArrowRight") {
    moveCharRight();
  }
}
//keydown event listener
document.addEventListener("keydown", control);

//function to generate fruit at random
function generateFruit() {
  // Create a new fruit and set its initial position
  let fruitBottom = 470;
  let fruitLeft = Math.floor(Math.random() * 450);
  let imagesArray= [ "images/pixel-spritetest.jpg","images/sans.png","images/sprite-test.jpg"];


 //randomize images array for falling fruit
let num = Math.floor(Math.random() * (imagesArray.length));
document.fruitsPic.src = imagesArray[num];
 
 
 let fruit = document.createElement('div');
 let newImage = document.createElement('img');
  fruit.style.bottom = fruitBottom + 'px';
  fruit.style.left = fruitLeft + 'px';
  fruit.setAttribute("class", "fruit");
  newImage.setAttribute("src", imagesArray[num]);
  fruit.appendChild(newImage);
  fruits.appendChild(fruit);
  
  
  //function for fruit to fall down to be caught by player and add score(inside generatefruit function)
  function fallDownFruit() {
    fruitBottom -= 5;
    fruit.style.bottom = fruitBottom + 'px';
    fruit.style.left = fruitLeft + 'px';
    if (fruitBottom < charBottom + 40 && fruitBottom > charBottom && fruitLeft > charLeft - 30 && fruitLeft < charLeft + 80) {
      fruits.removeChild(fruit);
      clearInterval(fallInterval); // Make sure to clear the interval after the fruit is removed
      score++;
      setScore(score);
    }

    
  }



  let fallInterval = setInterval(fallDownFruit, 20);

  // Generate new fruit
  if (running) setTimeout(generateFruit, 1000);
}

//copied functions for bad fruit attributes
function generateBadFruit() {
  // Create a new bad fruit and set its initial position
  let badFruitPic = "images/pixel-test-bomb.jpg"
  let badFruitBottom = 470;
  let badFruitLeft = Math.floor(Math.random() * 450);
  let badFruit = document.createElement('div');
  let newBadImage = document.createElement('img');
  badFruit.style.bottom = badFruitBottom + 'px';
  badFruit.style.left = badFruitLeft + 'px';
  badFruit.setAttribute("class", "badFruit");
  newBadImage.setAttribute("src", badFruitPic);
  badFruit.appendChild(newBadImage);
  badFruits.appendChild(badFruit);
  

  function fallDownBadFruit() {
    badFruitBottom -= 5;
    badFruit.style.bottom = badFruitBottom + 'px';
    badFruit.style.left = badFruitLeft + 'px';
    if (badFruitBottom < charBottom + 40 && badFruitBottom > charBottom && badFruitLeft > charLeft - 30 && badFruitLeft < charLeft + 80) {
      badFruits.removeChild(badFruit);
      clearInterval(fallInterval); // Make sure to clear the interval after the fruit is removed
      setScore(0); // Reset the score to 0
      toggleRestartGame();
      running = false;
      // alert("You lose!");
      score = 0;
    }
  }

  let fallInterval = setInterval(fallDownBadFruit, 20);
  if (running) setTimeout(generateBadFruit, 5000);
}

function setScore(score = 0) {
  document.getElementById('score').innerHTML = "Score: " + score;
}

//function to show start screen and turn off when game starts
  function toggleStartScreen() {
var x = document.querySelector(".start-screen");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  }
  function startGame() {
    toggleStartScreen();
  if (running) {
    running = false; 
  }
  else {
    running = true;
    generateFruit();
    generateBadFruit();
  }
    
  }
//function to turn on game over screen when lose
function toggleRestartGame() {
  var x = document.querySelector(".startOverScreen");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
//restarts the functions that allow the fruits to generate
function restartGame() {
  toggleRestartGame();
  running = true;
    generateFruit();
    generateBadFruit();
}


