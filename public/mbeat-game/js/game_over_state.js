var gameOverState = new Phaser.State();

gameOverState.create = function () {
    this.add.image(0, 0, 'background')
        .alpha = 0.5;

    var text = this.add.text(
        this.game.width / 2,
        this.game.height / 2,
        'You scored: ' + Mbeat.player.score +
            '\nPress [space] to play again' +
            '\nor pick another song.',
        {fontsize: '34px'}
    );
    text.fill = Mbeat.COLOR_WHITE;
    text.anchor.x = 0.5;
    text.anchor.y = 0.5;
};