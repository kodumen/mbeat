var loadState = {
    preload: function () {
        game.load.image('background', '/img?src='+ song_data.background);
        game.load.audio('music', song_data.music);
    },

    create: function () {
        game.add.image(0, 0, 'background');
        music = game.add.audio('music');
        music.mute = false;
        music.play();
    },

    update: function () {

    }
};
