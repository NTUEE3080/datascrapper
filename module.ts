interface Module {
    courseCode: string;
    name: string;
    au: number;
    description: string;
}

interface ModuleWithId {
    courseCode: string;
    name: string;
    au?: number;
    description: string;
    id: string;
}

export {Module, ModuleWithId}