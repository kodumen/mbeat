/**
 * NoteFactory
 *
 * @param stage {Phaser.State}
 * @param image_keys {Array}
 * @constructor
 */
var NoteFactory = function (stage, image_keys) {
    this.stage = stage;
    this.note_images = image_keys
};

/**
 * Make a new note
 * @param x
 * @param y
 * @param time
 * @param type
 * @param image
 * @returns {*|Phaser.Image|{}|Phaser.Loader}
 */
NoteFactory.prototype.make = function (x, y, image, time, type) {
    var note = this.stage.make.image(x, y, image);

    note.data = {
        time: time,
        type: type
    };

    return note;
};

/**
 * Generate multiple notes from song data. Returns a group with all the notes
 *
 * @param song_data
 * @param note_gap {Number}
 * @param beat_gap {Number}
 * @returns {*|Phaser.Group}
 */
NoteFactory.prototype.makeFromSong = function (song_data, note_gap, beat_gap) {
    var song_group = this.stage.add.group();

    for (var i = song_data.length; i > 0; i--) {
        var beat_data = song_data[i - 1];
        for (var c = 0; c < 4; c++) {
            var note_type = beat_data.notes.charAt(c);
            var note_width = this.stage.cache.getImage(this.note_images[c]).width;

            if (note_type == 1) {
                var note = this.make(
                    c * (note_width + note_gap),
                    -beat_data.number * beat_gap,
                    this.note_images[c],
                    beat_data.time,
                    1
                );

                song_group.add(note, true);
            }
        }
    }

    return song_group;
};
