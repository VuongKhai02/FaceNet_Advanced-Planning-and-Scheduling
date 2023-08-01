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
          caption={"Content 2.2"}
          key={"Content 2.2"}
        />
      </SubMenuItem>

    </VerticalMenu>);
};
