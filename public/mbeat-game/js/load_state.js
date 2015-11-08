var loadState = new Phaser.State();

loadState.preload = function () {
    //this.load.image('background', '/img?src='+ song_data.background);
    //this.load.audio('music', song_data.music);
    this.load.image('red_brick', '/mbeat-game/img/red_brick.png');
};

loadState.create = function () {
    // Factories
    this.songFactory = new SongFactory(this);

    //this.add.image(0, 0, 'background');
    //music = this.add.audio('music');
    //music.mute = false;
    //music.play();

    // Add notes
    var notes_data = Mbeat.song_data.notes_easy;

    this.notes_group = this.songFactory.make(
        notes_data,
        Mbeat.DEFAULT_NOTE_WIDTH,
        Mbeat.DEFAULT_BEAT_GAP
    );

    // control
    this.cursor = game.input.keyboard.createCursorKeys();
};

loadState.update = function () {
    this.notes_group.y += (Mbeat.DEFAULT_BEAT_GAP * 87.5 / 60) * (this.time.elapsedMS / 1000);
};
