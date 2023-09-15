import httpRequests from "./httpRequests";

export const getBOMTemplateById = async (bomTemplateId) => {
    const response = await httpRequests.get(`/api/boms/templates/${bomTemplateId}`);
    return response;
}

export const getAllBOMTemplates = async () => {
    const response = await httpRequests.get(`/api/boms/templates`);
    return response;
}