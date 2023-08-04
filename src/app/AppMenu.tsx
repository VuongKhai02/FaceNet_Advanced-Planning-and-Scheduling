import {MenuProps} from "antd";
import React from "react";
import {MenuItem, SubMenuItem, VerticalMenu} from "@haulmont/jmix-react-ui";
import {
  ApartmentOutlined,
  BarsOutlined,
  CalendarFilled,
  CalendarOutlined,
  FileExcelOutlined,
  HomeFilled,
  ShoppingFilled,
  ShoppingOutlined,
  SignalFilled,
  UploadOutlined
} from "@ant-design/icons";
import UserService from "../Keycloak";

export interface AppMenuProps extends MenuProps {
}

export const AppMenu = (props: AppMenuProps) => {


  return (// @ts-ignore
    <VerticalMenu {...props}>
      <MenuItem
        screenId="HomePage"
        icon={<HomeFilled/>}
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
          icon={<HomeFilled/>}
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
          screenId="techFormManager"
          icon={<HomeFilled/>}
          caption={"Danh sách phiếu công nghệ"}
          key={"techFormManager"}
        />

        <MenuItem
          screenId=""
          icon={<ShoppingOutlined />}
          caption={"Phê duyệt phiếu công nghệ"}
          key={"b"}
        />
      </SubMenuItem>
      <SubMenuItem caption={"Quản lý kế hoạch sản xuất"} icon={<ShoppingFilled />}>
        <MenuItem
          screenId=""
          icon={<HomeFilled/>}
          caption={"Danh sách kế hoạch sản xuất"}
          key={"c"}
        />

        <MenuItem
          screenId=""
          icon={<ShoppingOutlined />}
          caption={"Danh sách đề nghị lĩnh NVL"}
          key={"d"}
        />
      </SubMenuItem>
      <SubMenuItem caption={"Giám sát tiến độ"} icon={<ShoppingFilled />}>
        <MenuItem
          screenId=""
          icon={<HomeFilled/>}
          caption={"Danh sách phiếu công nghệ"}
          key={"e"}
        />

        <MenuItem
          screenId=""
          icon={<ShoppingOutlined />}
          caption={"Phê duyệt phiếu công nghệ"}
          key={"f"}
        />
      </SubMenuItem>
      <SubMenuItem caption={"Cảnh báo"} icon={<ShoppingFilled />}>
        <MenuItem
          screenId=""
          icon={<HomeFilled/>}
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
      <SubMenuItem caption={"Báo cáo, thống kê"} icon={<ShoppingFilled />}>
        <MenuItem
          screenId=""
          icon={<HomeFilled/>}
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
