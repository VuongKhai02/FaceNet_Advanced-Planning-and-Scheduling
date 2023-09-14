import actionTypes from "../action/actionTypes";

const techFormReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_PRODUCT_SPEC:
            updateSpec("sizeType" , "ISOdfdf", state, action.productionCode)
            return {
                ...state
            }
        default: 
            return state;
    }
}

const updateSpec = (type, value, state, productionCode) => {
    const productionRequirementIndex = state.productionRequirements.findIndex(pr => pr.productionCode === productionCode);
    let productionRequirement = state.productionRequirements[productionRequirementIndex]
    let jsonValueIndex = productionRequirement.productTechFormDetails.findIndex(detail => detail.type === 'spec')
    let jsonValue = productionRequirement.productTechFormDetails[jsonValueIndex]?.value
    if (jsonValue === "" || jsonValue === null || jsonValue === undefined) {
        jsonValue = "{}"
    }
    let data = JSON.parse(jsonValue)
    console.log(data)
    data = {
        ...data,
        [type]: value
    }
    productionRequirement.productTechFormDetails[jsonValueIndex].value = JSON.stringify(data);
    console.log(state)
}

export default techFormReducer;