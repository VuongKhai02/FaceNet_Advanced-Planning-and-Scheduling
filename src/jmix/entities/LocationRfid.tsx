export class LocationRfid {
    static NAME = "LocationRfid";
    locationId: number;
    locationCode?: number | null;
    locationName?: string | null;
    subLocationName?: string | null;
    area?: string | null;
    rfId?: string | null;
}

export type LocationRfidViewName = "_base" | "_instance_name" | "_local";
export type LocationRfidView<V extends LocationRfidViewName> = V extends "_base"
    ? Pick<LocationRfid, "locationId" | "locationCode" | "locationName" | "subLocationName" | "area" | "rfId">
    : V extends "_instance_name"
    ? Pick<LocationRfid, "locationId" | "locationName">
    : V extends "_local"
    ? Pick<LocationRfid, "locationId" | "locationCode" | "locationName" | "subLocationName" | "area" | "rfId">
    : never;
