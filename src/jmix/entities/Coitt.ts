export class Coitt {
  static NAME = "Coitt";
  id?: string;
  canceled?: string | null;
  createDate?: any | null;
  createTime?: number | null;
  creator?: string | null;
  dataSource?: string | null;
  docNum?: string | null;
  handwrtten?: string | null;
  instance?: string | null;
  logInst?: string | null;
  object?: string | null;
  period?: number | null;
  remark?: string | null;
  requestStatus?: string | null;
  series?: number | null;
  status?: string | null;
  transfered?: string | null;
  uActive?: string | null;
  uDocurl?: string | null;
  uDocurl2?: string | null;
  uFromdate?: string | null;
  uInact?: string | null;
  uPrefix?: string | null;
  uPronam?: string | null;
  uProno?: string | null;
  uQuantity?: any | null;
  uRemark?: string | null;
  uSpec?: string | null;
  uStatus?: string | null;
  uTodate?: string | null;
  uUom?: string | null;
  uVersions?: string | null;
  uWhscod?: number | null;
  updateDate?: string | null;
  updateTime?: string | null;
  userSign?: string | null;
}
export type CoittViewName = "_base" | "_instance_name" | "_local";
export type CoittView<V extends CoittViewName> = V extends "_base"
  ? Pick<
      Coitt,
      | "id"
      | "uProno"
      | "uPronam"
      | "uVersions"
      | "canceled"
      | "createDate"
      | "createTime"
      | "creator"
      | "dataSource"
      | "docNum"
      | "handwrtten"
      | "instance"
      | "logInst"
      | "object"
      | "period"
      | "remark"
      | "requestStatus"
      | "series"
      | "status"
      | "transfered"
      | "uActive"
      | "uDocurl"
      | "uDocurl2"
      | "uFromdate"
      | "uInact"
      | "uPrefix"
      | "uQuantity"
      | "uRemark"
      | "uSpec"
      | "uStatus"
      | "uTodate"
      | "uUom"
      | "uWhscod"
      | "updateDate"
      | "updateTime"
      | "userSign"
    >
  : V extends "_instance_name"
  ? Pick<Coitt, "id" | "uProno" | "uPronam" | "uVersions">
  : V extends "_local"
  ? Pick<
      Coitt,
      | "id"
      | "canceled"
      | "createDate"
      | "createTime"
      | "creator"
      | "dataSource"
      | "docNum"
      | "handwrtten"
      | "instance"
      | "logInst"
      | "object"
      | "period"
      | "remark"
      | "requestStatus"
      | "series"
      | "status"
      | "transfered"
      | "uActive"
      | "uDocurl"
      | "uDocurl2"
      | "uFromdate"
      | "uInact"
      | "uPrefix"
      | "uPronam"
      | "uProno"
      | "uQuantity"
      | "uRemark"
      | "uSpec"
      | "uStatus"
      | "uTodate"
      | "uUom"
      | "uVersions"
      | "uWhscod"
      | "updateDate"
      | "updateTime"
      | "userSign"
    >
  : never;
