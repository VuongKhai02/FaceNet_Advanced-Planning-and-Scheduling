import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
    selectProductRequirements,
    selectLoadingStatus,
    getProductRequirements
} from "./ManageProductionRequirements.reducer";

const ManageProductionRequirements: React.FC = () => {
    const productionRequirements = useAppSelector(selectProductRequirements);
    const loadingStatus = useAppSelector(selectLoadingStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProductRequirements());
    }, [])

    return (
        <div>
            <h1>ManageProductionRequirements</h1>
            <button onClick={() => { console.log(productionRequirements, loadingStatus) }}>Click me!</button>
        </div>
    );
}


export default ManageProductionRequirements;