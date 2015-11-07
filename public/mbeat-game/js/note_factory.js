/**
 * NoteFactory
 *
 * @param stage Phaser.Stage
 * @constructor
 */
var NoteFactory = function (stage) {
    this.stage = stage;
};

/**
 * Make a new note
 * @param x
 * @param y
 * @param note_data
 * @param type
 * @param image
 * @returns {*|Phaser.Image|{}|Phaser.Loader}
 */
NoteFactory.prototype.make = function (x, y, image, note_data, type) {
    var note = this.stage.make.image(x, y, image);

    note.data = {
        time: note_data.time,
        type: type
    };

    return note;
};
