import axios, {AxiosRequestConfig} from "axios";
import {ModuleWithId} from "./module";
import {IndexRequest} from "./index_models";
import {Index} from "./indexParser";

function dayToReq(s: string): string {
    const upper = s.toUpperCase();
    switch (upper) {
        case "MON":
            return "Monday";
        case "TUE":
            return "Tuesday";
        case "WED":
            return "Wednesday";
        case "THU":
            return "Thursday";
        case "FRI":
            return "Friday";
        case "FREE":
            return "Free";
        case "SAT":
            return "Saturday";
        case "SUN":
            return "Sunday";
    }
    return "null";
}

function createIndex(baseUrl: string, token: string, i: Index[], modules: { [s: string]: ModuleWithId }) {
    const options: AxiosRequestConfig<IndexRequest[]> = {
        method: 'POST',
        url: `${baseUrl}/Index`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: i.Map(x => {
            return {
                moduleId: modules[x.moduleCode].id,
                code: x.code,
                props: x.props
                    .Map(({
                              day, group, stop, start, venue, type
                          }) => {
                        return {
                            day: dayToReq(day),
                            group, start, stop, venue, type,
                        }
                    }),
            } as IndexRequest
        }).Where(x => x != null)
    };

    return axios.request(options);
}

export {createIndex}
