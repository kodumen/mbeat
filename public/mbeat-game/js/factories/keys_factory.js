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

            var note = null;
            // Look for nearest note
            for (var i = Mbeat.notes.children.length; i > 0 ; i--) {
                note = Mbeat.notes.children[i - 1];

                var time_diff = note.data.time - Mbeat.curr_time;

                if (time_diff > Mbeat.MISS_EARLY) {
                    return;
                }

                if (note.data.column == this.data.column) {
                    break;
                }
            }
            // judge timing
            if (note) {
                var diff = note.data.time - Mbeat.curr_time;
                var judgement = '';

                if (diff <= Mbeat.MISS_EARLY && diff > Mbeat.GOOD_EARLY) {
                    judgement = 'MISS';
                } else if (diff <= Mbeat.GOOD_EARLY && diff > Mbeat.GREAT_EARLY) {
                    judgement = 'GOOD';
                } else if (diff <= Mbeat.GREAT_EARLY && diff > Mbeat.PERFECT_EARLY) {
                    judgement = 'GREAT';
                } else if (diff <= Mbeat.PERFECT_EARLY && diff > Mbeat.PERFECT_LATE) {
                    judgement = 'PERFECT';
                } else if (diff <= Mbeat.PERFECT_LATE && diff > Mbeat.GREAT_LATE) {
                    judgement = 'GREAT';
                } else if (diff <= Mbeat.GREAT_EARLY && diff > Mbeat.GOOD_LATE) {
                    judgement = 'GOOD';
                } else if (diff <= Mbeat.GOOD_LATE) {
                    judgement = 'MISS';
                }

                if (note.data.time == 79.751) {
                    console.log(Mbeat.curr_time);
                }

                if (judgement) {
                    note.destroy();
                }

                //Mbeat.tap_sfx.play();
                Mbeat.debug.note_time = note.data.time;
                Mbeat.debug.timing_diff = diff;

                Mbeat.debug.judgement = judgement;
            }
        } else if (!game.input.keyboard.isDown(this.data.keycode)) {
            this.loadTexture(this.data.img0_key);
            this.data.canPress = true;
        }
    };

    return key;
};
