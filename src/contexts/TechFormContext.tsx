import { createContext, useReducer } from "react";
import techFormReducer from "../store/reduces/TechFormReducer";

export const TechFormContext = createContext<any>(null);
function TechFormProvider(prop) {
    console.log("prop", prop)
    const [techFormState, dispatch] = useReducer(techFormReducer, prop.techFormState);


    return <TechFormContext.Provider value={[techFormState, dispatch]}>{prop.children}</TechFormContext.Provider>;
}

export default TechFormProvider;