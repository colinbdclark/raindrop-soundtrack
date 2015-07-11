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
            }
        ]
    });
}());
