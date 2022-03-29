import {Kore} from "@kirinnee/core";
import {Index} from "./indexParser";
import {Database} from "./db";

const core = new Kore();
core.ExtendPrimitives();


const indexDb = new Database<Index>("index.json");
indexDb.load();

const bad = indexDb.map.Where((_,v)=> v.props.Any(x => x.day == ""));
console.log(bad);