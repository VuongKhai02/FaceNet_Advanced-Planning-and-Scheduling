export class PartNumber {
    static NAME = "PartNumber";
    id?: string;
    partNumberCode?: string | null;
    name?: string | null;
    partLibraryName?: string | null;
    description?: string | null;
    vendor?: string | null;
    type?: number | null;
    createdAt?: any | null;
    createdBy?: string | null;
    updatedAt?: any | null;
    updatedBy?: string | null;
    deletedBy?: string | null;
    deletedAt?: any | null;
}

export type PartNumberViewName = "_base" | "_instance_name" | "_local";
export type PartNumberView<V extends PartNumberViewName> = V extends "_base"
    ? Pick<
          PartNumber,
          | "id"
          | "name"
          | "partNumberCode"
          | "description"
          | "partLibraryName"
          | "vendor"
          | "type"
          | "createdAt"
          | "createdBy"
          | "updatedAt"
          | "updatedBy"
          | "deletedBy"
          | "deletedAt"
      >
    : V extends "_instance_name"
    ? Pick<PartNumber, "id" | "name">
    : V extends "_local"
    ? Pick<
          PartNumber,
          | "id"
          | "partNumberCode"
          | "name"
          | "description"
          | "vendor"
          | "type"
          | "createdAt"
          | "createdBy"
          | "updatedAt"
          | "updatedBy"
          | "deletedBy"
          | "deletedAt"
      >
    : never;
