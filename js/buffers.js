(function () {

    fluid.defaults("raindrop.bufferLoader", {
        gradeNames: ["flock.bufferLoader", "autoInit"],

        bufferDefs: [
            {
                id: "chopin-left",
                url: "audio/chopin-left.wav"
            },
            {
                id: "chopin-right",
                url: "audio/chopin-right.wav"
            },
            {
                id: "sun-sounds-one-mode-I-1-2",
                url: "audio/sun-sounds-one-mode-I-1-2.wav"
            },
            {
                id: "jcyclo",
                url: "audio/jcyclo.wav"
            },
            {
                id: "cas-sed",
                url: "audio/cas-sed-06-023-twohour.wav"
            },
            {
                id: "interstellar",
                url: "audio/interstellar.wav"
            }
        ]
    });
}());
