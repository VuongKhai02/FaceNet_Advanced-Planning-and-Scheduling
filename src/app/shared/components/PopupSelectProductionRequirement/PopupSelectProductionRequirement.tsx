import { Button, Modal } from "antd"
import "./PopupSelectProductionRequirement.css"
import SvgIcon from "../../../icons/SvgIcon/SvgIcon"
import React, { useEffect } from "react"
import { useMainStore } from "@haulmont/jmix-react-core"
import axios from 'axios';
import { PLANNING_API_URL } from "../../../../config"
import { DataGrid } from "devextreme-react"
import { Column, Selection } from "devextreme-react/data-grid"

const PopupSelectProductionRequirement = ({ title, visible, onSubmit, onCancel, width }) => {
    
    const [dataGrid, setDataGrid] = React.useState<any>([])
    const mainStore = useMainStore();
    const [dataChoosed, setDataChoosed] = React.useState<any>(null);


    useEffect(() => {
        if (visible) {
            const headers = {
                Authorization: "Bearer " + mainStore.authToken,
                "content-type": "application/json",
            };
            axios.get(PLANNING_API_URL + "/api/production_requirements?isCreatedTechForm=false", { headers: headers })
            .then((response) => {
                console.log(response)
                setDataGrid(response.data.data.data)
            })
        }
    }, [visible])

    console.log("dfkjsdfjsdf", dataChoosed);

    const style = () => {
        if (dataChoosed) {
            return {
                width: 100, height: 40, backgroundColor: '#FF7A00', color: "#fff", borderRadius: 5, marginRight: 8
            }
        } else {
            return {
                width: 100, height: 40, backgroundColor: '#A8A8A8', color: "#fff", borderRadius: 5, marginRight: 8
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
                <Button key="cancel" onClick={onCancel} style={{ width: 100, height: 40, marginRight: '20px', backgroundColor: '#C0C0C0', borderRadius: 5 }} type="default">
                    Hủy bỏ
                </Button>,
                <Button disabled={dataChoosed=== null} key="confirm" onClick={() => {onSubmit(dataChoosed)}} style={style() }>
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