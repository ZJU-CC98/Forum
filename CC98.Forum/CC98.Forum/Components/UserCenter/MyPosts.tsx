// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import * as Utility from "../../Utility";
import Post from "./ExactActivitiesPost";
import { UserRecentPost } from "../../States/AppState";
import Pager from "./Pager";
import { connect } from "react-redux";
import { withRouter, match, RouteComponentProps } from "react-router-dom";
import { getRecentPosts } from "../../AsyncActions/UserCenter";
import * as Actions from "../../Actions/UserCenter";
import { RootState } from "../../Store";
import { Button } from "antd";

type ownProps = {
  userRecentPosts: UserRecentPost[];
  totalPage: number;
  hasTotal: boolean;
  isLoading: boolean;
  getInfo: (page: number, ishot: number) => void;
  changePage: () => void;
};

type ownMatch = {
  page: string;
  ishot: string;
};

type Props = RouteComponentProps<ownMatch> & ownProps;

/**
 * 用户中心我的主题组件
 */
class MyPosts extends React.Component<Props> {
  componentWillReceiveProps(newProps: Props) {
    if (
      this.props.match.params.page !== newProps.match.params.page ||
      this.props.match.params.ishot !== newProps.match.params.ishot
    ) {
      const curPage = parseInt(newProps.match.params.page) || 1;
      this.props.getInfo(curPage, Number(newProps.match.params.ishot));
      window.scroll(0, 0);
    }
  }

  componentDidMount() {
    const curPage = parseInt(this.props.match.params.page) || 1;
    this.props.getInfo(curPage, Number(this.props.match.params.ishot));
    this.props.changePage();
  }

  changeishot = (ishot: number) => {
    this.props.history.push(`/usercenter/myposts/ishot/${ishot}/1`);
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div className="user-center-loading">
          <p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p>
        </div>
      );
    } else if (this.props.userRecentPosts.length === 0) {
      return (
        <div className="user-posts" style={{ textAlign: "center" }}>
          没有回复
        </div>
      );
    }
    const curPage = parseInt(this.props.match.params.page) || 1;
    const totalPage = this.props.hasTotal ? this.props.totalPage : curPage + 1;
    console.log(this.props);
    //state转换为JSX
    let userRecentPosts = this.props.userRecentPosts
      .slice((curPage - 1) * 10, curPage * 10)
      .map((item) => <Post key={item.id} userRecentPost={item} />);
    //添加分隔线
    for (let i = 1; i < userRecentPosts.length; i += 2) {
      userRecentPosts.splice(i, 0, <hr key={i} />);
    }
    const ishot = Number(this.props.match.params.ishot);
    return (
      <div className="user-posts">
        {ishot === 0 ? (
          <Button
            style={{ width: "8rem", marginTop: "-1rem", marginBottom: "2rem" }}
            className="user-ishot-btn"
            type="primary"
            onClick={() => this.changeishot(1)}
          >
            显示热门回复
          </Button>
        ) : (
          <Button
            style={{ width: "8rem", marginTop: "-1rem", marginBottom: "2rem" }}
            type="primary"
            onClick={() => this.changeishot(0)}
          >
            显示全部回复
          </Button>
        )}
        {userRecentPosts}
        <Pager
          currentPage={curPage}
          totalPage={totalPage}
          href={`/usercenter/myposts/ishot/${Number(
            this.props.match.params.ishot
          )}/`}
          hasTotal={this.props.hasTotal}
        />
      </div>
    );
  }
}

function mapState(store: RootState) {
  return {
    userRecentPosts: store.userInfo.recentPosts,
    totalPage: store.userInfo.totalPage.myposts,
    hasTotal: store.userInfo.hasTotal.myposts,
    isLoading: store.userInfo.isLoading,
  };
}

function mapDispatch(dispatch) {
  return {
    getInfo: (page: number, ishot: number) => {
      dispatch(getRecentPosts(page, ishot));
    },
    changePage: () => {
      dispatch(Actions.changeUserCenterPage("myposts"));
    },
  };
}

export default connect(mapState, mapDispatch)(withRouter(MyPosts));
