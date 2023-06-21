import React from 'react';
import {Chart, SeriesTemplate, CommonSeriesSettings, Title} from 'devextreme-react/chart';
import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  Connector,
  Export,
} from 'devextreme-react/pie-chart';
import './Chart.css'

import {data, injectMainStore} from "@haulmont/jmix-react-core";
import axios from "axios";
import {PLANNING_API_URL} from "../../config";
import {observer} from "mobx-react";

@injectMainStore
@observer
class WOLineChart extends React.Component<{ mainStore? }, { datasource }> {

  constructor(props) {
    super(props);
    this.state = {
      datasource: [{"key": "123", "val": 123}]
    }

    this.setDatasource = this.setDatasource.bind(this)
  }

  componentDidMount() {
    this.GetWorkOrderGroupByBranch();
  }

  GetWorkOrderGroupByBranch() {
    const headers = {
      'Authorization': 'Bearer ' + this.props.mainStore.authToken,
      'content-type': 'application/json'
    };
    axios.get(PLANNING_API_URL + '/services/api/workorder/list-wo-group-by-branch?woType=LINE', {headers})
      .then(response => {
          if (response.status === 200) {
            this.setState({datasource: response.data})
          }
        }
      );
  }

  setDatasource(data) {
    console.log(data)
    this.state = {datasource: data};
    console.log(this.state.datasource)
  }

  render() {
    if (this.state.datasource) {
      console.log(this.state.datasource)
      let dounutChart = <PieChart
        id="pie"
        type="doughnut"
        title="Số lượng Work Order theo nhóm Ngành"
        palette="Soft Pastel"
        dataSource={this.state.datasource}
      >
        <Series argumentField="key" valueField="value">
          <Label visible={true} customizeText={this.customizeText} format="fixedPoint">
            <Connector visible={true}/>
          </Label>
        </Series>
        <Export enabled={true} fileName="wo-branch-pie-chart"/>
        <Legend
          visible={true}
          margin={0}
          horizontalAlignment="center"
          verticalAlignment="bottom"

        />
        <Tooltip enabled={true} customizeTooltip={this.customizeTooltip}>

        </Tooltip>
      </PieChart>;
      let barChart = <Chart id="chart" dataSource={this.state.datasource} palette="Soft Pastel">
        <CommonSeriesSettings
          argumentField="key"
          valueField="value"
          type="bar"

          ignoreEmptyPoints={true}
        />
        <SeriesTemplate nameField="key" />
        <Export enabled={true} fileName="wo-branch-bar-chart"/>
        <Legend verticalAlignment="top"
                horizontalAlignment="center"
                itemTextPosition="right"
                visible={false}
        />
        <Tooltip
          enabled={true}
          customizeTooltip={this.customizeTooltip2}
        />
        {/*<Title*/}
        {/*  text="Age Breakdown of Facebook Users in the U.S."*/}
        {/*  subtitle="as of January 2017"*/}
        {/*/>*/}
      </Chart>
      return (
        <div >
          {/*<div style = {{width:"100%",textAlign:"center",paddingBottom: "30px"}}><div className="title-chart">Số lượng Work Order theo nhóm Ngành</div></div>*/}
          <div style={{width:"40%",float:"left"}}>
            {dounutChart}
          </div>
          <div style={{width:"50%",float:"right"}}>
            {barChart}
          </div>
        </div>
      )
    } else {
      return <div>NO_DATA</div>
    }
  };

  customizeTooltip(arg) {
    console.log(arg)
    return {
      text: `${arg.argumentText} - ${(arg.percent * 100).toFixed(2)}%`,
    };
  }
  customizeTooltip2(arg) {
    console.log(arg)
    return {
      text: `${arg.argumentText} - ${arg.originalValue} Work Order`,
    };
  }


  customizeText(point) {
    console.log("c")
    console.log(point)
    return `${point.argumentText}: ${point.valueText}`;
  }
}

export default WOLineChart;
