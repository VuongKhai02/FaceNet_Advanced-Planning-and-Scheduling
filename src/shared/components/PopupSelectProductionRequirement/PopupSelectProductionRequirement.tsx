import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import classNames from "classnames/bind";
import { DataGrid } from "devextreme-react";
import { Column, FilterRow, Selection } from "devextreme-react/data-grid";
import SvgIcon from "../SvgIcon/SvgIcon";
import { PLANNING_API_URL } from "../../../utils/config"
import httpRequests from "../../../utils/httpRequests";

import styles from "./PopupSelectProductionRequirement.module.css";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import PopupBOM from "../PopupBOM/PopupBOM";
import { WarningOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

type PopupSelectProductionRequirementProps = {
    title: string,
    visible: boolean,
    onSubmit: (data: any) => void,
    onCancel: () => void,
    width?: number,
    onCreateTechForm: (ids: any) => void,
    children?: React.ReactNode
}

const PopupSelectProductionRequirement: React.FC<PopupSelectProductionRequirementProps> = ({ title, visible, onSubmit, onCreateTechForm, onCancel, width }) => {

    const [dataGrid, setDataGrid] = React.useState<any>([])
    const [dataChoosed, setDataChoosed] = React.useState<any>(null);
    const [pageIndex, setPageIndex] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(0)

    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    console.log(dataChoosed)

    const getProductionRequirement = () => {
        httpRequests.get(PLANNING_API_URL + `/api/production_requirements?page=${pageIndex - 1}&size=${pageSize}&isCreatedTechForm=false`)
                .then((response) => {
                    if (response.data.responseCode === "00")
                    console.log(response)
                    const prDatas = response.data.data.data.filter(data => data.techFormId === null)
                    console.log(prDatas)
                    setDataGrid(prDatas)
                    setTotalPage(Math.ceil(response.data.data.totalItems / pageSize))
                })
    }
    useEffect(() => {
        if (visible) {
            getProductionRequirement()
        }
    }, [visible, pageIndex, pageSize])

    const handleCustomFooterButtonSubmitCreate = [
        <div>
            <div className={cx("footer-container")}>
                <Button
                    key='cancel'
                    className={cx("btn-cancel")}
                    onClick={() => setIsSubmit(false)}>
                    Hủy bỏ
                </Button>
                <Button
                    className={cx("btn-save")}
                    key='submit'
                    onClick={() => { 
                        // handleChangeStatus(bomIdChoosed);
                        onCreateTechForm(dataChoosed)
                        setIsSubmit(false);
                    }}
                >
                    Xác nhận
                </Button>
            </div>
        </div>
    ];

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
            open={visible}
            className={cx("modal-container")}
            title={
                <div className={cx("title-container")}>
                    <SvgIcon sizeIcon={25} icon="assets/icons/Announcement.svg" textColor="#FF7A00" style={{ marginRight: 17 }} />
                    <p className={cx("title")}>{title}</p>
                </div>
            }
            footer={[
                <Button key="cancel" onClick={() => {
                    setDataChoosed(null);
                    onCancel()
                }} className={cx("btn-cancel")} type="default">
                    Hủy bỏ
                </Button>,
                <Button disabled={dataChoosed === null} key="confirm" onClick={() => { setIsSubmit(true) }} style={style()}>
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
                    if (e.selectedRowsData.length === 0) {
                        setDataChoosed(null)
                    } else {
                        setDataChoosed(e.selectedRowsData.map(data => data.id))
                    }
                }}
                
            >
                <PopupBOM
                                    isVisible={isSubmit}
                                    onCancel={() => setIsSubmit(false)}
                                    onSubmit={() => { }}
                                    modalTitle={
                                        <div>
                                            <h3
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    color: "#ff794e",
                                                    fontWeight: 500,
                                                }}>
                                                    Xác nhận tạo phiếu công nghệ cho các yêu cầu sản xuất đã chọn
                                            </h3>
                                        </div>
                                    }
                                    modalContent={
                                        <div>
                                            <h4 style={{ fontWeight: 500, fontSize: 16 }}>Bạn có chắc muốn tạo phiếu yêu cầu cho những yêu cầu sản xuất đã chọn?</h4>
                                            <div style={{ backgroundColor: "#ffe0c2", borderLeft: "4px solid #ff794e", borderRadius: 5, height: 120, marginTop: 20 }}>
                                                <h3 style={{ color: "#ff794e", fontWeight: 500 }}>
                                                    <WarningOutlined style={{ color: "#ff794e", marginRight: "8px" }} />
                                                    Lưu ý:
                                                </h3>
                                                <p style={{ marginLeft: 20, fontSize: 15, fontWeight: 400 }}>
                                                    Sau khi ấn xác nhận bạn không thể  hoàn tác.
                                                </p>
                                            </div>
                                        </div>
                                    }
                                    customFooter={handleCustomFooterButtonSubmitCreate}
                                    width={600}
                                />
                <Selection mode="multiple" />
                <FilterRow visible={true} />
                <Column alignment="left" dataField="productionCode" caption="Mã sản xuất" />
                <Column alignment="left" dataField="cardName" caption="Tên thẻ" />
                <Column alignment="left" dataField="customer" caption="Khách hàng" />
                <Column alignment="left" dataField="quantityRequirement" caption="Số lượng yêu cầu" />

            </DataGrid>
            <PaginationComponent
                            pageSizeOptions={[10, 20, 40]}
                            pageTextInfo={{ pageIndex, numberOfPages: totalPage, total: dataGrid?.length }}
                            totalPages={totalPage}
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                            onPageChanged={(newPageIndex) => setPageIndex(newPageIndex)}
                            onPageSizeChanged={(newPageSize) => setPageSize(newPageSize)}
                        />
        </Modal>
    )
}

export default PopupSelectProductionRequirement;