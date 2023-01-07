class Stack {
    constructor(x, y, louvered) {
        this.pos = createVector(x, y);
        this.cards = [];
        this.louvered = louvered;
        this.louveredPadding = C.cardHeight * 0.2;
        this.moveSet = [];
        this.hovered = false;
    }

    addCards(cards) {
        if (!Array.isArray(cards))
            cards = [cards];
        for (let card of cards) {
            card.stack = this;
            this.cards.push(card);
        }

        if (this.louvered) {
            for (let i = 0; i < this.cards.length; i++) {
                let card = this.cards[i];
                let x = this.pos.x;
                let y = this.pos.y + (this.louveredPadding * i);
                card.setPos(createVector(x, y));
                card.originalPos = card.pos.copy();
            }
        } else {
            for (let card of cards) {
                card.setPos(this.pos.copy());
                card.originalPos = card.pos.copy();
            }
        }
    }

    removeCards(cards) {
        if (!Array.isArray(cards))
            cards = [cards];
        this.cards = this.cards.filter(c => !cards.includes(c));
    }

    createMoveSet() {
        if (!activeCard)
            return;
        let index = this.cards.indexOf(activeCard);
        this.moveSet = this.cards.slice(index, this.cards.length);
        for (let card of this.moveSet) {
            card.originalPos = card.pos.copy();
        }
    }

    updateMoveSet(delta) {
        for (let card of this.moveSet) {
            card.pos.add(delta);
        }
    }

    destroyMoveSet() {
        for (let card of this.moveSet) {
            if (card.stack === this)
                card.setPos(card.originalPos);
        }
        this.moveSet = [];
    }

    getBoundingBox() {
        return getBoundingBox(this.pos, C.cardWidth, C.cardHeight);
    }

    collidesRect(r) {
        return collidesRectRect(this, r);
    }

    collidesPoint(p) {
        return collidesRectPoint(this.getBoundingBox(), p);
    }

    willAccept(cards) {
        // should be implemented in the child class
        return false;
    }

    checkCards(cards) {
        // should be implemented in the child class
        return false;
    }

    update(m) {

        if (activeCard) {
            this.hovered = this.collidesRect(activeCard);
        } else {
            this.hovered = this.collidesPoint(m);
        }

        if (!this.cards.length)
            return;

        this.louveredPadding = this.cards.length > 10 ? C.cardHeight * 0.15 : C.cardHeight * 0.2;

        if (activeCard && !activeCard.dragging) {
            if (!activeCard.collidesPoint(m)) {
                deactivateActiveCard();
            } else if (!activeCard.dragging) {
                let index = this.cards.indexOf(activeCard);
                if (index < this.cards.length - 1) {
                    if (this.cards[index+1].collidesPoint(m))
                        activateCard(this.cards[index+1]);
                }
            }
        }

        if (this.louvered) {
            if (!activeCard) {
                for (let i = this.cards.length-1; i >= 0; i--) {
                    let c = this.cards[i];
                    if (c.collidesPoint(m)) {
                        activateCard(c);
                        break;
                    }
                }
            }
        } else {
            if (!activeCard) {
                let card = this.cards[this.cards.length-1];
                if (card.collidesPoint(m))
                    activateCard(card);
            }
        }
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        strokeWeight(3);
        stroke(this.hovered ? color("red") : color("black"));
        rect(-3, -3, C.cardWidth + 5, C.cardHeight + 5);
        pop();

        let cards = this.cards.filter(c => !this.moveSet.includes(c));
        for (let card of cards) {
            card.draw();
        }
    }
}

class StandardStack extends Stack {
    constructor(x, y, louvered) {
        this.pos = createVector(x, y);
        this.cards = [];
        this.louvered = louvered;
        this.louveredPadding = C.cardHeight * 0.2;
        this.moveSet = [];
        this.hovered = false;
    }

    update(m) {

        if (activeCard) {
            this.hovered = this.collidesRect(activeCard);
        } else {
            this.hovered = this.collidesPoint(m);
        }

        if (!this.cards.length)
            return;

        this.louveredPadding = this.cards.length > 10 ? C.cardHeight * 0.15 : C.cardHeight * 0.2;

        if (activeCard && !activeCard.dragging) {
            if (!activeCard.collidesPoint(m)) {
                deactivateActiveCard();
            } else if (!activeCard.dragging) {
                let index = this.cards.indexOf(activeCard);
                if (index < this.cards.length - 1) {
                    if (this.cards[index+1].collidesPoint(m))
                        activateCard(this.cards[index+1]);
                }
            }
        }

        if (this.louvered) {
            if (!activeCard) {
                for (let i = this.cards.length-1; i >= 0; i--) {
                    let c = this.cards[i];
                    if (c.collidesPoint(m)) {
                        activateCard(c);
                        break;
                    }
                }
            }
        } else {
            if (!activeCard) {
                let card = this.cards[this.cards.length-1];
                if (card.collidesPoint(m))
                    activateCard(card);
            }
        }
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        strokeWeight(3);
        stroke(this.hovered ? color("red") : color("black"));
        rect(-3, -3, C.cardWidth + 5, C.cardHeight + 5);
        pop();

        let cards = this.cards.filter(c => !this.moveSet.includes(c));
        for (let card of cards) {
            card.draw();
        }
    }
}

class DrawStack extends Stack {
    constructor(x, y) {
        super(x, y, false);
        this.discardStack = null;
    }

    setDiscardStack(s) {
        this.discardStack = s;
    }

    handleClick() {
        if (this.cards.length) {
            let card = this.cards[this.cards.length-1];
            if (card.turned) {
                this.removeCards(card);
                this.discardStack.addCards(card);
            }
        } else {
            this.reset();
        }
    }

    reset() {
        if (this.discardStack.cards.length) {
            let cards = this.discardStack.cards.reverse();
            cards.map(c => c.turned = false);
            this.discardStack.removeCards(cards);
            this.addCards(cards);
        }
    }
}

class DiscardStack extends Stack {
    constructor(x, y) {
        super(x, y, false);
    }
}

class SuitStack extends Stack {
    constructor(x, y) {
        super(x, y, false);
        this.suit = null;
    }

    willAccept(cards) {
        let first = cards[0];
        if (!this.cards.length) {
            if (VALUES[first.value] !== VALUES.ACE)
                return false;
            if (cards.length > 1) {
                if (!this.checkCards(cards))
                    return false;
            }
            this.suit = first.suit;
            return true;
        } else {
            if (cards.length === 1) {
                return first.suit === this.suit;
            } else {
                return this.checkCards(cards);
            }
        }
    }

    checkCards(cards) {
        for (let i = 1; i < cards.length; i++) {
            let card1 = cards[i];
            let card0 = cards[i-1];
            if (card0.suit.suit !== card1.suit.suit) {
                return false;
            }
            let val1 = VALUES[card1.value];
            let val0 = VALUES[card0.value];
            let diff = val1 - val0;
            if (diff !== 1) {
                return false;
            }
        }
        return true;
    }
}

class PlayStack extends Stack {
    constructor(x, y) {
        super(x, y, true);
        this.initialDeal = true;
    }

    update(m) {
        if (this.initialDeal && this.cards.length) {
            this.cards[this.cards.length-1].turned = true;
            this.initialDeal = false;
        }
        super.update(m);
    }

    willAccept(cards) {
        if (!this.cards.length) {
            if (cards.length === 1) {
                return true;
            } else {
                for (let i = 1; i < cards.length; i++) {
                    if (!this.checkCards(cards[i-1], cards[i]))
                        return false;
                }
                return true;
            }
        }
        let last = this.cards[this.cards.length-1];
        let first = cards[0];
        if (!this.checkCards(last, first))
            return false;
        for (let i = 1; i < cards.length; i++) {
            if (!this.checkCards(cards[i-1], cards[i]))
                return false;
        }
        return true;
    }

    checkSuitColor(prevCardSuit, checkCardSuit) {
        let prevIsBlack = [SUITS.CLUB, SUITS.SPADE].includes(prevCardSuit);
        let prevIsRed = [SUITS.DIAMOND, SUITS.HEART].includes(prevCardSuit);
        let checkIsBlack = [SUITS.CLUB, SUITS.SPADE].includes(checkCardSuit);
        let checkIsRed = [SUITS.DIAMOND, SUITS.HEART].includes(checkCardSuit);
        return prevIsRed ? checkIsBlack : checkIsRed;
    }

    checkValue(prevCardValue, checkCardValue) {
        return VALUES[prevCardValue] - VALUES[checkCardValue] === 1;
    }

    checkCards(prevCard, checkCard) {
        return this.checkSuitColor(prevCard.suit.suit, checkCard.suit.suit) && 
               this.checkValue(prevCard.value, checkCard.value);
    }
}