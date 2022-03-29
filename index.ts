import {Kore} from "@kirinnee/core";
import * as process from "process";
import {Database} from "./db";
import {Index} from "./indexParser";
import {Module, ModuleWithId} from "./module";
import {createIndex} from "./createIndex";
import {createModules} from "./createModule";
import {getModules} from "./getModules";
import {saveModuleWithId} from "./saveModuleWithId";

const core = new Kore();
core.ExtendPrimitives();

const token = process.argv[2];
console.log(token);


async function main() {

    const targetUrl = "https://core.ee3080.cyanprint.dev"
    try {
        // Load all databases
        const moduleDb = new Database<Module>("module.json");
        moduleDb.load();
        const moduleIdDb = new Database<ModuleWithId>("module_id.json");
        moduleIdDb.load();
        const indexDb = new Database<Index>("index.json");
        indexDb.load();

        // Parse all modules
        // ParseHTML(moduleDb);

        // get array
        const val = moduleDb.map.Values()
            .Map(({
                      courseCode,
                      au,
                      description,
                      name
                  }) => {
                if(typeof(au) != "number") {
                    console.log(courseCode);
                }
                return {
                    courseCode,
                    au: au == null ? 0 : (au.Int() ? au : 0),
                    description,
                    name,
                }
            });
        console.log(val[41]);

        console.log("creating courses...");
        // create modules
        const r = await createModules(targetUrl, token, val);
        console.log(r);
        console.log("done!")

        console.log("update database with server GUIDs");
        // retrieve GUID from server
        const mod = await getModules(targetUrl, token);
        // Update database with indexes
        saveModuleWithId(mod, moduleIdDb);
        console.log("done updating!");

        // Parse indexes
        // ParseIndexHTML(indexDb);
        // fixETMLHYGC(indexDb);

        await createIndex(targetUrl, token, indexDb.map.Values(), moduleIdDb.data)

        console.log("completed created indexes");
    } catch (e) {
        if (e.response?.data) {
            console.error(e.response.data);
        } else {
            console.error(e);
        }
    }
}

main().then();



