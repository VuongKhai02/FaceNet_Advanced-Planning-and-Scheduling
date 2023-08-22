import React from "react";
import Icon from "@ant-design/icons";
import SvgIcon from "./SvgIcon/SvgIcon";


const RdIcon = (props: any) => (
  // <Icon component={() => (<img src="assets/images/Logo_FacenetTech.png" style={{ paddingLeft: "10px", width: 60 }} />)} {...props} />
  <Icon className="app-header_logo" component={() => <SvgIcon sizeIcon={45} icon="assets/icons/LogoFaceNet.svg" />} {...props} />
);
export default RdIcon;