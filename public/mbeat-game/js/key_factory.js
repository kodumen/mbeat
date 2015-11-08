/**
 * KeyFactory
 * Creates Keys. Keys are guides to know when notes should be tapped/pressed.
 *
 * @param state {Phaser.State}
 * @constructor
 */
var KeyFactory = function (state) {
    this.state = state;
};

/**
 * Create a Key but do not add it to the scene.
 *
 * @param x {Number}
 * @param y {Number}
 * @param image_keys {Array} 0 is the default image, 1 is alternate image
 * @returns {*|Phaser.Sprite}
 */
KeyFactory.prototype.make = function (x, y, image_keys) {
    var key = this.state.make.sprite(x, y, image_keys[0]);

    key.data = {
        default_img: image_keys[0],
        alt_img: image_keys[1]
    };

    return key;
};

/**
 * Create 4 Keys next to each other. Width of each key is determined by the
 * width of the default image.
 *
 * @param default_img_key {String}
 * @param alt_img_key {String}
 * @returns {*|Phaser.Group}
 */
KeyFactory.prototype.makeSet = function (default_img_key, alt_img_key) {
    var key_group = this.state.add.group();
    var key_width = this.state.cache.getImage(default_img_key).width;

    for (var i = 0; i < 4; i++) {
        key_group.add(this.make(
            i * (key_width + Mbeat.NOTE_GAP),
            0,
            [default_img_key, alt_img_key]
        ));
    }

    return key_group;
};
