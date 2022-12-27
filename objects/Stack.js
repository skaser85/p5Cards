class Stack {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.cards = [];
        this.louvered = true;
        this.louveredPadding = CARD_HEIGHT * 0.2;
    }

    addCard(card) {
        this.cards.push(card);
        if (this.cards.length > 10) 
            this.louveredPadding = CARD_HEIGHT * 0.1;
    }

    removeCard(card) {
        this.cards = this.cards.filter(c => c !== card);
    }

    update(m) {
        for (let i = 0; i < this.cards.length; i++) {
            let c = this.cards[i];
            if (c.returning) {
                c.pos.set(c.originalPos);
                c.returning = false;
                continue;
            }
            if (c.collides(m)) {
                if (!activeCard) {
                    c.hovered = true;
                    activeCard = c;
                } else {
                    if (activeCard !== c) {
                        activeCard.hovered = false;
                        activeCard.dragging = false;
                        c.hovered = true;
                        activeCard = c;
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

        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            if (this.louvered) {
                if (!activeCard || (activeCard && activeCard !== card)) {
                    card.setPos(this.pos.x, this.pos.y);
                    let x = this.pos.x;
                    let y = this.pos.y + (this.louveredPadding * i);
                    card.setPos(createVector(x, y));
                }
            }
            card.draw();
        }
        if (activeCard && activeCard.dragging)
            activeCard.draw();
    }
}