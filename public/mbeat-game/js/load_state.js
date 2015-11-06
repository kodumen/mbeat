var loadState = new Phaser.State();

loadState.preload = function () {
    //this.load.image('background', '/img?src='+ song_data.background);
    //this.load.audio('music', song_data.music);
    this.load.image('red_brick', '/mbeat-game/img/red_brick.png');
};

loadState.create = function () {
    //this.add.image(0, 0, 'background');
    //music = this.add.audio('music');
    //music.mute = false;
    //music.play();

    this.notes_group = this.add.group();

    // Add notes
    var DEFAULT_BEAT_GAP = 64 /*px*/;
    var DEFAULT_NOTE_WIDTH = 100 /*px*/;
    var notes_data = song_data.notes_easy;

    for (var i = notes_data.length; i > 0; i--) {
        var beat_data = notes_data[i - 1];
        for (var c = 0; c < 4; c++) {
            var note_type = beat_data.notes.charAt(c);

            if (note_type == 1) {
                this.notes_group.create(c * DEFAULT_NOTE_WIDTH, -beat_data.number * DEFAULT_BEAT_GAP, 'red_brick');
            }
        }
    }

    // control
    this.cursor = game.input.keyboard.createCursorKeys();
};

loadState.update = function () {
    this.notes_group.y += (64 * 87.5 / 60) * (this.time.elapsedMS / 1000);
};
