import {HTMLElement, parse} from "node-html-parser";


interface Index {
    moduleCode: string;
    code: string;
    props: IndexProp[];
}

interface IndexProp {
    group: string;
    type: string;
    day: string;
    start: string;
    stop: string;
    venue: string;
}

function parseCol(e: HTMLElement): string {
    const f = e.querySelectorAll("b");
    if(f.length == 0) {
        return "";
    }
    return f[0].innerText;
}

function parseProp(e: HTMLElement[]): [string, string, string, string, string, string] {
    const code = parseCol(e[0]);
    const type = parseCol(e[1]);
    const group = parseCol(e[2]);
    const day = parseCol(e[3]);
    const time = parseCol(e[4]);
    const venue = parseCol(e[5]);
    return [code, type, group, day, time, venue];
}

function parseSingle(header: HTMLElement, body: HTMLElement): Index[] {


    const moduleCode = header.querySelectorAll("b")[0].innerText;
    // console.log(`Working on ${moduleCode}`);
    const rows = body.querySelectorAll("tr").Skip(1);
    let indexes: Index[] = [];
    let curr: Index = {
        moduleCode,
        code: "",
        props: []
    }
    for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const cols = r.querySelectorAll("td");
        const [code, type, group, day, time, venue] = parseProp(cols);
        const tFrag = time.split("-");
        const start = tFrag[0].Take(2) + ":" + tFrag[0].Skip(2);
        const stop = tFrag[0].Take(2) + ":" + tFrag[0].Skip(2);
        const prop = {
            day,
            group,
            type,
            venue,
            start,
            stop,
        }
        if (code == null || code.IsEmpty()) {
            if(curr.code == null || curr.code.IsEmpty()) {
                throw "Weird index"
            }
            curr.props = [...curr.props, prop]
        } else {
            if(i != 0) {
                indexes = [...indexes, curr];
            }
            curr = {
                moduleCode,
                code,
                props: [prop],
            }
        }
    }
    if(!curr.code.IsEmpty()) {
        indexes = [...indexes, curr];
    }
    return indexes;

}


function indexParser(content: string): Index[] {
    const root = parse(content);
    const tbody = root.querySelectorAll("tbody");
    let all: Index[] = [];
    for (let i = 0; i < tbody.length; i += 2) {
        const indexes = parseSingle(tbody[i], tbody[i + 1]);
        all = [...all, ...indexes]
    }
    return all;
}

export {
    Index,
    IndexProp,
    indexParser,
}