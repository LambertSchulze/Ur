
const printGameTitle = () => {
	console.log (`████████ ██   ██ ███████      ██████   █████  ███    ███ ███████      ██████  ███████     ██    ██ ██████ 
   ██    ██   ██ ██          ██       ██   ██ ████  ████ ██          ██    ██ ██          ██    ██ ██   ██
   ██    ███████ █████       ██   ███ ███████ ██ ████ ██ █████       ██    ██ █████       ██    ██ ██████ 
   ██    ██   ██ ██          ██    ██ ██   ██ ██  ██  ██ ██          ██    ██ ██          ██    ██ ██   ██
   ██    ██   ██ ███████      ██████  ██   ██ ██      ██ ███████      ██████  ██           ██████  ██   ██`)
};

printGameTitle()

const printBoard = () => {
	console.log (`
     1    2    3    4    5    6    7    8

   ╔════╦════╦════╦════╗         ╔════╦════╗
   ║    │    │    │    ║         ║    │    ║
N  ║ ¤                 « 7     0 ¦ ¤       ║
   ║    │    │    │    ║         ║    │    ║
   ╠─   ┼════╬════╬════╬════╦════╬════┼   ─╣
   ║    │    │    │    │    │    │    │    ║
   ║                ¤                      ║
   ║    │    │    │    │    │    │    │    ║
   ╠─   ┼════╬════╬════╬════╩════╬════┼   ─╣
   ║    │    │    │    ║         ║    │    ║
S  ║ ¤                 « 7     0 ¦ ¤       ║
   ║    │    │    │    ║         ║    │    ║
   ╚════╩════╩════╩════╝         ╚════╩════╝
`)
};

printBoard()

const diceThrow = () => {
	return Math.floor (Math.random() * 2) +
	       Math.floor (Math.random() * 2) +
	       Math.floor (Math.random() * 2) +
	       Math.floor (Math.random() * 2);
}

console.log ("Roll Test: " + diceThrow() );


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Which piece do should move? ', (answer) => {
  console.log(`You chose: ${answer}`);
  rl.close();
});
