export class Demoooo {
  static NAME = "Demoooo";
  id?: string;
  createdBy?: string | null;
  createdDate?: any | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: any | null;
  deletedBy?: string | null;
  deletedDate?: any | null;
}
export type DemooooViewName = "_base" | "_instance_name" | "_local";
export type DemooooView<V extends DemooooViewName> = V extends "_base"
  ? Pick<
      Demoooo,
      | "id"
      | "createdBy"
      | "createdDate"
      | "lastModifiedBy"
      | "lastModifiedDate"
      | "deletedBy"
      | "deletedDate"
    >
  : V extends "_local"
  ? Pick<
      Demoooo,
      | "id"
      | "createdBy"
      | "createdDate"
      | "lastModifiedBy"
      | "lastModifiedDate"
      | "deletedBy"
      | "deletedDate"
    >
  : never;
