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
import { Select, Input } from "antd";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getFavoritePosts } from "../../AsyncActions/UserCenter";
import { ThunkDispatch } from "redux-thunk";
import Button from "antd/es/button";

const { Search } = Input;
const { Option } = Select;

type ownProps = {
  currentUserFavoriteTopics: UserRecentTopic[];
  totalPage: number;
  hasTotal: boolean;
  isLoading: boolean;
  getInfo: (page: number, order: number, forceLoad: boolean | undefined, keyword?: string) => void;
  changePage: () => void;
};

type ownMatch = {
  page: string;
  order: string;
};

enum PostOrder {
  LastReply = 0, // 最后回复时间
  PostTime = 1, // 发帖时间
  FavorTime = 2, // 收藏时间
}

type Props = RouteComponentProps<ownMatch> & ownProps;

const parseSearch = (str: string) => {
  const obj = {};
  const queryStr = str.replace("?", "");
  const KeyValues = queryStr.split("&");
  for (const kv of KeyValues) {
    const [key, value] = kv.split("=");
    obj[key] = decodeURI(value);
  }
  return obj;
};

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
      this.props.getInfo(curPage, Number(newProps.match.params.order), true, this.keyword);
      window.scroll(0, 0);
    }
  }
  keyword = "";
  componentDidMount() {
    const curPage = Number(this.props.match.params.page || "1");
    const order = Number(this.props.match.params.order);
    const keyword = this.getkeyword();
    // 手动输入企图搜索且排序时重定向
    if (order !== PostOrder.LastReply && keyword !== "") {
      this.props.history.replace(`/usercenter/myfavorites/order/0/1?keyword=${keyword}`);
    }
    this.keyword = keyword;
    this.props.getInfo(curPage, order, true, this.keyword);
    this.props.changePage();
  }

  changeOrderAndKeyword = (order: number, keyword: string = "") => {
    if (keyword) {
      this.props.getInfo(1, 0, true, keyword);
      this.props.history.push(`/usercenter/myfavorites/order/0/1?keyword=${keyword}`);
    } else {
      this.props.getInfo(1, order, true);
      this.keyword = "";
      this.props.history.push(`/usercenter/myfavorites/order/${order}/1`);
    }
  };

  getkeyword = () => {
    const queryStr = this.props.location.search;
    if (!queryStr) {
      return "";
    } else {
      const data = parseSearch(queryStr);
      return data["keyword"] || "";
    }
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div className="user-center-loading">
          <p className="fa fa-spinner fa-pulse fa-2x fa-fw"></p>
        </div>
      );
    }
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
    const curPage = parseInt(this.props.match.params.page) || 1;
    const totalPage = this.props.hasTotal ? this.props.totalPage : curPage + 1;
    //state转换为JSX
    let userRecentPosts = this.props.currentUserFavoriteTopics.map((item) => (
      <Topic key={item.id} userRecentTopic={item} />
    ));
    //添加分隔线
    for (let i = 1; i < userRecentPosts.length; i += 2) {
      userRecentPosts.splice(i, 0, <hr key={i} />);
    }
    const order = Number(this.props.match.params.order);

    const handleSearch = (keyword: string) => {
      this.keyword = keyword;
      this.changeOrderAndKeyword(order, keyword);
    };
    return (
      <div className="user-posts">
        <div className="user-post-operator">
          <Select
            value={order}
            style={{
              width: 180,
              marginRight: 40,
            }}
            onChange={(value: number) => {
              this.changeOrderAndKeyword(value);
            }}
          >
            <Option value={PostOrder.LastReply}>按最后回复排序</Option>
            <Option value={PostOrder.PostTime}>按发帖时间排序</Option>
            <Option value={PostOrder.FavorTime}>按收藏顺序排序</Option>
          </Select>
          <Search
            defaultValue={this.keyword}
            placeholder="输入关键词"
            onSearch={handleSearch}
            style={{ width: 280 }}
            enterButton={
              <Button type="primary" style={{ width: 60 }}>
                搜索
              </Button>
            }
          />
          <div className="user-post-operator-tips">收藏搜索目前只能按照最后回复排序</div>
        </div>
        <hr />
        {this.props.currentUserFavoriteTopics.length === 0 ? (
          emptyPage
        ) : (
          <>
            {userRecentPosts}
            <Pager
              currentPage={curPage}
              totalPage={totalPage}
              href={`/usercenter/myfavorites/order/${order}/`}
              hasTotal={this.props.hasTotal}
            />
          </>
        )}
      </div>
    );
  }
}

function mapState(store: RootState) {
  return {
    currentUserFavoriteTopics: store.userInfo.currentUserFavoriteTopics,
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
    getInfo: (page: number, order: number, forceLoad: boolean | undefined, keyword = "") => {
      dispatch(getFavoritePosts(page, order, forceLoad, keyword));
    },
  };
}

export default connect(mapState, mapDispatch)(withRouter(Posts));
