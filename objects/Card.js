class Card {
    constructor() {
        this.pos = createVector(0, 0);
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
        // should be implemented in the derived class
    }
}

class StandardCard extends Card {
    constructor(suit, value) {
        super();
        this.suit = suit;
        this.value = value;
        this.fontSize = 28;
        this.color = "white";
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
            let value = VALUES[this.value] + 1;
            let isRoyal = [VALUES.ACE, VALUES.JACK, VALUES.QUEEN, VALUES.KING].includes(VALUES[this.value]);
            if (isRoyal) {
                value = this.value.substring(0, 1);
            }
            let tw = 0;
            let tx = 0;
            let ty = 0;
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
            tw = textWidth(value);
            tx = tw / 2;
            ty = this.fontSize;
            text(value, tx, ty);
            text(this.suit.unicodeChar, tx + tw * 1.5, ty);
            pop();

            push();
            if (isRoyal) {
                fill(this.suit.color);
                textFont("consolas");
                textSize(this.fontSize * 2);
                textAlign(CENTER, CENTER);
                text(value, C.cardWidth / 2 - this.fontSize / 2, C.cardHeight / 2 - this.fontSize / 2);
                rotate(PI);
                text(value, -C.cardWidth / 2 - this.fontSize / 2, -C.cardHeight / 2 - this.fontSize / 2);
            } else {
                fill(this.suit.color);
                textFont("consolas");
                textSize(this.fontSize);
                textAlign(CENTER, CENTER);
                let u = this.suit.unicodeChar;
                let topY = ty + this.fontSize * 1.5;
                let midY = topY + this.fontSize * .75;
                let botY = C.cardHeight - ty - this.fontSize * 1.5;
                let w = C.cardWidth;
                let wC = w * 0.5;
                let w3L = wC - wC/2;
                let w3R = wC + wC/2;
                let w4LR = wC - wC/4;
                let w4LL = w4LR - wC/4;
                let w4RL = wC + wC/4;
                let w4RR = w4RL + wC/4;
                let w51 = w * 0.2;
                let w52 = w * 0.4;
                let w53 = w * 0.6;
                let w54 = w * 0.8;
                switch (value) {
                    case 2: {
                        text(u, wC, topY);
                        text(u, wC, botY);
                        break;
                    }
                    case 3: {
                        text(u, w3R, topY);
                        text(u, wC, C.cardHeight / 2);
                        text(u, w3L, botY);
                        break;
                    }
                    case 4: {
                        text(u, w4LR, topY);
                        text(u, w4RL, topY);
                        text(u, w4LR, botY);
                        text(u, w4RL, botY);
                        break;
                    }
                    case 5: {
                        text(u, w3R, topY);
                        text(u, wC, topY);
                        text(u, w3L, topY);
                        text(u, w4LR, botY);
                        text(u, w4RL, botY);
                        break;
                    }
                    case 6: {
                        text(u, w3R, topY);
                        text(u, wC, topY);
                        text(u, w3L, topY);
                        text(u, w3R, botY);
                        text(u, wC, botY);
                        text(u, w3L, botY);
                        break;
                    }
                    case 7: {
                        text(u, w3R, topY);
                        text(u, wC, topY);
                        text(u, w3L, topY);
                        text(u, w52, midY);
                        text(u, w3R, botY);
                        text(u, wC, botY);
                        text(u, w3L, botY);
                        break;
                    }
                    case 8: {
                        text(u, w3R, topY);
                        text(u, wC, topY);
                        text(u, w3L, topY);
                        text(u, w52, midY);
                        text(u, w53, midY);
                        text(u, w3R, botY);
                        text(u, wC, botY);
                        text(u, w3L, botY);
                        break;
                    }
                    case 9: {
                        text(u, w51, topY);
                        text(u, w52, topY);
                        text(u, w53, topY);
                        text(u, w54, topY);
                        text(u, w3L, midY);
                        text(u, w51, botY);
                        text(u, w52, botY);
                        text(u, w53, botY);
                        text(u, w54, botY);
                        break;
                    }
                    case 10: {
                        text(u, w51, topY);
                        text(u, w52, topY);
                        text(u, w53, topY);
                        text(u, w54, topY);
                        text(u, w3L, midY);
                        text(u, w3R, midY);
                        text(u, w51, botY);
                        text(u, w52, botY);
                        text(u, w53, botY);
                        text(u, w54, botY);
                        break;
                    }
                }
            }
            pop();

            // bottom right text (flipped)
            push();
            rotate(PI);
            textSize(this.fontSize);
            textFont("consolas");
            fill(this.suit.color);
            tx = -C.cardWidth + tw / 2;
            ty = -C.cardHeight + this.fontSize;
            text(value, tx, ty);
            text(this.suit.unicodeChar, tx, ty + this.fontSize);
            pop();
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

class UnoCard extends Card {
    constructor(img, unoColor, unoValue, wildCardType) {
        super();
        this.img = img;
        this.unoColor = unoColor;
        this.unoValue = unoValue;
        this.wildCardType = wildCardType;
    }

    update(m) {
        this.hovered = this.collidesPoint(m);
        if (this.hovered && !activeCard)
            activateCard(this);
        if (!this.hovered && activeCard === this)
            deactivateActiveCard(); 
    }

    draw() {
        if (this.turned) {
            push();
            translate(this.pos.x, this.pos.y);
            if (this.hovered) {
                stroke(0, 255, 0, 255);
                strokeWeight(6);
                rect(1, 1, C.cardWidth - 1, C.cardHeight - 1, 15);
            }
            image(this.img, 0, 0, C.cardWidth, C.cardHeight, 0, 0, SPRITE_CARD_WIDTH, SPRITE_CARD_HEIGHT);
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