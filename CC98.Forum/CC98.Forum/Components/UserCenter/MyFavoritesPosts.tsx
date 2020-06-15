// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import Post from "./ExactActivitiesPost";
import { UserRecentPost } from "../../States/AppState";
import * as Utility from "../../Utility";
import Pager from "./Pager";
import * as Actions from "../../Actions/UserCenter";
import { connect } from "react-redux";
import { RootState, RootAction } from "../../Store";
import { Dispatch } from "redux";
import { Button } from "antd";
import { withRouter, match, RouteComponentProps } from "react-router-dom";
import { getFavoritePosts } from "../../AsyncActions/UserCenter";
import { ThunkDispatch } from "redux-thunk";

type ownProps = {
  userRecentPosts: UserRecentPost[];
  totalPage: number;
  hasTotal: boolean;
  isLoading: boolean;
  getInfo: (
    page: number,
    order: number,
    forceLoad: boolean | undefined
  ) => void;
  changePage: () => void;
};

type ownMatch = {
  page: string;
  order: string;
};

type Props = RouteComponentProps<ownMatch> & ownProps;

/**
 * 用户中心我收藏的帖子组件
 */
class Posts extends React.Component<Props> {
  componentWillReceiveProps(newProps: Props) {
    if (
      this.props.match.params.page !== newProps.match.params.page ||
      this.props.match.params.order !== newProps.match.params.order
    ) {
      const curPage = parseInt(newProps.match.params.page) || 1;
      this.props.getInfo(curPage, Number(newProps.match.params.order), true);
      window.scroll(0, 0);
    }
  }

  componentDidMount() {
    const curPage = 1;
    this.props.getInfo(curPage, Number(this.props.match.params.order), true);
    this.props.changePage();
  }

  changeOrder = (order: number) => {
    this.props.history.push(`/usercenter/myfavorites/order/${order}/1`);
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
          没有主题
        </div>
      );
    }
    const curPage = parseInt(this.props.match.params.page) || 1;
    const totalPage = this.props.hasTotal ? this.props.totalPage : curPage + 1;
    //state转换为JSX
    let userRecentPosts = this.props.userRecentPosts
      .slice((curPage - 1) * 10, curPage * 10)
      .map((item) => <Post key={item.id} userRecentPost={item} />);
    //添加分隔线
    for (let i = 1; i < userRecentPosts.length; i += 2) {
      userRecentPosts.splice(i, 0, <hr key={i} />);
    }
    const order = Number(this.props.match.params.order);
    return (
      <div className="user-posts">
        {order === 0 ? (
          <Button
            style={{ width: "8rem", marginTop: "-1rem", marginBottom: "2rem" }}
            className="user-order-btn"
            type="primary"
            onClick={() => this.changeOrder(1)}
          >
            按最后回复排序
          </Button>
        ) : (
          <Button
            style={{ width: "8rem", marginTop: "-1rem", marginBottom: "2rem" }}
            type="primary"
            onClick={() => this.changeOrder(0)}
          >
            按发帖时间排序
          </Button>
        )}
        {userRecentPosts}
        <Pager
          currentPage={curPage}
          totalPage={totalPage}
          href={`/usercenter/myfavorites/order/${order}/`}
          hasTotal={this.props.hasTotal}
        />
      </div>
    );
  }
}

function mapState(store: RootState) {
  return {
    userRecentPosts: store.userInfo.currentUserFavoritePosts,
    totalPage: store.userInfo.totalPage.myfavoriteposts,
    hasTotal: store.userInfo.hasTotal.myfavoriteposts,
    isLoading: store.userInfo.isLoading,
  };
}

function mapDispatch(dispatch: ThunkDispatch<RootState, void, RootAction>) {
  return {
    changePage: () => {
      dispatch(Actions.changeUserCenterPage("myfavoriteposts"));
    },
    getInfo: (page: number, order: number, forceLoad: boolean | undefined) => {
      dispatch(getFavoritePosts(page, order, forceLoad));
    },
  };
}

export default connect(mapState, mapDispatch)(withRouter(Posts));
