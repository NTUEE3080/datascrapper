import fs from "fs";
import path from "path";
import {Database} from "./db";
import {Index, indexParser} from "./indexParser";

function ParseIndexHTML(moduleDb: Database<Index>) {
    const files = fs.readdirSync('./index');
    console.log("begin parsing...");
    for (const f of files) {
        console.log(`parsing ${f}`);
        const content = fs.readFileSync(path.join("./index/", f), 'utf-8');
        const um = indexParser(content);
        for (const m of um) {
            moduleDb.data[`${m.moduleCode}-${m.code}`] = m;
        }
        moduleDb.save();
    }
    console.log("done parsing indexes!");
}

export {ParseIndexHTML}