export default loadRulesHandlers;

function loadRulesHandlers(bq, events) {
    // Possible memory loss ? rule duplicating ?
    //   throw ni; test modifying the one in events and see if it changes in env too.
    events.register = function (rule) {
        const goodTargets = [];
        // Keep only good events
        if (rule.events !== undefined) {
            rule.events.forEach(function (targ) {
                if (events.isEventGood(targ)) {
                    goodTargets.push(targ);
                }
            });
        }

        // Add them to the list :
        goodTargets.forEach(function (targ) {
            if (events.rules[targ] instanceof Array) {
                events.rules.push(targ);
            }
            else {
                events.rules[targ] = [rule];
            }
            console.log("EVENTS REGISTER " + rule.name + " TO " + targ);
        })
    };

    // Call the more generic rule first
    //   ("world" before "world.player.move.up")
    // throw ni; Good idea ?
    // throw ni; send all events for this rule of one at a time ?
    //     >> track the uncalled rules and call the idle method ?
    events.handle = function (evts) {
        let tree, rules;
        evts.forEach(function (ev) {
            tree = events.getParentsTree(ev);
            tree.forEach(function (cat) {
                rules = events.rules[cat];
                if (rules !== undefined) {
                    rules.forEach(function (rule) {
                        console.log("EVENTS EXEC " + rule.name);
                        rule.main(bq, ev);
                    });
                }
            })
        });
    }

    return events;
}