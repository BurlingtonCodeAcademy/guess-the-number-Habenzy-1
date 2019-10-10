const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function getMedian(maximum, minimum) {
  return Math.floor((maximum + minimum) / 2)
}

async function start() {

  let max = 100
  let min = 1
  let tries = 1
  
  let guess = getMedian(max, min)

  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  
  let yesNo = await ask("Is your number " + guess)

  while(yesNo !== 'y') {
    tries ++

    let highLow = await ask("Is it higher, or lower? ")

    if (highLow === 'h') {
      min = guess
      guess = getMedian(max, min)
    }
    else if (highLow === 'l') {
      max = guess
      guess = getMedian(max, min)
    } else {
      console.log("Invalid input for higher or lower,\nplease use 'h' for higher and 'l' for lower")
    }
    if (max < min) {
      console.log("No cheating! Now you have to start over.")
      process.exit()
    }
    yesNo = await ask("Is your number " + guess)
  }
  console.log(`Victory is mine foolish meatbag!\nIt only took me ${tries} attempt(s)`)

  process.exit();
}

start();
