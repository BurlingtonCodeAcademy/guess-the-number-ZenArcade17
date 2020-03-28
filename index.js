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
function saniLow(string) {
  return string.trim().toLowerCase()
}

function saniUp(string) {
  return string.trim().toUpperCase()
}

let lowNum = 1
let highNum = 100
let randNum = randomInt(lowNum, highNum)



start()


async function start() {

  let gameChoice = await ask(`Welcome to GUESS THE NUMBER! \nThis is a game where either you (human), or I (computer), think of a number between 1 and 100, and the other one of us tries to guess it! \nIf the guesser guesses incorrectly, they are given a hint of whether the target number is higher, or lower, than their guess. \nIf you would like to be the guesser, please enter the command, "ME". \nIf you would like me (the computer) to be the guesser, please enter the command, "COMP".\n`)
  
  if (gameChoice == 'COMP') {

    startReg()
  

  } else if(gameChoice == "ME") {

    startReverse()


  }
}

async function playAgain() {

  let again = await ask("Would you like to play again? 'Y' or 'N'\n")

  if(again == "Y") {
    await start()
  } else {
    process.exit()
  }
}

async function startReg() {
  console.log("Let's play a game where you (human) make up a number between 1 and 100,\nand I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);


  let response = await ask("Is your number " + randNum + "? ");
  response = saniLow(response);
  while (response !== "yes" || response !== "y") {
    let lastGuess = randNum
    response = saniLow(response);
    if (response === "yes" || response === "y") {
      console.log("VICTORY! YOUR SOUL IS MINE!!!")
      await playAgain()
      
    } else if (response === "no" || response === "n") {
      response = await ask("Is it higher or lower? ")
      response = saniLow(response)
      if (response === "higher" || response === "h") {
        lowNum = randNum + 1
        randNum = randomInt(lowNum, highNum)
        response = await ask("Is your number " + randNum + "? ")
        if (lastGuess === randNum) {
          console.log("You Cheated! Game Over!")
          playAgain()
          
        }
      } else if (response === "lower" || response === "l") {
        highNum = randNum - 1
        randNum = randomInt(lowNum, highNum)
        response = await ask("Is your number " + randNum + "? ")
        if (lastGuess === randNum) {
          console.log("You Cheated! Game Over!")
          playAgain()
          
        }
      }

    }



  }





}


async function startReverse() {
  console.log("Let's play a game where I (computer) make up a number between 1 and 100,\nand you (human) try to guess it.")
  let playTime = await ask("Would you like to play? (Y or N) ")
  playTime = saniUp(playTime)
  if (playTime === "Y") {
    let secretNum = randomInt(1, 100)
    let guess = ''
    let guessBank = []

    console.log("Ok! I've thought of a number between 1 and 100. \nIf at any time you want to see all your previous guesses, just enter the command, 'guesses'. \nOk, let's play! What's your first guess? " + secretNum)
    while (guess != secretNum) {
      guess = await ask('\n>_')
      if (guess < 1 || guess > 100) {

        console.log(`${guess} is not a number between 1 and 100! Please guess again.`)

      } else if (guess > secretNum) {

        guessBank.push(guess)
        console.log("Wrong- My number is LOWER than your guess! Guess again!")




      } else if (guess < secretNum) {

        guessBank.push(guess)
        console.log("Wrong- My number is HIGHER than your guess! Guess again!")

      } else if (guess == secretNum) {
        console.log("Congrats! Victory is yours!")
        await playAgain()
        
        

      } else if (guess == 'guesses') {

        console.log(`You have guessed: ${guessBank}`)

      } else {
        console.log("'" + guess + "'" + " is not a recognizable command.")
      }
    }





  } else {
    console.log("Ok! Maybe next time! Goodbye!");
    
  }
}
