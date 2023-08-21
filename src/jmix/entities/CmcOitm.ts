export class CmcOitm {
    static NAME = "CmcOitm";
    id?: string;
    createdate?: string | null;
    createhourse?: string | null;
    doctype?: string | null;
    itemName?: string | null;
    status?: string | null;
    uIgroup?: string | null;
    uIgroupname?: string | null;
    uProductbranch?: string | null;
    uProductgroup?: string | null;
    uRdcode?: string | null;
    uSubgrname?: string | null;
    usersign2?: string | null;
}

export type CmcOitmViewName = "_base" | "_instance_name" | "_local";
export type CmcOitmView<V extends CmcOitmViewName> = V extends "_base"
    ? Pick<
          CmcOitm,
          | "id"
          | "createdate"
          | "createhourse"
          | "doctype"
          | "itemName"
          | "status"
          | "uIgroup"
          | "uIgroupname"
          | "uProductbranch"
          | "uProductgroup"
          | "uRdcode"
          | "uSubgrname"
          | "usersign2"
      >
    : V extends "_local"
    ? Pick<
          CmcOitm,
          | "id"
          | "createdate"
          | "createhourse"
          | "doctype"
          | "itemName"
          | "status"
          | "uIgroup"
          | "uIgroupname"
          | "uProductbranch"
          | "uProductgroup"
          | "uRdcode"
          | "uSubgrname"
          | "usersign2"
      >
    : never;
