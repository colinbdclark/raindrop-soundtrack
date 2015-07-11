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

            macroSynth: {
                type: "raindrop.macroSynth",
                options: {
                    inBus: "{chopinLeft}.options.bus",
                    outBus: 11,
                    addToEnvironment: 2
                }
            },

            warbledPiano: {
                type: "raindrop.warbledRightPiano",
                options: {
                    addToEnvironment: 3
                }
            },

            distortedPiano: {
                type: "raindrop.distortedLeftPiano",
                options: {
                    addToEnvironment: 3
                }
            },

            leftBreathing: {
                type: "raindrop.breathing",
                options: {
                    bus: "{chopinLeft}.options.bus",
                    addToEnvironment: 3
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

}());
