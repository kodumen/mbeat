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
                controls['button_' + i],
                i
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
 * @param column {Number}
 * @returns {Phaser.Sprite}
 */
Mbeat.factory.key = function (state, x, y, img0_key, img1_key, keycode, column) {
    var key = state.make.sprite(x, y, img0_key);

    key.data = {
        img0_key: img0_key,
        img1_key: img1_key,
        keycode: keycode,
        column: column,
        canPress: true
    };

    key.update = function () {
        if (game.input.keyboard.isDown(this.data.keycode) && this.data.canPress) {
            this.loadTexture(this.data.img1_key);
            this.data.canPress = false;

            // Look for nearest note
            var note = null;
            var speed = Mbeat.curr_bpm / Mbeat.BPM;
            var diff = 0;
            for (var i = Mbeat.notes.children.length; i > 0 ; i--) {
                note = Mbeat.notes.children[i - 1];
                diff = Mbeat.KEY_HEIGHT - note.y;

                if (note.data.isMiss || diff > Mbeat.BAD * speed) {
                    continue;
                }

                if (note.data.column == this.data.column) {
                    break;
                }
            }
            // judge timing
            if (note) {
                var judgment = '';

                if (diff <= Mbeat.BAD * speed && diff > Mbeat.GOOD_EARLY * speed) {
                    judgment = Mbeat.STR_BAD;
                } else if (diff <= Mbeat.GOOD_EARLY * speed && diff > Mbeat.GREAT_EARLY * speed) {
                    judgment = Mbeat.STR_GOOD;
                } else if (diff <= Mbeat.GREAT_EARLY * speed && diff > Mbeat.PERFECT_EARLY * speed) {
                    judgment = Mbeat.STR_GREAT;
                } else if (diff <= Mbeat.PERFECT_EARLY * speed && diff > Mbeat.FLAWLESS_EARLY * speed) {
                    judgment = Mbeat.STR_PERFECT;
                } else if (diff <= Mbeat.FLAWLESS_EARLY * speed && diff > Mbeat.FLAWLESS_LATE * speed) {
                    judgment = Mbeat.STR_FLAWLESS;
                } else if (diff <= Mbeat.FLAWLESS_LATE * speed && diff > Mbeat.PERFECT_LATE * speed) {
                    judgment = Mbeat.STR_PERFECT;
                } else if (diff <= Mbeat.PERFECT_LATE * speed && diff > Mbeat.GREAT_LATE * speed) {
                    judgment = Mbeat.STR_GREAT;
                } else if (diff <= Mbeat.GREAT_EARLY * speed && diff > Mbeat.GOOD_LATE * speed) {
                    judgment = Mbeat.STR_GOOD;
                } else if (diff <= Mbeat.GOOD_LATE * speed) {
                    judgment = Mbeat.STR_MISS;
                }

                if (judgment) {
                    Mbeat.player.setJudgment(judgment);
                    note.destroy();
                }
            }
        } else if (!game.input.keyboard.isDown(this.data.keycode)) {
            this.loadTexture(this.data.img0_key);
            this.data.canPress = true;
        }
    };

    return key;
};
