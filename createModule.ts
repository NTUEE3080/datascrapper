import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {Module} from "./module";

interface ModuleRequest {
    semester: string;
    courseCode: string;
    name: string;
    description: string;
    academicUnit: number
}

function createModules(baseUrl: string, token: string, m: Module[]): Promise<AxiosResponse<void, void>> {
    const options: AxiosRequestConfig<ModuleRequest[]> = {
        method: 'POST',
        url: `${baseUrl}/Module`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: m.Map(x => {
            return {
                semester: "2021S2",
                courseCode: x.courseCode,
                academicUnit: x.au == null ? 0 : x.au,
                name: x.name,
                description: x.description,
            } as ModuleRequest
        })
    };

    return axios.request(options)
}

export {createModules}
