/**
 * Create a Sound object and add it to the world. Play the sound
 * once after the specified delay.
 *
 * @param state {Phaser.State|Phaser.Game}
 * @param music_key {String}
 * @param delay {Number}
 * @returns {{}}
 */
Mbeat.factory.music = function (state, music_key, delay) {
    var system = {};

    system.state = state;
    system.offset = delay;
    system.music = state.add.audio(music_key);
    system.timer = 0;
    system.hasPlayed = false;

    system.update = function () {
        this.timer += this.state.time.physicsElapsed;

        if (this.timer >= this.offset && !this.hasPlayed) {
            this.music.mute = false;
            this.music.play();
            this.hasPlayed = true;
        }

        Mbeat.debug.music_timer = this.timer;
    };

    state.systems.push (system);
    return system;
};