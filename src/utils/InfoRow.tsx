import React from "react";

const InfoRow = ({ label, data, space }: any) => {

  return <>
    {/* <div style={{ padding: 2, marginTop: 20, width: 300, height: 30, border: '1px solid green', display: "flex", justifyContent: "space-between" }}>
      <span style={{ fontWeight: 'bold', width: "36%", border: '1px solid red', display: "flex", justifyContent: "end" }}>{label}</span>
      <span> : </span>
      <div style={{ marginLeft: space ? space : 105, marginTop: -20, display: "inline" }}>
        <span style={{ padding: 2, height: 30, maxWidth: 200 }}>{data}</span>
      </div>
    </div> */}
    <div style={{ padding: 2, marginTop: 20, width: 300, height: 30, display: "flex", justifyContent: "space-between" }}>
      <span style={{ fontWeight: 'bold', width: "36%", display: "flex", justifyContent: "end" }}>
        {label}
        <span>: </span>
      </span>
      <span style={{ padding: 2, height: 30, width: "53%", }}>{data}</span>
    </div>
  </>
}
export default InfoRow;