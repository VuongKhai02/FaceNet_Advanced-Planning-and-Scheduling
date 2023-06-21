// import { useAppDispatch, useAppSelector } from "../config/store";
import React, {useEffect} from "react";
// import { getWarningDetail, selectWarningDetail } from "./warning.reducer";
// import { IWarning } from "../shared/model/Warning.model";

const WarningDetail = ({warningDetail}) => {
  // const dispatch = useAppDispatch();
  // const { id } = useParams<{ id: string }>();
  // const warningDetail = useAppSelector<IWarning>(selectWarningDetail)
  useEffect(() => {
    // dispatch(getWarningDetail(id));
  }, []);
  // function replaceEnter(input: string) {
  //     return input.replaceAll("\n", "<br />");
  // }
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

  function replaceEnter(input: string) {
    return replaceAll(input, "\n", "<br/>");
  }

  function formatBeauty(input: string) {
    return replaceAll(input, ": ", ":\t");
  }

  return <>
    <div style={{height: "100%"}}>
      {/*{JSON.stringify(warningDetail)}*/}
      <div style={{
        height: "100%",
        display: "flex",
        backgroundColor: 'white',
        justifyContent: 'center'
      }}>
        {/*<Form style={{width:'45%'}} colCount={3} alignItemLabels={true}>*/}
        {/*  <SimpleItem colSpan={3}>*/}
        <div style={{
          width: '48%',
          height: "100%",
          border: "1px solid rgba(0, 0, 0, 0.3)",
          padding: "8px 16px",
          marginTop: "8px",
          margin:'8px',
          borderRadius: "16px",
          position: "relative"
        }}>
                    <span style={{
                      margin:'3px',
                      background: "#fff",
                      position: "absolute",
                      top: -10,
                      left: 30,
                      padding: "0 8px"
                    }}><b>Nội dung cảnh báo</b></span>

          <table width={"100%"}>
            <div dangerouslySetInnerHTML={{__html: replaceEnter(warningDetail.content)}}/>
          </table>
        </div>
        {/*</SimpleItem>*/}
        {/*</Form>*/}
        {/*<Form style={{width:'45%', height:'100%'}} colCount={3} alignItemLabels={true}>*/}
        {/*  <SimpleItem colSpan={3}>*/}
        <div style={{
          width:'48%',
          height: "100%",
          border: "1px solid rgba(0, 0, 0, 0.3)",
          padding: "8px 16px",
          marginTop: "8px",
          margin:'8px',
          borderRadius: "16px",
          position: "relative"
        }}>
                    <span style={{

                      background: "#fff",
                      position: "absolute",
                      top: -10,
                      left: 30,
                      padding: "0 8px"
                    }}><b>Hình ảnh cảnh báo</b></span>

          <table width={"100%"} style={{height: '100%'}}>
          </table>
        </div>
        {/*</SimpleItem>*/}
        {/*</Form>*/}
        <br/>
        <br/>
      </div>
    </div>
  </>
}

export default WarningDetail;