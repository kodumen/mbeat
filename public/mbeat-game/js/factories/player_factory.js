/**
 * Create a player object and add it to the systems
 *
 * @param state {Phaser.State|Phaser.Game}
 * @param score {Number}
 * @param judgment {String}
 */
Mbeat.factory.player = function (state, score, judgment) {
    var player = {};

    player.score = score;
    player.judgment = judgment;
    player.is_judgment_changed = false;

    /**
     * Use this to set the judgment.
     *
     * @param judgment
     */
    player.setJudgment = function (judgment) {
        this.judgment = judgment;
        this.is_judgment_changed = true;
    };

    /**
     * Runs in the update loop
     */
    player.update = function () {

    };

    /**
     * Runs after the update loop
     */
    player.postUpdate = function () {
        this.is_judgment_changed = false;
    };

    state.systems.push(player);
    return player;
};
