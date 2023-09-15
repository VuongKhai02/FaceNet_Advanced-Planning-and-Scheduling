import { locale, loadMessages } from "devextreme/localization";
import React, { useEffect, useState } from "react";
import DataGrid, {
    Column,
    FilterRow,
    SearchPanel,
    Selection,
    Toolbar,
    Item as TItem,
    OperationDescriptions,
    ColumnChooser,
} from "devextreme-react/data-grid";
import SvgIcon from "../../../../../shared/components/SvgIcon/SvgIcon";
import { Button } from "antd";
import PaginationComponent from "../../../../../shared/components/PaginationComponent/PaginationComponent";
import styles from "./ProductionRequirementList.module.css";
import classNames from "classnames/bind";
import httpRequests from "../../../../../utils/httpRequests";
import PriorityRender from "../../../../../components/PriorityRender/PriorityRender";

const cx = classNames.bind(styles);
export const ProductionRequirementTechForm = React.memo((props: any) => {


    const [pageIndex, setPageIndex] = React.useState<number>(0);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const [data, setData] = useState<any>({})

    useEffect(() => {
        if (props.techFormId){
            getPRByTechForm(props.techFormId)
        }
    }, [props.techFormId])



    const getPRByTechForm = (techFormId: any) => {
        httpRequests.get(`/api/techforms/${techFormId}/production_requirements?page=${pageIndex}&size=${pageSize}`).then((response) => {
            if (response.status === 200) {
                setData(response.data.data)
                // setBom(response.data.data);
            }
        });
    }

    console.log("data: ", data);



    locale("en");
    loadMessages({
        en: {
            Yes: "Xóa",
            No: "Hủy bỏ",
            "dxList-selectAll": "Chọn tất cả",
            "dxList-pageLoadingText": "Đang tải...",
        },
    });

    const handleCustomFooter = [
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}></div>
        </div>,
    ];
    const handleCustomFooterButtonChangeState = [
        <div>
            <div className={cx("footer-container")}>
                <Button
                    key='cancel'
                    className={cx("btn-cancel")}
                    onClick={() => {}}>
                    Hủy bỏ
                </Button>
                <Button
                    key='submit'
                    onClick={() => { }}
                    className={cx("btn-save")}>
                    Xác nhận
                </Button>
            </div>
        </div>
    ];

    return (
        data && 
        <div>
            <DataGrid
                id='gridContainer'
                dataSource={data.data}
                keyExpr='id'
                key={"id"}
                height={"auto"}
                showBorders={true}
                showColumnLines={true}
                showRowLines={true}
                rowAlternationEnabled={true}
                wordWrapEnabled={true}
                columnAutoWidth={true}
                noDataText='Không có dữ liệu để hiển thị'>

                <Toolbar>
                    <TItem location={"before"}>
                        <div>Danh sách yêu cầu sản xuất</div>
                    </TItem>
                    <TItem name='columnChooserButton' />
                </Toolbar>
                <ColumnChooser enabled={true} allowSearch={true} mode='select' />
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
                <SearchPanel visible={true} width={240} placeholder='Nhập thông tin và nhấn Enter để tìm kiếm' />

                <Selection mode='single' />
                <Column caption='Mã sản xuất' width={70} dataField={"productionCode"} />
                <Column dataField='salesOrderCode' caption='Mã đơn hàng'></Column>
                <Column dataField='customerCode' caption='Mã khách hàng' />
                <Column dataField='customer' caption='Tên khách hàng'></Column>
                <Column dataField='cardName' caption='Tên thẻ' />
                <Column dataField='quantityRequirement' caption='Số lượng' />
                <Column dataField='startDate' dataType='date' caption='Ngày bắt đầu' />
                <Column dataField='endDate' dataType='date' caption='Ngày kết thúc' />
                <Column dataField='priority' caption='Mức độ ưu tiên' cellRender={(cellInfo) => <PriorityRender value={cellInfo.value} />} />
                <Column dataField='totalQuantity' caption='Số lượng bù hao' />
                <Column dataField='status' caption='Trạng thái' />
            </DataGrid>
            <PaginationComponent
                pageSizeOptions={[10, 20, 40]}
                pageTextInfo={{ pageIndex: data.currentPage + 1, numberOfPages: 1, total: data.totalItems }}
                totalPages={1}
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPageChanged={(newPageIndex) => setPageIndex(newPageIndex - 1)}
                onPageSizeChanged={(newPageSize) => setPageSize(newPageSize)}
            />
        </div>
    

    )
    
    ;
});
export default ProductionRequirementTechForm;




