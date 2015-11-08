
var SongFactory = function (stage, image_keys) {
    this.stage = stage;
    this.noteFactory = new NoteFactory(stage);
    this.note_images = image_keys
};

/**
 * Adds a song group with all the notes, arranged.
 *
 * @param song_data
 * @param note_width
 * @param beat_gap
 * @returns {*|Phaser.Group}
 */
SongFactory.prototype.make = function (song_data, note_gap, beat_gap) {
    var song_group = this.stage.add.group();

    for (var i = song_data.length; i > 0; i--) {
        var beat_data = song_data[i - 1];
        for (var c = 0; c < 4; c++) {
            var note_type = beat_data.notes.charAt(c);
            var note_width = this.stage.cache.getImage(this.note_images[c]).width;

            if (note_type == 1) {
                var note = this.noteFactory.make(
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
