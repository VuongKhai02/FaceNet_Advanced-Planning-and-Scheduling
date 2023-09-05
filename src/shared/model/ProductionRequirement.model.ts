export interface ProductionRequirement {
    id?: number;
    cardName?: string;
    customer?: string;
    deliveryDate?: string;
    endDate?: string;
    isCreatedTechForm?: boolean;
    poNumber?: string;
    productionCode?: string;
    quantityCompensation?: number;
    quantityRequirement?: number;
    sender?: string;
    startDate?: string;
    status?: string;
}

export const defaultValue: Readonly<ProductionRequirement> = {}