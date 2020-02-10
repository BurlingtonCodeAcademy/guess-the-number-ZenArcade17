const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function randomInt(min, max) {
  let range = max - min + 1;
  return (min + Math.floor(Math.random() * range));
}

//Here is my sanitize function
function saniResp(string) {
  return string.trim().toLowerCase()
}

let lowNum = 1;
let highNum = 100
let randNum = randomInt(lowNum, highNum)

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number between 1 and 100,\nand I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.

  let response = await ask("Is your number " + randNum + "? ");
  response = saniResp(response);
  while (response !== "yes" || response !== "y") {
    let lastGuess = randNum
    response = saniResp(response);
    if (response === "yes" || response === "y") {
      console.log("VICTORY! YOUR SOUL IS MINE!!!")
      process.exit()
    } else if (response === "no" || response === "n") {
      response = await ask("Is it higher or lower? ")
      response = saniResp(response)
        if (response === "higher" || response === "h") {
          lowNum = randNum + 1
          randNum = randomInt(lowNum, highNum)
          response = await ask("Is your number " + randNum + "? ")
          if (lastGuess === randNum) {
            console.log("You Cheated! Game Over!")
            process.exit()
          }
        } else if (response === "lower" || response === "l") {
          highNum = randNum - 1
          randNum = randomInt(lowNum, highNum)
          response = await ask("Is your number " + randNum + "? ")
          if (lastGuess === randNum) {
            console.log("You Cheated! Game Over!")
            process.exit()
          }
        }
        
      }


    
  }





}
