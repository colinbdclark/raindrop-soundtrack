(function () {

    fluid.defaults("raindrop.player", {
        gradeNames: ["flock.synth", "autoInit"],

        buffer: {},
        loop: 0.0,
        mul: 1.0,

        synthDef: {
            ugen: "flock.ugen.playBuffer",
            buffer: "{that}.options.buffer",
            loop: "{that}.options.loop",
            mul: "{that}.options.mul"
        }
    });

    fluid.defaults("raindrop.audioBusPlayer", {
        gradeNames: ["flock.synth", "autoInit"],

        bus: undefined,
        buffer: undefined,
        speed: 1.0,
        loop: 0.0,

        synthDef: {
            ugen: "flock.ugen.out",
            bus: "{that}.options.bus",
            expand: 1,
            sources: {
                ugen: "flock.ugen.playBuffer",
                loop: "{that}.options.loop",
                speed: "{that}.options.speed",
                buffer: "{that}.options.buffer"
            }
        },

        addToEnvironment: "head"
    });

    fluid.defaults("raindrop.chopinLeftPlayer", {
        gradeNames: ["raindrop.audioBusPlayer", "autoInit"],
        buffer: "chopin-left",
        bus: 9
    });

    fluid.defaults("raindrop.chopinRightPlayer", {
        gradeNames: ["raindrop.audioBusPlayer", "autoInit"],
        buffer: "chopin-right",
        bus: 10,
        speed: {
            ugen: "flock.ugen.triOsc",
            freq: 1/10,
            mul: 0.02,
            add: 0.98
        }
    });

    fluid.defaults("raindrop.sunOneModePlayer", {
        gradeNames: ["raindrop.audioBusPlayer", "autoInit"],

        buffer: "sun-sounds-one-mode-I-1-2",
        bus: 11,
        loop: 1.0
    });

    fluid.defaults("raindrop.jcycloPlayer", {
        gradeNames: ["raindrop.audioBusPlayer", "autoInit"],

        buffer: "jcyclo",
        bus: 12,
        loop: 1.0
    });

    fluid.defaults("raindrop.casSedPlayer", {
        gradeNames: ["raindrop.audioBusPlayer", "autoInit"],

        buffer: "cas-sed",
        bus: 13,
        loop: 1.0
    });
}());
