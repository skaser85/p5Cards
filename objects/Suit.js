const drawClub= (x, y, flipped) => {
    push();
    translate(x, y);
    scale(C.scaleFactor);
    if (flipped)
        rotate(PI);
    strokeWeight(1);
    stroke("black");
    fill("black");
    beginShape();
    vertex(-C.suitShapeSize*0.25, C.suitShapeSize);
    vertex(-C.suitShapeSize*0.25, C.suitShapeSize*0.5);
    vertex(-C.suitShapeSize, C.suitShapeSize*0.5);
    vertex(-C.suitShapeSize, -C.suitShapeSize*0.25);
    vertex(-C.suitShapeSize*0.5, -C.suitShapeSize*0.25);
    vertex(-C.suitShapeSize*0.5, -C.suitShapeSize);
    vertex(C.suitShapeSize*0.5, -C.suitShapeSize);
    vertex(C.suitShapeSize*0.5, -C.suitShapeSize*0.25);
    vertex(C.suitShapeSize, -C.suitShapeSize*0.25);
    vertex(C.suitShapeSize, C.suitShapeSize*0.5);
    vertex(C.suitShapeSize*0.25, C.suitShapeSize*0.5);
    vertex(C.suitShapeSize*0.25, C.suitShapeSize);
    endShape(CLOSE);
    pop();
}

const drawDiamond= (x, y, flipped) => {
    push();
    translate(x, y); 
    scale(C.scaleFactor);
    if (flipped)
        rotate(PI);
    strokeWeight(1);
    stroke("black");
    fill("red");
    beginShape();
    vertex(0, C.suitShapeSize);
    vertex(-C.suitShapeSize, 0);
    vertex(0, -C.suitShapeSize);
    vertex(C.suitShapeSize,0);
    endShape(CLOSE);
    pop();
}

const drawHeart = (x, y, flipped) => {
    push();
    translate(x, y);
    scale(C.scaleFactor);
    if (flipped)
        rotate(PI);
    strokeWeight(1);
    stroke("black");
    fill("red");
    beginShape();
    vertex(0, C.suitShapeSize);
    vertex(-C.suitShapeSize+(C.suitShapeSize*0.25), 0);
    vertex(-C.suitShapeSize, -C.suitShapeSize);
    vertex(-C.suitShapeSize+(C.suitShapeSize*0.5), -C.suitShapeSize);
    vertex(0, -C.suitShapeSize/3);
    vertex(C.suitShapeSize-(C.suitShapeSize*0.5), -C.suitShapeSize);
    vertex(C.suitShapeSize, -C.suitShapeSize);
    vertex(C.suitShapeSize-(C.suitShapeSize*0.25), 0);
    endShape(CLOSE);
    pop();
}

const drawSpade= (x, y, flipped) => {
    push();
    translate(x, y);
    scale(C.scaleFactor);
    if (flipped)
        rotate(PI);
    strokeWeight(1);
    stroke("black");
    fill("black");
    beginShape();
    vertex(-C.suitShapeSize*0.25, C.suitShapeSize);
    vertex(-C.suitShapeSize*0.25, C.suitShapeSize*0.5);
    vertex(-C.suitShapeSize, C.suitShapeSize*0.5);
    vertex(-C.suitShapeSize*0.75, -C.suitShapeSize*0.25);
    vertex(0, -C.suitShapeSize);
    vertex(C.suitShapeSize*0.75, -C.suitShapeSize*0.25);
    vertex(C.suitShapeSize, C.suitShapeSize*0.5);
    vertex(C.suitShapeSize*0.25, C.suitShapeSize*0.5);
    vertex(C.suitShapeSize*0.25, C.suitShapeSize);
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