(function () {

    fluid.defaults("raindrop.audioBusPlayer", {
        gradeNames: ["flock.synth", "autoInit"],

        bus: undefined,
        buffer: undefined,
        speed: 1.0,

        synthDef: {
            ugen: "flock.ugen.out",
            bus: "{that}.options.bus",
            expand: 1,
            sources: {
                ugen: "flock.ugen.playBuffer",
                loop: 0.0,
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
}());
