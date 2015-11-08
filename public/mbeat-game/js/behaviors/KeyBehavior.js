/**
 * Change the look of the keys on button press.
 *
 * @param game_object {Phaser.Image}
 * @param state {Phaser.State}
 * @param keycode {Phaser.KeyCode}
 * @constructor
 */
var KeyBehavior = function (game_object, state, keycode) {
    this.game_object = game_object;
    this.state = state;
    this.default_img = game_object.data.default_img;
    this.alt_img = game_object.data.alt_img;
    this.keycode = keycode;
};

KeyBehavior.prototype.update = function () {
    // Assume that there is a `data` property in the object.
    // `data` is an object with `default_img` and `alt_img` properties.
    if (this.state.input.keyboard.isDown(this.keycode)) {
        this.game_object.loadTexture(this.alt_img);
    } else {
        this.game_object.loadTexture(this.default_img);
    }
};
