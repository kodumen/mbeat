var game = new Phaser.Game(512, 512, Phaser.CANVAS, '');

game.state.add('Load', loadState);

// start game after loading song data