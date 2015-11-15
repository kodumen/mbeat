// Game-related constants and variables
var Mbeat = {
    // CONSTANTS
    BEAT_GAP: 128, // px
    NOTE_GAP: 6, // px
    KEY_HEIGHT: 400, // px
    BPM: 60,
    BEAT_OFFSET: -0.27, // arbitrary number to sync notes properly
                    // negative value shifts the song earlier, positive shifts it later
    TIME_OFFSET: 0.15,   // arbitrary number to time notes

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
