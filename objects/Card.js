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
        this.originalPos = createVector(0, 0);
    }

    setPos(pos) {
        this.pos.set(pos);
    }

    collidesPoint(p) {
        return collidesRectPoint(this.getBoundingBox(), p);
    }

    collidesRect(other) {
        return collidesRectRect(this, other);
    }

    getBoundingBox() {
        return getBoundingBox(this.pos, C.cardWidth, C.cardHeight);
    }

    draw() {
        if (this.hovered) {
            push();
            translate(this.pos.x, this.pos.y);
            strokeWeight(3);
            stroke(color(0, 255, 0, 255));
            rect(-3, -3, C.cardWidth + 5, C.cardHeight + 5);
            pop();
        }
        if (this.turned) {
            push();
            fill(this.color);
            stroke("black");
            translate(this.pos.x, this.pos.y);
            rect(0, 0, C.cardWidth, C.cardHeight);
            push();
            textSize(this.fontSize);
            textFont("consolas");
            fill(this.suit.color);
            // top left text
            let value = this.value;
            let tw = textWidth(value);
            let tx = tw/2;
            let ty = this.fontSize;
            text(this.value, tx, ty);
            text(this.suit.unicodeChar, tx, ty + this.fontSize);
            pop();
            // this.suit.drawShape(C.suitShapeSize * 2, this.fontSize + C.suitShapeSize * 2);

            // bottom right text (flipped)
            push();
            rotate(PI);
            textSize(this.fontSize);
            textFont("consolas");
            fill(this.suit.color);
            tx = -C.cardWidth + tw/2;
            ty = -C.cardHeight + this.fontSize;
            text(this.value, tx, ty);
            text(this.suit.unicodeChar, tx, ty + this.fontSize);
            pop();
            // this.suit.drawShape(C.cardWidth - C.suitShapeSize * 2, C.cardHeight - this.fontSize - C.suitShapeSize * 2, true);
            pop();



        } else {
            push();
            translate(this.pos.x, this.pos.y);
            fill(color(255, 50, 255));
            stroke("black");
            rect(0, 0, C.cardWidth, C.cardHeight);
            pop();
        }
    }
}