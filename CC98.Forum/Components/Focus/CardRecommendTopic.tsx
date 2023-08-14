import * as React from "react";
import * as Utility from "../../Utility";
import { RandomTopicAreaState } from "../../States/RandomTopicAreaState";

/**
 * 表示侧边卡片可能错过主题列表
 */
export class CardRecommendTopic extends React.Component<{},  RandomTopicAreaState> {
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



  
  render(): React.ReactNode {
    return (
      <>
        <div className="card-recommendation-button-area">
          <div className="card-user-may-mising-title">可能错过了</div>
          <button
            className="card-recommendation-button"
            id="card-recommendation-refresh"
            style={{ height: "fit-content" }}
            //   onClick={() => this.getNewRandomRecommendedTopics()}
          >
            <i className="fa fa-refresh fa-md"></i>换一换
          </button>
          <button
            className="card-recommendation-button"
            id="card-recommendation-last"
            //   hidden={true}
            style={{ height: "fit-content" }}
            //   onClick={() => this.getLastRemcommendedTopics()}
          >
            <i className="fa fa-hand-o-left fa-md"></i>上一批
          </button>
        </div>
        <div className="card-recommendation-topic-container">
          <div className="card-recommendation-topic-container-item">
            <div className="card-recommendation-topic">
              <i
                className="fa fa-commenting-o"
                aria-hidden="true"
                // style={{  }}
              ></i>
              <div className="card-recommendation-topic-title">
                观十大有感，哎，可能要..hahiuuiwehuidfuwefui
              </div>
              <div className="card-recommendation-topic-detail">
                浏览1.4万 回复80
              </div>
            </div>
          </div>
        </div>
        <div className="card-recommendation-topic-container">
          <div className="card-recommendation-topic-container-item">
            <div className="card-recommendation-topic">
              <i className="fa fa-commenting-o" aria-hidden="true"></i>
              <div className="card-recommendation-topic-title">
                观十大有感，哎，可能要..
              </div>
              <div className="card-recommendation-topic-detail">
                浏览1.4万 回复80
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
