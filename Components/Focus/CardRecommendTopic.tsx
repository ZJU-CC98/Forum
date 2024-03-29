import * as React from "react";
import * as Utility from "../../Utility";
import { RandomTopicAreaState } from "../../States/RandomTopicAreaState";
import { Link } from "react-router-dom";

/**
 * 表示侧边卡片可能错过主题列表
 */
export class CardRecommendTopic extends React.Component<
  {},
  RandomTopicAreaState
> {
  isLoadable: boolean;
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    let data = [];
    this.state = { data: data };
    this.isLoadable = true;
  }

  /**
   * 进入立即获取10条随机近期主题的数据
   */
  async componentDidMount() {
    let data = Utility.getStorage("CurrentRandomTopics");
    // debugger;
    if (data === undefined || data === null || data === "undefined") {
      console.log("data is null");
      this.isLoadable = false;
      try {
        console.log("try to get data");
        data = await Utility.getRandomTopic(10);
      } catch (err) {
        this.isLoadable = true;
        return;
      }
      Utility.setStorage("CurrentRandomTopics", data);
      this.setState({ data: data });
      this.isLoadable = true;
    } else {
      this.setState({ data: data });
    }
    console.log(data);
  }

  async getNewRandomTopics() {
    if (this.isLoadable) {
      this.isLoadable = false;
      try {
        var newData = await Utility.getRandomTopic(10);
      } catch (err) {
        this.isLoadable = true;
        return;
      }
      Utility.setStorage(
        "LastRandomTopics",
        Utility.getStorage("CurrentRandomTopics")
      );
      Utility.setStorage("CurrentRandomTopics", newData);
      this.setState({ data: newData });
      // document.getElementById("card-recommendation-last").hidden = false;
      //change css visibility
      document.getElementById("card-recommendation-last").style.visibility = "visible";
      this.isLoadable = true;
    }
  }

  async getLastRandomTopics() {
    let data = Utility.getStorage("LastRandomTopics");
    if (data != undefined || data != null || data != "undefined") {
      // document.getElementById("card-recommendation-last").hidden = true;
      document.getElementById("card-recommendation-last").style.visibility = "hidden";
      this.setState({ data: data });
      Utility.setStorage("CurrentRandomTopics", data);
      Utility.removeStorage("LastRandomTopics");
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <div className="card-recommendation-button-area">
          <div className="card-user-may-mising-title">可能错过</div>
          <button
            className="card-recommendation-button"
            id="card-recommendation-last"
            style={{ height: "fit-content", visibility: "hidden", paddingRight: "0", marginRight: "0", marginLeft: "50px" }}
            onClick={() => this.getLastRandomTopics()}
          >
            <i className="fa fa-hand-o-left fa-md"></i>上一批
          </button>
          <button
            className="card-recommendation-button"
            id="card-recommendation-refresh"
            style={{ height: "fit-content", marginRight: "12px" }}
            onClick={() => this.getNewRandomTopics()}
          >
            <i className="fa fa-refresh fa-md"></i>换一换
          </button>
        </div>
        {this.state.data != undefined || this.state.data != null
          ? CardRecommendTopicSingle(this.state.data)
          : ""}
      </>
    );
  }
}

const CardRecommendTopicSingle = (Data: any) => {
  return Data.map((item: any, index: number) => {
    return (
      <div className="card-recommendation-topic-container">
        <div className="card-recommendation-topic-container-item">
          <div className="card-recommendation-topic">
            <i
              className="fa fa-commenting-o"
              aria-hidden="true"
            // style={{  }}
            ></i>
            <div className="card-recommendation-topic-title">
              <Link to={`/topic/${item.id}`} target={"_blank"}>{StringCutOff(item.title)}</Link>
            </div>
            <div className="card-recommendation-topic-detail">
              <Link target={"_blank"} to={`/board/${item.boardId}`}>{item.boardName}&nbsp;</Link> {item.hitCount}浏览 {item.replyCount}回复
            </div>
          </div>
        </div>
      </div>
    );
  });
};
//用于截断过长的标题
//经验值 取24个字符
const StringCutOff = (str: string) => {
  if (str.length > 30) {
    return str.slice(0, 28) + "...";
  } else {
    return str;
  }
};
