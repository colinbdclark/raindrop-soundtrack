(function () {
    "use strict";

    fluid.defaults("raindrop.warbledRightPiano", {
        gradeNames: ["flock.synth", "autoInit"],

        synthDef: {
            ugen: "flock.ugen.in",
            bus: 10,
            mul: {
                ugen: "flock.ugen.in",
                bus: 11,
                mul: 10
            }
        }
    });

    fluid.defaults("raindrop.distortedLeftPiano", {
        gradeNames: ["flock.synth", "autoInit"],

        synthDef: {
            ugen: "flock.ugen.distortion.deJonge",
            source: {
                ugen: "flock.ugen.in",
                bus: 9
            },
            amount: {
                ugen: "flock.ugen.in",
                bus: 11,
                mul: 1000
            },
            mul: 0.05
        }
    });

    fluid.defaults("raindrop.breathing", {
        gradeNames: ["flock.synth", "autoInit"],

        bus: 9,

        synthDef: {
            ugen: "flock.ugen.math",
            rate: "audio",
            source: {
                ugen: "flock.ugen.filter.biquad.hp",
                freq: 8000,
                q: 100,
                source: {
                    ugen: "flock.ugen.filter.biquad.hp",
                    freq: 5000,
                    q: 100,
                    source: {
                        ugen: "flock.ugen.in",
                        bus: "{that}.options.bus",
                        mul: 250
                    }
                }
            },
            mul: 0.3
        }
    });
}());
