class Card {
    constructor(suit, value) {
        this.pos = createVector(0, 0);
        this.suit = suit;
        this.value = value;
        this.fontSize = 28;
        this.color = "white";
        this.padding = 0;
        this.hovered = false;
        this.turned = false;
        this.dragging = false;
        this.returning = false;
        this.originalPos = null;
    }

    setPos(pos) {
        this.pos.set(pos);
    }

    collides(other) {
        return ((other.x >= this.pos.x) && (other.x <= this.pos.x + CARD_WIDTH)) &&
               ((other.y >= this.pos.y) && (other.y <= this.pos.y + CARD_HEIGHT));
    }

    draw() {
        if (this.hovered) {
            push();
            translate(this.pos.x, this.pos.y);
            strokeWeight(3);
            stroke(color(0, 255, 0, 255));
            rect(-3, -3, CARD_WIDTH + 5, CARD_HEIGHT + 5);
            pop();
        }
        if (this.turned) {
            push();
            fill(this.color);
            stroke("black");
            translate(this.pos.x, this.pos.y);
            rect(0, 0, CARD_WIDTH, CARD_HEIGHT);
            push();
            textSize(this.fontSize);
            textFont("consolas");
            fill(this.suit.color);
            // top left text
            let value = this.value;
            if (this.value.length === 1)
                value = "0" + this.value;
            let tw = textWidth(value);
            let tx = tw/2;
            let ty = this.fontSize;
            text(this.value, tx, ty);
            pop();
            this.suit.drawShape(SUIT_SHAPE_SIZE * 2, this.fontSize + SUIT_SHAPE_SIZE * 2);

            // bottom right text (flipped)
            push();
            rotate(PI);
            textSize(this.fontSize);
            textFont("consolas");
            fill(this.suit.color);
            tx = -CARD_WIDTH + tw/2;
            ty = -CARD_HEIGHT + this.fontSize;
            text(this.value, tx, ty);
            pop();
            this.suit.drawShape(CARD_WIDTH - SUIT_SHAPE_SIZE * 2, CARD_HEIGHT - this.fontSize - SUIT_SHAPE_SIZE * 2, true);
            pop();
        } else {
            push();
            translate(this.pos.x, this.pos.y);
            fill(color(255, 50, 255));
            stroke("black");
            rect(0, 0, CARD_WIDTH, CARD_HEIGHT);
            pop();
        }
    }
}