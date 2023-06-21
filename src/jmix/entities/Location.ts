import { Area } from "./Area";
import { LocationType } from "./LocationType";
export class Location {
  static NAME = "Location";
  id?: string;
  locationAreaid?: Area | null;
  locationAreaname?: string | null;
  locationBarcode?: string | null;
  locationChildlocationcolumncount?: number | null;
  locationChildlocationrowcount?: number | null;
  locationControlflag?: number | null;
  locationCreatedby?: string | null;
  locationCreatedon?: string | null;
  locationDescription?: string | null;
  locationDontallowcarriers?: boolean | null;
  locationDontallowmaterials?: boolean | null;
  locationFullname?: string | null;
  locationIsmultilocation?: boolean | null;
  locationLocationtype?: LocationType | null;
  locationLocationtypeName?: string | null;
  locationName?: string | null;
  locationNamecannotbechanged?: boolean | null;
  locationNotification?: boolean | null;
  locationOwnmaterial?: boolean | null;
  locationParentlocationid?: Location | null;
  locationPrefixname?: string | null;
  locationPrefixseperator?: string | null;
  locationProductlimit?: number | null;
  locationRestrictonepart?: boolean | null;
  locationSubareaid?: number | null;
  locationSuffixdigitlen?: string | null;
  locationSuffixseperator?: string | null;
  locationTsm?: number | null;
  locationTsmenabled?: boolean | null;
  locationUniqueid?: any | null;
  locationUnloadlocation?: number | null;
  locationUpdatedby?: string | null;
  locationUpdatedon?: string | null;
  locationXpos?: number | null;
  locationYpos?: number | null;
  notifyMaterialChange?: boolean | null;
}
export type LocationViewName = "_base" | "_instance_name" | "_local";
export type LocationView<V extends LocationViewName> = V extends "_base"
  ? Pick<
      Location,
      | "id"
      | "locationAreaname"
      | "locationBarcode"
      | "locationChildlocationcolumncount"
      | "locationChildlocationrowcount"
      | "locationControlflag"
      | "locationCreatedby"
      | "locationCreatedon"
      | "locationDescription"
      | "locationDontallowcarriers"
      | "locationDontallowmaterials"
      | "locationFullname"
      | "locationIsmultilocation"
      | "locationLocationtypeName"
      | "locationName"
      | "locationNamecannotbechanged"
      | "locationNotification"
      | "locationOwnmaterial"
      | "locationPrefixname"
      | "locationPrefixseperator"
      | "locationProductlimit"
      | "locationRestrictonepart"
      | "locationSubareaid"
      | "locationSuffixdigitlen"
      | "locationSuffixseperator"
      | "locationTsm"
      | "locationTsmenabled"
      | "locationUniqueid"
      | "locationUnloadlocation"
      | "locationUpdatedby"
      | "locationUpdatedon"
      | "locationXpos"
      | "locationYpos"
      | "notifyMaterialChange"
    >
  : V extends "_local"
  ? Pick<
      Location,
      | "id"
      | "locationAreaname"
      | "locationBarcode"
      | "locationChildlocationcolumncount"
      | "locationChildlocationrowcount"
      | "locationControlflag"
      | "locationCreatedby"
      | "locationCreatedon"
      | "locationDescription"
      | "locationDontallowcarriers"
      | "locationDontallowmaterials"
      | "locationFullname"
      | "locationIsmultilocation"
      | "locationLocationtypeName"
      | "locationName"
      | "locationNamecannotbechanged"
      | "locationNotification"
      | "locationOwnmaterial"
      | "locationPrefixname"
      | "locationPrefixseperator"
      | "locationProductlimit"
      | "locationRestrictonepart"
      | "locationSubareaid"
      | "locationSuffixdigitlen"
      | "locationSuffixseperator"
      | "locationTsm"
      | "locationTsmenabled"
      | "locationUniqueid"
      | "locationUnloadlocation"
      | "locationUpdatedby"
      | "locationUpdatedon"
      | "locationXpos"
      | "locationYpos"
      | "notifyMaterialChange"
    >
  : never;
