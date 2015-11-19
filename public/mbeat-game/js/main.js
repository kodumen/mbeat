var game = new Phaser.Game(512, 512, Phaser.CANVAS, '');

game.state.add('Play', playState);

// start game after loading song data