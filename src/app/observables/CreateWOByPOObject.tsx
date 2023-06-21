import {makeAutoObservable} from "mobx";

export default class CreateWOByPOObject{

  popupVisible:boolean = false
  currentRow:any = null;
  productItems:any[] = []
  productOrder:any = null;

  constructor() {
    makeAutoObservable(this)
  }



  setPopupVisible(popupVisible){
    this.popupVisible = popupVisible;
  }

  setData(popupVisible,currentRow,productItems,productOrder){
    this.popupVisible = popupVisible;
    this.currentRow = currentRow;
    this.productItems = productItems;
    this.productOrder = productOrder;
  }
}