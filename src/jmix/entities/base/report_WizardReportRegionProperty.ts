import { EntityTreeNode } from "./report_WizardReportEntityTreeNode";

export class RegionProperty {
    static NAME = "report_WizardReportRegionProperty";
    id?: string;
    entityTreeNode?: EntityTreeNode | null;
    orderNum?: any | null;
    name?: string | null;
    localizedName?: string | null;
    hierarchicalName?: string | null;
    hierarchicalNameExceptRoot?: string | null;
    hierarchicalLocalizedName?: string | null;
    hierarchicalLocalizedNameExceptRoot?: string | null;
}

export type RegionPropertyViewName = "_base" | "_instance_name" | "_local";
export type RegionPropertyView<V extends RegionPropertyViewName> = never;
