export class SapBpgroup {
    static NAME = "SapBpgroup";
    id?: string;
    code?: string | null;
    name?: string | null;
    uDepart?: string | null;
}
export type SapBpgroupViewName = "_base" | "_instance_name" | "_local";
export type SapBpgroupView<V extends SapBpgroupViewName> = V extends "_base"
? Pick<SapBpgroup, "id" | "code" | "name" | "uDepart">
: V extends "_instance_name" ?
Pick<SapBpgroup, "id" | "code" | "name">
: V extends "_local" ?
Pick<SapBpgroup, "id">
: never;