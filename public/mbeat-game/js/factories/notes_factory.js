/**
 * Create multiple Notes from notes data and add them to the world.
 *
 * @param state {Phaser.State}
 * @param notes_data {Array}
 * @param image_keys {Array}
 * @returns {*|Phaser.Group}
 */
Mbeat.factory.notes = function (state, notes_data, image_keys) {
    var song_group = state.add.group();

    for (var i = notes_data.length; i > 0; i--) {
        var beat_data = notes_data[i - 1];

        for (var c = 0; c < 4; c++) {
            var note_type = beat_data.notes.charAt(c);
            var note_width = state.cache.getImage(image_keys[c]).width;

            if (note_type == 1) {
                song_group.add(
                    Mbeat.factory.note(
                        state,
                        c * (note_width + Mbeat.NOTE_GAP),
                        -beat_data.number * Mbeat.BEAT_GAP,
                        image_keys[c],
                        beat_data.time,
                        1
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
 * @returns {*|Phaser.Sprite}
 */
Mbeat.factory.note = function (state, x, y, key, time, type) {
    var note = state.make.sprite(x, y, key)

    note.data = {
        time: time,
        type: type
    };

    return note;
};
