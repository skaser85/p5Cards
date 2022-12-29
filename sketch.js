const CARD_WIDTH = 100;
const CARD_HEIGHT = 150;
const SUIT_SHAPE_SIZE = CARD_WIDTH/10;
const SCALE_FACTOR = 1;

let bkg_color;
let deck;
let cards;
let stacks;

let mouseHasMoved;

let activeCard;
let activeStack;

function setup() {
    createCanvas(1200, 800);

    pallete = new Pallete();
    pallete.init();

    bkg_color = Pallete.brighten(pallete.colors.GREY, 0.5);

    deck = createDeck();
    deck.shuffle();

    stacks = [];
    stacks.push(new Stack(50, 20, true));
    stacks.push(new Stack(200, 20, true));
    stacks.push(new Stack(400, 20, true));

    let testCards = deck.cards.slice(0, 12);
    stacks[0].addCards(testCards);

    activeCard = null;

    mouseHasMoved = false;
}

function draw() {
    background(bkg_color);

    if (!mouseHasMoved)
        return;

    let m = getMousePos();

    let moveSet = null;
    activeStack = null;
    for (let s of stacks) {
        s.update(m);
        if (s.moveSet.length)
            moveSet = s.moveSet;
        if (s.hovered)
            activeStack = s;
        s.draw();
    }
    if (moveSet)
        for (let c of moveSet)
            c.draw();
}

function mouseDragged() {
    if (activeCard) {
        if (!activeCard.dragging) {
            activeCard.dragging = true;
            activeCard.originalPos = activeCard.pos.copy();
        }
        let delta = getMouseMoved();
        activeCard.stack.updateMoveSet(delta);
    }
    return false;
}

function mouseReleased() {
    if (activeCard) {
        if (activeStack && activeStack !== activeCard.stack) {
            let moveSet = activeCard.stack.moveSet;
            activeCard.stack.removeCards(moveSet);
            activeStack.addCards(moveSet);
        }
        activeCard.turned = true;
        deactivateActiveCard();
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
    activeCard.pos.set(activeCard.originalPos.copy());
    activeCard.stack.destroyMoveSet();
    activeCard = null;
}

function activateCard(card) {
    if (activeCard)
        deactivateActiveCard()
    card.originalPos = card.pos.copy();
    card.hovered = true;
    activeCard = card;
    activeCard.stack.createMoveSet();
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