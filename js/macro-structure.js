(function () {
    "use strict";

    /**
     * A synth that plays back an audio buffer
     * with a significant amount of low-frequency smoothing,
     * in order to better reflect its overall amplitude contour
     */
    fluid.defaults("raindrop.macroSynth", {
        gradeNames: ["flock.synth", "autoInit"],

        inBus: 9,
        outBus: 11,

        synthDef: {
            ugen: "flock.ugen.out",
            bus: "{that}.options.outBus",
            expand: 1,
            sources: {
                ugen: "flock.ugen.filter.biquad.lp",
                freq: 1000,
                source: {
                    ugen: "flock.ugen.amplitude",
                    source: {
                        ugen: "flock.ugen.in",
                        bus: "{that}.options.inBus"
                    }
                }
            }
        },
        addToEnvironment: "head"
    });
}());
