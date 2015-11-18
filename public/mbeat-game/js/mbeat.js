// Game-related constants and variables
var Mbeat = {
    // CONSTANTS
    BEAT_GAP: 128, // px
    NOTE_GAP: 6, // px
    KEY_HEIGHT: 400, // px
    BPM: 60,

    // JUDGEMENT (PIXELS)
    BAD: 64,
    GOOD_EARLY: 16,
    GREAT_EARLY: 10,
    PERFECT_EARLY: 4,
    PERFECT_LATE: -4,
    GREAT_LATE:-10,
    GOOD_LATE: -16,

    STR_BAD: 'BAD',
    STR_GOOD: 'GOOD',
    STR_GREAT: 'GREAT',
    STR_PERFECT: 'PERFECT',
    STR_MISS: 'MISS',

    COLOR_RED: '#FA0D4D',
    COLOR_ORANGE: '#FA6929',
    COLOR_YELLOW: '#FFD94C',
    COLOR_GREEN: '#00E369',
    COLOR_BLUE: '#4D9FF2',
    COLOR_VIOLET: '#9532FA',
    COLOR_WHITE: '#ffffff',
    COLOR_BLACK: '#0d0d0d',


    // VARIABLES
    song_data: {},
    factory: {},
    curr_bpm: 60,
    notes: null,
    player: null,
    controls: {
        button_0: Phaser.KeyCode.D,
        button_1: Phaser.KeyCode.F,
        button_2: Phaser.KeyCode.J,
        button_3: Phaser.KeyCode.K
    },

    debug: {}
};
