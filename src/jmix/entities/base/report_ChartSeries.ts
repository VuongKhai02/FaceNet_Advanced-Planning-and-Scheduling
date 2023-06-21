import { SeriesType } from "../../enums/enums";
export class ChartSeries {
  static NAME = "report_ChartSeries";
  id?: string;
  name?: string | null;
  type?: SeriesType | null;
  valueField?: string | null;
  colorField?: string | null;
  order?: number | null;
}
export type ChartSeriesViewName = "_base" | "_instance_name" | "_local";
export type ChartSeriesView<V extends ChartSeriesViewName> = never;
