import React, { useEffect, useState } from "react";
import { Button, DataGrid, DropDownBox, Popup } from "devextreme-react";
import {
    Column, Editing
} from "devextreme-react/data-grid";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";
import MaterialAndStructure from "../MaterialAndStructure/MaterialAndStructure";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";


const ROUTING_PATH = "/TechProcedure";
type TechProcedureProps = {
    isOpen: boolean,
    setClose?: () => void;

};

const data = [
    { No: 1, CongDoan: '', MaJob: '', TenJob: '' },
    { No: 2, CongDoan: '', MaJob: '', TenJob: '' },
    { No: 3, CongDoan: '', MaJob: '', TenJob: '' },
];

const selectBoxOptions = ['Làm việc', 'Nghỉ ngơi', 'Kiểm tra'];

export const TechProcedure: React.FC<TechProcedureProps> = observer(({
    isOpen = false, setClose }) => {

    const [rowData, setRowData] = useState(data);

    const [isAddNewTechForm, setIsAddNewTechForm] = React.useState<boolean>(false);

    const handleCongDoanChange = (e, rowKey) => {
        const newData = rowData.map((row) =>
            row.No === rowKey ? { ...row, CongDoan: e.value } : row
        );
        setRowData(newData);
    };

    const handleMaJobChange = (e, rowKey) => {
        const newData = rowData.map((row) =>
            row.No === rowKey ? { ...row, MaJob: e.value } : row
        );
        setRowData(newData);
    };

    const handleAddFormTechMaterialAndStructure = () => {
        setIsAddNewTechForm(true);
    }

    return (
        <>
            {isAddNewTechForm ?
                <MaterialAndStructure
                    isOpen={isAddNewTechForm}
                    setClose={() => setIsAddNewTechForm(false)}
                /> :
                <div className="box__shadow-table-responsive">
                    <div className="table-responsive">
                        <div className="informer" style={{
                            textAlign: "left",
                            paddingTop: 12
                        }}>
                            <h5 className="name" style={{
                                fontSize: 18,
                                marginBottom: 0
                            }}>Thêm mới phiếu công nghệ</h5>
                        </div>
                        {/* <ImportTechForm /> */}
                        <h6 style={{ fontSize: 15, fontWeight: 500, marginTop: 30 }}>Trình tự công nghệ/Technology procedure </h6>
                        <div className="mt-24">
                            <Upload.Dragger
                                multiple={false}
                                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            >
                                <p className="ant-upload-drag-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="48" viewBox="0 0 50 48" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M25 0.559998C20.8758 0.572932 16.8921 2.06058 13.7688 4.75419C11.375 6.81692 9.64062 9.5047 9.19375 12.2019C3.95625 13.3582 0 17.9212 0 23.4312C0 29.8319 5.3375 34.9387 11.8156 34.9387H23.4375V18.3963L16.7313 25.1064C16.4379 25.3998 16.0399 25.5646 15.625 25.5646C15.2101 25.5646 14.8121 25.3998 14.5187 25.1064C14.2254 24.8129 14.0605 24.415 14.0605 24C14.0605 23.585 14.2254 23.1871 14.5187 22.8936L23.8937 13.5176C24.0389 13.3721 24.2113 13.2566 24.4011 13.1779C24.591 13.0991 24.7945 13.0585 25 13.0585C25.2055 13.0585 25.409 13.0991 25.5989 13.1779C25.7887 13.2566 25.9611 13.3721 26.1063 13.5176L35.4813 22.8936C35.7746 23.1871 35.9395 23.585 35.9395 24C35.9395 24.415 35.7746 24.8129 35.4813 25.1064C35.1879 25.3998 34.7899 25.5646 34.375 25.5646C33.9601 25.5646 33.5621 25.3998 33.2687 25.1064L26.5625 18.3963V34.9387H39.65C45.3187 34.9387 50 30.4694 50 24.8532C50 19.7402 46.1188 15.5741 41.1438 14.8709C40.3844 6.80754 33.4062 0.559998 25 0.559998ZM23.4375 45.8773V34.9387H26.5625V45.8773C26.5625 46.2918 26.3979 46.6892 26.1049 46.9823C25.8118 47.2754 25.4144 47.44 25 47.44C24.5856 47.44 24.1882 47.2754 23.8951 46.9823C23.6021 46.6892 23.4375 46.2918 23.4375 45.8773Z" fill="#FF7A00" />
                                    </svg>
                                </p>
                                <p className="ant-upload-text">Kéo thả file hoặc <a style={{ color: '#FF7A00' }} >Chọn file</a> để tải lên</p>
                                <p className="ant-upload-hint">Chỉ cho phép file dạng .xls, .xlsx và dung lượng không quá 1MB</p>
                            </Upload.Dragger>
                        </div>

                        <div style={{ marginTop: 100 }}>
                            <DataGrid
                                key={'No'}
                                dataSource={rowData}
                                keyExpr="No"
                                showBorders={true}
                                showRowLines={true}
                                showColumnLines={true}
                            >
                                <Column dataField="No" caption="No." allowEditing={false} alignment="left" />
                                <Column
                                    dataField="CongDoan"
                                    caption="Công đoạn" >
                                </Column>
                                <Column dataField="MaJob" caption="Mã Job">
                                </Column>
                                <Column dataField="TenJob" caption="Tên Job" />
                            </DataGrid>
                            <div
                                className="toolbar"
                                style={{
                                    marginTop: 10,
                                    float: "right",
                                    // background: "#ffffff",
                                    padding: "8px",
                                    borderRadius: "4px",
                                }}
                            >
                                <Button
                                    text="Trở lại"
                                    onClick={setClose}
                                    style={{ marginRight: "18px", backgroundColor: "#E5E5E5", color: "#333", width: 100 }}
                                />
                                <Button
                                    text="Tiếp theo"
                                    onClick={handleAddFormTechMaterialAndStructure}
                                    style={{ marginRight: "18px", backgroundColor: "#FF7A00", color: "#fff" }}
                                />
                                <Button
                                    text="Thêm mới"
                                    onClick={handleAddFormTechMaterialAndStructure}
                                    style={{ backgroundColor: "gray", color: "#fff" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )

})


registerScreen({
    caption: "Danh sách phiếu công nghệ",
    component: TechProcedure,
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    },
    screenId: "techProcedure"
});

export default TechProcedure;