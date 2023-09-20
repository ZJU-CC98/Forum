import * as React from "react";
import * as Utility from "../../Utility";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import { Collapse } from "antd";
import { is } from "core-js/core/object";
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
    ScrollListener();
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


const ScrollListener = () => {
  // 滚动方向枚举值
  const DIRECTION_ENUM = {
    DOWN: "down",
    UP: "up",
  };

  let translateY = 0;

  // 记录前一个滚动位置
  let beforeScrollTop = 0;

  let side: HTMLElement | null = document.querySelector(
    ".card-topic-area-left-content"
  );


  function handleScroll() {
    // 距顶部
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    // 可视区高度
    let clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;


    // 确定滚动方向
    let direction = DIRECTION_ENUM.DOWN;
    if (beforeScrollTop > scrollTop) {
      direction = DIRECTION_ENUM.UP;
    }


    //判断sticky是否生效
    if (!side) {
      //side 不存在
      return;
    }
    if(side.offsetHeight < clientHeight){
      //如果左边栏高度小于可视区高度，不需要偏移
      side.style.transform = "none";
      return;
    }
    let isSticky = side.classList.toggle("sticky", scrollTop > 161.2); //161.2是计算后的值
    //为side 添加transition css
    if (isSticky) {
      switch (direction) {
        case DIRECTION_ENUM.DOWN:
          translateY -= scrollTop - beforeScrollTop;
          if (translateY < -(side.offsetHeight - clientHeight+40)) {
              translateY = -(side.offsetHeight - clientHeight+40);
          }
          break;
        case DIRECTION_ENUM.UP:
          translateY += beforeScrollTop - scrollTop;
          if (translateY > 0) {
            translateY = 0;
          }
          break;
        default:
          break;
      }
      side.style.transform = `translateY(${translateY}px)`;
    }
    else{
      translateY = 0;
      side.style.transform = "none";
    }
    beforeScrollTop = scrollTop;
  }

  // 监听滚动
  window.addEventListener('scroll', handleScroll);
}
