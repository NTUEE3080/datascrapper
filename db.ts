import * as fs from "fs";

class Database<T> {

    constructor(path: string) {
        this.path = path;
    }

    path: string;
    data: { [s: string]: T } = {}

    load() {
        try {
            const content = fs.readFileSync(this.path, 'utf-8')
            this.data = JSON.parse(content);
        } catch {
        }
    }

    save() {
        const serial = JSON.stringify(this.data, null, 4);
        fs.writeFileSync(this.path, serial, 'utf-8');
    }

    get map(): Map<string, T> {
        return new Map<string, T>(Object.entries(this.data));
    }


}

export {Database}