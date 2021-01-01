export class Game {
    constructor() {}

    createNewGame() {}

    diceThrow () {
        return Math.floor (Math.random() * 2) +
               Math.floor (Math.random() * 2) +
               Math.floor (Math.random() * 2) +
               Math.floor (Math.random() * 2);
    }
}
