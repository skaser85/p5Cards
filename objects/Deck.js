const createDeck = () => {
    let deck = new Deck();
    for (let s in SUITS) {
        let suit = createSuit(SUITS[s]);
        for (let c of suit.cards) {
            deck.cards.push(c);
        }
    }
    return deck;
}

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  

class Deck {
    constructor() {
        this.cards = [];
    }

    shuffle() {
        shuffleArray(this.cards);
    }
}