export class EquipmentType {
  static NAME = "EquipmentType";
  id?: string;
  name?: string | null;
  createdAt?: any | null;
  createdBy?: string | null;
  updatedAt?: any | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
  deletedAt?: any | null;
}
export type EquipmentTypeViewName = "_base" | "_instance_name" | "_local";
export type EquipmentTypeView<V extends EquipmentTypeViewName> = V extends "_base"
  ? Pick<
      EquipmentType,
      | "id"
      | "name"
      | "createdAt"
      | "createdBy"
      | "updatedAt"
      | "updatedBy"
      | "deletedBy"
      | "deletedAt"
    >
  : V extends "_local"
  ? Pick<
      EquipmentType,
      | "id"
      | "name"
      | "createdAt"
      | "createdBy"
      | "updatedAt"
      | "updatedBy"
      | "deletedBy"
      | "deletedAt"
    >
  : never;
