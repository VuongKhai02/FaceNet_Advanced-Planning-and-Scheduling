export class SapDvlinh {
    static NAME = "SapDvlinh";
    id?: string;
    code?: string | null;
    name?: string | null;
    uAcc?: string | null;
    uStatus?: string | null;
}

export type SapDvlinhViewName = "_base" | "_instance_name" | "_local";
export type SapDvlinhView<V extends SapDvlinhViewName> = V extends "_base"
    ? Pick<SapDvlinh, "id" | "code" | "name" | "uAcc" | "uStatus">
    : V extends "_instance_name"
    ? Pick<SapDvlinh, "id" | "code" | "name">
    : V extends "_local"
    ? Pick<SapDvlinh, "id">
    : never;
