const drawClub= (x, y, flipped) => {
    push();
    translate(x, y);
    scale(SCALE_FACTOR);
    if (flipped)
        rotate(PI);
    strokeWeight(1);
    stroke("black");
    fill("black");
    beginShape();
    vertex(-SUIT_SHAPE_SIZE*0.25, SUIT_SHAPE_SIZE);
    vertex(-SUIT_SHAPE_SIZE*0.25, SUIT_SHAPE_SIZE*0.5);
    vertex(-SUIT_SHAPE_SIZE, SUIT_SHAPE_SIZE*0.5);
    vertex(-SUIT_SHAPE_SIZE, -SUIT_SHAPE_SIZE*0.25);
    vertex(-SUIT_SHAPE_SIZE*0.5, -SUIT_SHAPE_SIZE*0.25);
    vertex(-SUIT_SHAPE_SIZE*0.5, -SUIT_SHAPE_SIZE);
    vertex(SUIT_SHAPE_SIZE*0.5, -SUIT_SHAPE_SIZE);
    vertex(SUIT_SHAPE_SIZE*0.5, -SUIT_SHAPE_SIZE*0.25);
    vertex(SUIT_SHAPE_SIZE, -SUIT_SHAPE_SIZE*0.25);
    vertex(SUIT_SHAPE_SIZE, SUIT_SHAPE_SIZE*0.5);
    vertex(SUIT_SHAPE_SIZE*0.25, SUIT_SHAPE_SIZE*0.5);
    vertex(SUIT_SHAPE_SIZE*0.25, SUIT_SHAPE_SIZE);
    endShape(CLOSE);
    pop();
}

const drawDiamond= (x, y, flipped) => {
    push();
    translate(x, y); 
    scale(SCALE_FACTOR);
    if (flipped)
        rotate(PI);
    strokeWeight(1);
    stroke("black");
    fill("red");
    beginShape();
    vertex(0, SUIT_SHAPE_SIZE);
    vertex(-SUIT_SHAPE_SIZE, 0);
    vertex(0, -SUIT_SHAPE_SIZE);
    vertex(SUIT_SHAPE_SIZE,0);
    endShape(CLOSE);
    pop();
}

const drawHeart = (x, y, flipped) => {
    push();
    translate(x, y);
    scale(SCALE_FACTOR);
    if (flipped)
        rotate(PI);
    strokeWeight(1);
    stroke("black");
    fill("red");
    beginShape();
    vertex(0, SUIT_SHAPE_SIZE);
    vertex(-SUIT_SHAPE_SIZE+(SUIT_SHAPE_SIZE*0.25), 0);
    vertex(-SUIT_SHAPE_SIZE, -SUIT_SHAPE_SIZE);
    vertex(-SUIT_SHAPE_SIZE+(SUIT_SHAPE_SIZE*0.5), -SUIT_SHAPE_SIZE);
    vertex(0, -SUIT_SHAPE_SIZE/3);
    vertex(SUIT_SHAPE_SIZE-(SUIT_SHAPE_SIZE*0.5), -SUIT_SHAPE_SIZE);
    vertex(SUIT_SHAPE_SIZE, -SUIT_SHAPE_SIZE);
    vertex(SUIT_SHAPE_SIZE-(SUIT_SHAPE_SIZE*0.25), 0);
    endShape(CLOSE);
    pop();
}

const drawSpade= (x, y, flipped) => {
    push();
    translate(x, y);
    scale(SCALE_FACTOR);
    if (flipped)
        rotate(PI);
    strokeWeight(1);
    stroke("black");
    fill("black");
    beginShape();
    vertex(-SUIT_SHAPE_SIZE*0.25, SUIT_SHAPE_SIZE);
    vertex(-SUIT_SHAPE_SIZE*0.25, SUIT_SHAPE_SIZE*0.5);
    vertex(-SUIT_SHAPE_SIZE, SUIT_SHAPE_SIZE*0.5);
    vertex(-SUIT_SHAPE_SIZE*0.75, -SUIT_SHAPE_SIZE*0.25);
    vertex(0, -SUIT_SHAPE_SIZE);
    vertex(SUIT_SHAPE_SIZE*0.75, -SUIT_SHAPE_SIZE*0.25);
    vertex(SUIT_SHAPE_SIZE, SUIT_SHAPE_SIZE*0.5);
    vertex(SUIT_SHAPE_SIZE*0.25, SUIT_SHAPE_SIZE*0.5);
    vertex(SUIT_SHAPE_SIZE*0.25, SUIT_SHAPE_SIZE);
    endShape(CLOSE);
    pop();
}

const createSuit = (suitType) => {
    let suit = new Suit(suitType);
    suit.color = suitType === SUITS.CLUB || suitType === SUITS.SPADE ? color(0, 0, 0, 255) : color(255, 0, 0, 255);
    switch (suitType) {
        case SUITS.CLUB: suit.drawShape = drawClub; break;
        case SUITS.DIAMOND: suit.drawShape = drawDiamond; break;
        case SUITS.HEART: suit.drawShape = drawHeart; break;
        case SUITS.SPADE: suit.drawShape = drawSpade; break;
    }
    switch (suitType) {
        case SUITS.CLUB: suit.unicodeChar = "\u2663"; break;
        case SUITS.DIAMOND: suit.unicodeChar = "\u2666"; break;
        case SUITS.HEART: suit.unicodeChar = "\u2665"; break;
        case SUITS.SPADE: suit.unicodeChar = "\u2660"; break;
    }
    for (let v in VALUES) {
        suit.cards.push(new Card(suit, v));
    }
    return suit;
}

class Suit {
    constructor(suitType) {
        this.suit = suitType;
        this.color = null;
        this.drawShape = null;
        this.unicodeChar = null;
        this.cards = [];
    }
}