export interface IndexRequest {
    moduleId: string;
    code:     string;
    props:    Prop[];
}

export interface Prop {
    group: string;
    type:  string;
    day:   string;
    start: string;
    stop:  string;
    venue: string;
}
