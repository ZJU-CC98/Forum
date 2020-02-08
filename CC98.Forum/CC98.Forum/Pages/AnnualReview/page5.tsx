import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

export default class extends React.Component<{ data }> {
  getBoardUrlById(boardId) {
    return "/board/" + boardId;
  }

  render() {
    const { data } = this.props;

    //最爱水98的时间段
    let during = null;
    if (data.postCount06 > 0) {
      during = "深夜";
    }
    if (
      data.postCount612 > data.postCount06 &&
      data.postCount612 > data.postCount1218 &&
      data.postCount612 > data.postCount1824
    ) {
      during = "上午";
    }
    if (
      data.postCount1218 > data.postCount06 &&
      data.postCount1218 > data.postCount612 &&
      data.postCount1218 > data.postCount1824
    ) {
      during = "下午";
    }
    if (
      data.postCount1824 > data.postCount06 &&
      data.postCount1824 > data.postCount1218 &&
      data.postCount1824 > data.postCount612
    ) {
      during = "晚上";
    }

    //柱状图用数据
    const postData = [
      { time: "上午", posts: data.postCount612 },
      { time: "下午", posts: data.postCount1218 },
      { time: "晚上", posts: data.postCount1824 },
      { time: "深夜", posts: data.postCount06 }
    ];
    const cols = {
      posts: {
        alias: "帖数"
      }
    };
    return (
      <div className="annual-review-page">
        {during && (
          <div style={{ marginTop: "7rem", marginBottom: "-2rem" }}>
            你最喜欢在
            <span className="annual-review-page1-during">{during}</span>
            水98。
          </div>
        )}

        <div style={{ marginTop: "3rem" }}>你发言的时间段统计如下：</div>

        <div style={{ marginTop: "1rem", marginRight: "2rem" }}>
          <Chart
            width={document.body.clientHeight * 0.5}
            height={document.body.clientHeight * 0.35}
            data={postData}
            scale={cols}
            forceFit
          >
            <Axis name="time" />
            <Axis name="posts" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="time*posts" />
          </Chart>
        </div>
      </div>
    );
  }
}
