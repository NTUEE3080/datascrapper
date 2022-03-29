import {Database} from "./db";
import {ModuleWithId} from "./module";
import {ModuleResponse} from "./getModules";


function saveModuleWithId(mods: ModuleResponse[], db: Database<ModuleWithId>) {
    for (const m of mods) {
        db.data[m.courseCode] = {
            id: m.id,
            au: m.academicUnit,
            name: m.name,
            description: m.description,
            courseCode: m.courseCode,
        }
    }
    db.save();
}

export {saveModuleWithId}