import {parse, HTMLElement} from "node-html-parser";
import {Module} from "./module";

function isMinorType(root: HTMLElement): boolean {

    const elements = root.querySelectorAll("tbody");
    if (elements.length == 1) {
        const bold = elements[0].querySelectorAll("tr td font b");
        if(bold.length> 0){
            return bold[0].textContent == "COURSE CODE";
        }
    }
    return false;
}

function parseMinorBased(root: HTMLElement): Module[] {
    const tr = root.querySelectorAll("tr")
        .Where(e => e.querySelectorAll("td").length == 4 ||
            (e.querySelectorAll("td").length == 1 && e.querySelector("td").getAttribute("colspan") == "4")
        ).Skip(1);
    let ret: Module[] = [];
    for (let i = 0; i < tr.length; i += 2) {
        const header = tr[i].querySelectorAll("font");
        const desc = tr[i + 1].querySelectorAll("font");
        ret = [...ret, {
            courseCode: header[0].innerText,
            name: header[1].innerText,
            au: header[2].innerText.ToInt(),
            description: desc[0].innerText,
        }]

    }
    return ret;


}

function parseCourseBased(root: HTMLElement): Module[] {
    const elements = root.querySelectorAll("tbody");
    return elements.Map(x => {
        const rows = x.querySelectorAll("tr");
        const header = rows[0];
        const desc = rows[rows.length - 1];

        // for header
        const headers = header.querySelectorAll("font");
        const code = headers[0].innerText;
        const name = headers[1].innerText;
        const au = headers[2].innerText.ToInt();

        // for description
        const dFont = desc.querySelectorAll("font");
        const des = dFont[dFont.length - 1].innerText;

        return {
            courseCode: code,
            au: au,
            name: name,
            description: des,
        } as Module;
    });
}

function ParseModule(content: string): Module[] {
    const root = parse(content);
    const minorType = isMinorType(root);
    const modules = minorType ? parseMinorBased(root) : parseCourseBased(root);
    return modules.Map(({courseCode, au, name, description}) => {
        return {
            courseCode,
            au: au == null ? 0 : au,
            name: name.LineBreak().TrimAll().join(" ").trim().ReplaceAll('&amp;', "&", false),
            description: description.LineBreak().TrimAll().join(" ").trim().ReplaceAll('&amp;', "&", false),
        } as Module
    })


}

export {ParseModule}