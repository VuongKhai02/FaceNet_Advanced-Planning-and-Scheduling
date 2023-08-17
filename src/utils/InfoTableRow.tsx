import React from "react";

const InfoTableRow = ({ label, data }) => {
    return (
        <tr style={{ border: "10" }}>
            <td>
                <div style={{ fontWeight: "bold", padding: 10 }}>{label}:</div>
            </td>
            <td>
                <div style={{ padding: 10 }}>{data}</div>
            </td>
        </tr>
    );
};
export default InfoTableRow;
