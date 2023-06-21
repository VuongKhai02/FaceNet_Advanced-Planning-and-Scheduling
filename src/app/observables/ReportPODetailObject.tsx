import React from "react"
import {makeAutoObservable} from "mobx"

export default class ReportPODetailObject {

  popupVisible: boolean = false;

  constructor() {
    makeAutoObservable(this)
  }

  setData(currenRow, workOrderStage, popupVisible, ssoGroups, ssoUsers) {
    this.popupVisible = popupVisible;
  }

  setPopupVisible(popupVisible) {
    this.popupVisible = popupVisible;
  }
}