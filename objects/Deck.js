const createStandardDeck = () => {
    let deck = new Deck();
    for (let s in SUITS) {
        let suit = createSuit(SUITS[s]);
        for (let c of suit.cards) {
            deck.cards.push(c);
        }
    }
    return deck;
}

const createUnoDeck = (img) => {
    let deck = new UnoDeck(img);
    for (let y = 0; y <= 8; y++) {
        let unoColor = UNO_COLORS[Object.keys(UNO_COLORS)[y % 4]];
        for (let x = 0; x <= 14; x++) {
            if (y > 3 && x === 0)
                continue;
            let unoValue = null;
            let wildCardType = WILD_CARD_TYPES.NONE;
            if (x < 11) {
                unoValue = UNO_VALUES[Object.keys(UNO_VALUES)[x]];
            } else {
                unoValue = UNO_VALUES.WILD;
                switch (x) {
                    case 11: wildCardType = WILD_CARD_TYPES.SKIP; break;
                    case 12: wildCardType = WILD_CARD_TYPES.REVERSE; break;
                    case 13: wildCardType = WILD_CARD_TYPES.DRAW2; break;
                    case 14: wildCardType = y > 3 ? WILD_CARD_TYPES.WILDDRAW4 : WILD_CARD_TYPES.WILD; break;
                }
            }
            let cardImg = img.get(x*SPRITE_CARD_WIDTH, y*SPRITE_CARD_HEIGHT, SPRITE_CARD_WIDTH, SPRITE_CARD_HEIGHT);
            let card = new UnoCard(cardImg, unoColor, unoValue, wildCardType);
            // console.log(`color ${getEnumKey(UNO_COLORS, unoColor)} :: value ${getEnumKey(UNO_VALUES, unoValue)} :: wild ${getEnumKey(WILD_CARD_TYPES, wildCardType)}`);
            deck.cards.push(card);
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

class UnoDeck extends Deck {
    constructor(cardsImg) {
        super();
        this.img = cardsImg;
    }
}