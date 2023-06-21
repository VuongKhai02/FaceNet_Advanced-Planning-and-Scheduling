import React from "react"
import { makeAutoObservable } from "mobx"

export default class StageObserverObject {

  popupVisible:boolean = false;
  currentRow:any = null;
  workOrderStage:any = null;
  ssoGroups:any[] = []
  ssoUsers:any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setData(currenRow,workOrderStage,popupVisible,ssoGroups,ssoUsers) {
    this.currentRow = currenRow;
    this.workOrderStage = workOrderStage;
    this.popupVisible = popupVisible;
    this.ssoGroups = ssoGroups;
    this.ssoUsers = ssoUsers;
  }

  setPopupVisible(popupVisible){
    this.popupVisible = popupVisible;
  }
}