export class Lane {
  static NAME = "Lane";
  id?: string;
  laneName?: string | null;
}
export type LaneViewName = "_base" | "_instance_name" | "_local";
export type LaneView<V extends LaneViewName> = V extends "_base"
  ? Pick<Lane, "id" | "laneName">
  : V extends "_local"
  ? Pick<Lane, "id" | "laneName">
  : never;
