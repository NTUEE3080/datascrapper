import {Database} from "./db";
import {Index} from "./indexParser";


const problemCodes = ["GC0001", "ET0001", "HY0001", "ML0003", "ML0002", "CM5012"];

function fixETMLHYGC(db: Database<Index>) {
    for (const [k, {code, props, moduleCode}] of db.map.entries()) {

        if (problemCodes.Has(moduleCode)) {
            db.data[k] = {
                code,
                moduleCode,
                props: props.Map(({
                                      group
                                  }) => {
                    return {
                        group,
                        day: "FREE",
                        start: "00:00",
                        stop: "23:59",
                        type: "SELF",
                        venue: "ONLINE",
                    }
                })
            }
        }else if(moduleCode == "BS3335") {
            db.data[k] = {
                code,
                moduleCode,
                props: props.Map(({
                                      group,
                    type
                                  }) => {
                    return {
                        group,
                        day: "FREE",
                        start: "00:00",
                        stop: "23:59",
                        venue: "Unknown",
                        type,
                    }
                })
            }
        }
    }
    db.save();
}

export {fixETMLHYGC}