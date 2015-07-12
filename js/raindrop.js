(function () {
    "use strict";

    flock.init({
        numBuses: 16,
        bufferSize: 8192
    });

    fluid.defaults("raindrop.composition", {
        gradeNames: ["fluid.viewRelayComponent", "autoInit"],

        components: {
            playButton: {
                type: "raindrop.playButton",
                container: "{that}.dom.playButton"
            },

            bufferLoader: {
                type: "raindrop.bufferLoader",
                options: {
                    events: {
                        afterBuffersLoaded: "{composition}.events.onReady"
                    }
                }
            },

            chopinLeft: {
                type: "raindrop.chopinLeftPlayer",
                options: {
                    addToEnvironment: 0
                }
            },

            chopinRight: {
                type: "raindrop.chopinRightPlayer",
                options: {
                    addToEnvironment: 1
                }
            },

            sunOne: {
                type: "raindrop.sunOneModePlayer",
                options: {
                    addToEnvironment: 2
                }
            },

            jcyclo: {
                type: "raindrop.jcycloPlayer",
                options: {
                    addToEnvironment: 3
                }
            },

            casSed: {
                type: "raindrop.casSedPlayer",
                options: {
                    addToEnvironment: 4
                }
            },

            macroSynth: {
                type: "raindrop.macroSynth",
                options: {
                    inBus: "{chopinLeft}.options.bus",
                    outBus: 14,
                    addToEnvironment: 5
                }
            },

            warbledPiano: {
                type: "raindrop.warbledRightPiano",
                options: {
                    addToEnvironment: 6
                }
            },

            distortedPiano: {
                type: "raindrop.distortedLeftPiano",
                options: {
                    addToEnvironment: 7
                }
            },

            sun: {
                type: "raindrop.sunOneModeModulated",
                options: {
                    addToEnvironment: 9
                }
            },

            jupiter: {
                type: "raindrop.jcycloModulated",
                options: {
                    addToEnvironment: 10
                }
            },

            cassini: {
                type: "raindrop.casSedModulated",
                options: {
                    addToEnvironment: 11
                }
            },

            pianoGrains: {
                type: "raindrop.granulatedPiano",
                options: {
                    addToEnvironment: 12
                }
            },

            plainChopin: {
                type: "raindrop.plainChopin",
                options: {
                    addToEnvironment: 13
                }
            },

            interstellar: {
                type: "raindrop.interstellar",
                options: {
                    addToEnvironment: 14
                }
            },

            pip: {
                type: "raindrop.pip",
                options: {
                    addToEnvironment: 15
                }
            },
            recorder: {
                type: "raindrop.recorder",
                options: {
                    addToEnvironment: 16
                }
            }
        },

        events: {
            onReady: null
        },

        selectors: {
            playButton: "#play"
        }
    });

    /**
     * A play button that only enables itself
     * once its composition's bufferLoader
     * has successfully loaded all buffers.
     */
    fluid.defaults("raindrop.playButton", {
        gradeNames: ["flock.ui.enviroPlayButton", "autoInit"],

        listeners: {
            onCreate: "{that}.disable()",
            "{composition}.events.onReady": "{that}.enable()"
        }
    });

    fluid.defaults("raindrop.recorder", {
        gradeNames: ["flock.synth", "autoInit"],

        duration: 6 * 60,

        synthDef: {
            ugen: "flock.ugen.writeBuffer",
            options: {
                duration: "{that}.options.duration",
                numOutputs: 2
            },
            buffer: "raindrop",
            sources: [
                {
                    ugen: "flock.ugen.in",
                    bus: 0
                },
                {
                    ugen: "flock.ugen.in",
                    bus: 1
                }
            ]
        },

        events: {
            onRecord: "{playButton}.events.onPlay",
            afterRecorded: null
        },

        listeners: {
            onRecord: {
                funcName: "raindrop.recorder.start",
                args: [
                    "{enviro}.asyncScheduler",
                    "{that}.options.duration",
                    "{that}.events.afterRecorded.fire"
                ]
            },

            afterRecorded: [
                "{enviro}.saveBuffer(raindrop, float32)",
                "{playButton}.pause()"
            ]
        }
    });

    raindrop.recorder.start = function (scheduler, duration, afterRecorded) {
        scheduler.once(duration, afterRecorded);
    };

}());
