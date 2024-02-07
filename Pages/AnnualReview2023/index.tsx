import { OverPack, Parallax } from "rc-scroll-anim";
import TweenOne from "rc-tween-one";
import QueueAnim from "rc-queue-anim";
import React, { useEffect } from "react";
import { Button, Spin } from "antd";
import { getAnnualReview2023, getMyInfo } from "../../Utility";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import Page5 from "./page5";
import Page6 from "./page6";
import Page7 from "./page7";
import Page8 from "./page8";

const AnnualReviewButtonStyle = {
  margin: "100px",
  cursor: "pointer",
  fontSize: "20px",
  color: "#ccc",
};

export const AnnualReview2023: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [opacity, setOpacity] = React.useState(1);
  const [isShowPage2, setIsShowPage2] = React.useState(false);
  const [isShowPage3, setIsShowPage3] = React.useState(false);
  const [isShowPage4, setIsShowPage4] = React.useState(false);
  const [isShowPage5, setIsShowPage5] = React.useState(false);
  const [isShowPage6, setIsShowPage6] = React.useState(false);
  const [isShowPage7, setIsShowPage7] = React.useState(false);
  const [isShowPage8, setIsShowPage8] = React.useState(false);
  const [data, setData] = React.useState(null);
  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      scollTo("annual-review-2023-page1");
    }, 1000);
    let opacityCount = 1;
    //不断减小透明度 直至消失
    let interval = setInterval(() => {
      opacityCount -= 0.2;
      setOpacity(opacityCount);
      if (opacityCount <= 0) {
        clearInterval(interval);
      }
    }, 100);
  };

  const scollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    getAnnualReview2023().then((data) => {
      console.log(data);
      if (getMyInfo()) {
        data.userInfo = getMyInfo();
      }
      setData(data);
    });
  }, []);

  return (
    <div>
      {!data && <Spin />}
      {data && (
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            width: "500px",
            padding: "50px",
            marginTop: "50px",
            textAlign: "center",
            fontSize: "2.5vh",
            lineHeight: "1.25",
          }}
        >
          <div
            id="annual-cover"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                color: "rgb(33 135 227)",
                fontSize: "52px",
              }}
            >
              2023&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </h1>
            <h1
              style={{
                color: "rgb(33 135 227)",
                marginBottom: "150px",
                fontSize: "52px",
              }}
            >
              &nbsp;&nbsp;&nbsp;你的CC98年度总结
            </h1>
            <img src="/static/images/annual-review/logo_color.jpg" />
            <Button
              type="primary"
              size="large"
              style={{ margin: "100px", opacity: opacity }}
              onClick={handleExpand}
            >
              点击开启
            </Button>
          </div>
          <br />
          <br /> <br /> <br /> <br /> <br />
          <div
            style={{
              minHeight: isExpanded ? "100vh" : "0px",
              transition: "height 1s",
            }}
          >
            {/* <div style={{ visibility: isExpanded ? "visible" : "hidden" }}> */}
            {isExpanded && (
              <div>
                <div id="annual-review-2023-page1">
                  <br />
                  <br />
                  <br />
                  <div>
                    <Page1
                      data={data}
                      buttonNode={
                        <div
                          key="annual-page1-10"
                          style={{
                            ...AnnualReviewButtonStyle,
                            visibility: isShowPage2 ? "hidden" : "visible",
                          }}
                          onClick={() => {
                            setIsShowPage2(true);
                            setTimeout(() => {
                              scollTo("annual-review-2023-page2");
                            }, 200);
                          }}
                        >
                          继续浏览
                          <br />
                          <img
                            src="/static/images/annual-review/arrow-down.svg"
                            style={{ width: "30px" }}
                          />
                        </div>
                      }
                    />
                  </div>
                </div>
                {isShowPage2 && (
                  <div id="annual-review-2023-page2">
                    <br />
                    <br />
                    <br />

                    <Page2
                      data={data}
                      buttonNode={
                        <div
                          key="annual-page2-10"
                          style={{
                            ...AnnualReviewButtonStyle,
                            visibility: isShowPage3 ? "hidden" : "visible",
                          }}
                          onClick={() => {
                            setIsShowPage3(true);
                            setTimeout(() => {
                              scollTo("annual-review-2023-page3");
                            }, 200);
                          }}
                        >
                          继续浏览
                          <br />
                          <img
                            src="/static/images/annual-review/arrow-down.svg"
                            style={{ width: "30px" }}
                          />
                        </div>
                      }
                    />
                  </div>
                )}
                {isShowPage3 && (
                  <div id="annual-review-2023-page3">
                    <br />
                    <br />
                    <br />
                    <Page3
                      data={data}
                      buttonNode={
                        <div
                          key="annual-page3-20"
                          style={{
                            ...AnnualReviewButtonStyle,
                            visibility: isShowPage4 ? "hidden" : "visible",
                          }}
                          onClick={() => {
                            setIsShowPage4(true);
                            setTimeout(() => {
                              scollTo("annual-review-2023-page4");
                            }, 200);
                          }}
                        >
                          继续浏览
                          <br />
                          <img
                            src="/static/images/annual-review/arrow-down.svg"
                            style={{ width: "30px" }}
                          />
                        </div>
                      }
                    />
                  </div>
                )}
                {isShowPage4 && (
                  <div id="annual-review-2023-page4">
                    <br />
                    <br />
                    <br />
                    <Page4
                      data={data}
                      buttonNode={
                        <div
                          key="annual-page4-10"
                          style={{
                            ...AnnualReviewButtonStyle,
                            visibility: isShowPage5 ? "hidden" : "visible",
                          }}
                          onClick={() => {
                            setIsShowPage5(true);
                            setTimeout(() => {
                              scollTo("annual-review-2023-page5");
                            }, 200);
                          }}
                        >
                          继续浏览
                          <br />
                          <img
                            src="/static/images/annual-review/arrow-down.svg"
                            style={{ width: "30px" }}
                          />
                        </div>
                      }
                    />
                  </div>
                )}
                {isShowPage5 && (
                  <div id="annual-review-2023-page5">
                    <br />
                    <br />
                    <br />
                    <Page5
                      data={data}
                      buttonNode={
                        <div
                          key="annual-page5-10"
                          style={{
                            ...AnnualReviewButtonStyle,
                            visibility: isShowPage6 ? "hidden" : "visible",
                          }}
                          onClick={() => {
                            setIsShowPage6(true);
                            if (data.cardDraw) {
                              setTimeout(() => {
                                scollTo("annual-review-2023-page6");
                              }, 200);
                            } else if (data.bet) {
                              setTimeout(() => {
                                scollTo("annual-review-2023-page7");
                              }, 200);
                            } else {
                              setTimeout(() => {
                                scollTo("annual-review-2023-page8");
                              }, 200);
                            }
                          }}
                        >
                          继续浏览
                          <br />
                          <img
                            src="/static/images/annual-review/arrow-down.svg"
                            style={{ width: "30px" }}
                          />
                        </div>
                      }
                    />
                  </div>
                )}
                {isShowPage6 && (
                  <div id="annual-review-2023-page6">
                    <br />
                    <br />
                    <br />
                    <Page6
                      data={data}
                      buttonNode={
                        <div
                          key="annual-page6-10"
                          style={{
                            ...AnnualReviewButtonStyle,
                            visibility:
                              isShowPage7 || isShowPage8 ? "hidden" : "visible",
                          }}
                          onClick={() => {
                            if (data.bet) {
                              setIsShowPage7(true);
                              setTimeout(() => {
                                scollTo("annual-review-2023-page7");
                              }, 200);
                            } else {
                              setIsShowPage8(true);
                              setTimeout(() => {
                                scollTo("annual-review-2023-page8");
                              }, 200);
                            }
                          }}
                        >
                          继续浏览
                          <br />
                          <img
                            src="/static/images/annual-review/arrow-down.svg"
                            style={{ width: "30px" }}
                          />
                        </div>
                      }
                    />
                  </div>
                )}
                {isShowPage7 && (
                  <div id="annual-review-2023-page7">
                    <br />
                    <br />
                    <br />
                    <Page7
                      data={data}
                      buttonNode={
                        <div
                          key="annual-page7-10"
                          style={{
                            ...AnnualReviewButtonStyle,
                            visibility: "hidden",
                          }}
                          onClick={() => {
                            setIsShowPage8(true);
                            setTimeout(() => {
                              scollTo("annual-review-2023-page8");
                            }, 200);
                          }}
                        >
                          继续浏览
                          <br />
                          <img
                            src="/static/images/annual-review/arrow-down.svg"
                            style={{ width: "30px" }}
                          />
                        </div>
                      }
                    />
                  </div>
                )}
                {isShowPage8 && (
                  <div id="annual-review-2023-page8">
                    <br />
                    <br />
                    <br />
                    <Page8 data={data} />
                  </div>
                )}
              </div>
            )}
            <div style={{ height: "100px", visibility: "hidden" }}></div>
          </div>
        </div>
      )}
      <div style={{ height: "100vh", visibility: "hidden" }}></div>
    </div>
  );
};
