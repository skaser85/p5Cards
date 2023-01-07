const SUITS = {
    CLUB: 0,
    DIAMOND:1,
    HEART: 2,
    SPADE: 3
}

const VALUES = {
    "ACE": 0,
    "TWO": 1,
    "THREE": 2,
    "FOUR": 3,
    "FIVE": 4,
    "SIX": 5,
    "SEVEN": 6,
    "EIGHT": 7,
    "NINE": 8,
    "TEN": 9,
    "JACK": 10,
    "QUEEN": 11,
    "KING": 12
}

const WILD_CARD_TYPES = {
    "NONE": 0,
    "SKIP": 1, 
    "REVERSE": 2,
    "DRAW2": 3,
    "WILD": 4,
    "WILDDRAW4": 5
}

const UNO_COLORS = {
    "RED": 0,
    "YELLOW": 1, 
    "GREEN": 2,
    "BLUE": 3
}

const UNO_VALUES = {
    "ZERO": 0,
    "ONE": 1,
    "TWO": 2,
    "THREE": 3,
    "FOUR": 4,
    "FIVE": 5,
    "SIX": 6,
    "SEVEN": 7,
    "EIGHT": 8,
    "NINE": 9,
    "WILD": 10
}

const getEnumKey = (e, val) => {
    return Object.keys(e)[val];
}