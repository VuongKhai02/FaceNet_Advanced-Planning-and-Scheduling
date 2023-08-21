import React, { useEffect, useState } from "react";
import Button1, { Button } from "devextreme-react/button";
import { useMainStore } from "@haulmont/jmix-react-core";
import DataGrid, { Column, Item as TItem, Toolbar } from "devextreme-react/data-grid";
import { DropDownBox, NumberBox, TextBox } from "devextreme-react";

const data = [
    { branch: "LR LED1", capacity: 0, target: 0 },
    { branch: "Thiết bị chiếu sáng", capacity: 0, target: 0 },
    { branch: "CNPT", capacity: 0, target: 0 },
];

export const PopupConfigDashboard = (props) => {
    const mainStore = useMainStore();
    const [rowData, setRowData] = useState<any[]>([]);

    const onchangeTargetValue = (e) => {
        // console.log("change target value")
        // console.log(e)
        props.setQuantityTarget(e);
    };

    const onchangeCheck = (e) => {
        // console.log("change target value")
        // console.log(e)
        console.log("check");
        console.log(e);
    };

    useEffect(() => {
        // console.log("branch")
        // console.log(props.quantityGroupByBranch)
        console.log("fetch");
        setRowData(props.quantityGroupByBranch);
    }, [props]);

    const handleTargetChange = (e, rowKey) => {
        let newData: any[] = [];
        for (let i = 0; i < rowData.length; i++) {
            if (rowData[i].branch === rowKey) {
                rowData[i].target = e.value;
            }
            newData.push(rowData[i]);
        }
        // const newData = rowData.map((row) =>
        //   row.branch === rowKey ? { ...row, target: e.value } : row
        // );
        console.log(newData);
        setRowData(newData);
        // props.setQuantityGroupByBranch(newData);
    };
    const handleCapacityChange = (e, key) => {
        let newData: any[] = [];
        console.log(e.value);
        for (let i = 0; i < rowData.length; i++) {
            if (rowData[i].branch === key) {
                rowData[i].capacity = e.value;
            }
            newData.push(rowData[i]);
        }
        // const newData = rowData.map((row) =>
        //   row.branch === key ? { ...row, capacity: e.value } : row
        // );
        console.log(newData);
        setRowData(newData);
    };

    const renderTarget = (data) => {
        let key = data.key;
        return (
            <NumberBox
                placeholder='Nhập năng suất mục tiêu'
                defaultValue={data.value}
                onValueChanged={(data) => handleTargetChange(data, key)}
                // onValueChanged={(e) => onchangeValue("productOrder", e.value)}
            />
        );
    };

    const renderCapacity = (data) => {
        let key = data.key;
        return (
            <NumberBox
                placeholder='Nhập năng lực sản xuất'
                defaultValue={data.value}
                onValueChanged={(data) => handleCapacityChange(data, key)}
                // onValueChanged={(e) => onchangeValue("productOrder", e.value)}
            />
        );
    };
    const submitChange = () => {
        props.setQuantityGroupByBranch(rowData);
        props.hidePopup();
    };

    return (
        <div>
            <h3 style={{ color: "blue" }}>Mục tiêu sản xuất</h3>

            <div className='config-quantity-target'>
                <div>
                    <h4>Nhập số lượng thành phẩm mục tiêu</h4>
                </div>
                <div>
                    <NumberBox
                        placeholder='Số lượng thành phẩm mục tiêu'
                        onValueChange={onchangeTargetValue}
                        // valu
                    />
                </div>
            </div>
            <h3 style={{ color: "blue" }}>Mục tiêu sản xuất của các bộ phận</h3>
            <div style={{ marginTop: 10 }}>
                <DataGrid dataSource={rowData} keyExpr='branch' showBorders={true} showRowLines={true} showColumnLines={true}>
                    <Column dataField='branch' caption='Bộ phận sản xuất' allowEditing={false} alignment='left' />
                    <Column
                        dataField='capacity'
                        caption='Năng lực sản xuất'
                        //   cellRender={({ data, key }) => (
                        //   <NumberBox placeholder="Nhập năng lực sản xuất"
                        //         // value={data[key]?.capacity}
                        //         //      value={renderValue}
                        //              onValueChanged={(e) => handleCapacityChange(e, key)}
                        //              // onValueChange={onchangeCheck}
                        //            />
                        // // onValueChanged={(e) => onchangeValue("productOrder", e.value)}
                        // )}
                        cellRender={renderCapacity}></Column>
                    <Column
                        dataField='target'
                        caption='Năng suất mục tiêu'
                        //         cellRender={({ data, key }) => (
                        //   <NumberBox placeholder="Nhập năng suất mục tiêu"
                        //            value={rowData[key]?.target}
                        //              onValueChanged={(e) => handleTargetChange(e, key)}
                        //         // onValueChanged={(e) => onchangeValue("productOrder", e.value)}
                        // />
                        // )}
                        cellRender={renderTarget}></Column>
                </DataGrid>
                <div className='button-config'>
                    <Button icon='check' type='success' text='Submit' onClick={submitChange} />
                </div>
            </div>
        </div>
    );
};
