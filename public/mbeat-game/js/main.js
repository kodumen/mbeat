var game = new Phaser.Game(640, 480, Phaser.CANVAS, '');

game.state.add('Load', loadState);

// start game after loading song data