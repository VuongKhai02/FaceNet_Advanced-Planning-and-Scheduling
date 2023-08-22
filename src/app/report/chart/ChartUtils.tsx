import { Font, Legend } from "devextreme-react/chart";
import React from "react";

export const LegendCustom = () => {
    return (
        <Legend verticalAlignment='bottom' horizontalAlignment='center'>
            <Font size={15} weight={500} />
        </Legend>
    );
};
