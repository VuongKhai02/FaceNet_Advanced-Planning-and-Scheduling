import React from "react";
import DataGrid, { Column, FilterRow, HeaderFilter, OperationDescriptions, Paging, Scrolling, Selection } from "devextreme-react/data-grid";
import DropDownBox from "devextreme-react/drop-down-box";

const dropDownOptions = { width: 700 };

export default class ProductSelectBoxTemplate extends React.Component<{ data }, { selectedRowKeys; isDropDownOpened }> {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [props.data.value],
            isDropDownOpened: false,
        };
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.contentRender = this.contentRender.bind(this);
        this.boxOptionChanged = this.boxOptionChanged.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    boxOptionChanged(e) {
        // console.log(e)
        if (e.name === "opened") {
            this.setState({
                isDropDownOpened: e.value,
            });
        }
    }

    contentRender() {
        return (
            <DataGrid
                dataSource={this.props.data.column.lookup.dataSource}
                remoteOperations={true}
                height={250}
                selectedRowKeys={this.state.selectedRowKeys}
                hoverStateEnabled={true}
                onSelectionChanged={this.onSelectionChanged}
                focusedRowEnabled={true}
                defaultFocusedRowKey={this.state.selectedRowKeys[0]}
                keyExpr={"id"}>
                <FilterRow visible={true} applyFilter={"auto"} showAllText='Tất cả' resetOperationText='Đặt lại'>
                    <OperationDescriptions
                        startsWith='Bắt đầu với'
                        equal='Bằng'
                        endsWith='Kết thúc với'
                        contains='Chứa'
                        notContains='Không chứa'
                        notEqual='Không bằng'
                        lessThan='Nhỏ hơn'
                        lessThanOrEqual='Nhỏ hơn hoặc bằng'
                        greaterThan='Lớn hơn'
                        greaterThanOrEqual='Lớn hơn hoặc bằng'
                        between='Nằm giữa'
                    />
                </FilterRow>
                <Column dataField='productCode' width={"140"} />
                <Column dataField='productName' />
                <Column dataField='bomVersion' width={"120"} />
                <Column dataField='uDocurl' width={"120"} visible={false} />
                <Column dataField='uDocurl2' width={"120"} visible={false} />
                <Paging enabled={true} defaultPageSize={10} />
                <Scrolling mode='virtual' />
                <Selection mode='single' />
            </DataGrid>
        );
    }

    onSelectionChanged(selectionChangedArgs) {
        // console.log(selectionChangedArgs)

        if (selectionChangedArgs.selectedRowsData[0]) {
            // console.log(selectionChangedArgs.selectedRowsData[0].productCode)
            // console.log(selectionChangedArgs.selectedRowKeys[0])
            this.setState({
                selectedRowKeys: selectionChangedArgs.selectedRowKeys,
                isDropDownOpened: false,
            });
            // this.props.data.setValue(this.state.selectedRowKeys[0]);
            this.props.data.setValue(selectionChangedArgs.selectedRowsData[0]);
            // console.log(this.props.data)
        }
    }

    onValueChanged(e) {
        // console.log("e")
        // console.log(e)
        this.props.data.setValue(e.value);
    }

    render() {
        return (
            <DropDownBox
                onOptionChanged={this.boxOptionChanged}
                // opened={this.state.isDropDownOpened}
                dropDownOptions={dropDownOptions}
                dataSource={this.props.data.column.lookup.dataSource}
                value={this.state.selectedRowKeys[0]}
                displayExpr='productCode'
                valueExpr='id'
                contentRender={this.contentRender}
                onValueChanged={this.onValueChanged}
                placeholder={"-- Lựa chọn --"}></DropDownBox>
        );
    }
}
