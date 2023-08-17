import { MenuProps } from "antd";
import React from "react";
import { MenuItem, SubMenuItem, VerticalMenu } from "@haulmont/jmix-react-ui";
import {
  ApartmentOutlined,
  BarsOutlined,
  CalendarFilled,
  CalendarOutlined,
  FileExcelOutlined,
  FormOutlined,
  HomeFilled,
  ShoppingFilled,
  ShoppingOutlined,
  SignalFilled,
  UploadOutlined,
  UserOutlined
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
      {/*<MenuItem*/}
      {/*  screenId="Warnings"*/}
      {/*  icon={<HomeFilled/>}*/}
      {/*  caption={"Content 1"}*/}
      {/*  key={"Content 1"}*/}
      {/*/>*/}
      <SubMenuItem caption={"Quản lý thông tin"} icon={<ShoppingFilled />}>
        <MenuItem
          screenId="MrpSaleOrders"
          icon={<HomeFilled />}
          caption={"Quản lý đơn hàng"}
          key={"mrporders"}
        />

        <MenuItem
          screenId="Template"
          icon={<ShoppingOutlined />}
          caption={"Quản lý mã QR lô sản phẩm"}
          key={"Content 2.2"}
        />
      </SubMenuItem>
      <SubMenuItem caption={"Quản lý phiếu công nghệ"} icon={<ShoppingFilled />}>
        <MenuItem
          screenId="techFormList"
          icon={<HomeFilled />}
          caption={"Danh sách phiếu công nghệ"}
          key={"techFormList"}
        />

        <MenuItem
          screenId="techFormApprove"
          icon={<ShoppingOutlined />}
          caption={"Phê duyệt phiếu công nghệ"}
          key={"techFormApprove"}
        />
      </SubMenuItem>
      <SubMenuItem caption={"Quản lý kế hoạch sản xuất"} icon={<ShoppingFilled />}>
        <MenuItem
          screenId=""
          icon={<HomeFilled />}
          caption={"Danh sách kế hoạch sản xuất"}
          key={"c"}
        />

        <MenuItem
          screenId=""
          icon={<ShoppingOutlined />}
          caption={"Danh sách đề nghị lĩnh NVL"}
          key={"d"}
        />

        <MenuItem
          screenId="declareProductionObject"
          icon={<HomeFilled />}
          caption={"Khai báo người/máy/lô sản xuất"}
          key={"dd"}
        />
      </SubMenuItem>
      <SubMenuItem caption={"Giám sát tiến độ"} icon={<ShoppingFilled />}>
        <MenuItem
          screenId="productionProgressList"
          icon={<HomeFilled />}
          caption={"Giám sát tiến độ sản xuất"}
          key={"e"}
        />

        <MenuItem
          screenId=""
          icon={<ShoppingOutlined />}
          caption={"Giám sát tiến độ đơn hàng"}
          key={"f"}
        />
        <MenuItem
          screenId=""
          icon={<ShoppingOutlined />}
          caption={"Giám sát máy"}
          key={"gsm"}
        />
        <MenuItem
          screenId=""
          icon={<ShoppingOutlined />}
          caption={"Hàng chờ công đoạn"}
          key={"hc"}
        />
      </SubMenuItem>
      {/* user */}
      <SubMenuItem caption="Quản lý tài khoản" icon={<UserOutlined />}>

      </SubMenuItem>
      <SubMenuItem caption={"Cảnh báo"} icon={<ShoppingFilled />}>
        <MenuItem
          screenId=""
          icon={<HomeFilled />}
          caption={"Danh sách phiếu công nghệ"}
          key={"g"}
        />

        <MenuItem
          screenId=""
          icon={<ShoppingOutlined />}
          caption={"Phê duyệt phiếu công nghệ"}
          key={"h"}
        />
      </SubMenuItem>
      <SubMenuItem caption={"Báo cáo, thống kê"} icon={<FormOutlined />}>
        <MenuItem
          screenId=""
          icon={<HomeFilled />}
          caption={"Danh sách phiếu công nghệ"}
          key={"i"}
        />

        <MenuItem
          screenId=""
          icon={<ShoppingOutlined />}
          caption={"Phê duyệt phiếu công nghệ"}
          key={"k"}
        />
      </SubMenuItem>

    </VerticalMenu>);
};
