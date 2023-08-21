import React from "react";
import ReactDOM from "react-dom";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { Citt1 } from "../../jmix/entities/Citt1";

export default class BomVersionProps {
    popupVisible: boolean = false;
    currentRow: any = null;
    bomVersion: any = null;

    constructor() {
        makeAutoObservable(this);
    }

    loadBomVersion(currenRow, bomVersion, popupVisible) {
        this.currentRow = currenRow;
        this.bomVersion = bomVersion;
        this.popupVisible = popupVisible;
    }

    setPopupVisible(popupVisible) {
        this.popupVisible = popupVisible;
    }
}
