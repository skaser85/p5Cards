const PILE_COUNT = 7;

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

let drawStack;
let discardStack;

function calcConstants() {
    C.cardWidth = (width / PILE_COUNT) - (width/PILE_COUNT) / 3.5;
    C.cardHeight = C.cardWidth + C.cardWidth/2;
    C.suitShapeSize = C.cardWidth / 10;
    C.scaleFactor = 1;
    C.stackPadding = C.cardWidth / 4;
}

function setup() {
    createCanvas(1200, 800);

    calcConstants();

    pallete = new Pallete();
    pallete.init();

    bkg_color = Pallete.brighten(pallete.colors.GREY, 0.5);

    deck = createDeck();
    deck.shuffle();

    stacks = [];

    drawStack = new DrawStack(C.stackPadding, C.stackPadding, false);
    discardStack = new DiscardStack(drawStack.pos.x + C.cardWidth + C.stackPadding, C.stackPadding, false);
    drawStack.setDiscardStack(discardStack);
    stacks.push(drawStack);
    stacks.push(discardStack);

    
    let sx = width - C.cardWidth - C.stackPadding;
    let sy = C.stackPadding;
    for (let i = 0; i < 4; i++) {
        stacks.push(new SuitStack(sx, sy, false));
        sx -= C.cardWidth + C.stackPadding;
    }

    let totalW = (PILE_COUNT * C.cardWidth) + (C.stackPadding * (PILE_COUNT - 1));
    sx = width/2 - totalW/2;
    sy = C.cardHeight + C.stackPadding * 3;
    for (let i = 0; i < PILE_COUNT; i++) {
        let s = new PlayStack(sx, sy, true);
        deck.dealTo(s, (i+1));
        stacks.push(s);
        sx += C.cardWidth + C.stackPadding;
    }

    deck.dealTo(stacks[0], deck.cards.length-1);

    activeCard = null;

    mouseHasMoved = false;
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

    let moveSet = null;
    if (activeStack)
        activeStack.hovered = false;
    activeStack = null;
    for (let s of stacks) {
        s.update(m);
        if (s.moveSet.length)
            moveSet = s.moveSet;
        if (s.hovered)
            activeStack = s;
        s.draw();
    }
    if (moveSet) {
        for (let c of moveSet) {
            c.draw();
        }
    }
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
            if (activeStack.willAccept(activeCard.stack.moveSet)) {
                let fromStack = activeCard.stack;
                let moveSet = fromStack.moveSet;
                fromStack.removeCards(moveSet);
                fromStack.destroyMoveSet();
                activeStack.addCards(moveSet);
            }
        }
        activeCard.turned = true;
        deactivateActiveCard();
    }
    return false;
}

function mouseClicked() {
    if (activeCard)
        activeCard.turned = true;
    if (drawStack.hovered)
        drawStack.handleClick();
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