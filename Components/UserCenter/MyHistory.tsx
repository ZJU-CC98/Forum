// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import Topic from "./ExactActivitiesTopic";
import { UserRecentTopic } from "../../States/AppState";
import Pager from "./Pager";
import * as Actions from "../../Actions/UserCenter";
import { connect } from "react-redux";
import { RootState, RootAction } from "../../Store";
import { Select, Input, Modal } from "antd";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import Button from "antd/es/button";
import { type } from "os";
import { getHistoryPosts, setBrowsingHistoryEnabled } from "../../AsyncActions/UserCenter/GetMyHistoryPosts";
import Checkbox from "antd/es/checkbox";
import { set } from "core-js/core/dict";
import { refreshCurrentUserInfo } from "../../AsyncActions/UserCenter";

const { Search } = Input;
const { Option } = Select;

type ownProps = {
  currentMyHistoryTopics: UserRecentTopic[];
  browsingHistoryEnabled: boolean;
  isLoading: boolean;
  totalPage: number;
  hasTotal: boolean;
  getInfo: (
    page: number,
    forceLoad: boolean | undefined,
  ) => void;
  setLocalBrowsingHistoryEnabled: (enabled: boolean) => void;
  initUserInfo: () => void;
  changePage: () => void;
};

type ownMatch = {
  page: string;
};

type Props = RouteComponentProps<ownMatch> & ownProps;

/**
 * 用户中心我收藏的帖子组件
 */
class Posts extends React.Component<Props> {
  componentWillReceiveProps(newProps: Props) {
    if (this.props.match.params.page !== newProps.match.params.page) {
      const curPage = parseInt(newProps.match.params.page) || 1;
      this.props.getInfo(curPage, true);
      window.scroll(0, 0);
    }
  }

  componentDidMount() {
    const curPage = parseInt(this.props.match.params.page) || 1;
    this.props.initUserInfo();
    this.props.getInfo(curPage, true);
    this.props.changePage();
  }

  render() {
    const emptyPage = (
      <div
        className="user-posts"
        style={{
          textAlign: "center",
        }}
      >
        没有主题
      </div>
    );
    const enableCheckbox = (
      <Checkbox
        indeterminate={false}
        onChange={() => { this.props.setLocalBrowsingHistoryEnabled(!this.props.browsingHistoryEnabled); }}
        checked={this.props.browsingHistoryEnabled}
      >
        开启历史记录功能
      </Checkbox>
    );
    if (this.props.isLoading) {
      return (
        <div className="user-center-loading">{enableCheckbox}
          <p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p>
        </div>
      );
    }
    const curPage = parseInt(this.props.match.params.page) || 1;
    //state转换为JSX
    let userRecentPosts = this.props.currentMyHistoryTopics.slice(0, 10)
      .map((item) => <Topic key={item.id} userRecentTopic={item} />);
    //添加分隔线
    for (let i = 1; i < userRecentPosts.length; i += 2) {
      userRecentPosts.splice(i, 0, <hr key={i} />);
    }
    return (

      <div className="user-posts">
        {enableCheckbox}
        {/* <Button
          onClick={() => {
            //use history to refresh
            this.props.changePage();
            // this.props.history.push(
              // `/usercenter/myfavorites/order/${order}/group/${group}/${curPage}`
            // );
          }}
        >测试</Button> */}
        <hr />
        {this.props.currentMyHistoryTopics.length === 0 ? (
          emptyPage
        ) : (
          <>
            {userRecentPosts}
            <br />
            <Pager
              currentPage={curPage}
              totalPage={this.props.totalPage}
              href={`/usercenter/myhistory/`}
              hasTotal={true}
            />
          </>
        )}
      </div>
    );
  }
}

function mapState(store: RootState) {
  return {
    currentMyHistoryTopics: store.userInfo.currentMyHistoryTopics,
    isLoading: store.userInfo.isLoading,
    totalPage: store.userInfo.totalPage.myhistory,
    hasTotal: store.userInfo.hasTotal.myhistory,
    browsingHistoryEnabled: store.userInfo.browsingHistoryEnabled,
  };
}

function mapDispatch(dispatch: ThunkDispatch<RootState, void, RootAction>) {
  return {
    changePage: () => {
      dispatch(Actions.changeUserCenterPage("myhistory"));
    },
    getInfo: (
      page: number,
      forceLoad: boolean | undefined,
    ) => {
      dispatch(getHistoryPosts(page, forceLoad));
    },
    setLocalBrowsingHistoryEnabled: (enabled: boolean) => {
      dispatch(setBrowsingHistoryEnabled(enabled));
    },
    initUserInfo: () => {
      dispatch(refreshCurrentUserInfo());
    },
  };
}

export default connect(mapState, mapDispatch)(withRouter(Posts));
