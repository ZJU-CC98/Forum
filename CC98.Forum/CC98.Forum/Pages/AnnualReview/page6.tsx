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
        <div style={{ display: "flex", justifyContent: "space-around",marginTop:"0.5rem" ,marginLeft: '1rem', marginRight: '1rem', flexWrap: 'wrap'}}>
          {achievements.map((item, index) => (
            <Tag
              style={{ fontSize: "2vh", height: "3vh", lineHeight: "2.5vh", marginBottom: '0.5rem' }}
              color={colors[index % 4]}
            >
              {item}
            </Tag>
          ))}
        </div>
        <div style={{ marginTop: "2rem" }}>在新春佳节到来之际，</div>
        <div>CC98论坛祝你：</div>
        <div><span className="annual-review-page6-congratulation">身体健康</span></div>
        <div><span className="annual-review-page6-congratulation">学习生活顺利</span></div>
        <div><span className="annual-review-page6-congratulation">幸福2020</span></div>
      </div>
    );
  }
}
