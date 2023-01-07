const SPRITE_CARD_WIDTH = 240;
const SPRITE_CARD_HEIGHT = 360

let C = {
    cardWidth: 0,
    cardHeight: 0,
    suitShapeSize: 0,
    scaleFactor: 0,
    stackPadding: 0
}

let bkg_color;
let deck;
let cards;
let stacks;

let mouseHasMoved;

let activeCard;
let activeStack;

let unoCardsPNG;
let test;

function preload() {
    // card dim = w: 240 h: 360
    unoCardsPNG = loadImage("./UNO_cards_deck.png");
}

function setup() {
    createCanvas(1200, 800);

    calcConstants();

    pallete = new Pallete();
    pallete.init();

    bkg_color = Pallete.brighten(pallete.colors.GREY, 0.5);

    activeCard = null;

    mouseHasMoved = false;

    deck = createUnoDeck(unoCardsPNG);
    deck.shuffle();

    test = [];
    for (let i = 0; i < 1; i++) {
        deck.cards[i].setPos(createVector(width/2, height/2));
        test.push(deck.cards[i]);
    }

    console.log(deck);
}

function draw() {
    background(bkg_color);

    if (!mouseHasMoved)
        return;

    push();
    stroke("black");
    line(width/2, 0, width/2, height);
    line(0, height/2, width, height/2);
    pop();

    let m = getMousePos();

    for (let t of test) {
        t.update(m);
        t.draw();
    }
}

function mouseDragged() {
    if (activeCard) {
        if (!activeCard.dragging) {
            activeCard.dragging = true;
            activeCard.originalPos = activeCard.pos.copy();
        }
        let delta = getMouseMoved();
        activeCard.pos.add(delta);
        // activeCard.stack.updateMoveSet(delta);
    }
    return false;
}

function mouseReleased() {
    if (activeCard) {
        // if (activeStack && activeStack !== activeCard.stack) {
        //     if (activeStack.willAccept(activeCard.stack.moveSet)) {
        //         let fromStack = activeCard.stack;
        //         let moveSet = fromStack.moveSet;
        //         fromStack.removeCards(moveSet);
        //         fromStack.destroyMoveSet();
        //         activeStack.addCards(moveSet);
        //     }
        // }
        // if (!activeCard.turned && activeCard.stack.cards[activeCard.stack.cards.length-1] === activeCard)
        //     activeCard.turned = true;
        // deactivateActiveCard();
    }
    return false;
}

function mouseClicked() {
    if (activeCard)
        activeCard.turned = true;
}

function mouseMoved() {
    mouseHasMoved = true;
}

function keyPressed() {
    if (keyIsDown(ENTER))
        console.log("yo");
}

function getMousePos() {
    return createVector(mouseX, mouseY);
}

function getMouseMoved() {
    return createVector(movedX, movedY);
}

function drawGameText(txt, fontSize, tx, y) {
    push();
    textSize(fontSize);
    fill(pallete.colors.BLACK);
    text(txt, tx + 2, y + 2);
    fill(pallete.colors.PURPLE);
    text(txt, tx + 1, y + 1);
    fill(pallete.colors.CYAN);
    text(txt, tx, y);
    pop();
}

function pushEmitter(pos, _color) {
    let e = new Emitter(pos.x, pos.y, _color);
    e.init();
    emitters.push(e);
}

function pushFader(pos, label) {
    faders.push(new Fader(pos.x, pos.y, label));
}

function deactivateActiveCard() {
    activeCard.dragging = false;
    activeCard.hovered = false;
    // activeCard.pos.set(activeCard.originalPos.copy());
    // activeCard.stack.destroyMoveSet();
    activeCard = null;
}

function activateCard(card) {
    if (activeCard)
        deactivateActiveCard()
    card.originalPos = card.pos.copy();
    activeCard = card;
    // activeCard.stack.createMoveSet();
}

function collidesRectPoint(rbb, p) {
    return ((p.x >= rbb.l) && (p.x <= rbb.r)) &&
           ((p.y >= rbb.t) && (p.y <= rbb.b));
}

function collidesRectRect(r1, r2) {
    let r1bb = r1.getBoundingBox();
    let r2bb = r2.getBoundingBox();
    return r1bb.r >= r2bb.l &&
           r1bb.l <= r2bb.r &&
           r1bb.b >= r2bb.t &&
           r1bb.t <= r2bb.b;
}

function getBoundingBox(vec, w, h) {
    return {
        t: vec.y,
        r: vec.x + w,
        b: vec.y + h,
        l: vec.x
    }
}

function calcConstants() {
    C.cardWidth = 100;
    C.cardHeight = 150;
    C.suitShapeSize = C.cardWidth / 10;
    C.scaleFactor = 1;
    C.stackPadding = C.cardWidth / 4;
}