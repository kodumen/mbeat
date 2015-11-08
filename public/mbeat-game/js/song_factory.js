
var SongFactory = function (stage) {
    this.stage = stage;
    this.noteFactory = new NoteFactory(stage);
};

/**
 * Adds a song group with all the notes, arranged.
 *
 * @param song_data
 * @param note_width
 * @param beat_gap
 * @returns {*|Phaser.Group}
 */
SongFactory.prototype.make = function (song_data, note_width, beat_gap) {
    var song_group = this.stage.add.group();

    for (var i = song_data.length; i > 0; i--) {
        var beat_data = song_data[i - 1];
        for (var c = 0; c < 4; c++) {
            var note_type = beat_data.notes.charAt(c);

            if (note_type == 1) {
                var note = this.noteFactory.make(
                    c * note_width,
                    -beat_data.number * beat_gap,
                    'red_brick',
                    beat_data.time,
                    1
                );

                song_group.add(note, true);
            }
        }
    }

    return song_group;
};
