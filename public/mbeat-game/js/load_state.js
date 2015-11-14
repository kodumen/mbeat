var loadState = new Phaser.State();

loadState.systems = [];

loadState.preload = function () {
    //this.load.image('background', '/img?src='+ song_data.background);
    //this.load.audio('music', song_data.music);
    this.load.image('red_brick', '/mbeat-game/img/red_brick.png');
    this.load.image('blue_brick', '/mbeat-game/img/blue_brick.png');
    this.load.image('white_brick', '/mbeat-game/img/white_brick.png');
    this.load.image('yellow_brick', '/mbeat-game/img/yellow_brick.png');
};

loadState.create = function () {
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
    notes.x = (this.game.width / 2) - (notes.width / 2); // center the group

    // Create keys
    var keys = Mbeat.factory.keys(
        this,
        'white_brick',
        'yellow_brick',
        Mbeat.controls
    );
    keys.x = (this.game.width / 2) - (notes.width / 2);
    keys.y = Mbeat.KEY_HEIGHT;

    // BPM Manager
    Mbeat.factory.bpmManager(this, Mbeat.song_data.bpms);

    // control
    this.cursor = game.input.keyboard.createCursorKeys();
};

loadState.update = function () {
    this.world.update();
    this.updateSystems();
};

loadState.render = function () {
    this.time.advancedTiming = true;
    this.game.debug.text('FPS: ' + this.time.fps, 0, 16, '#ffffff');
    this.game.debug.text('BPM: ' + Mbeat.curr_bpm, 0, 32, '#ffffff');
    this.game.debug.text('TIMER: ' + Mbeat.debug.timer, 0, 48, '#ffffff');
    this.game.debug.text('TIMER: ' + Mbeat.debug.duration, 0, 64, '#ffffff');
};

loadState.updateSystems = function () {
    var i = this.systems.length;
    while(i--) {
        this.systems[i].update();
    }
};
