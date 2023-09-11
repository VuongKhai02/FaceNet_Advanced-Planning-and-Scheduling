
const InfoRow = ({ label, data, space }: any) => {

    return <>
        <div style={{ padding: 2, marginTop: 20, width: 500, height: 30, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 'bold', width: "36%", display: "flex", justifyContent: "end" }}>
                {label}
                <span>: </span>
            </span>
            <span style={{ padding: 2, height: 30, width: "53%", }}>{data}</span>
        </div>
    </>
}
export default InfoRow;