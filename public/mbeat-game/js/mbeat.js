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

    STR_BAD : 'BAD',
    STR_GOOD : 'GOOD',
    STR_GREAT : 'GREAT',
    STR_PERFECT : 'PERFECT',
    STR_MISS : 'MISS',


    // VARIABLES
    song_data: {},
    factory: {},
    curr_bpm: 60,
    notes: null,
    player: {
        score: 0,
        judgement: ''
    },
    controls: {
        button_0: Phaser.KeyCode.D,
        button_1: Phaser.KeyCode.F,
        button_2: Phaser.KeyCode.J,
        button_3: Phaser.KeyCode.K
    },

    debug: {}
};
