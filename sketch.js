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

function setup() {
    createCanvas(1200, 800);

    pallete = new Pallete();
    pallete.init();

    bkg_color = Pallete.brighten(pallete.colors.GREY, 0.5);

    deck = createDeck();
    deck.shuffle();

    stacks = [];
    stacks.push(new Stack(50, 20));

    for (let i = 0; i < 5; i++) {
        let c = deck.cards[i];
        stacks[0].addCard(c);
    }

    activeCard = null;

    mouseHasMoved = false;
}

function draw() {
    background(bkg_color);

    if (!mouseHasMoved)
        return;

    let m = getMousePos();

    for (let s of stacks) {
        s.update(m);
        s.draw();
    }

    if (activeCard && activeCard.dragging)
        activeCard.draw();
}

function mouseDragged(event) {
    if (activeCard) {
        activeCard.dragging = true;
        activeCard.originalPos = activeCard.pos.copy();
        let delta = createVector(event.movementX, event.movementY);
        activeCard.pos.add(delta);
    }
    return false;
}

function mouseReleased() {
    if (activeCard) {
        activeCard.dragging = false;
        activeCard.hovered = false;
        activeCard.returning = true;
        activeCard.turned = true;
        activeCard = null;
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