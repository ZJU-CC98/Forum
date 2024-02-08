import React from "react";
import { getAnnualReview2023, getMyInfo } from "../../Utility";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import Page5 from "./page5";
import Page6 from "./page6";
import Page7 from "./page7";
import Cover from "./cover";
import { Icon, Spin } from "antd";
import Page8 from "./page8";
import Page9 from "./page9";
export default class extends React.Component {
  state = {
    data: null,
    page: 0,
  };

  async componentDidMount() {
    const data = await getAnnualReview2023();
    this.setState({ data });
  }

  previousPage = () => {
    if (this.state.page > 0) {
      if (
        this.state.page === 9 &&
        !this.state.data.bet &&
        this.state.data.cardDraw
      ) {
        this.setState({ page: 7 });
        return;
      }
      if (
        this.state.page === 9 &&
        !this.state.data.bet &&
        !this.state.data.cardDraw
      ) {
        this.setState({ page: 6 });
        return;
      }
      if (this.state.page === 8 && !this.state.data.cardDraw) {
        this.setState({ page: 7 });
        return;
      }

      this.setState({ page: this.state.page - 1 });
    }
  };

  nextPage = () => {
    if (this.state.page < 9) {
      if (
        this.state.page === 6 &&
        !this.state.data.cardDraw &&
        !this.state.data.bet
      ) {
        this.setState({ page: 9 });
        return;
      }
      if (this.state.page === 6 && this.state.data.cardDraw) {
        this.setState({ page: 7 });
        return;
      }
      if (this.state.page === 7 && !this.state.data.bet) {
        this.setState({ page: 9 });
        return;
      }

      this.setState({ page: this.state.page + 1 });
    }
  };

  handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      this.nextPage();
    } else if (e.deltaY < 0) {
      this.previousPage();
    }
  };

  render() {
    const { data, page } = this.state;
    const isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
    if (!data) return <Spin />;
    if (getMyInfo()) {
      data.userInfo = getMyInfo();
    }
    return (
      <div className={isMobile ? "annual-review-body" : "annual-review-body"}>
        {page !== 0 ? (
          <Icon
            type="up"
            onClick={this.previousPage}
            style={{ fontSize: "2rem", cursor: "pointer", zIndex: 99 }}
          />
        ) : (
          <div style={{ height: "2rem" }}></div>
        )}
        {page === 0 && (
          <div onWheel={(e) => this.handleWheel(e)}>
            <Cover />
          </div>
        )}
        {page === 1 && (
          <div onWheel={(e) => this.handleWheel(e)} onMouseDown={this.nextPage}>
            <Page1 data={data} />
          </div>
        )}
        {page === 2 && (
          <div onWheel={(e) => this.handleWheel(e)} onMouseDown={this.nextPage}>
            <Page2 data={data} />
          </div>
        )}
        {page === 3 && (
          <div onWheel={(e) => this.handleWheel(e)} onMouseDown={this.nextPage}>
            <Page3 data={data} />
          </div>
        )}
        {page === 4 && (
          <div onWheel={(e) => this.handleWheel(e)} onMouseDown={this.nextPage}>
            <Page4 data={data} />
          </div>
        )}
        {page === 5 && (
          <div onWheel={(e) => this.handleWheel(e)} onMouseDown={this.nextPage}>
            <Page5 data={data} />
          </div>
        )}
        {page === 6 && (
          <div onWheel={(e) => this.handleWheel(e)}>
            <Page6 data={data} />
          </div>
        )}
        {page === 7 && data.cardDraw && (
          <div onWheel={(e) => this.handleWheel(e)}>
            <Page7 data={data} />
          </div>
        )}
        {page === 8 && data.bet && (
          <div onWheel={(e) => this.handleWheel(e)}>
            <Page8 data={data} />
          </div>
        )}
        {page === 9 && (
          <div onWheel={(e) => this.handleWheel(e)}>
            <Page9 data={data} />
          </div>
        )}
        {page !== 9 && (
          <Icon
            type="down"
            onClick={this.nextPage}
            style={{ fontSize: "2rem", cursor: "pointer", zIndex: 99 }}
          />
        )}
      </div>
    );
  }
}
