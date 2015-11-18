var loadState = new Phaser.State();

loadState.systems = [];

loadState.preload = function () {
    //this.load.image('background', '/img?src='+ song_data.background);
    this.load.audio('music', Mbeat.song_data.music);
    this.load.audio('tap', '/mbeat-game/switch26.wav');
    this.load.image('red_brick', '/mbeat-game/img/red_brick.png');
    this.load.image('blue_brick', '/mbeat-game/img/blue_brick.png');
    this.load.image('white_brick', '/mbeat-game/img/white_brick.png');
    this.load.image('yellow_brick', '/mbeat-game/img/yellow_brick.png');
};

loadState.create = function () {
    // config
    this.game.antialias = false;

    //this.add.image(0, 0, 'background');

    // SFX for debugging
    Mbeat.tap_sfx = this.add.audio('tap');
    Mbeat.tap_sfx.mute = false;
    Mbeat.tap_sfx.allowMultiple= true;

    // Create player object
    Mbeat.player = Mbeat.factory.player(0, '');

    // Judgment
    Mbeat.factory.ui.judgment(
        this,
        this.game.width / 2,
        this.game.height / 2,
        0.5,
        0.5,
        'Fjalla One',
        24
    );

    // Create notes
    var notes_data = Mbeat.song_data.notes_easy ||
        Mbeat.song_data.notes_medium ||
        Mbeat.song_data.notes_hard;
    Mbeat.notes = Mbeat.factory.notes(
        this,
        notes_data,
        ['red_brick', 'blue_brick', 'red_brick', 'blue_brick'],
        Mbeat.NOTE_GAP,
        Mbeat.BEAT_GAP
    );
    Mbeat.notes.x = (this.game.width / 2) - (Mbeat.notes.width / 2); // center the group

    // Create keys
    var keys = Mbeat.factory.keys(
        this,
        'white_brick',
        'yellow_brick',
        Mbeat.controls
    );
    keys.x = (this.game.width / 2) - (keys.width / 2);

    keys.y = Mbeat.KEY_HEIGHT;

    // BPM Manager
    Mbeat.factory.bpmManager(this, Mbeat.song_data.bpms);

    // Music
    Mbeat.factory.music(
        this,
        'music',
        (Mbeat.KEY_HEIGHT / Mbeat.BEAT_GAP) + Mbeat.song_data.offset
    );
};

loadState.update = function () {
    var i = this.systems.length;
    while(i--) {
        this.systems[i].update();
    }
};

loadState.render = function () {

};
