
export interface IWarning {
    id?: number;
    level?: string;
    system?: string;
    topic?: string;
    topicDescription?: string;
    content?: string;
    warningType?: string;
    waningDate?: string;
}

export const defaultValue: Readonly<IWarning> = {};