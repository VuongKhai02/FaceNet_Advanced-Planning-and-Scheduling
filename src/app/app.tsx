import React, { useEffect, useState } from "react";
import { Button, Layout, Space } from "antd";
import { observer } from "mobx-react";
import AppHeader from "./header/AppHeader";
import { ContentArea } from "@haulmont/jmix-react-ui";
import { useMainStore, Router } from "@haulmont/jmix-react-core";
import CenteredLoader from "./CenteredLoader";
import { AppMenu } from "./AppMenu";
import "../routing";
import "./App.css";
// import "./theme.less"
import "./custom-theme.css"
import 'devextreme/dist/css/dx.light.css';

const routes = {
  "/": <ContentArea />, "/:entityName/:entityId?": <ContentArea />
};

const App = observer(() => {
  const mainStore = useMainStore();
  const { initialized, locale, loginRequired } = mainStore;
  const { Footer } = Layout;
  if (!initialized || !locale) {
    return <CenteredLoader />;
  }

  // if (loginRequired) {
  //   return (
  //     <>
  //     <Centered>
  //       <Login/>
  //     </Centered>
  //     </>
  //   );
  // }

  //xu ly su kien scroll
  window.addEventListener("scroll", ev => {
    let header = document.querySelector("Header");
    if (header) header.classList.toggle("ant-layout-header-sticky", window.scrollY > 0)
  })

  // {
  //   const scrollTop = () =>
  //     window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //   const header = document.querySelector("header");
  //   if (header && window.innerWidth > 768) {
  //     document.addEventListener("scroll", function () {
  //       if (scrollTop() > header.offset().top - 70) header.style.position = "sticky";
  //       else header.style.position = "";
  //     });
  //   }
  // }

  // const offsetElement = document.querySelector("header");
  // if (window.innerWidth > 768 && offsetElement) {
  //   const offsetTop = offsetElement.offsetTop;
  //   document.addEventListener("scroll", function () {
  //     const scrollTop = window.pageYOffset || this.documentElement.scrollTop || this.body.scrollTop || 0;
  //     const menu = document.querySelector("header");
  //     if (scrollTop > offsetTop - 70) menu.classList.add("sticky");
  //     else menu.classList.remove("sticky");
  //   });
  // }

  return (<Layout className="main-layout">
    <Layout.Header style={{ position: 'fixed', zIndex: 1000, width: '100%' }}>
      <AppHeader />
    </Layout.Header>
    <Layout className="layout-container" style={{ marginTop: 60 }}>
      <Layout.Sider
        width={283}
        breakpoint="sm"
        collapsedWidth={'50'}
        className="layout-sider"
        collapsible={true}
        // style={{backgroundColor: "#BEBEBE"}}
        // theme={"dark"}
      >
        <AppMenu inlineCollapsed={true} mode={"inline"}
                 // style={{ height: "100%" }}
                 // theme={"dark"}
                 style={{backgroundColor: "#BEBEBE", fontSize: "16px"}}
        />
      </Layout.Sider>

      <Layout className="layout-content">
        <Layout.Content>
          <Router global routes={routes} />

        </Layout.Content>
      </Layout>
    </Layout>
    <Footer style={{ textAlign: 'center' }}>
      <div className="container">
        <div className="copyright">
          © Copyright <strong>Facenet</strong>. All Rights Reserved
        </div>
        <div className="credits">

          Designed by <a href="https://facenet.vn/">Facenet</a>
        </div>
      </div>
    </Footer>
  </Layout>);
});

export default App;
