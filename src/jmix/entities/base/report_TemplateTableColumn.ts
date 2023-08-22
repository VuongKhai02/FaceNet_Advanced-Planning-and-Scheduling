export class TemplateTableColumn {
    static NAME = "report_TemplateTableColumn";
    id?: string;
    key?: string | null;
    caption?: string | null;
    position?: number | null;
}

export type TemplateTableColumnViewName = "_base" | "_instance_name" | "_local";
export type TemplateTableColumnView<V extends TemplateTableColumnViewName> = never;
