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

    update(m) {

        if (activeCard) {
            this.hovered = this.collidesRect(activeCard);
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
    }
}

class SuitStack extends Stack {
    constructor(x, y) {
        super(x, y, false);
    }
}

class PlayStack extends Stack {
    constructor(x, y) {
        super(x, y, true);
        this.initialDeal = true;
    }

    update(m) {
        // console.log(this.initialDeal);
        if (this.initialDeal && this.cards.length) {
            this.cards[this.cards.length-1].turned = true;
            this.initialDeal = false;
        }
        super.update(m);
    }
}