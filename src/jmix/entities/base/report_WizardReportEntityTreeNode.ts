export class EntityTreeNode {
    static NAME = "report_WizardReportEntityTreeNode";
    id?: string;
    name?: string | null;
    localizedName?: string | null;
    parent?: EntityTreeNode | null;
    children?: EntityTreeNode[] | null;
    metaClassName?: string | null;
    entityClassName?: string | null;
    metaPropertyName?: string | null;
    nodeDepth?: number | null;
    nodeChildrenDepth?: number | null;
    hierarchicalName?: string | null;
    hierarchicalLocalizedName?: string | null;
    hierarchicalNameExceptRoot?: string | null;
    hierarchicalLocalizedNameExceptRoot?: string | null;
}

export type EntityTreeNodeViewName = "_base" | "_instance_name" | "_local";
export type EntityTreeNodeView<V extends EntityTreeNodeViewName> = never;
