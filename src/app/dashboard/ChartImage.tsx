import React from "react";
import Icon from "@ant-design/icons";

const ChartImage = (props: any) => (
    <Icon component={() => <img src={props.imgSrc} style={{ width: "840px", height: "530px", paddingBottom: "25px" }} />} {...props} />
);
export default ChartImage;
