export class Machine {
  static NAME = "Machine";
  id?: string;
  lineId?: string | null;
  machineName?: string | null;
  status?: number | null;
  workCenterId?: string | null;
}
export type MachineViewName = "_base" | "_instance_name" | "_local";
export type MachineView<V extends MachineViewName> = V extends "_base"
  ? Pick<Machine, "id" | "lineId" | "machineName" | "status" | "workCenterId">
  : V extends "_local"
  ? Pick<Machine, "id" | "lineId" | "machineName" | "status" | "workCenterId">
  : never;
