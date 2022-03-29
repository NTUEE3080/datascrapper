import axios, {AxiosRequestConfig} from "axios";

interface ModuleResponse {
    id: string;
    semester: string;
    courseCode: string;
    name: string;
    description: string;
    academicUnit: number;
}


async function getModules(url: string, token: string): Promise<ModuleResponse[]> {
    const options: AxiosRequestConfig<ModuleResponse[]> = {
        method: 'GET',
        url: `${url}/Module`,
        params: {semester: '2021S2'},
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const r = await axios.request<ModuleResponse[]>(options);
    return r.data;
}

export {ModuleResponse, getModules}