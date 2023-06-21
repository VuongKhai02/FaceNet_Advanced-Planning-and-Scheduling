export class BusinessLog {
  static NAME = "BusinessLog";
  id?: string;
  woId?: string | null;
  referenceId?: string | null;
  actionName?: string | null;
  errorCode?: string | null;
  errorDescription?: string | null;
  startTime?: any | null;
  endTime?: any | null;
  userName?: string | null;
  inData?: string | null;
  outData?: string | null;
  duration?: number|null;
}

export type BusinessLogViewName =
  | "_base";

