import * as React from "react";
import * as Utility from "../../Utility";
import * as Actions from "../../Actions/UserCenter";
import { ThemeSetting, UserInfo } from "../../States/AppState";
import { connect } from "react-redux";
import { RootState } from "../../Store";
import { string } from "prop-types";

/**
 * 该组件需要使用的属性列表。
 */
interface ThemeProps {
  /**
   * 当前界面关联的用户信息。
   */
  userInfo: UserInfo;
  /**
   * 修改用户界面操作执行的回调。
   */
  changeUserInfo: (userInfo: UserInfo) => void;
}

/**
 * 主题列表
 */
export interface ThemItem {
  /**主题的顺序 */
  order: number;
  /**主题的名字 */
  name: string;
  /**按钮的样式 */
  style: React.CSSProperties;
}

/**
 * 具体的主题按钮样式
 * 每次添加新主题时修改这里
 */
export const themeList: ThemItem[] = [
  {
    order: 0,
    name: "系统默认",
    style: { color: "black", backgroundColor: "#ffffff" },
  },
  {
    order: 1,
    name: "冬季",
    style: {
      backgroundColor: "#79b8ca",
      backgroundImage: "url(/static/images/header-image-thumb/winter.jpg)",
    },
  },
  {
    order: 2,
    name: "春季（浅）",
    style: {
      backgroundColor: "#b1d396",
      backgroundImage: "url(/static/images/header-image-thumb/spring.jpg)",
    },
  },
  {
    order: 3,
    name: "春季（深）",
    style: {
      backgroundColor: "#95b675",
      backgroundImage: "url(/static/images/header-image-thumb/spring.jpg)",
    },
  },
  {
    order: 4,
    name: "夏季",
    style: {
      backgroundColor: "#5198d8",
      backgroundImage: "url(/static/images/header-image-thumb/summer.jpg)",
    },
  },
  {
    order: 5,
    name: "秋季（橙）",
    style: {
      backgroundColor: "#F4A460",
      backgroundImage: "url(/static/images/header-image-thumb/autumn.jpg)",
    },
  },
  {
    order: 6,
    name: "秋季（红）",
    style: {
      backgroundColor: "#B22222",
      backgroundImage: "url(/static/images/header-image-thumb/autumn.jpg)",
    },
  },
  {
    order: 7,
    name: "双十一交友",
    style: {
      backgroundColor: "rgb(240,125,145)",
      backgroundImage: "url(/static/images/header-image-thumb/singleday.jpg)",
    },
  },
  {
    order: 8,
    name: "中秋（暗）",
    style: {
      backgroundColor: "rgb(38,118,129)",
      backgroundImage: "url(/static/images/header-image-thumb/mid_autumn.jpg)",
    },
  },
  {
    order: 9,
    name: "中秋（亮）",
    style: {
      backgroundColor: "rgb(52,150,159)",
      backgroundImage: "url(/static/images/header-image-thumb/mid_autumn.jpg)",
    },
  },
  {
    order: 10,
    name: "小雪（暗）",
    style: {
      backgroundColor: "rgb(3, 57, 117)",
      backgroundImage: "url(/static/images/header-image-thumb/light_snow.jpg)",
    },
  },
  {
    order: 11,
    name: "小雪（亮）",
    style: {
      backgroundColor: "rgb(122, 146, 194)",
      backgroundImage: "url(/static/images/header-image-thumb/light_snow.jpg)",
    },
  },
  {
    order: 12,
    name: "春节（暗）",
    style: {
      backgroundColor: "rgb(205,0,0)",
      backgroundImage:
        "url(/static/images/header-image-thumb/spring_festival_dark.jpg)",
    },
  },
  {
    order: 13,
    name: "春节（亮）",
    style: {
      backgroundColor: "rgb(214,14,36)",
      backgroundImage:
        "url(/static/images/header-image-thumb/spring_festival_light.jpg)",
    },
  },
  {
    order: 14,
    name: "仲春",
    style: {
      backgroundColor: "rgb(70, 141, 57)",
      backgroundImage: "url(/static/images/header-image-thumb/zhongchun.jpg)",
    },
  },
  {
    order: 15,
    name: "端午",
    style: {
      backgroundColor: "rgb(53, 120, 188)",
      backgroundImage:
        "url(/static/images/header-image-thumb/dragon_boat_festival.jpg)",
    },
  },
  {
    order: 16,
    name: "清明",
    style: {
      backgroundColor: "rgb(106, 132, 113)",
      backgroundImage: "url(/static/images/header-image-thumb/qingming.jpg)",
    },
  },
  {
    order: 17,
    name: "秋色之空（暗）",
    style: {
      backgroundColor: "rgb(183, 115, 65)",
      backgroundImage: "url(/static/images/header-image-thumb/autumn_2022.jpg)",
    },
  },
  {
    order: 18,
    name: "秋色之空（亮）",
    style: {
      backgroundColor: "rgb(235, 142, 85)",
      backgroundImage: "url(/static/images/header-image-thumb/autumn_2022.jpg)",
    },
  },
  {
    order: 19,
    name: "冬日暖雪（暗）",
    style: {
      backgroundColor: "rgb(125,85,119)",
      backgroundImage:
        "url(/static/images/header-image-thumb/winter_2022_dark.jpg)",
    },
  },
  {
    order: 20,
    name: "冬日暖雪（亮）",
    style: {
      backgroundColor: "rgb(181, 127, 163)",
      backgroundImage: "url(/static/images/header-image-thumb/winter_2022.jpg)",
    },
  },
];

/**
 * 定义具有日夜模式的皮肤关系。
 */
export interface ThemeDayNightGroup {
  /**
   * 日间主题名称。
   */
  day: string;
  /**
   * 夜间主题名称。
   */
  night: string;
}

/**
 * 具有日夜关系的主题列表。
 */
export const themeDayNightGroups: ThemeDayNightGroup[] = [
  { day: "中秋（亮）", night: "中秋（暗）" },
  { day: "小雪（亮）", night: "小雪（暗）" },
  { day: "春节（亮）", night: "春节（暗）" },
  { day: "秋色之空（亮）", night: "秋色之空（暗）" },
  { day: "冬日暖雪（亮）", night: "冬日暖雪（暗）" },
];

let themeButtons = [];
for (let i of themeList) {
  themeButtons.push(i.name);
}

/**
 * 为 ThemeSettingComponent 控件提供输入。
 */
interface ThemeSettingProps {
  /**
   * 控件关联的主题设置信息。
   */
  setting: ThemeSetting;
  /**
   * 修改用户界面操作执行的回调。
   */
  onSettingChange: (setting: ThemeSetting) => void | Promise<void>;
}

/**
 * 提供主题设置界面。
 */
class ThemeSettingComponent extends React.Component<
  ThemeSettingProps,
  ThemeSetting
> {
  /**
   * 绑定
   * @param props
   */
  constructor(props: ThemeSettingProps) {
    super(props);
    this.state = props.setting;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * 统一控件状态控制
   * @param event
   */
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    } as Pick<ThemeSetting, keyof ThemeSetting>);
  }

  /**
   * 调用父组件方法提交设置更改
   * @param event
   */
  async handleSubmit(event: React.FormEvent): Promise<any> {
    event.preventDefault();
    await this.props.onSettingChange(this.state);
  }

  render() {
    const supportTip: React.ReactNode =
      Utility.isBrowserDayNightModeSupported() ? (
        []
      ) : (
        <div title="你当前使用的浏览器不支持切换日夜模式，因此自动切换无法工作。网站将按照你设置的固定时间进行切换。不过，你仍然可以设置这个选项，以便于在支持它的电脑和浏览器上使用这个功能。">
          {" "}
          提示{" "}
        </div>
      );

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            name="enableDayNightSwitch"
            type="checkbox"
            checked={this.state.enableDayNightSwitch}
            onChange={this.handleInputChange}
          />{" "}
          启用皮肤昼夜更换功能
        </label>
        <p className="help-text">
          只有同时提供暗色和亮色选项的皮肤才支持昼夜更换功能。如果你选择其它皮肤，这个选项将不会产生任何效果。
        </p>

        <div>
          <label htmlFor="day-start-input">日间开始时刻</label>
          <input
            id="day-start-input"
            name="dayStartTime"
            type="time"
            required={true}
            onChange={this.handleInputChange}
            value={this.state.dayStartTime}
          />

          <label htmlFor="night-start-input">夜间开始时刻</label>
          <input
            id="night-start-input"
            name="nightStartTime"
            type="time"
            required={true}
            onChange={this.handleInputChange}
            value={this.state.nightStartTime}
          />
        </div>

        <div>
          <label>
            <input
              name="syncWithBrowserDayNightMode"
              type="checkbox"
              checked={this.state.syncWithBrowserDayNightMode}
              onChange={this.handleInputChange}
            />{" "}
            和浏览器的日夜模式自动同步 {supportTip}
          </label>
        </div>
        <p className="help-text">
          注意：你的浏览器必须向网站提供是否使用日夜模式的相关信息，这个设置才会生效。目前，并不是所有浏览器都具有这项功能。浏览器不支持时，将会使用上面设置的日夜开始时刻设置更换皮肤。
        </p>

        <button type="submit">保存设置</button>
      </form>
    );
  }
}

class Theme extends React.Component<ThemeProps> {
  constructor(props: ThemeProps) {
    super(props);
    this.handleThemeSettingChange = this.handleThemeSettingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateButton = this.generateButton.bind(this);
  }

  handleThemeSettingChange = async (setting: ThemeSetting) => {
    try {
      // 向服务器提交信息
      let headers = await Utility.formAuthorizeHeader();
      headers.append("Content-Type", "application/json");

      const url = "me/theme-setting";
      let response = await Utility.cc98Fetch(url, {
        headers,
        method: "PUT",
        body: JSON.stringify(setting),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // 获取推断后的主题下标
      const theme = Utility.getRealThemeNumber(
        this.props.userInfo.theme,
        setting
      );

      // 更新用户信息
      this.props.changeUserInfo({
        ...this.props.userInfo,
        theme,
        themeSetting: setting,
      });

      // 刷新主题
      Utility.changeTheme(theme);
    } catch (e) {}
  };

  handleSubmit = async (theme: number) => {
    try {
      // 向服务器提交信息
      let headers = await Utility.formAuthorizeHeader();
      const url = `/me/theme?id=${theme}`;
      let res = await Utility.cc98Fetch(url, {
        headers,
        method: "PUT",
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      // 获取推断后的主题下标
      theme = Utility.getRealThemeNumber(theme);

      // 更新用户信息
      this.props.changeUserInfo({ ...this.props.userInfo, theme });

      // 刷新主题
      Utility.changeTheme(theme);
    } catch (e) {}
  };

  generateButton = (item: ThemItem) => {
    return (
      <button
        style={item.style}
        key={item.order}
        onClick={() => this.handleSubmit(item.order)}
        disabled={this.props.userInfo.theme === item.order}
      >
        {item.name}
      </button>
    );
  };

  render() {
    return (
      <div className="user-theme">
        <div className="user-theme-info">
          <h2>切换皮肤</h2>
          <p>当前皮肤：{themeList[this.props.userInfo.theme].name}</p>
        </div>

        <div>
          <ThemeSettingComponent
            setting={this.props.userInfo.themeSetting}
            onSettingChange={this.handleThemeSettingChange}
          />
        </div>

        <div className="user-theme-config">
          {themeList.map(this.generateButton)}
        </div>
      </div>
    );
  }
}

function mapState(state: RootState) {
  return {
    userInfo: state.userInfo.currentUserInfo,
  };
}

function mapDispatch(dispatch) {
  return {
    changeUserInfo: (userInfo: UserInfo) => {
      dispatch(Actions.changeUserInfo(userInfo));
    },
  };
}

export default connect(mapState, mapDispatch)(Theme);
