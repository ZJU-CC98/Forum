import React from "react";
import { Tag } from "antd";
export default class extends React.Component<{ data }> {
  render() {
    const { data } = this.props;
    const achievements = data.achievement.split("|");
    const colors = ["magenta", "volcano", "gold", "lime"];
    return (
      <div className="annual-review-page">
        <div>你获得了以下成就：</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {achievements.map((item, index) => (
            <Tag
              style={{ fontSize: "2vh", height: "3vh", lineHeight: "2.5vh" }}
              color={colors[index % 4]}
            >
              {item}
            </Tag>
          ))}
        </div>
        <div style={{ marginTop: "2rem" }}>在新春佳节到来之际</div>
        <div>CC98论坛祝你</div>
        <div>身体健康</div>
        <div>学习生活顺利</div>
        <div>幸福2020！</div>
      </div>
    );
  }
}
