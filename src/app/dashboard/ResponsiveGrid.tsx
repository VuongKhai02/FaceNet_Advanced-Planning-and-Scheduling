import ResponsiveBox, {
  Row,
  Col,
  Item,
  Location
} from "devextreme-react/responsive-box";
import React, {useEffect, useState} from "react";
import ChartImage from "./ChartImage";

const screen = (width) => {
  return width < 900 ? "sm" : "lg";
}

export const ResponsiveGrid = (props: any) => {


  useEffect(() => {
  },[props])
   return (
    <div id="page">
      <ResponsiveBox singleColumnScreen="sm" screenByWidth={screen} >
        <Row ratio={1}></Row>
        <Row ratio={2}></Row>
        <Row ratio={1}></Row>
        <Row ratio={1}></Row>

        <Col ratio={1}></Col>
        <Col ratio={1}></Col>
        <Item>
          <Location row={0} col={0} screen="lg"></Location>
          <Location row={0} col={0} screen="sm"></Location>
          <div >
            <ChartImage imgSrc={"image/dash/1.png"}/>
          </div>
        </Item>
        <Item>
          <Location row={0} col={1} screen="lg"></Location>
          <Location row={1} col={0} colspan={2} screen="sm"></Location>
          <div className="footer item">
            <ChartImage imgSrc={"image/dash/2.png"}/>
          </div>
        </Item>
        <Item>
          <Location row={1} col={0} screen="lg"></Location>
          <Location row={2} col={0} screen="sm"></Location>
          <div className="left-side-bar item">
            <ChartImage imgSrc={"image/dash/3.png"}/>
          </div>
        </Item>
        <Item>
          <Location row={1} col={1} screen="lg"></Location>
          <Location row={2} col={1} screen="sm"></Location>
          <div className="right-side-bar item">
            <ChartImage imgSrc={"image/dash/4.png"}/>
          </div>
        </Item>
        <Item>
          <Location row={2} col={0} screen="lg"></Location>
          <Location row={2} col={1} screen="sm"></Location>
          <div className="right-side-bar item">
            <ChartImage imgSrc={"image/dash/5.png"}/>
          </div>
        </Item>
        <Item>
          <Location row={2} col={1} screen="lg"></Location>
          <Location row={2} col={1} screen="sm"></Location>
          <div className="right-side-bar item">
            <ChartImage imgSrc={"image/dash/6.png"}/>
          </div>
        </Item>
        {/*<Item>*/}
        {/*  <Location row={3} col={0} colspan={3} screen="lg"></Location>*/}
        {/*  <Location row={4} col={0} colspan={2} screen="sm"></Location>*/}
        {/*  <div className="footer item">*/}
        {/*    <PODetailGroupByProductBarChart data = {dataGroupByProduct}/>*/}
        {/*  </div>*/}
        {/*</Item>*/}
      </ResponsiveBox>
    </div>
  );
}

