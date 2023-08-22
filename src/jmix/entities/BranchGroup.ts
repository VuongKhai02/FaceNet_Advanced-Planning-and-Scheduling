export class BranchGroup {
    static NAME = "BranchGroup";
    id?: string;
    name?: string | null;
    uBranchcode?: string | null;
    uBranchname?: string | null;
    uFactorycode?: string | null;
    uFactoryname?: string | null;
    uGroupcode?: string | null;
    uGroupname?: string | null;
}

export type BranchGroupViewName = "_base" | "_instance_name" | "_local";
export type BranchGroupView<V extends BranchGroupViewName> = V extends "_base"
    ? Pick<BranchGroup, "id" | "name" | "uBranchcode" | "uBranchname" | "uFactorycode" | "uFactoryname" | "uGroupcode" | "uGroupname">
    : V extends "_local"
    ? Pick<BranchGroup, "id" | "name" | "uBranchcode" | "uBranchname" | "uFactorycode" | "uFactoryname" | "uGroupcode" | "uGroupname">
    : never;
