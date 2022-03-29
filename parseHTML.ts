import fs from "fs";
import path from "path";
import {ParseModule} from "./module_parser";
import {Database} from "./db";
import {Module} from "./module";

function ParseHTML(moduleDb: Database<Module>) {
    const files = fs.readdirSync('./modules');
    for (const f of files) {
        console.log(`parsing ${f}`);
        const content = fs.readFileSync(path.join("./modules/", f), 'utf-8');
        const um = ParseModule(content);
        for (const m of um) {
            moduleDb.data[m.courseCode] = m;
        }
        console.log(`done with ${f}!`);
    }
    moduleDb.save();
}

export {ParseHTML}