import React, {useEffect, useState} from "react";
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import ButtonGroup, { Item as ButtonItem } from 'devextreme-react/button-group';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
// import {useAppDispatch, useAppSelector} from "../../config/store";

import {Button, DataGrid, Popup} from "devextreme-react";
import {
  Column,
  FilterRow,
  HeaderFilter,
  Item as ToolbarItem,
  Pager,
  Paging,
  SearchPanel,
  // Toolbar,

} from "devextreme-react/data-grid";
import axios from "axios";
import {PLANNING_API_URL} from "../../config";
import {useMainStore} from "@haulmont/jmix-react-core";
import {registerScreen} from "@haulmont/jmix-react-ui";
import { Link } from "devextreme-react/sankey";
import {print, str} from "../../utils/utils";
import {IWarning} from "../shared/model/Warning.model";

const ROUTING_PATH = "/template";

export const ConfigTemplate = () => {

  // const loading = useAppSelector(selectLoading);
  const [warnings, setWarnings] = useState<[]>();
  const [token, setToken] = useState<string>("");
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)
  const [currentWarning, setCurrentWarning] = useState<IWarning>()

  const mainStore = useMainStore();


  function renderWaringDetail(data: any) {
    return <div>
      {/*data.data.id*/}
      <Button icon="search" onClick={setPopUpOpen}/>
    </div>
  }

  const refresh = async () => {
    // await loadPartNumber();
  };


  const onSelectedRowKeysChange = (e) => {
    if (e.data) {
      setCurrentWarning(e.data)
    }
  }
  const setPopUpOpen = () => {
    setPopupIsOpen(true);
    refresh();
  }
  const setPopUpClose = () => {
    setPopupIsOpen(false);
    refresh();
  }

  useEffect(() => {
    // loadWarnings()
  }, [])

  // const contenRender = (data) => {
  //   print("------------------------------------")
  //   // return <WarningDetail warningDetail={currentWarning} />
  // }

  return <div>
    {/*<input type="text" value={token} onChange={(e) => setToken(e.target.value)}/>*/}
    {/*<button onClick={() => dispatch(getWarnings(token))}>Get Warnings</button>*/}
    <div className="table-responsive">
      <div className="informer" style={{
        background: "#fff",
        textAlign: "center",
        paddingTop: 12
      }}>
        <h5 className="name" style={{
          fontSize: 18,
          marginBottom: 0
        }}>CẤU HÌNH THÔNG BÁO TELEGRAM</h5>
      </div>
      <div className="informer" style={{
        backgroundColor: "#ffffff",
        paddingLeft: 13
      }}>
        <h5 className="name" style={{
          color: "rgba(0, 0, 0, 0.7)",
          marginBottom: 0,
          fontSize: 15,
          boxSizing: "border-box",
          fontWeight: 550
        }}>Cấu hình thông báo nhận telegram</h5>
      </div>
      <div className="widget-container">
        <HtmlEditor
          height={300}
          // defaultValue={""}
          // valueType={""}
          // onValueChanged={this.valueChanged}
        >
          <Toolbar>
            <Item name="undo" />
            <Item name="redo" />
            <Item name="separator" />
            <Item
              name="size"
              // acceptedValues={sizeValues}
            />
            <Item
              name="font"
              // acceptedValues={fontValues}
            />
            <Item name="separator" />
            <Item name="bold" />
            <Item name="italic" />
            <Item name="strike" />
            <Item name="underline" />
            <Item name="separator" />
            <Item name="alignLeft" />
            <Item name="alignCenter" />
            <Item name="alignRight" />
            <Item name="alignJustify" />
            <Item name="separator" />
            <Item name="color" />
            <Item name="background" />
          </Toolbar>
        </HtmlEditor>

        <div className="options">
          <ButtonGroup
            // onSelectionChanged={this.valueTypeChanged}
            // defaultSelectedItemKeys={defaultSelectedItemKeys}
          >
            <ButtonItem text="Html" />
            <ButtonItem text="Markdown" />
          </ButtonGroup>
          <div className="value-content">
            {/*{this.prettierFormat(valueContent)}*/}
          </div>
        </div>
      </div>
    </div>
    </div>
}

registerScreen({
  component: ConfigTemplate,
  caption: "Cấu hình telegram",
  screenId: "Template",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default ConfigTemplate;