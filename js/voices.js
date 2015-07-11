(function () {
    "use strict";

    fluid.defaults("raindrop.warbledRightPiano", {
        gradeNames: ["flock.synth", "autoInit"],

        synthDef: {
            ugen: "flock.ugen.in",
            bus: 10,
            mul: {
                ugen: "flock.ugen.in",
                bus: 14,
                mul: 20
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
                bus: 14,
                mul: 1000
            },
            mul: 0.01
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
            mul: 0.1
        }
    });

    fluid.defaults("raindrop.inputModulated", {
        gradeNames: ["flock.synth", "autoInit"],

        lag: 0.5,
        mul: 10,

        synthDef: {
            ugen: "flock.ugen.in",
            bus: "{that}.options.bus",
            mul: {
                ugen: "flock.ugen.lag",
                lag: "{that}.options.lag",
                source: {
                    ugen: "flock.ugen.in",
                    bus: "{that}.options.modBus",
                    mul: "{that}.options.mul"
                }
            }
        }
    });

    fluid.defaults("raindrop.sunOneModeModulated", {
        gradeNames: ["raindrop.inputModulated", "autoInit"],

        bus: 11,
        modBus: 9,
        lag: 0.5,
        mul: 30
    });

    fluid.defaults("raindrop.jcycloModulated", {
        gradeNames: ["raindrop.inputModulated", "autoInit"],

        bus: 12,
        modBus: 10,
        lag: 1.0,
        mul: 5
    });

    fluid.defaults("raindrop.casSedModulated", {
        gradeNames: ["raindrop.inputModulated", "autoInit"],

        bus: 13,
        modBus: 9,
        lag: 10.0,
        mul: 30
    });

    fluid.defaults("raindrop.granulatedPiano", {
        gradeNames: ["flock.synth", "autoInit"],

        synthDef: {
            ugen: "flock.ugen.triggerGrains",
            buffer: "chopin-left",
            dur: {
                ugen: "flock.ugen.lfNoise",
                freq: 1/2,
                mul: 0.6,
                add: 1,
                options: {
                    interpolation: "linear"
                }
            },
            trigger: {
                ugen: "flock.ugen.gate",
                source: 1.0,
                sideChain: {
                    ugen: "flock.ugen.in",
                    bus: 10
                },
                threshold: 0.002
            },
            speed: {
                ugen: "flock.ugen.sinOsc",
                freq: {
                    ugen: "flock.ugen.lfNoise",
                    freq: 1/100,
                    mul: 1/100,
                    add: 1/100,
                    options: {
                        interpolation: "linear"
                    }
                },
                mul: 0.1,
                add: 0.9
            },
            centerPos: {
                ugen: "flock.ugen.lfNoise",
                freq: 1/100,
                mul: {
                    ugen: "flock.ugen.bufferLength",
                    buffer: "chopin-left",
                    mul: 0.0001
                },
                add: {
                    ugen: "flock.ugen.bufferLength",
                    buffer: "chopin-left",
                    mul: 0.0001
                }
            },
            mul: 0.75
        }
    });
}());
