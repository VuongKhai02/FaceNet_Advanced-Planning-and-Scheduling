export class OitwEmbeddedKey {
    static NAME = "OitwEmbeddedKey";
    itemCode?: string | null;
    whsCode?: string | null;
}

export type OitwEmbeddedKeyViewName = "_base" | "_instance_name" | "_local";
export type OitwEmbeddedKeyView<V extends OitwEmbeddedKeyViewName> = V extends "_base"
    ? Pick<OitwEmbeddedKey, "itemCode" | "whsCode">
    : V extends "_local"
    ? Pick<OitwEmbeddedKey, "itemCode" | "whsCode">
    : never;
