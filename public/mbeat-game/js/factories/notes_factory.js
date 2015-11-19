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
    var note3_buffer = [null, null, null, null];  // holds the latest type-3 notes in each column

    // Start from the last note
    for (var i = notes_data.length; i > 0; i--) {
        var beat_data = notes_data[i - 1];

        for (var c = 0; c < 4; c++) {
            var note_type = beat_data.notes.charAt(c);
            var note_width = state.cache.getImage(image_keys[c]).width;

            if (note_type == 0) {
                continue;
            }

            var note = Mbeat.factory.note(
                state,
                c * (note_width + note_gap),
                -beat_data.number * beat_gap,
                image_keys[c],
                parseInt(note_type),
                c
            );

            if (note_type == 3) {
                note3_buffer[c] = note; // store for now
            } else if (note_type == 2) {
                // Set tail
                note3_buffer[c].height = note.y - note3_buffer[c].y;
                note.data.tail = note3_buffer[c];
            }

            song_group.add(note, true);
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
 * @param type {Number}
 * @param column {Number}
 * @returns {*|Phaser.Sprite}
 */
Mbeat.factory.note = function (state, x, y, key, type, column) {
    var note = state.make.sprite(x, y, key);

    note.data = {
        type: type,
        column: column,
        is_miss: false,
        tail: null // must be set for type-2 notes, null otherwise
    };

    note.update = function () {
        this.y += (Mbeat.BEAT_GAP * Mbeat.curr_bpm / 60 /* sec */) * (state.time.physicsElapsed);

        if (this.y >= Mbeat.KEY_HEIGHT - (Mbeat.GOOD_LATE * (Mbeat.curr_bpm / Mbeat.BPM)) && !this.data.is_miss) {
            Mbeat.player.setJudgment(Mbeat.STR_MISS);
            Mbeat.player.score += Mbeat.MISS_PNT;
            this.data.is_miss = true;
            this.alpha = 0.5;

            if (this.data.type == 2) {
                this.data.tail.is_miss = true;
                this.alpha = 0.5;
            }
        }

        if (this.y > game.height) {
            this.destroy();
        }
    };

    return note;
};
