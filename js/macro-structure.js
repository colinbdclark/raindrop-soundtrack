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
        outBus: 14,

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

    fluid.defaults("raindrop.loudVoiceEnvelope", {
        gradeNames: ["fluid.standardRelayComponent", "autoInit"],

        envelope: {
            ugen: "flock.ugen.envGen",
            gate: 1.0,
            envelope: {
                // Quieter points at 1'57"-2'47" and 3'17"-3'33", fade from 5'32"-5'47"
                levels: [1, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1, 0],
                times: [113, 4, 50, 2, 26, 4, 18, 2, 104, 15]
            },
            mul: "{that}.options.mul"
        }
    });

    fluid.defaults("raindrop.regularVoiceEnvelope", {
        gradeNames: ["fluid.standardRelayComponent", "autoInit"],

        envelope: {
            ugen: "flock.ugen.envGen",
            gate: 1.0,
            envelope: {
                levels: [1, 1, 0],
                times: [323, 15]
            },
            mul: "{that}.options.mul"
        }
    });

}());
