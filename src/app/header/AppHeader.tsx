import { BellFilled, FullscreenOutlined, FullscreenExitOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Select, Space } from "antd";
import React, { useCallback } from "react";
import { observer } from "mobx-react";
import "./AppHeader.css";
import { useMainStore } from "@haulmont/jmix-react-core";
import { LanguageSwitcher } from "../../i18n/LanguageSwitcher";
import { useIntl } from "react-intl";
import JmixLightIcon from "../icons/JmixLightIcon";
import { modals } from "@haulmont/jmix-react-ui";
import RdIcon from "../icons/RdIcon";
import UserService from "../../Keycloak";

const AppHeader = observer(({ children }: { children?: React.ReactNode }) => {
  const intl = useIntl();
  const mainStore = useMainStore();
  const [selectedLanguage, setSelectedLanguage] = React.useState('vi');
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      enterFullScreen();
    } else {
      exitFullScreen();
    }
  };

  const enterFullScreen = () => {
    setIsFullScreen(true);
    document.documentElement.requestFullscreen();
  };
  const exitFullScreen = () => {
    setIsFullScreen(false);
    document.exitFullscreen();
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event);
  };
  const avatarImage = selectedLanguage === 'en'
    ? 'assets/images/GreatBritainFlag.png'
    : 'assets/images/VietNamFlag.png';

  const showLogoutConfirm = useCallback(() => {
    modals.open({
      content: intl.formatMessage({ id: "header.logout.areYouSure" }),
      okText: intl.formatMessage({ id: "header.logout.ok" }),
      cancelText: intl.formatMessage({ id: "header.logout.cancel" }),
      onOk: () => UserService.doLogout()
    });
  }, [mainStore, intl]);


  return (
    <div className="app-header">
      {/* <RdIcon ></RdIcon> */}
      <div className="app-header__content">{children}</div>
      {/* <div className="app-header__user-panel__logout-btn" style={{ fontSize: "20px", flexGrow: 1 }}>Advanced Planning and Scheduling</div> */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 50 }}>
        <Avatar size={30} icon={<img src="assets/images/GirlImage.jpg" alt="Avatar" />} />
        <div style={{ flexDirection: "column", marginLeft: 10 }}>
          <div style={{ fontSize: 14 }}>Xin chào</div>
          <div style={{ marginTop: 14, fontSize: 16 }}>{'Nguyễn Minh Sơn'}</div>
        </div>
      </div>
      <Space align="center">
        <Avatar size={30} icon={<img src={avatarImage} alt="Avatar" />} />
        <Select bordered={false} style={{ width: 120, marginRight: 20 }} value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
        </Select>
      </Space>
      {/* <FullscreenOutlined style={{ fontSize: 20, marginRight: 20, cursor: 'pointer' }} /> */}
      <Space style={{ marginRight: 20 }}>
        {isFullScreen ? (
          <FullscreenExitOutlined
            className="fullscreen-icon"
            onClick={toggleFullScreen}
          />
        ) : (
          <FullscreenOutlined
            className="fullscreen-icon"
            onClick={toggleFullScreen}
          />
        )}
      </Space>
      {/* <BellFilled style={{ fontSize: 20, cursor: 'pointer' }} /> */}
      <Badge count={9} overflowCount={99} offset={[5, -10]}>
        <BellFilled style={{ fontSize: '21px', color: '#CCCCCC' }} />
      </Badge>
      <Space className="app-header__user-panel">
        <LanguageSwitcher className="language-switcher -header" />
        <span className={"app-header__user-panel__logout-btn"}>{mainStore.userName}</span>


        <Button
          id="button_logout"
          className="app-header__user-panel__logout-btn"
          type="text"
          icon={<LogoutOutlined />}
          onClick={showLogoutConfirm}
        />
      </Space>
    </div>
  );
});

export default AppHeader;
