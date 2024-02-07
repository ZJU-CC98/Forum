import React from "react";
import { Tag } from "antd";
import QueueAnim from "rc-queue-anim";
export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;
    const achievements = data.achievement.split("|");
    const colors = ["magenta", "volcano", "gold", "lime"];
    return (
      <div>
        <QueueAnim className="demo-page" key="page" type="bottom" delay={800}>
          <div key="annual-page8-1">你获得了以下成就：</div>
          <QueueAnim className="demo-page" key="annual-page8-2" type="bottom">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "0.5rem",
                marginLeft: "1rem",
                marginRight: "1rem",
                flexWrap: "wrap",
              }}
            >
              {achievements.map((item, index) => (
                <Tag
                  style={{
                    fontSize: "2vh",
                    height: "3vh",
                    lineHeight: "2.5vh",
                    marginBottom: "0.5rem",
                  }}
                  key={`tag-${index}`}
                  color={colors[index % 4]}
                >
                  {item}
                </Tag>
              ))}
            </div>
          </QueueAnim>
          <div style={{ marginTop: "2rem" }} key="annual-page8-3">
            在新春佳节到来之际，
          </div>
          <div key="annual-page8-4">CC98论坛祝你：</div>
          <div key="annual-page8-5">
            <span className="annual-review-page6-congratulation">身体健康</span>
          </div>
          <div key="annual-page8-6">
            <span className="annual-review-page6-congratulation">
              学习生活顺利
            </span>
          </div>
          <div key="annual-page8-7">
            <span className="annual-review-page6-congratulation">幸福2024</span>
          </div>
          <img
            key="annual-page8-8"
            src="/static/images/annual-review/bg-2023.png"
            style={{ marginLeft:"-50px"}}
          />
        </QueueAnim>
      </div>
    );
  }
}
