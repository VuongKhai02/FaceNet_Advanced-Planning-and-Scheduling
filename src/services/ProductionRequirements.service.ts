
import httpRequests from "../utils/httpRequests";

import { ProductionRequirement } from "./../shared/model/ProductionRequirement.model";

import {
    ResponseType,
    PaginationResponse
} from "./../types"

const API_URL = "/api/production_requirements";

const getAll = () => {
    return httpRequests.get<ResponseType<PaginationResponse<ProductionRequirement>>>(API_URL);
};

const getById = (id: number) => {
    return httpRequests.get<ResponseType<ProductionRequirement>, ResponseType<string>>(`${API_URL}/${id}`);
};

export default {
    getAll,
    getById
};