import React, { useEffect, useState } from "react";
import { LoadPanel } from 'devextreme-react/load-panel';

export const LoadingPanel = () => {

  return <LoadPanel
    shadingColor="rgba(0,0,0,0.4)"
    // onHiding={this.hideLoadPanel}
    // visible={this.state.loadPanelVisible}
    showIndicator={true}
    shading={true}
    showPane={false}
    closeOnOutsideClick={false}
    message="Đang tải..."
  />
}