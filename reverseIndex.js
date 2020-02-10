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

function saniResp(string) {
    return string.trim().toUpperCase()
}

//Reverse program unfinished, but still runs as is
start();

async function start() {
    console.log("Let's play a game where I (computer) make up a number between 1 and 100,\nand you (human) try to guess it.")
    let playTime = await ask("Would you like to play? (Y or N) ");
    playTime = saniResp(playTime)
    if (playTime === "Y") {
        let secretNum = randomInt(1, 1);  //using these values for testing purposes
        let guess = await ask("Ok! I've thought of a number between 1 and 100. What's your first guess? ");
        if (guess != secretNum) {
            console.log("Wrong! Guess again!")
            //Continuing here     

        } else {
            console.log("Congrats! Victory is yours!")
            process.exit()
        }
    
    } else {
        console.log("Ok! Maybe next time! Goodbye!");
        process.exit()
    }

}

