// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import Topic from "./ExactActivitiesTopic";
import { UserRecentPost } from "../../States/AppState";
import * as Utility from "../../Utility";
import { connect } from "react-redux";
import { getRecentPosts } from "../../AsyncActions/UserCenter";
import * as Actions from "../../Actions/UserCenter";
import { RootState } from "../../Store";

interface Props {
  userRecentPosts: UserRecentPost[];
  isLoading: boolean;
  hasTotal: boolean;
  getInfo: (page: number) => void;
  clearPosts: () => void;
}

//用户中心主页帖子动态组件
class Activities extends React.Component<Props> {
  /**
   * 滚动没有分页信息，用自定义页数替代
   */
  _page = 1;
  /**
   * 每次读取页数时给page加一
   */
  get page() {
    return this._page++;
  }

  scrollHandler = async (e) => {
    let pageYLeft = document.body.scrollHeight - window.pageYOffset;

    if (pageYLeft < 1500 && this.props.isLoading === false) {
      this.props.getInfo(this.page);
    }
  };

  componentWillMount() {
    let shouldLoad = !this.props.hasTotal;
    for (let i = 0; i < this.props.userRecentPosts.length; i++) {
      if (!this.props.userRecentPosts[i]) {
        this.props.clearPosts();
        shouldLoad = true;
        break;
      }
    }
    if (shouldLoad) {
      this.props.getInfo(this.page);
      window.addEventListener("scroll", this.scrollHandler);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.hasTotal) {
      window.removeEventListener("scroll", this.scrollHandler);
    }
  }

  render() {
    if (this.props.userRecentPosts.length === 0 && this.props.hasTotal) {
      return (
        <div className="user-posts" style={{ marginLeft: "2rem" }}>
          没有主题
        </div>
      );
    }

    //state转换为JSX
    const userRecentPosts = this.props.userRecentPosts.map((item) => (
      <Topic key={item.id} userRecentTopic={item} />
    ));
    //添加分隔线
    for (let i = 1; i < userRecentPosts.length; i += 2) {
      userRecentPosts.splice(i, 0, <hr key={i} />);
    }
    return (
      <div className="user-posts">
        {userRecentPosts}
        {this.props.isLoading ? (
          <div className="user-center-loading">
            <p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapState(store: RootState) {
  return {
    userRecentPosts: store.userInfo.recentPosts,
    hasTotal: store.userInfo.hasTotal.myposts,
    isLoading: store.userInfo.isLoading,
  };
}

function mapDispatch(dispatch) {
  return {
    getInfo: (page: number) => {
      dispatch(getRecentPosts(page));
    },
    clearPosts: () => {
      dispatch(Actions.changeUserRecentPosts({ posts: [], total: 0 }));
      dispatch(Actions.usercenterPageLoadUnfinish());
    },
  };
}

export default connect(mapState, mapDispatch)(Activities);
