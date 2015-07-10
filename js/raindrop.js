(function () {
    "use strict";

    flock.init();
    
    fluid.defaults("colin.raindrop", {
        gradeNames: ["fluid.viewRelayComponent", "autoInit"],

        components: {
            playButton: {
                type: "flock.ui.enviroPlayButton",
                container: "{that}.dom.playButton"
            }
        },

        selectors: {
            playButton: "#play"
        }
    });

}());
