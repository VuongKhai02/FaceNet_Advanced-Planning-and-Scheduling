import { OitwEmbeddedKey } from "./OitwEmbeddedKey";

export class Oitw {
    static NAME = "Oitw";
    id?: OitwEmbeddedKey;
    onHand?: any | null;
    isCommited?: any | null;
    onOrder?: any | null;
}

export type OitwViewName = "_base" | "_instance_name" | "_local";
export type OitwView<V extends OitwViewName> = V extends "_base"
    ? Pick<Oitw, "id" | "onHand" | "isCommited" | "onOrder">
    : V extends "_local"
    ? Pick<Oitw, "id" | "onHand" | "isCommited" | "onOrder">
    : never;
