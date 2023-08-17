import React from "react";
import "../monitoring.css";
import { Progress } from "antd";

export const ProgressWO = (quantityActual, quantityPlan) => {
    return <Progress percent={getPercentage(quantityActual, quantityPlan)} />;
};

const getPercentage = (quantityActual, quantityPlan) => {
    quantityPlan = quantityPlan ? quantityPlan : 0;
    quantityActual = quantityActual ? quantityActual : 0;
    return quantityPlan === 0 || quantityActual === 0 ? 0 : Math.round((quantityActual * 100) / quantityPlan);
};
