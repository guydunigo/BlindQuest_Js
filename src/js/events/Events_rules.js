export default loadRulesHandlers;

import opts from "../config.js";

function loadRulesHandlers(bq, events) {
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
                bq.interface.disp.console.write("EVENTS REGISTER " + rule.name + " TO " + targ);
            }
        })

        return rule;
    };

    // Call the more generic rule first
    //   ("world" before "world.player.move.up")
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
                        if (opts.DEBUG.EVENTS && opts.DEBUG.EVENTS_EXEC) {
                            bq.interface.disp.console.write("EVENTS EXEC " + rule.name);
                        }
                        rule.main(bq, ev);
                        if (opts.DEBUG.TIME.RULE && (Date.now() - t_start) > opts.DEBUG.TIME.LIMIT) {
                            bq.interface.disp.console.write("EVENTS " + (Date.now() - t_start) + "ms FOR " + rule.name);
                        }
                    });
                }
            })
        });

        return res
    }

    return events;
}