var game = new Phaser.Game(512, 512, Phaser.CANVAS, 'game');

game.state.add('Play', playState);
game.state.add('GameOver', gameOverState);

game.antialias = false;

// start game after loading song data