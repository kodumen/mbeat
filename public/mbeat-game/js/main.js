var game = new Phaser.Game(512, 512, Phaser.CANVAS, '');

game.state.add('Play', playState);
game.state.add('GameOver', gameOverState);

// start game after loading song data