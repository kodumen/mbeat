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
        canPress: true,
        note_held: null, // type-3 note currently being held
        hold_timer: 0
    };

    key.update = function () {
        if (!game.input.keyboard.isDown(this.data.keycode)) {
            this.loadTexture(this.data.img0_key);
            this.data.canPress = true;
            this.data.hold_timer = 0;
        } else if (this.data.note_held) {
            this.data.canPress = false;
            this.data.hold_timer += game.time.physicsElapsed;
            this.data.note_held.height = Mbeat.KEY_HEIGHT - this.data.note_held.y;

            if (this.data.hold_timer >= Mbeat.HOLD_INTERVAL) {
                Mbeat.player.score += Mbeat.HOLD_PNT;
                this.data.hold_timer = 0;
            }

            // Prevent the height becoming negative resulting for the
            // note to get longer as it moves further from the key
            if (this.data.note_held.y > Mbeat.KEY_HEIGHT) {
                this.data.note_held.destroy();
                this.data.note_held = null;
            }
        } else if (this.data.canPress) {
            this.loadTexture(this.data.img1_key);
            this.data.canPress = false;

            // Look for nearest note
            var note = null;
            var speed = Mbeat.curr_bpm / Mbeat.BPM;
            var diff = 0;
            for (var i = Mbeat.notes.children.length; i > 0 ; i--) {
                note = Mbeat.notes.children[i - 1];
                diff = Mbeat.KEY_HEIGHT - note.y;

                if (note.data.is_miss || diff > Mbeat.BAD * speed) {
                    continue;
                }

                if (note.data.column == this.data.column) {
                    break;
                }
            }

            if (!note) {
                return;
            }

            // judge timing
            if (note.data.type == 1 || note.data.type == 2) {
                var judgment = '';
                var points = 0;

                if (diff <= Mbeat.BAD * speed && diff > Mbeat.GOOD_EARLY * speed) {
                    judgment = Mbeat.STR_BAD;
                    points = Mbeat.BAD_PNT;
                } else if (diff <= Mbeat.GOOD_EARLY * speed && diff > Mbeat.GREAT_EARLY * speed) {
                    judgment = Mbeat.STR_GOOD;
                    points = Mbeat.GOOD_PNT;
                } else if (diff <= Mbeat.GREAT_EARLY * speed && diff > Mbeat.PERFECT_EARLY * speed) {
                    judgment = Mbeat.STR_GREAT;
                    points = Mbeat.GREAT_PNT;
                } else if (diff <= Mbeat.PERFECT_EARLY * speed && diff > Mbeat.FLAWLESS_EARLY * speed) {
                    judgment = Mbeat.STR_PERFECT;
                    points = Mbeat.PERFECT_PNT;
                } else if (diff <= Mbeat.FLAWLESS_EARLY * speed && diff > Mbeat.FLAWLESS_LATE * speed) {
                    judgment = Mbeat.STR_FLAWLESS;
                    points = Mbeat.FLAWLESS_PNT;
                } else if (diff <= Mbeat.FLAWLESS_LATE * speed && diff > Mbeat.PERFECT_LATE * speed) {
                    judgment = Mbeat.STR_PERFECT;
                    points = Mbeat.PERFECT_PNT;
                } else if (diff <= Mbeat.PERFECT_LATE * speed && diff > Mbeat.GREAT_LATE * speed) {
                    judgment = Mbeat.STR_GREAT;
                    points = Mbeat.GREAT_PNT;
                } else if (diff <= Mbeat.GREAT_EARLY * speed && diff > Mbeat.GOOD_LATE * speed) {
                    judgment = Mbeat.STR_GOOD;
                    points = Mbeat.GOOD_PNT;
                }

                if (note.data.type == 2 && judgment != Mbeat.STR_BAD) {
                    this.data.note_held = note.data.tail;
                }

                if (judgment) {
                    Mbeat.player.setJudgment(judgment);
                    Mbeat.player.score += points;
                    note.destroy();
                }
            }
        }
    };

    return key;
};
