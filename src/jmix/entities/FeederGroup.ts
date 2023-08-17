import { Feeder } from "./Feeder";
import { FeederGroupEnum } from "../enums/enums";
import { EquipmentType } from "./EquipmentType";

export class FeederGroup {
    static NAME = "FeederGroup";
    id?: string;
    createdAt?: any | null;
    feederGroupCode?: number | null;
    feeders?: Feeder[] | null;
    name?: string | null;
    type?: FeederGroupEnum | null;
    equipmentType?: EquipmentType | null;
    updatedAt?: any | null;
}

export type FeederGroupViewName = "_base" | "_instance_name" | "_local" | "feeder-group-with-feeders";
export type FeederGroupView<V extends FeederGroupViewName> = V extends "_base"
    ? Pick<FeederGroup, "id" | "name" | "createdAt" | "feederGroupCode" | "equipmentType" | "type" | "updatedAt">
    : V extends "_instance_name"
    ? Pick<FeederGroup, "id" | "name">
    : V extends "_local"
    ? Pick<FeederGroup, "id" | "createdAt" | "feederGroupCode" | "name" | "equipmentType" | "type" | "updatedAt">
    : V extends "feeder-group-with-feeders"
    ? Pick<FeederGroup, "id" | "name" | "createdAt" | "equipmentType" | "feederGroupCode" | "type" | "updatedAt" | "feeders">
    : never;
