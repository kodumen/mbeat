var loadState = new Phaser.State();

loadState.preload = function () {
    //this.load.image('background', '/img?src='+ song_data.background);
    //this.load.audio('music', song_data.music);
    this.load.image('red_brick', '/mbeat-game/img/red_brick.png');
    this.load.image('blue_brick', '/mbeat-game/img/blue_brick.png');
    this.load.image('white_brick', '/mbeat-game/img/white_brick.png');
    this.load.image('yellow_brick', '/mbeat-game/img/yellow_brick.png');
};

loadState.create = function () {
    // Factories
    this.noteFactory = new NoteFactory(
        this,
        ['red_brick', 'blue_brick', 'red_brick', 'blue_brick']
    );

    //this.add.image(0, 0, 'background');
    //music = this.add.audio('music');
    //music.mute = false;
    //music.play();

    // Get notes and plot to game world
    var notes_data = Mbeat.song_data.notes_easy ||
        Mbeat.song_data.notes_medium ||
        Mbeat.song_data.notes_hard;

    this.notes_group = this.noteFactory.makeFromSong(
        notes_data,
        Mbeat.NOTE_GAP,
        Mbeat.BEAT_GAP
    );
    // manually position the notes group
    this.notes_group.x = (640 / 2) - (((86 * 4) + (Mbeat.NOTE_GAP * 3)) / 2);

    // control
    this.cursor = game.input.keyboard.createCursorKeys();
};

loadState.update = function () {
    this.notes_group.y += (Mbeat.BEAT_GAP * 87.5 / 60) * (this.time.elapsedMS / 1000);
};
