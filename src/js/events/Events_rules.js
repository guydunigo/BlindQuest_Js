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

        let dest = {};
        if (rule.instant) {
            dest = events.instants;
        }
        else {
            dest = events.rules;
        }
        // Add them to the list :
        goodTargets.forEach(function (targ) {
            if (dest[targ] instanceof Array) {
                dest.push(targ);
            }
            else {
                dest[targ] = [rule];
            }
            console.log("EVENTS REGISTER " + rule.name + " TO " + targ);
        })
    };

    // Call the more generic rule first
    //   ("world" before "world.player.move.up")
    // throw ni; Good idea ?
    // throw ni; send all events for this rule of one at a time ?
    //     >> track the uncalled rules and call the idle method ?
    // returns true if a rule was called, false if nothing was done
    events.handle = function (evts, rulesList = events.rules) {
        let tree, rules, res = false;
        evts.forEach(function (ev) {
            tree = events.getParentsTree(ev);
            tree.forEach(function (cat) {
                rules = rulesList[cat];
                if (rules !== undefined) {
                    if (res !== true)
                        res = true;
                    rules.forEach(function (rule) {
                        console.log("EVENTS EXEC " + rule.name);
                        rule.main(bq, ev);
                    });
                }
            })
        });

        return res
    }

    return events;
}