import {Game} from './game.js';
import {Gui} from './gui.js';

const game = new Game();
const gui = new Gui();

gui.printGameTitle();
gui.printBoard();

console.log('Rolling... ' + game.diceThrow());