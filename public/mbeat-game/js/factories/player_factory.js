/**
 * Create a player object but do not add it to the world or the systems
 *
 * @param score
 * @param judgment
 */
Mbeat.factory.player = function (score, judgment) {
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

    return player;
};
