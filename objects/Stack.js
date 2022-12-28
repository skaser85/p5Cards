class Stack {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.cards = [];
        this.louvered = true;
        this.louveredPadding = CARD_HEIGHT * 0.2;
    }

    addCards(cards) {
        for (let card of cards) {
            this.cards.push(card);
        }

        if (this.cards.length > 10) 
            this.louveredPadding = CARD_HEIGHT * 0.15;

        if (this.louvered) {
            for (let i = 0; i < this.cards.length; i++) {
                let card = this.cards[i];
                let x = this.pos.x;
                let y = this.pos.y + (this.louveredPadding * i);
                card.setPos(createVector(x, y));
            }
        }
    }

    removeCard(card) {
        this.cards = this.cards.filter(c => c !== card);
    }

    update(m) {

        if (activeCard) {
            if (!activeCard.collides(m)) {
                deactivateActiveCard();
            } else if (!activeCard.dragging) {
                let index = this.cards.indexOf(activeCard);
                if (index < this.cards.length - 1) {
                    if (this.cards[index+1].collides(m))
                        activateCard(this.cards[index+1]);
                }
            }
        }

        if (this.louvered) {
            if (!activeCard) {
                for (let i = this.cards.length-1; i >= 0; i--) {
                    let c = this.cards[i];
                    if (c.collides(m)) {
                        activateCard(c);
                        break;
                    }
                }
            }
        }
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        strokeWeight(3);
        stroke(color(0, 0, 0, 255));
        rect(-3, -3, CARD_WIDTH + 5, CARD_HEIGHT + 5);
        pop();

        for (let card of this.cards) {
            card.draw();
        }

        if (activeCard && activeCard.dragging)
            activeCard.draw();
    }
}