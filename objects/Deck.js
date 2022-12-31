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
        this.dealt = [];
    }

    shuffle() {
        shuffleArray(this.cards);
    }

    dealTo(stack, count) {
        let cards = this.cards.slice(0, count);
        for (let card of cards) {
            this.dealt.push(card);
        }
        this.cards.splice(0, count);
        stack.addCards(cards);
    }
}