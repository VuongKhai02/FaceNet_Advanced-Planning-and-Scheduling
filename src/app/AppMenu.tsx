import { MenuProps } from "antd";
import React from "react";
import { MenuItem, SubMenuItem, VerticalMenu } from "@haulmont/jmix-react-ui";
import {
    AppstoreOutlined,
    DashboardOutlined,
    ShoppingFilled,
    ShoppingOutlined,
    SignalFilled,
    UploadOutlined,
    UserOutlined,
    WarningOutlined,
    ApartmentOutlined,
    BarsOutlined,
    CalendarFilled,
    CalendarOutlined,
    FileExcelOutlined,
    FormOutlined,
    HomeFilled,
    RadarChartOutlined,
} from "@ant-design/icons";
import UserService from "../Keycloak";

export interface AppMenuProps extends MenuProps {}

export const AppMenu = (props: AppMenuProps) => {
    const orderMenu = UserService.hasRole(["screen.ProductOrder"]) ? (
        <SubMenuItem caption={"ĐƠN HÀNG"} icon={<ShoppingFilled />}>
            <MenuItem
                screenId='screen.ProductOrder'
                icon={<UploadOutlined />}
                caption={"screen.ProductOrder"}
                key={"screen.ProductOrder"}
            />

            <MenuItem
                screenId='ProductOrderManager'
                icon={<ShoppingOutlined />}
                caption={"screen.ProductOrderManager"}
                key={"screen.ProductOrderManager"}
            />
        </SubMenuItem>
    ) : undefined;

    const workOrderManagerMenu = UserService.hasRole(["screen.WorkOrderManager"]) ? (
        <SubMenuItem caption={"KỊCH BẢN SẢN XUẤT"} icon={<ApartmentOutlined />}>
            <MenuItem
                caption={"Quản lý Work Order"}
                screenId='WorkOrderManager'
                icon={<CalendarFilled />}
                key={"screen.WorkOrderManager"}
            />
        </SubMenuItem>
    ) : undefined;

    const importManager = UserService.hasRole(["screen.Programing"]) ? (
        <SubMenuItem caption={"IMPORT MANAGER"} icon={<FileExcelOutlined />}>
            <MenuItem caption={"1. Feeder"} screenId='FeederImport' icon={<UploadOutlined />} key={"screen.FeederImport"} />
            <MenuItem caption={"2. PartNumber"} screenId='PartNumberImport' icon={<UploadOutlined />} key={"screen.PartNumberImport"} />
            <MenuItem caption={"3. Profile"} screenId='ProfileImport' icon={<UploadOutlined />} key={"screen.ProfileImport"} />
            <MenuItem
                caption={"4. ProfileDetail"}
                screenId='ProfileDetailImport'
                icon={<UploadOutlined />}
                key={"screen.ProfileDetailImport"}
            />
            <MenuItem caption={"5. Programing"} screenId='ProgramingImport' icon={<UploadOutlined />} key={"screen.ProgramingImport"} />
            <MenuItem
                caption={"6. ProgramingDetail"}
                screenId='ProgramingDetailImport'
                icon={<UploadOutlined />}
                key={"screen.ProgramingDetailImport"}
            />
            <MenuItem caption={"7. Hàng hóa COITT"} screenId='COITTImport' icon={<UploadOutlined />} key={"coittImport"} />
            <MenuItem caption={"8. Thành phẩm CITT1"} screenId='CITT1Import' icon={<UploadOutlined />} key={"citt1Import"} />
            <MenuItem caption={"9. OITM"} screenId='OITMImport' icon={<UploadOutlined />} key={"oitmImport"} />
        </SubMenuItem>
    ) : undefined;

    const employeeMenu = UserService.hasRole(["screen.Programing"]) ? (
        <SubMenuItem caption={"QUẢN LÝ THÔNG TIN"} icon={<BarsOutlined />}>
            <MenuItem screenId={"EmployeeManager"} icon={<BarsOutlined />} caption={"Quản lý nhân viên"} key={"EmployeeManager"} />
            <MenuItem
                screenId={"EmployeeGroupMasterDetail"}
                icon={<BarsOutlined />}
                caption={"Quản lý đơn vị"}
                key={"EmployeeGroupMasterDetail"}></MenuItem>
            <MenuItem
                screenId={"QmsStageGroupMappingManager"}
                icon={<BarsOutlined />}
                caption={"Quản lý nhóm công đoạn"}
                key={"QmsStageGroupMappingManager"}></MenuItem>
        </SubMenuItem>
    ) : undefined;

    const monitorMenu = UserService.hasRole(["screen.Monitor"]) ? (
        <SubMenuItem caption={"MONITOR"} icon={<SignalFilled />}>
            <MenuItem
                screenId={"WorkOrderTimeline"}
                icon={<CalendarOutlined />}
                caption={"screen.WorkOrderTimeline"}
                key={"8504f729-5c47-4ecb-b12e-91aa92cb5fac"}
            />
            <MenuItem screenId={"LineList"} icon={<BarsOutlined />} caption={"LineList"} key={"screen.LineList"} />
        </SubMenuItem>
    ) : undefined;

    return (
        // @ts-ignore
        <VerticalMenu {...props}>
            <MenuItem screenId='HomePage' icon={<HomeFilled />} caption={"screen.home"} key={"home"} />
            <MenuItem icon={<DashboardOutlined />} caption={"Dashboard"} />
            <SubMenuItem caption={"Quản lý thông tin"} icon={<AppstoreOutlined />}>
                <MenuItem
                    screenId='screen.ProductOrder'
                    icon={<UploadOutlined />}
                    caption={"screen.ProductOrder"}
                    key={"screen.ProductOrder"}
                />
                <MenuItem
                    screenId='ProductOrderManager'
                    icon={<ShoppingOutlined />}
                    caption={"screen.ProductOrderManager"}
                    key={"screen.ProductOrderManager"}
                />
                <MenuItem
                    screenId='manageProductionRequirements'
                    caption={"Quản lý yêu cầu sản xuất"}
                    key={"manageProductionRequirements"}
                />
                <MenuItem screenId='cardManagement' caption={"Quản lý hộp chứa thẻ"} key={"cardManagement"} />
                <MenuItem screenId='manageJobOutput' caption={"Quản lý Job output"} key={"manageJobOutput"} />
            </SubMenuItem>
            <SubMenuItem caption={"Quản lý BOM"} icon={<AppstoreOutlined />}>
                <MenuItem screenId='bomBodyCard' caption={"Quản lý BOM body card"} key={"bomBodyCard"} />

                <MenuItem screenId='bomPersonalized' caption={"Quản lý BOM cá thể hóa"} key={"bomPersonalized"} />
            </SubMenuItem>
            <SubMenuItem caption={"Quản lý phiếu công nghệ"} icon={<AppstoreOutlined />}>
                <MenuItem
                    screenId='techFormList'
                    // icon={<HomeFilled />}
                    caption={"Danh sách phiếu công nghệ"}
                    key={"techFormList"}
                />

                <MenuItem screenId='techFormApprove' caption={"Phê duyệt phiếu công nghệ"} key={"techFormApprove"} />
            </SubMenuItem>
            <SubMenuItem caption={"Quản lý kế hoạch sản xuất"} icon={<AppstoreOutlined />}>
                <MenuItem screenId='productionPlanList' caption={"Danh sách kế hoạch sản xuất"} key={"productionPlanList"} />

                <MenuItem screenId='dnlNvlList' caption={"Danh sách đề nghị lĩnh NVL"} key={"dnlNvlList"} />

                <MenuItem screenId='declareProductionObject' caption={"Khai báo người/máy/lô sản xuất"} key={"dd"} />
            </SubMenuItem>

            <SubMenuItem caption={"Giám sát tiến độ"} icon={<AppstoreOutlined />}>
                <MenuItem screenId='progressMonitoringWO' caption={"Giám sát tiến độ WO"} key={"progressMonitoringWO"} />
                <MenuItem
                    screenId='progressMonitoringManufacture'
                    caption={"Giám sát tiến độ sản xuất"}
                    key={"progressMonitoringManufacture"}
                />

                <MenuItem screenId='progressMonitoringOrder' caption={"Giám sát tiến độ đơn hàng"} key={"progressMonitoringOrder"} />
                <MenuItem
                    screenId=''
                    // icon={<ShoppingOutlined />}
                    caption={"Giám sát máy"}
                    key={"gsm"}
                />
                <MenuItem
                    screenId=''
                    // icon={<ShoppingOutlined />}
                    caption={"Hàng chờ công đoạn"}
                    key={"hc"}
                />
            </SubMenuItem>
            {/* user */}
            <SubMenuItem caption='Quản lý tài khoản' icon={<UserOutlined />}></SubMenuItem>
            <SubMenuItem caption={"Cảnh báo"} icon={<WarningOutlined />}>
                <MenuItem
                    screenId=''
                    // icon={<HomeFilled />}
                    caption={"Danh sách phiếu công nghệ"}
                    key={"g"}
                />

                <MenuItem
                    screenId=''
                    // icon={<ShoppingOutlined />}
                    caption={"Phê duyệt phiếu công nghệ"}
                    key={"h"}
                />
            </SubMenuItem>
            <SubMenuItem caption={"Báo cáo, thống kê"} icon={<FormOutlined />}>
                <MenuItem
                    screenId=''
                    // icon={<HomeFilled />}
                    caption={"Danh sách phiếu công nghệ"}
                    key={"i"}
                />

                <MenuItem
                    screenId=''
                    // icon={<ShoppingOutlined />}
                    caption={"Phê duyệt phiếu công nghệ"}
                    key={"k"}
                />
            </SubMenuItem>
            {/*<MenuItem screenId='HomePage' icon={<HomeFilled/>} caption={"screen.home"} key={"home"}/>*/}
            {/*<MenuItem*/}
            {/*  screenId="Warnings"*/}
            {/*  icon={<HomeFilled/>}*/}
            {/*  caption={"Content 1"}*/}
            {/*  key={"Content 1"}*/}
            {/*/>*/}
            {/*<SubMenuItem caption={"Quản lý thông tin"} icon={<ShoppingFilled/>}>*/}
            {/*  <MenuItem screenId='MrpSaleOrders' icon={<HomeFilled/>} caption={"Quản lý đơn hàng"} key={"mrporders"}/>*/}

            {/*  <MenuItem screenId='Template' icon={<ShoppingOutlined/>} caption={"Quản lý mã QR lô sản phẩm"}*/}
            {/*            key={"Content 2.2"}/>*/}
            {/*</SubMenuItem>*/}
            {/*<SubMenuItem caption={"Quản lý phiếu công nghệ"} icon={<ShoppingFilled/>}>*/}
            {/*  <MenuItem screenId='techFormList' icon={<HomeFilled/>} caption={"Danh sách phiếu công nghệ"}*/}
            {/*            key={"techFormList"}/>*/}
            {/*  <MenuItem*/}
            {/*    screenId='techFormApprove'*/}
            {/*    icon={<ShoppingOutlined/>}*/}
            {/*    caption={"Phê duyệt phiếu công nghệ"}*/}
            {/*    key={"techFormApprove"}*/}
            {/*  />*/}
            {/*</SubMenuItem>*/}
            {/*<SubMenuItem caption={"Quản lý kế hoạch sản xuất"} icon={<ShoppingFilled/>}>*/}
            {/*  <MenuItem screenId='' icon={<HomeFilled/>} caption={"Danh sách kế hoạch sản xuất"} key={"c"}/>*/}

            {/*  <MenuItem screenId='' icon={<ShoppingOutlined/>} caption={"Danh sách đề nghị lĩnh NVL"} key={"d"}/>*/}
            {/*</SubMenuItem>*/}
            {/*<SubMenuItem caption={"Giám sát tiến độ"} icon={<ShoppingFilled/>}>*/}
            {/*  <MenuItem screenId='' icon={<HomeFilled/>} caption={"Giám sát tiến độ sản xuất"} key={"e"}/>*/}

            {/*  <MenuItem screenId='' icon={<ShoppingOutlined/>} caption={"Giám sát tiến độ đơn hàng"} key={"f"}/>*/}
            {/*  <MenuItem screenId='' icon={<ShoppingOutlined/>} caption={"Giám sát máy"} key={"gsm"}/>*/}
            {/*  <MenuItem screenId='' icon={<ShoppingOutlined/>} caption={"Hàng chờ công đoạn"} key={"hc"}/>*/}
            {/*</SubMenuItem>*/}
            {/*/!* user *!/*/}
            {/*<SubMenuItem caption='Quản lý tài khoản' icon={<UserOutlined/>}></SubMenuItem>*/}
            {/*<SubMenuItem caption={"Cảnh báo"} icon={<ShoppingFilled/>}>*/}
            {/*  <MenuItem screenId='' icon={<HomeFilled/>} caption={"Danh sách phiếu công nghệ"} key={"g"}/>*/}

            {/*  <MenuItem screenId='' icon={<ShoppingOutlined/>} caption={"Phê duyệt phiếu công nghệ"} key={"h"}/>*/}
            {/*</SubMenuItem>*/}
            {/*<SubMenuItem caption={"Báo cáo, thống kê"} icon={<FormOutlined/>}>*/}
            {/*  <MenuItem screenId='' icon={<HomeFilled/>} caption={"Danh sách phiếu công nghệ"} key={"i"}/>*/}

            {/*  <MenuItem screenId='' icon={<ShoppingOutlined/>} caption={"Phê duyệt phiếu công nghệ"} key={"k"}/>*/}
            {/*</SubMenuItem>*/}
            {/*{orderMenu}*/}
            {workOrderManagerMenu}
            {importManager}
            {employeeMenu}
            {monitorMenu}
            <SubMenuItem caption={"BÁO CÁO"} icon={<FormOutlined />}>
                <MenuItem
                    screenId={"screen.ProductOrderDetailReport"}
                    icon={<BarsOutlined />}
                    caption={"Báo cáo chi tiết đơn hàng"}
                    key={"ProductOrderDetailReport"}
                />
                <MenuItem
                    screenId={"screen.WorkOrderDetailReport"}
                    icon={<BarsOutlined />}
                    caption={"Báo cáo chi tiết KBSX"}
                    key={"WorkOrderDetailReport"}
                />
                <MenuItem
                    screenId={"screen.MaterialAttritionReportWO"}
                    icon={<BarsOutlined />}
                    caption={"Báo cáo tiêu hao NVL tổng hợp"}
                    key={"MaterialAttritionReportWO"}
                />
                <MenuItem
                    screenId={"screen.MaterialAttritionReport"}
                    icon={<BarsOutlined />}
                    caption={"Báo cáo tiêu hao NVL chi tiết"}
                    key={"MaterialAttritionReport"}
                />
                {/*<MenuItem*/}
                {/*    screenId={"screen.ProductionMeansReport"}*/}
                {/*    icon={<BarsOutlined />}*/}
                {/*    caption={"Báo cáo công cụ sản xuất"}*/}
                {/*    key={"ProductionMeansReport"}*/}
                {/*/>*/}
            </SubMenuItem>
            {/*<SubMenuItem caption={"QUẢN LÝ PART"} icon={<RadarChartOutlined />}>*/}
            {/*    <MenuItem screenId={"screen.PartNumberManager"} icon={<BarsOutlined />} caption={"Part"} key={"PartNumberManager"} />*/}
            {/*    <MenuItem*/}
            {/*        screenId={"screen.GroupFeederManager"}*/}
            {/*        icon={<BarsOutlined />}*/}
            {/*        caption={"Equipment Group"}*/}
            {/*        key={"GroupFeederManager"}*/}
            {/*    />*/}
            {/*    <MenuItem*/}
            {/*        screenId={"screen.FeederSerialManager"}*/}
            {/*        icon={<BarsOutlined />}*/}
            {/*        caption={"Equipment"}*/}
            {/*        key={"FeederSerialManager"}*/}
            {/*    />*/}
            {/*<MenuItem*/}
            {/*  screenId={"screen.QrFeederManager"}*/}
            {/*  icon={<BarsOutlined />}*/}
            {/*  caption={"Qr Feeder"}*/}
            {/*  key={"QrFeederManager"}*/}
            {/*/>*/}
            {/*      <MenuItem*/}
            {/*    screenId={"screen.EquipmentTypeManager"}*/}
            {/*    icon={<BarsOutlined />}*/}
            {/*    caption={"Equipment Type"}*/}
            {/*    key={"EquipmentTypeManager"}*/}
            {/*/>*/}
            {/*</SubMenuItem>*/}
            {/*<MenuItem screenId={"screen.ProfileManager"} icon={<UserOutlined />} caption={"QUẢN LÝ PROFILE"} key={"ProfileManager"} />*/}
            {/*<MenuItem*/}
            {/*    screenId={"screen.ProgrammingManager"}*/}
            {/*    icon={<BarsOutlined />}*/}
            {/*    caption={"QUẢN LÝ PROGRAMMING"}*/}
            {/*    key={"ProgrammingManager"}*/}
            {/*/>*/}
            <MenuItem screenId={"screen.DnlnvlManager"} icon={<BarsOutlined />} caption={"QUẢN LÝ ĐỀ NGHỊ LĨNH"} key={"DnlnvlManager"} />
            {/*<MenuItem*/}
            {/*    screenId={"screen.DnlnvlApproveManager"}*/}
            {/*    icon={<BarsOutlined />}*/}
            {/*    caption={"QUẢN LÝ PHÊ DUYỆT "}*/}
            {/*    key={"DnlnvlApproveManager"}*/}
            {/*/>*/}
            {/*<MenuItem*/}
            {/*    screenId={"screen.DnlnvlWarehouseManager"}*/}
            {/*    icon={<BarsOutlined />}*/}
            {/*    caption={"QUẢN LÝ ĐỐI CHIẾU NVL"}*/}
            {/*    key={"DnlnvlWarehouseManager"}*/}
            {/*/>*/}
            {/*<MenuItem*/}
            {/*    screenId={"screen.DnlnvlGivebackRedundantManager"}*/}
            {/*    icon={<BarsOutlined />}*/}
            {/*    caption={"QUẢN LÝ TRẢ NVL DƯ THỪA "}*/}
            {/*    key={"DnlnvlGivebackRedundantManager"}*/}
            {/*/>*/}
            {/*<MenuItem*/}
            {/*    screenId={"screen.DnlnvlApproveRedundantManager"}*/}
            {/*    icon={<BarsOutlined />}*/}
            {/*    caption={"QUẢN LÝ PHÊ DUYỆT TRẢ NVL "}*/}
            {/*    key={"DnlnvlApproveRedundantManager"}*/}
            {/*/>*/}
            {/*<MenuItem*/}
            {/*    screenId={"screen.LocationRFIDManager"}*/}
            {/*    icon={<BarsOutlined />}*/}
            {/*    caption={"QUẢN LÝ LOCATION  "}*/}
            {/*    key={"LocationRFIDManager"}*/}
            {/*/>*/}
        </VerticalMenu>
    );
};
