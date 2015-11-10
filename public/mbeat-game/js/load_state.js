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
    var keyFactory = new KeyFactory(this);

    //this.add.image(0, 0, 'background');
    //music = this.add.audio('music');
    //music.mute = false;
    //music.play();

    var notes_data = Mbeat.song_data.notes_easy ||
        Mbeat.song_data.notes_medium ||
        Mbeat.song_data.notes_hard;

    // Create notes
    var notes = Mbeat.factory.notes(
        this,
        notes_data,
        ['red_brick', 'blue_brick', 'red_brick', 'blue_brick'],
        Mbeat.NOTE_GAP,
        Mbeat.BEAT_GAP
    );
    // center the group
    notes.x = (640 / 2) - (((86 * 4) + (Mbeat.NOTE_GAP * 3)) / 2);

    // Create keys
    this.keys_group = keyFactory.makeSet('white_brick', 'yellow_brick');
    this.keys_group.x = (640 / 2) - (((86 * 4) + (Mbeat.NOTE_GAP * 3)) / 2);
    this.keys_group.y = 400;

    // control
    this.cursor = game.input.keyboard.createCursorKeys();
};

loadState.update = function () {
    this.world.update();
};
