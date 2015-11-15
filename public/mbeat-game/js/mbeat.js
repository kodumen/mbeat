// Game-related constants and variables
var Mbeat = {
    // CONSTANTS
    BEAT_GAP: 128, // px
    NOTE_GAP: 6, // px
    KEY_HEIGHT: 400, // px
    BPM: 60,
    BEAT_OFFSET: -0.23, // arbitrary number to sync notes properly
                    // negative value shifts the song earlier, positive shifts it later
    TIME_OFFSET: 0.15,   // arbitrary number to time notes

    // JUDGEMENT
    MISS_EARLY: 0.7,
    GOOD_EARLY: 0.4,
    GREAT_EARLY: 0.2,
    PERFECT_EARLY: 0.15,
    PERFECT_LATE: -0.15,
    GREAT_LATE: -0.18,
    GOOD_LATE: -0.2,
    MISS_LATE: -0.3,


    // VARIABLES
    song_data: {},
    factory: {},
    curr_time: 0,   // used for timing judgement
    curr_bpm: 60,
    notes: null,
    controls: {
        button_0: Phaser.KeyCode.D,
        button_1: Phaser.KeyCode.F,
        button_2: Phaser.KeyCode.J,
        button_3: Phaser.KeyCode.K
    },

    debug: {}
};
