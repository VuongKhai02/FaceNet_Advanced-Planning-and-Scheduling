import React, { useEffect, useState } from "react";
import { SelectBox } from "devextreme-react";
import DataGrid, {
    Column,
    Selection,
    Paging,
} from 'devextreme-react/data-grid';
import { Button } from "antd"
import { observer } from "mobx-react";
import { ProductionID } from "../ProductionID/ProductionID";
import "../../styleCommon.css"

const shift = [
    'Ca 1',
    'Ca 2',
    'Ca 3',
];
type GeneralInformation = {
    isOpen: boolean,
    setClose?: () => void;
    status: string,
    production_id: string,
    production_cardName: string,
};

export const GeneralInformation: React.FC<GeneralInformation> = observer(({
    isOpen = false, setClose, production_id = "", production_cardName = "", status }) => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [isDeclareInfo, setisDeclareInfo] = React.useState<boolean>(false);
    const [selectedInfo, setSelectedInfo] = React.useState({
        no: 0,
        stage: '',
        job_id: '',
        job_name: '',
        finishTime: "",
    });


    useEffect(() => {
        const updateDimension = () => {
            setwindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateDimension);
    }, [])

    const productionInfo = [{
        no: 1,
        stage: 'In offset',
        job_id: 'JB01-001',
        job_name: 'In offset: Ra bản',
        finishTime: "2022/06/01",
    },
    {
        no: 2,
        stage: 'In lưới',
        job_id: 'JB02-002',
        job_name: 'In offset: Căng lưới + bọc lưới',
        finishTime: "2021/03/01",
    }, {
        no: 3,
        stage: 'Dải từ',
        job_id: 'JB01-001',
        job_name: 'Từ: Dải từ',
        finishTime: "2022/01/01",
    }]

    const onSelectionChanged = (e) => {
        const data = e.selectedRowsData;
        let newObj = {
            no: data[0].no,
            stage: data[0].stage,
            job_id: data[0].job_id,
            job_name: data[0].job_name,
            finishTime: data[0].finishTime,
        }
        setSelectedInfo(newObj);
    }

    return (
        <>
            {isDeclareInfo ? <ProductionID isOpen={isDeclareInfo}
                setClose={() => setisDeclareInfo(false)}
                status={status}
                production_id={production_id}
                production_cardName={production_cardName}
            /> :
                <div>
                    <div className="table-responsive">
                        <div className="informer" style={{
                            background: "#fff",
                            textAlign: "left",
                            paddingTop: 12
                        }}>
                            <h2 className="name" style={{
                                marginBottom: 0,
                                fontWeight: 700,
                                margin: "0 0 .6rem .5rem"
                            }}>Khai báo thông tin</h2>
                            <div style={{ border: '1px solid #ccc', borderRadius: '6px', margin: '0.5rem', padding: windowWidth < 600 ? "0" : "0 3rem" }}>
                                <div className="content" style={{ margin: ".5rem", flexWrap: "wrap" }}>
                                    <div className="col-4" style={{ width: windowWidth < 600 ? "100%" : "47%", margin: "0 1rem 1rem 0", gap: "20px", display: "flex" }}>
                                        <p>Chọn ca/kíp</p>
                                        <SelectBox style={{ width: windowWidth < 600 ? "65%" : "47%" }} placeholder="-- Chọn --" items={shift} />
                                    </div>
                                </div>

                                <DataGrid
                                    dataSource={productionInfo}
                                    showBorders={true}
                                    keyExpr="no"
                                    onSelectionChanged={onSelectionChanged}
                                >
                                    <Selection mode="single" />
                                    <Paging defaultPageSize={10} />

                                    <Column dataField="no" caption="No." alignment="center" width={40} />
                                    <Column dataField="job_name" caption="Công đoạn" />
                                    <Column dataField="job_id" caption="Mã job" />
                                    <Column dataField="stage" caption="Tên Job" />
                                    <Column dataField="finishTime" alignment="right" dataType="date" format="dd/MM/yyyy " caption="Thời gian hoàn thành" />
                                </DataGrid>

                                <div style={{ display: 'flex', flexDirection: "row-reverse", padding: "1rem", gap: "10px" }}>
                                    <Button onClick={() => { setisDeclareInfo(true) }} className="btn_continue">{windowWidth > 600 ? "Khai báo thông tin sản xuất" : "Khai báo thông tin"}</Button>
                                    <Button onClick={setClose} className="btn_again">{windowWidth > 600 ? "Hủy bỏ" : "Hủy bỏ"}</Button>
                                </div>
                            </div>
                        </div>
                        <div className="informer" style={{
                            backgroundColor: "#ffffff",
                            paddingLeft: 13
                        }}>
                        </div>
                    </div>
                </div>
            }
        </>
    )
})


export default GeneralInformation;




