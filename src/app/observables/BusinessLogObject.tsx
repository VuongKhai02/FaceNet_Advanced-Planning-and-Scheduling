import { makeAutoObservable } from "mobx";

export default class BusinessLogObject {
    popupVisible: boolean = false;
    woId: any = null;

    constructor() {
        makeAutoObservable(this);
    }

    setData(woId, popupVisible) {
        this.woId = woId;
        this.popupVisible = popupVisible;
    }

    setPopupVisible(popupVisible) {
        this.popupVisible = popupVisible;
    }
}
