export class Line {
    static NAME = "Line";
    id?: string;
    errorRatio?: any | null;
    inputQuantity?: number | null;
    lineName?: string | null;
    location?: string | null;
    performance?: string | null;
    status?: string | null;
    workCenter?: number | null;
    color?: string | null;
    scadarLineId?: string | null;
    lineCode?: string | null;
}

export type LineViewName = "_base" | "_instance_name" | "_local" | "with-all";
export type LineView<V extends LineViewName> = V extends "_base"
    ? Pick<
          Line,
          | "id"
          | "lineName"
          | "errorRatio"
          | "inputQuantity"
          | "location"
          | "performance"
          | "status"
          | "workCenter"
          | "color"
          | "scadarLineId"
          | "lineCode"
      >
    : V extends "_instance_name"
    ? Pick<Line, "id" | "lineName">
    : V extends "_local"
    ? Pick<
          Line,
          | "id"
          | "errorRatio"
          | "inputQuantity"
          | "lineName"
          | "location"
          | "performance"
          | "status"
          | "workCenter"
          | "color"
          | "scadarLineId"
          | "lineCode"
      >
    : V extends "with-all"
    ? Pick<
          Line,
          | "id"
          | "lineName"
          | "errorRatio"
          | "inputQuantity"
          | "location"
          | "performance"
          | "status"
          | "workCenter"
          | "color"
          | "scadarLineId"
          | "lineCode"
      >
    : never;
