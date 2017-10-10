export default loadRulesHandlers;

import opts from "../config.js";

function loadRulesHandlers(bq, events) {
    // Possible memory loss ? rule duplicating ?
    //   throw ni; test modifying the one in events and see if it changes in env too.
    // throw ni; check rule ?
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
                dest[targ].push(rule);
            }
            else {
                dest[targ] = [rule];
            }

            if (opts.DEBUG.EVENTS && opts.DEBUG.EVENTS_REGISTER) {
                console.log("EVENTS REGISTER " + rule.name + " TO " + targ);
            }
        })

        return rule;
    };

    // Call the more generic rule first
    //   ("world" before "world.player.move.up")
    // throw ni; Good idea ?
    // throw ni; send all events for this rule of one at a time ?
    //     >> track the uncalled rules and call the idle method ?
    // returns true if a rule was called, false if nothing was done
    events.handle = function (evts, rulesList = events.rules) {
        let tree, rules, res = false, t_start = Date.now();
        evts.forEach(function (ev) {
            tree = events.getParentsTree(ev);
            tree.forEach(function (cat) {
                rules = rulesList[cat];

                if (rules !== undefined) {
                    if (res !== true) {
                        res = true;
                    }
                    rules.forEach(function (rule) {
                        if (opts.DEBUG.EVENTS) {
                            console.log("EVENTS EXEC " + rule.name);
                        }
                        rule.main(bq, ev);
                        if (opts.DEBUG.TIME.RULE && (Date.now() - t_start) > opts.DEBUG.TIME.LIMIT) {
                            console.log("EVENTS " + (Date.now() - t_start) + "ms FOR " + rule.name);
                        }
                    });
                }
            })
        });

        // console.log(res);
        return res
    }

    return events;
}