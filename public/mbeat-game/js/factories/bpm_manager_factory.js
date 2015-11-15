/**
 * Create a BPM Manager and add it to the world.
 *
 * @param state {Phaser.State}
 * @param bpm_queue {Array}
 */
Mbeat.factory.bpmManager = function (state, bpm_queue) {
    var system = {};

    system.state = state;
    system.queue = bpm_queue;
    system.timer = 0;

    // Add that part where beat 0 must first align with the keys first
    var init_duration = (Mbeat.KEY_HEIGHT / Mbeat.BEAT_GAP)/* + Mbeat.BEAT_OFFSET*/;
    system.queue.unshift(
        {
            duration: init_duration,
            bpm: Mbeat.BPM
        }
    );

    system.update = function () {
        this.timer += this.state.time.physicsElapsed;

        if (this.queue[0].duration !== '' && this.timer >= this.queue[0].duration) {
            this.timer = 0;
            this.queue.shift();
        }

        Mbeat.curr_bpm = this.queue[0].bpm;

        Mbeat.debug.timer = this.timer;
        Mbeat.debug.duration = this.queue[0].duration;
    };

    state.systems.push(system);
    return system;
};
