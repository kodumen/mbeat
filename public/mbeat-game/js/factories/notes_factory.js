/**
 * Create multiple Notes from notes data and add them to the world.
 *
 * @param state {Phaser.State}
 * @param notes_data {Array}
 * @param image_keys {Array}
 * @param note_gap {Number}
 * @param beat_gap {Number}
 * @returns {*|Phaser.Group}
 */
Mbeat.factory.notes = function (state, notes_data, image_keys, note_gap, beat_gap) {
    var song_group = state.add.group();

    for (var i = notes_data.length; i > 0; i--) {
        var beat_data = notes_data[i - 1];

        for (var c = 0; c < 4; c++) {
            var note_type = beat_data.notes.charAt(c);
            var note_width = state.cache.getImage(image_keys[c]).width;

            if (note_type == 1 || note_type == 2) {
                song_group.add(
                    Mbeat.factory.note(
                        state,
                        c * (note_width + note_gap),
                        -beat_data.number * beat_gap,
                        image_keys[c],
                        beat_data.time,
                        1,
                        c
                    ),
                    true
                );
            }
        }
    }

    return song_group;
};

/**
 * Create a Note but do not add it to the world.
 *
 * @param state {Phaser.State}
 * @param x {Number}
 * @param y {Number}
 * @param key {String}
 * @param time {Number}
 * @param type {Number}
 * @param column {Number}
 * @returns {*|Phaser.Sprite}
 */
Mbeat.factory.note = function (state, x, y, key, time, type, column) {
    var note = state.make.sprite(x, y, key);

    note.data = {
        time: time,
        type: type,
        column: column,
        isLogged: false
    };

    note.update = function () {
        this.y += (Mbeat.BEAT_GAP * Mbeat.curr_bpm / 60 /* sec */) * (state.time.physicsElapsed);

        //if (this.y >= Mbeat.KEY_HEIGHT - (Mbeat.GOOD_LATE * (Mbeat.curr_bpm / Mbeat.BPM)) && !this.data.isLogged) {
        //    Mbeat.tap_sfx.play();
        //    Mbeat.debug.note_y = this.y;
        //    Mbeat.debug.y_diff = Mbeat.KEY_HEIGHT - this.y;
        //    this.data.isLogged = true;
        //    this.destroy();
        //}

        if (this.y > game.height) {
            this.destroy();
        }
    };

    return note;
};
