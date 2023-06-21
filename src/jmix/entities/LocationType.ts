export class LocationType {
  static NAME = "LocationType";
  id?: string;
  locationtypeChildlocationcolumncount?: number | null;
  locationtypeChildlocationrowcount?: number | null;
  locationtypeChildprefixname?: string | null;
  locationtypeChildprefixseperator?: string | null;
  locationtypeChildsuffixdigitlen?: number | null;
  locationtypeChildsuffixseperator?: string | null;
  locationtypeCreatedby?: string | null;
  locationtypeCreatedon?: string | null;
  locationtypeDescription?: string | null;
  locationtypeDontallowcarriers?: boolean | null;
  locationtypeDontallowmaterials?: boolean | null;
  locationtypeIsmultilocation?: boolean | null;
  locationtypeIsstandardtype?: boolean | null;
  locationtypeName?: string | null;
  locationtypeNamecannotbechanged?: boolean | null;
  locationtypeOwnmaterial?: boolean | null;
  locationtypeRestricttooneinstance?: boolean | null;
  locationtypeTsmenabled?: boolean | null;
  locationtypeTsmid?: number | null;
  locationtypeUnloadlocationid?: number | null;
  locationtypeUpdatedby?: string | null;
  locationtypeUpdatedon?: string | null;
  resource?: number | null;
}
export type LocationTypeViewName = "_base" | "_instance_name" | "_local";
export type LocationTypeView<V extends LocationTypeViewName> = V extends "_base"
  ? Pick<
      LocationType,
      | "id"
      | "locationtypeChildlocationcolumncount"
      | "locationtypeChildlocationrowcount"
      | "locationtypeChildprefixname"
      | "locationtypeChildprefixseperator"
      | "locationtypeChildsuffixdigitlen"
      | "locationtypeChildsuffixseperator"
      | "locationtypeCreatedby"
      | "locationtypeCreatedon"
      | "locationtypeDescription"
      | "locationtypeDontallowcarriers"
      | "locationtypeDontallowmaterials"
      | "locationtypeIsmultilocation"
      | "locationtypeIsstandardtype"
      | "locationtypeName"
      | "locationtypeNamecannotbechanged"
      | "locationtypeOwnmaterial"
      | "locationtypeRestricttooneinstance"
      | "locationtypeTsmenabled"
      | "locationtypeTsmid"
      | "locationtypeUnloadlocationid"
      | "locationtypeUpdatedby"
      | "locationtypeUpdatedon"
      | "resource"
    >
  : V extends "_local"
  ? Pick<
      LocationType,
      | "id"
      | "locationtypeChildlocationcolumncount"
      | "locationtypeChildlocationrowcount"
      | "locationtypeChildprefixname"
      | "locationtypeChildprefixseperator"
      | "locationtypeChildsuffixdigitlen"
      | "locationtypeChildsuffixseperator"
      | "locationtypeCreatedby"
      | "locationtypeCreatedon"
      | "locationtypeDescription"
      | "locationtypeDontallowcarriers"
      | "locationtypeDontallowmaterials"
      | "locationtypeIsmultilocation"
      | "locationtypeIsstandardtype"
      | "locationtypeName"
      | "locationtypeNamecannotbechanged"
      | "locationtypeOwnmaterial"
      | "locationtypeRestricttooneinstance"
      | "locationtypeTsmenabled"
      | "locationtypeTsmid"
      | "locationtypeUnloadlocationid"
      | "locationtypeUpdatedby"
      | "locationtypeUpdatedon"
      | "resource"
    >
  : never;
