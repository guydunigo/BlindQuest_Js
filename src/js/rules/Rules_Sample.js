export default Sample;

const Sample = function (bq) {
    const sample = {
        // debug purpose only
        // Better to use the event name if possible
        name: "bq.some.event.base",
        // Actual method called by the event handler :
        main: function (bq, event) { },
        // Triggered by event(s) : must be an Array
        events: [
            "bq.some.event"
        ],
        // If is instant, execute it directly when the event is called
        //   (doesn't wait for the main loop to handle it)
        instant: false,

        // Optional properties :

        // Any data used the rule
        //      ie : depending on stamina, ...
        data: {
        },

        // played before the actual action
        pre: {},
        // played after the the actual action
        // ie : when you try to leave, the square may hurt you, ...
        post: {},
        // applied when there is no events for this rule (not done yet)
        // ie : static effects when staying on the case
        idle: {}

        // ...
    }

    sample.main = function (bq, event) {
        // Calling pre
        // Acting
        // Calling post
    };

    /* --- move.pre --- */
    // args : bq and whatever the rule.main need
    // // But every pre and post should use the same args
    // // (at least one model for pre and one for post)
    // returns : whatever the rule.main need (same comment as for the args)

    sample.pre.nogo = {
        main: function (bq) {
            // Do things
        },

        // Optional :

        data: undefined,
        sounds: undefined
        // ...
    }

    // Don't forget to register your rule to the events defined in move.events
    bq.events.register(sample);

    return sample;
}
