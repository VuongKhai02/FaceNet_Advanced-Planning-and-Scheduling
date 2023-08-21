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
import HomePage from "./home/HomePage";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const routes = {
  "/": <HomePage />, "/:entityName/:entityId?": <ContentArea />
};

const App = observer(() => {
  const mainStore = useMainStore();
  const { initialized, locale, loginRequired } = mainStore;
  const [collapsed, setCollapsed] = React.useState<boolean>(false);

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


  return (<Layout className="main-layout">
    <Layout.Header style={{ position: 'fixed', zIndex: 1000, width: '100%' }}>
      <AppHeader >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            color: '#fff',
            marginLeft: 40
          }}
        />
      </AppHeader>
    </Layout.Header>

    <Layout className="layout-container" style={{ marginTop: 60 }}>
      <Layout.Sider
        width={280}
        breakpoint="sm"
        collapsedWidth={'50'}
        className="layout-sider"
        // collapsible={true}
        collapsed={collapsed}
        // style={{backgroundColor: "#BEBEBE"}}
        theme={"dark"}
      >

        <AppMenu mode={"inline"}
          inlineCollapsed={true}
          // style={{ height: "100%" }}
          // theme={"dark"}
          style={{ backgroundColor: "#BEBEBE", fontSize: "16px" }}
        />
      </Layout.Sider>

      <Layout className="layout-content">
        <Layout.Content>
          <Router global routes={routes} />
        </Layout.Content>
      </Layout>
    </Layout>
    <Footer style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="container">
        <div className="copyright">
          © Copyright <strong>Facenet</strong>. All Rights Reserved &nbsp;
        </div>
        <div className="credits">
          Designed by <a href="https://facenet.vn/">Facenet</a>
        </div>
      </div>
    </Footer>
  </Layout>);
});

export default App;
