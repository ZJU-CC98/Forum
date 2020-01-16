import React from "react";
import moment from "moment";
import "moment/locale/zh-cn";

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

moment.locale("zh-cn");

export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;
    
    let during = "深夜";
    if (data.postCount612 > data.postCount06) {
      during = "上午";
    }
    if (data.postCount1218 > data.postCount612) {
      during = "下午";
    }
    if (data.postCount1824 > data.postCount1218) {
      during = "晚上";
    }



    let max = data.postCount06;
    if (data.postCount612 > data.postCount06) {
      max = data.postCount612;
    }
    if (data.postCount1218 > data.postCount612) {
      max = data.postCount1218;
    }
    if (data.postCount1824 > data.postCount1218) {
      max = data.postCount1824;
    }

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
        {data.latestPostTime && (
          <div style={{marginTop: '5rem'}}>
            在{" "}
            <span className="annual-review-page2-hotTopicCount">
              {moment(data.latestPostTime).format("LL")}
            </span>
            这天
          </div>
        )}
        {data.latestPostTime && <div>你熬夜得最晚</div>}

        {data.latestPostTime && (
          <div>
            {" "}
            <span className="annual-review-page2-topicCount">
              {moment(data.latestPostTime).format("a h [点] mm [分]")}
            </span>
            还在98发言
          </div>
        )}
       
        <div style={{ marginTop: "1rem" }}>
          你最喜欢在<span className="annual-review-page1-during">{during}</span>
          水98
        </div>
        <div style={{ marginTop: "1rem", marginRight: "3rem" }}>
          <Chart
            width={document.body.clientHeight * 0.5}
            height={document.body.clientHeight * 0.3}
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
