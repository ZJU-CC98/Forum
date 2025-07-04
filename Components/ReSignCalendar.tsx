import moment from "moment";
import React, { useEffect } from "react";
import CC98Calendar from "./CC98Calendar";
import { Button, DatePicker, Icon, message, Popover, Radio } from "antd";

const { MonthPicker } = DatePicker;
import {
  cc98Fetch,
  formAuthorizeHeader,
  getMyInfo,
  refreshUserInfo,
} from "../Utility";

interface ResignCalendarProps {
  updateSigninInfo?: (number) => void;
}

const ResignCalendar: React.FC<ResignCalendarProps> = (props) => {
  const [dateNow, setDateNow] = React.useState<moment.Moment | null>(null);
  const [signinInfo, setSigninInfo] = React.useState<any>(null);
  const [datePicker, setDatePicker] = React.useState<moment.Moment | null>(
    null
  );
  const [signInCardCount, setSignInCardCount] = React.useState<number>(0);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const dateNow = await fetchServerDate();
    setDateNow(dateNow);
    setDatePicker(dateNow.clone());
    fetchSigninInfo(dateNow.year(), dateNow.month() + 1);
    const userInfo = getMyInfo();
    setSignInCardCount(userInfo.signInCardCount || 0);
  };

  const fetchServerDate = async () => {
    const headers = await formAuthorizeHeader();
    const response = await cc98Fetch("/config/now", {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      console.error("Failed to fetch signin info:", response.statusText);
      return;
    }
    const data = await response.json();
    return moment(data.data);
  };

  /**
   * 获取指定年份与月份的签到信息。
   *
   * @param {number} year  - 年份，例如 2025
   * @param {number} month - 月份（1～12），例如 5
   * @returns {Promise<any|null>}
   *    返回对应月份的签到数据，如果请求失败则返回 null。
   */
  const fetchSigninInfo = async (year, month) => {
    setSigninInfo(null);
    const headers = await formAuthorizeHeader();
    // 这里将 URL 改为根据传入的 year 和 month 生成
    const response = await cc98Fetch(
      `/me/signin-in-month?year=${year}&month=${month}`,
      {
        method: "GET",
        headers,
      }
    );
    if (!response.ok) {
      console.error(
        `Failed to fetch signin info for ${year}-${month}:`,
        response.statusText
      );
      return null;
    }
    const data = await response.json();
    setSigninInfo(data);
    return data;
  };

  /**
   * 使用补签卡
   * @returns {Promise<any|null>}
   */
  const useSignInCard = async () => {
    const headers = await formAuthorizeHeader();
    const response = await cc98Fetch("/me/make-up-missed-signin", {
      method: "POST",
      headers: headers,
    });
    if (!response.ok) {
      console.error("Failed to use signin card:", response.statusText);
      return null;
    }
    const data = await response.json();
    console.log("补签卡使用结果：", data);
    if (data.errorCode !== 0) {
      console.error("补签卡使用失败：", data.extra);
      message.error(data.extra || "补签卡使用失败");
      return null;
    }
    message.success("补签成功");
    if (props.updateSigninInfo) {
      props.updateSigninInfo(data.data);
    }
  };

  const renderDateCell = (momentDate) => {
    // let color = "";
    if (!signinInfo) {
      return (
        <div className="cc98-calendar-cell">
          {momentDate.date()}
          <div className="cc98-signin-info">&nbsp;</div>
        </div>
      );
    }
    const info = signinInfo.find(
      (item) =>
        item.year === moment(datePicker).year() &&
        item.month === moment(datePicker).month() + 1 &&
        item.day === momentDate.date()
    );
    if (info) {
      if (info.useCard) {
        return (
          <div className="cc98-calendar-cell cc98-calendar-cell-checked">
            {momentDate.date()}
            <div className="cc98-signin-info calendar-tag calendar-makeup-tag">补</div>
          </div>
        );
      } else {
        return (
          <div className="cc98-calendar-cell cc98-calendar-cell-checked">
            {momentDate.date()}
            <div className="cc98-signin-info calendar-tag">
              {"+" + info.reward}
            </div>
          </div>
        );
      }
    } else if (momentDate.isAfter(dateNow)) {
      return (
        <div className="cc98-calendar-cell">
          {momentDate.date()}
          <div className="cc98-signin-info calendar-tag">&nbsp;</div>
        </div>
      );
    } else {
      return (
        <div className="cc98-calendar-cell">
          {momentDate.date()}
          <div className="cc98-signin-info calendar-tag calendar-not-signin-tag">未</div>
        </div>
      );
    }
  };

  const ruleContent = (
    <div>
      ①补签功能上线后，每位用户获得3张补签卡（包括此后新注册用户）
      <br />
      ②使用补签卡后，自动在最近的未签到日补签，并重新计算连续签到天数
      <br />
      ③补签不获得额外的财富值奖励
      <br />
      ④后续会增加补签卡的获取方式
      <br />
      ⑤签到功能使用和显示的时间为北京时间
    </div>
  );

  return (
    <div style={{ minHeight: "700px" ,marginTop: "40px"}}>
      <div className="cc98-calendar-header">
        补签卡：{signInCardCount}张
        <div>
          <Popover content={ruleContent} title="补签规则">
            <Icon type="question-circle" />
          </Popover>
        </div>
        <div>
          {signInCardCount > 0 ? (
            <Button
              type="primary"
              onClick={() => {
                useSignInCard().then(() => {
                  refreshUserInfo().then(() => {
                    fetchSigninInfo(
                      datePicker?.year(),
                      datePicker?.month() + 1
                    );
                    const userInfo = getMyInfo();
                    setSignInCardCount(userInfo.signInCardCount || 0);
                  });
                });
              }}
            >
              补签一次
            </Button>
          ) : null}
        </div>
      </div>
      <div className="cc98-calendar-picker">
        <MonthPicker
          style={{ marginRight: 8 }}
          placeholder="选择月份"
          value={datePicker}
          onChange={(date) => {
            setDatePicker(date);

            fetchSigninInfo(date?.year(), date?.month() + 1);
          }}
          disabledDate={(date) => {
            // 禁止选择2016年6月之前的时间
            return date.isBefore(moment("2016-06", "YYYY-MM"));
          }}
        />

        <Button.Group>
          <Button
            onClick={() => {
              const newDate = datePicker.subtract(1, "month");
              setDatePicker(newDate);
              fetchSigninInfo(newDate.year(), newDate.month() + 1);
            }}
            disabled={
              datePicker &&
              datePicker.isSameOrBefore(moment("2016-06", "YYYY-MM"))
            }
          >
            <Icon type="left" />
            上月
          </Button>
          <Button
            onClick={() => {
              const newDate = datePicker.add(1, "month");
              setDatePicker(newDate);
              fetchSigninInfo(newDate.year(), newDate.month() + 1);
            }}
          >
            下月
            <Icon type="right" />
          </Button>
        </Button.Group>
        <div className="cc98-calendar-picker-info">
          可追溯范围：2016年06月 - {dateNow ? dateNow.format("YYYY年MM月") : ""}
        </div>
      </div>
      <CC98Calendar
        year={moment(datePicker).year()}
        month={moment(datePicker).month() + 1}
        renderDateCell={renderDateCell}
      />
    </div>
  );
};

export default ResignCalendar;
