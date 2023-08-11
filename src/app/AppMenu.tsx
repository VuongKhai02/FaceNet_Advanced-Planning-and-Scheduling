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
          // icon={<HomeFilled />}
          caption={"Quản lý đơn hàng"}
          key={"mrporders"}
        />

        <MenuItem
          screenId="Template"
          // icon={<ShoppingOutlined />}
          caption={"Quản lý mã QR lô sản phẩm"}
          key={"Content 2.2"}
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
          screenId=""
          caption={"Danh sách đề nghị lĩnh NVL"}
          key={"d"}
        />
      </SubMenuItem>

      <SubMenuItem caption={"Giám sát tiến độ"} icon={<AppstoreOutlined />}>
        <MenuItem
          screenId=""
          // icon={<HomeFilled />}
          caption={"Giám sát tiến độ sản xuất"}
          key={"e"}
        />

        <MenuItem
          screenId=""
          // icon={<ShoppingOutlined />}
          caption={"Giám sát tiến độ đơn hàng"}
          key={"f"}
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
