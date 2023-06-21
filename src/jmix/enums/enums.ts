export enum FeederGroupEnum {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE"
}

export enum StateEnum {
  NEW = "NEW",
  WAITING = "WAITING",
  SEND_QMS_OK = "SEND_QMS_OK",
  SEND_SCADA_OK = "SEND_SCADA_OK",
  IN_PRODUCTION = "IN_PRODUCTION",
  COMPLETE = "COMPLETE"
}

export enum StatusEnum {
  HOLD = "HOLD",
  ACTIVE = "ACTIVE",
  DEACTIVE = "DEACTIVE"
}

export enum ChartType {
  PIE = "PIE",
  SERIAL = "SERIAL"
}

export enum SeriesType {
  LINE = "LINE",
  COLUMN = "COLUMN",
  STEP = "STEP",
  SMOOTHED_LINE = "SMOOTHED_LINE"
}

export enum StackType {
  NONE = "NONE",
  REGULAR = "REGULAR",
  HUNDRED_PERCENTS = "HUNDRED_PERCENTS",
  THREE_D = "THREE_D"
}

export enum CustomTemplateDefinedBy {
  CLASS = "CLASS",
  SCRIPT = "SCRIPT",
  URL = "URL"
}

export enum DataSetType {}

export enum JsonSourceType {
  GROOVY_SCRIPT = "GROOVY_SCRIPT",
  URL = "URL",
  PARAMETER = "PARAMETER"
}

export enum Orientation {}

export enum ParameterType {
  DATE = "DATE",
  TEXT = "TEXT",
  ENTITY = "ENTITY",
  BOOLEAN = "BOOLEAN",
  NUMERIC = "NUMERIC",
  ENTITY_LIST = "ENTITY_LIST",
  ENUMERATION = "ENUMERATION",
  DATETIME = "DATETIME",
  TIME = "TIME"
}

export enum AggregationMode {
  COUNT = "COUNT",
  COUNT_UNIQUE_VALUES = "COUNT_UNIQUE_VALUES",
  LIST_UNIQUE_VALUES = "LIST_UNIQUE_VALUES",
  SUM = "SUM",
  INTEGER_SUM = "INTEGER_SUM",
  AVERAGE = "AVERAGE",
  MINIMUM = "MINIMUM",
  MAXIMUM = "MAXIMUM",
  SUM_OVER_SUM = "SUM_OVER_SUM",
  UPPER_BOUND_80 = "UPPER_BOUND_80",
  LOWER_BOUND_80 = "LOWER_BOUND_80",
  SUM_AS_FRACTION_OF_TOTAL = "SUM_AS_FRACTION_OF_TOTAL",
  SUM_AS_FRACTION_OF_ROWS = "SUM_AS_FRACTION_OF_ROWS",
  SUM_AS_FRACTION_OF_COLUMNS = "SUM_AS_FRACTION_OF_COLUMNS",
  COUNT_AS_FRACTION_OF_TOTAL = "COUNT_AS_FRACTION_OF_TOTAL",
  COUNT_AS_FRACTION_OF_ROWS = "COUNT_AS_FRACTION_OF_ROWS",
  COUNT_AS_FRACTION_OF_COLUMNS = "COUNT_AS_FRACTION_OF_COLUMNS"
}

export enum PivotTablePropertyType {
  AGGREGATIONS = "AGGREGATIONS",
  DERIVED = "DERIVED",
  COLUMNS = "COLUMNS",
  ROWS = "ROWS"
}

export enum RendererType {
  TABLE = "TABLE",
  TABLE_BAR_CHART = "TABLE_BAR_CHART",
  HEATMAP = "HEATMAP",
  ROW_HEATMAP = "ROW_HEATMAP",
  COL_HEATMAP = "COL_HEATMAP",
  LINE_CHART = "LINE_CHART",
  BAR_CHART = "BAR_CHART",
  STACKED_BAR_CHART = "STACKED_BAR_CHART",
  AREA_CHART = "AREA_CHART",
  SCATTER_CHART = "SCATTER_CHART",
  TSV_EXPORT = "TSV_EXPORT"
}

export enum PredefinedTransformation {
  STARTS_WITH = "STARTS_WITH",
  CONTAINS = "CONTAINS",
  ENDS_WITH = "ENDS_WITH"
}

export enum ReportOutputType {}

export enum ReportType {
  SIMPLE = "SIMPLE",
  PRINT_FORM = "PRINT_FORM",
  LIST_PRINT_FORM = "LIST_PRINT_FORM"
}

export enum TemplateFileType {
  HTML = "HTML",
  DOCX = "DOCX",
  XLSX = "XLSX",
  CHART = "CHART",
  CSV = "CSV",
  TABLE = "TABLE"
}

export enum RestFilterOp {
  CONTAINS = "CONTAINS",
  EQUAL = "EQUAL",
  IN = "IN",
  NOT_IN = "NOT_IN",
  NOT_EQUAL = "NOT_EQUAL",
  GREATER = "GREATER",
  GREATER_OR_EQUAL = "GREATER_OR_EQUAL",
  LESSER = "LESSER",
  LESSER_OR_EQUAL = "LESSER_OR_EQUAL",
  DOES_NOT_CONTAIN = "DOES_NOT_CONTAIN",
  NOT_EMPTY = "NOT_EMPTY",
  STARTS_WITH = "STARTS_WITH",
  DATE_INTERVAL = "DATE_INTERVAL",
  ENDS_WITH = "ENDS_WITH",
  IS_NULL = "IS_NULL"
}

export enum RowLevelPolicyAction {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE"
}

export enum RowLevelPolicyType {
  JPQL = "JPQL",
  PREDICATE = "PREDICATE"
}

export enum io_jmix_ui_component_LogicalFilterComponent_Operation {}

export enum io_jmix_ui_component_PropertyFilter_Operation {}

export enum CaptionPosition {}
