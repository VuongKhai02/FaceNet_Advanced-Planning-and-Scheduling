export class Batch {
    static NAME = "Batch";
    id?: string;
    name?: string | null;
    uDate?: any | null;
    uDchuyen?: string | null;
    uProduction?: string | null;
}

export type BatchViewName = "_base" | "_instance_name" | "_local";
export type BatchView<V extends BatchViewName> = V extends "_base"
    ? Pick<Batch, "id" | "name" | "uDate" | "uDchuyen" | "uProduction">
    : V extends "_local"
    ? Pick<Batch, "id" | "name" | "uDate" | "uDchuyen" | "uProduction">
    : never;
