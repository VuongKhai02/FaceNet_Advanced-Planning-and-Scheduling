import { MenuProps } from "antd";
import React from "react";
import { MenuItem, SubMenuItem, VerticalMenu } from "@haulmont/jmix-react-ui";
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BarsOutlined,
  CalendarFilled,
  CalendarOutlined,
  DashboardOutlined,
  FileExcelOutlined,
  FormOutlined,
  HomeFilled,
  ShoppingFilled,
  ShoppingOutlined,
  SignalFilled,
  UploadOutlined,
  UserOutlined,
  WarningOutlined
} from "@ant-design/icons";
import UserService from "../Keycloak";

export interface AppMenuProps extends MenuProps {
}

export const AppMenu = (props: AppMenuProps) => {


  return (// @ts-ignore
    <VerticalMenu {...props}>
      <MenuItem
        screenId="HomePage"
        icon={<HomeFilled />}
        caption={"screen.home"}
        key={"home"}
      />
      <MenuItem
        icon={<DashboardOutlined />}
        caption={"Dashboard"}
      />
      <SubMenuItem caption={"Quản lý thông tin"} icon={<AppstoreOutlined />}>
        <MenuItem
          screenId="MrpSaleOrders"
          caption={"Quản lý đơn hàng"}
          key={"mrporders"}
        />

        <MenuItem
          screenId="manageProductionRequirements"
          caption={"Quản lý yêu cầu sản xuất"}
          key={"manageProductionRequirements"}
        />
        <MenuItem
          screenId="cardManagement"
          caption={"Quản lý hộp chứa thẻ"}
          key={"cardManagement"}
        />
        <MenuItem
          screenId="manageJobOutput"
          caption={"Quản lý Job output"}
          key={"manageJobOutput"}
        />
      </SubMenuItem>
      <SubMenuItem caption={"Quản lý BOM"} icon={<AppstoreOutlined />}>
        <MenuItem
          screenId="bomBodyCard"
          caption={"Quản lý BOM body card"}
          key={"bomBodyCard"}
        />

        <MenuItem
          screenId="bomPersonalized"
          caption={"Quản lý BOM cá thể hóa"}
          key={"bomPersonalized"}
        />
      </SubMenuItem>
      <SubMenuItem caption={"Quản lý phiếu công nghệ"} icon={<AppstoreOutlined />}>
        <MenuItem
          screenId="techFormList"
          // icon={<HomeFilled />}
          caption={"Danh sách phiếu công nghệ"}
          key={"techFormList"}
        />

        <MenuItem
          screenId="techFormApprove"
          caption={"Phê duyệt phiếu công nghệ"}
          key={"techFormApprove"}
        />
      </SubMenuItem>
      <SubMenuItem caption={"Quản lý kế hoạch sản xuất"} icon={<AppstoreOutlined />}>
        <MenuItem
          screenId="productionPlanList"
          caption={"Danh sách kế hoạch sản xuất"}
          key={"productionPlanList"}
        />

        <MenuItem
          screenId="dnlNvlList"
          caption={"Danh sách đề nghị lĩnh NVL"}
          key={"dnlNvlList"}
        />

        <MenuItem
          screenId="declareProductionObject"
          caption={"Khai báo người/máy/lô sản xuất"}
          key={"dd"}
        />
        <MenuItem
          screenId="declareProductionInfor"
          caption={"Khai báo "}
          key={"declareProductionInfor"}
        />
      </SubMenuItem>

      <SubMenuItem caption={"Giám sát tiến độ"} icon={<AppstoreOutlined />}>
        <MenuItem
          screenId="progressMonitoringWO"
          caption={"Giám sát tiến độ WO"}
          key={"progressMonitoringWO"}
        />
        <MenuItem
          screenId="progressMonitoringManufacture"
          caption={"Giám sát tiến độ sản xuất"}
          key={"progressMonitoringManufacture"}
        />

        <MenuItem
          screenId="progressMonitoringOrder"
          caption={"Giám sát tiến độ đơn hàng"}
          key={"progressMonitoringOrder"}
        />
        <MenuItem
          screenId=""
          // icon={<ShoppingOutlined />}
          caption={"Giám sát máy"}
          key={"gsm"}
        />
        <MenuItem
          screenId=""
          // icon={<ShoppingOutlined />}
          caption={"Hàng chờ công đoạn"}
          key={"hc"}
        />
      </SubMenuItem>
      {/* user */}
      <SubMenuItem caption="Quản lý tài khoản" icon={<UserOutlined />}>

      </SubMenuItem>
      <SubMenuItem caption={"Cảnh báo"} icon={<WarningOutlined />}>
        <MenuItem
          screenId=""
          // icon={<HomeFilled />}
          caption={"Danh sách phiếu công nghệ"}
          key={"g"}
        />

        <MenuItem
          screenId=""
          // icon={<ShoppingOutlined />}
          caption={"Phê duyệt phiếu công nghệ"}
          key={"h"}
        />
      </SubMenuItem>
      <SubMenuItem caption={"Báo cáo, thống kê"} icon={<FormOutlined />}>
        <MenuItem
          screenId=""
          // icon={<HomeFilled />}
          caption={"Danh sách phiếu công nghệ"}
          key={"i"}
        />

        <MenuItem
          screenId=""
          // icon={<ShoppingOutlined />}
          caption={"Phê duyệt phiếu công nghệ"}
          key={"k"}
        />
      </SubMenuItem>

    </VerticalMenu>);
};
