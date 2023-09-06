import { Button, Modal } from "antd"
import "./PopupSelectProductionRequirement.css"
import SvgIcon from "../SvgIcon/SvgIcon";
import React, { useEffect } from "react"
import { PLANNING_API_URL } from "../../../utils/config"
import { DataGrid } from "devextreme-react"
import { Column, Selection } from "devextreme-react/data-grid"
import httpRequests from "../../../utils/httpRequests";


const PopupSelectProductionRequirement = ({ title, visible, onSubmit, onCancel, width }) => {

    const [dataGrid, setDataGrid] = React.useState<any>([])
    const [dataChoosed, setDataChoosed] = React.useState<any>(null);


    useEffect(() => {
        if (visible) {
            httpRequests.get(PLANNING_API_URL + "/api/production_requirements?isCreatedTechForm=false")
                .then((response) => {
                    console.log(response)
                    setDataGrid(response.data.data.data)
                })
        }
    }, [visible])

    const style = () => {
        if (dataChoosed) {
            return {
                width: 100, height: 40, backgroundColor: '#FF7A00', color: "#fff", borderRadius: 5, marginRight: 8
            }
        } else {
            return {
                width: 100, height: 40, backgroundColor: 'rgba(0, 0, 0, 0.04)', color: "rgba(0, 0, 0, 0.25)", borderRadius: 5, marginRight: 8
            }
        }
    }

    return (
        <Modal
            visible={visible}
            title={
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                    <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                    <p style={{ lineHeight: '38px', padding: 0, margin: 0, fontSize: 20 }}>{title}</p>
                </div>
            }
            footer={[
                <Button key="cancel" onClick={onCancel} style={{ width: 100, height: 40, marginRight: '20px', backgroundColor: 'gray', borderRadius: 5, color: '#fff' }} >
                    Hủy bỏ
                </Button>,
                <Button disabled={dataChoosed === null} key="confirm" onClick={() => { onSubmit(dataChoosed) }} style={style()}>
                    Xác nhận
                </Button>,
            ]}
            width={width || 900}
            onCancel={onCancel}
        >
            <DataGrid
                dataSource={dataGrid}
                showBorders={true}
                hoverStateEnabled={true}
                keyExpr="id"
                onSelectionChanged={(e) => {
                    console.log(e)
                    setDataChoosed(e.selectedRowsData[0])
                }}
                defaultSelectedRowKeys={dataChoosed?.id}
            >
                <Selection mode="single" />
                <Column alignment="left" dataField="productionCode" caption="Mã sản xuất" />
                <Column alignment="left" dataField="cardName" caption="Tên thẻ" />
                <Column alignment="left" dataField="customer" caption="Khách hàng" />
                <Column alignment="left" dataField="quantityRequirement" caption="Số lượng yêu cầu" />

            </DataGrid>

        </Modal>
    )
}

export default PopupSelectProductionRequirement;