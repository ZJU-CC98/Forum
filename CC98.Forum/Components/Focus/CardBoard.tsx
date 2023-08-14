import * as React from "react";
import * as Utility from "../../Utility";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import { Collapse } from "antd";
const { Panel } = Collapse;


interface CardBoardState {
  data: any[]; 
}
const blankdata = [
  {
      "id": 763,
      "name": "置顶",
      "order": 1,
      "masters": [],
      "boards": [
          {
              "id": 758,
              "name": "似水流年·暑假",
          },
          {
              "id": 182,
              "name": "心灵之约",
          },
          {
              "id": 198,
              "name": "新生宝典·军训",
          },
          {
              "id": 184,
              "name": "论坛指南",
          }
      ]
  }]

const BoardPanel = (Data: any) => {
  return (
    <Panel
      header={<div style={{ color: "black" }}>{Data.name}</div>}
      key={Data.order}
      className="card-topic-area-left-content-collapse"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft:Data.order<=7?"25px":"0px",
        }}
      >
        {BoardPanelContent(Data.boards)}
      </div>
    </Panel>
  );
};
const BoardPanelContent = (Data: any) => {
  let WrapList = Data.map((item: any) => {
    return IsStringShort(item.name);
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      {Data.map((item: any,index:number) => {
        return (
          <div
            key={index}
            style={{
              width: WrapList[index] ? "100%" : "50%",
              paddingBottom: "4px",
              whiteSpace: "nowrap",
            }}
            className="card-topic-area-left-content-collapse-item"
          >
            <Link target={"_blank"} to={`/board/${item.id}`} style={{ fontSize: "14px" }}>· {item.name.replace("（", "(").replace("）", ")")}</Link>
          </div>
        );
      })}
    </div>
  );
};

//判定是否需要换行
const IsStringShort = (str: string) => {
  if (str.includes("（")) {
    //replace （） to ()
    str = str.replace("（", "(").replace("）", ")")
    return str.length > 8 ? true : false;
  }
  if (str.length > 7) {
    return true;
  } else {
    return false;
  }
};

export class CardBoard extends React.Component<{}, CardBoardState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { data: blankdata };
  }
  async componentDidMount() {
    let data = await Utility.getBoards();
    if(data != undefined||data != null)this.setState({ data: data });
    // console.log(this.state.data);
  }
  render() {
    return (
      <div className="">
        <Collapse defaultActiveKey={["1"]} bordered={false}>
          {this.state.data.map((item: any) => {
            return BoardPanel(item)
          })}
        </Collapse>
      </div>
    );
  }
}
