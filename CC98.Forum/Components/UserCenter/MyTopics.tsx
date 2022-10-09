// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import * as Utility from "../../Utility";
import Topic from "./ExactActivitiesTopic";
import { UserRecentTopic } from "../../States/AppState";
import Pager from "./Pager";
import { connect } from "react-redux";
import { withRouter, match, RouteComponentProps } from "react-router-dom";
import { getRecentTopics } from "../../AsyncActions/UserCenter";
import * as Actions from "../../Actions/UserCenter";
import { RootState } from "../../Store";

type ownProps = {
  userRecentTopics: UserRecentTopic[];
  totalPage: number;
  hasTotal: boolean;
  isLoading: boolean;
  getInfo: (page: number) => void;
  changePage: () => void;
};

type ownMatch = {
  page: string;
};

type Props = RouteComponentProps<ownMatch> & ownProps;

/**
 * 用户中心我的主题组件
 */
class MyTopics extends React.Component<Props> {
  componentWillReceiveProps(newProps: Props) {
    if (this.props.match.params.page !== newProps.match.params.page) {
      const curPage = parseInt(newProps.match.params.page) || 1;
      this.props.getInfo(curPage);
      window.scroll(0, 0);
    }
  }

  componentDidMount() {
    const curPage = parseInt(this.props.match.params.page) || 1;
    this.props.getInfo(curPage);
    this.props.changePage();
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="user-center-loading">
          <p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p>
        </div>
      );
    } else if (this.props.userRecentTopics.length === 0) {
      return (
        <div className="user-posts" style={{ textAlign: "center" }}>
          没有主题
        </div>
      );
    }
    const curPage = parseInt(this.props.match.params.page) || 1;
    const totalPage = this.props.hasTotal ? this.props.totalPage : curPage + 1;
    //state转换为JSX
    let userRecentTopics = this.props.userRecentTopics
      .slice((curPage - 1) * 10, curPage * 10)
      .map((item) => <Topic key={item.id} userRecentTopic={item} />);
    //添加分隔线
    for (let i = 1; i < userRecentTopics.length; i += 2) {
      userRecentTopics.splice(i, 0, <hr key={i} />);
    }
    return (
      <div className="user-posts">
        {userRecentTopics}
        <Pager
          currentPage={curPage}
          totalPage={totalPage}
          href="/usercenter/mytopics/"
          hasTotal={this.props.hasTotal}
        />
      </div>
    );
  }
}

function mapState(store: RootState) {
  return {
    userRecentTopics: store.userInfo.recentTopics,
    totalPage: store.userInfo.totalPage.mytopics,
    hasTotal: store.userInfo.hasTotal.mytopics,
    isLoading: store.userInfo.isLoading,
  };
}

function mapDispatch(dispatch) {
  return {
    getInfo: (page: number) => {
      dispatch(getRecentTopics(page));
    },
    changePage: () => {
      dispatch(Actions.changeUserCenterPage("mytopics"));
    },
  };
}

export default connect(mapState, mapDispatch)(withRouter(MyTopics));
