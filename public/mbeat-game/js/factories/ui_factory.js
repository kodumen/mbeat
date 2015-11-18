/**
 * Namespace for UI-related factories
 * @type {{}}
 */
Mbeat.factory.ui = {};

/**
 * Create a judgment text and add to the world
 * @param state {Phaser.State|Phaser.Game}
 * @param x {Number}
 * @param y {Number}
 * @param anchor_x {Number}
 * @param anchor_y {Number}
 * @param font {String}
 * @param size {Number}
 */
Mbeat.factory.ui.judgment = function (state, x, y, anchor_x, anchor_y, font, size) {
    var judgment = state.add.text(x, y, '', {font: size + 'px ' + font});
    judgment.anchor.x = anchor_x;
    judgment.anchor.y = anchor_y;
    judgment.fill = Mbeat.COLOR_BLACK;

    judgment.update = function () {
        if (Mbeat.player.is_judgment_changed) {
            this.text = Mbeat.player.judgment;

            switch (Mbeat.player.judgment) {
                case Mbeat.STR_BAD:
                    this.fill = Mbeat.COLOR_VIOLET;
                    break;
                case Mbeat.STR_GOOD:
                    this.fill = Mbeat.COLOR_BLUE;
                    break;
                case Mbeat.STR_GREAT:
                    this.fill = Mbeat.COLOR_GREEN;
                    break;
                case Mbeat.STR_PERFECT:
                    this.fill = Mbeat.COLOR_YELLOW;
                    break;
                case Mbeat.STR_MISS:
                    this.fill = Mbeat.COLOR_RED;
                    break;
                default:
                    break;
            }

            Mbeat.player.is_judgment_changed = false;
        }
    };

    return judgment;
};
