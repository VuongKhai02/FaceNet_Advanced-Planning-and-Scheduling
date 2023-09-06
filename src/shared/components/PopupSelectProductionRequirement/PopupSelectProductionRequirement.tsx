import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import classNames from "classnames/bind";
import { DataGrid } from "devextreme-react";
import { Column, Selection } from "devextreme-react/data-grid";
import SvgIcon from "../SvgIcon/SvgIcon";
import { PLANNING_API_URL } from "../../../utils/config"
import httpRequests from "../../../utils/httpRequests";

import styles from "./PopupSelectProductionRequirement.module.css";

const cx = classNames.bind(styles);

type PopupSelectProductionRequirementProps = {
    title: string,
    visible: boolean,
    onSubmit: (data: any) => void,
    onCancel: () => void,
    width?: number
    children?: React.ReactNode
}

const PopupSelectProductionRequirement: React.FC<PopupSelectProductionRequirementProps> = ({ title, visible, onSubmit, onCancel, width }) => {

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
                width: 100, height: 40, backgroundColor: '#A8A8A8', color: "#fff", borderRadius: 5, marginRight: 8
            }
        }
    }

    return (
        <Modal
            open={visible}
            className={cx("modal-container")}
            title={
                <div className={cx("title-container")}>
                    <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                    <p className={cx("title")}>{title}</p>
                </div>
            }
            footer={[
                <Button key="cancel" onClick={onCancel} className={cx("btn-cancel")} type="default">
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