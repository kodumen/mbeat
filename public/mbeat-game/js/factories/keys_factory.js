/**
 * Create a group of 4 keys and add it to the world.
 * @param state {Phaser.State}
 * @param img0_key {String}
 * @param img1_key {String}
 * @param controls {Object}
 * @returns {Phaser.Group}
 */
Mbeat.factory.keys = function (state, img0_key, img1_key, controls) {
    var keys = state.add.group();
    var key_width = state.cache.getImage(img0_key).width;

    for (var i = 0; i < 4; i++) {
        keys.add(
            Mbeat.factory.key(
                state,
                i * (key_width + Mbeat.NOTE_GAP),
                0,
                img0_key,
                img1_key,
                controls['button_' + i]
            ),
            true
        );
    }

    return keys;
};

/**
 * Create a Key but do not add it to the world.
 *
 * @param state {Phaser.State}
 * @param x {Number}
 * @param y {Number}
 * @param img0_key {String}
 * @param img1_key {String}
 * @param keycode {Phaser.KeyCode}
 * @returns {Phaser.Sprite}
 */
Mbeat.factory.key = function (state, x, y, img0_key, img1_key, keycode) {
    var key = state.make.sprite(x, y, img0_key);

    key.data = {
        img0_key: img0_key,
        img1_key: img1_key,
        keycode: keycode
    };

    key.update = function () {
        if (game.input.keyboard.isDown(this.data.keycode)) {
            this.loadTexture(this.data.img1_key);
        } else {
            this.loadTexture(this.data.img0_key);
        }
    };

    return key;
};
