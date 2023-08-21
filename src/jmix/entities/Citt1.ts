export class Citt1 {
    static NAME = "Citt1";
    docEntry?: string | null;
    lineId?: string | null;
    visOrder?: string | null;
    logInst?: string | null;
    object?: string | null;
    uAlter?: string | null;
    uCtrlevel?: string | null;
    uDocentry?: string | null;
    uIssue?: string | null;
    id?: string;
    uItemname?: string | null;
    uItmtech?: string | null;
    uLocation?: string | null;
    uOthernam?: string | null;
    uPartnumber?: string | null;
    uQuantity?: any | null;
    uRemarks?: string | null;
    uSelect?: string | null;
    uSlect?: string | null;
    uType?: string | null;
    uUom?: string | null;
    uVendor?: string | null;
    uVersions?: string | null;
    uWhscod?: string | null;
}

export type Citt1ViewName = "_base" | "_instance_name" | "_local";
export type Citt1View<V extends Citt1ViewName> = V extends "_base"
    ? Pick<
          Citt1,
          | "id"
          | "docEntry"
          | "lineId"
          | "visOrder"
          | "logInst"
          | "object"
          | "uAlter"
          | "uCtrlevel"
          | "uDocentry"
          | "uIssue"
          | "uItemname"
          | "uItmtech"
          | "uLocation"
          | "uOthernam"
          | "uPartnumber"
          | "uQuantity"
          | "uRemarks"
          | "uSelect"
          | "uSlect"
          | "uType"
          | "uUom"
          | "uVendor"
          | "uVersions"
          | "uWhscod"
      >
    : V extends "_local"
    ? Pick<
          Citt1,
          | "id"
          | "docEntry"
          | "lineId"
          | "visOrder"
          | "logInst"
          | "object"
          | "uAlter"
          | "uCtrlevel"
          | "uDocentry"
          | "uIssue"
          | "uItemname"
          | "uItmtech"
          | "uLocation"
          | "uOthernam"
          | "uPartnumber"
          | "uQuantity"
          | "uRemarks"
          | "uSelect"
          | "uSlect"
          | "uType"
          | "uUom"
          | "uVendor"
          | "uVersions"
          | "uWhscod"
      >
    : never;
