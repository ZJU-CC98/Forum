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
import { getFavoritePosts } from "../../AsyncActions/UserCenter";
import { ThunkDispatch } from "redux-thunk";
import Button from "antd/es/button";
import { getFavoriteAllTopic } from "../../Utility";
import { type } from "os";
import MyFavoritesPostsManager from "./MyFavortitesManage";

const { Search } = Input;
const { Option } = Select;

type ownProps = {
  currentUserFavoriteTopics: UserRecentTopic[];
  totalPage: number;
  hasTotal: boolean;
  isLoading: boolean;
  getInfo: (
    page: number,
    order: number,
    group: number,
    forceLoad: boolean | undefined,
    keyword?: string
  ) => void;
  changePage: () => void;
};

type ownMatch = {
  page: string;
  order: string;
  group: string;
};

enum PostOrder {
  PostTime = 0, // 发帖时间
  LastReply = 1, // 最后回复时间
  FavorTime = 2, // 收藏时间
}

const defaultGroup = 0;

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

type FavoriteTopicGroupType = {
  count: number;
  createTime: string;
  id: number;
  name: string;
};

const defaultFavoriteTopicGroup: FavoriteTopicGroupType[] = [
  {
    id: 0,
    name: "默认分组",
    count: 10,
    createTime: "1998-09-08T09:08:00+08:00",
  },
];

/**
 * 用户中心我收藏的帖子组件
 */
class Posts extends React.Component<Props> {
  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false,
    favoriteTopicList: defaultFavoriteTopicGroup,
  };
  componentWillReceiveProps(newProps: Props) {
    if (
      this.props.match.params.page !== newProps.match.params.page ||
      this.props.match.params.order !== newProps.match.params.order ||
      this.props.match.params.group !== newProps.match.params.group
    ) {
      const curPage = parseInt(newProps.match.params.page) || 1;
      this.props.getInfo(
        curPage,
        Number(newProps.match.params.order),
        Number(newProps.match.params.group),
        true,
        this.keyword
      );
      window.scroll(0, 0);
    }
  }
  keyword = "";
  async componentDidMount() {
    const curPage = Number(this.props.match.params.page || "1");
    const order = Number(this.props.match.params.order);
    const group = Number(this.props.match.params.group || "0");
    const keyword = this.getkeyword();
    // 手动输入企图搜索且排序时重定向
    if (order !== PostOrder.LastReply && keyword !== "") {
      this.props.history.replace(
        `/usercenter/myfavorites/order/0/group/0/1?keyword=${keyword}`
      );
    }
    this.keyword = keyword;
    this.updateFavoriteTopicList();
    // favoriteTopicList.ok && this.setState({ favoriteTopicList: favoriteTopicList.body });
    // console.log(favoriteTopicList.json());
    this.props.getInfo(curPage, order,group, true, this.keyword);
    this.props.changePage();
  }

  changeGroupAndOrderAndKeyword = (group:number,order: number, keyword: string = "") => {
    console.log(group,order,keyword);
    if (keyword) {
      this.props.getInfo(1, 0,0, true, keyword);
      this.props.history.push(
        `/usercenter/myfavorites/order/0/group/0/1?keyword=${keyword}`
      );
    } else {
      this.props.getInfo(1, order,group, true);
      this.keyword = "";
      this.props.history.push(`/usercenter/myfavorites/order/${order}/group/${group}/1`);
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

  updateFavoriteTopicList = async () => {
    try {
      let favoriteTopicList = await getFavoriteAllTopic();
      console.log(favoriteTopicList);
      this.setState({
        favoriteTopicList:
          favoriteTopicList.errorCode === 0
            ? favoriteTopicList.data
            : defaultFavoriteTopicGroup,
      });
    } catch (e) {
      this.setState({ favoriteTopicList: defaultFavoriteTopicGroup });
      console.log(e);
    }
  }

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
    const group = Number(this.props.match.params.group); 

    const handleSearch = (keyword: string) => {
      this.keyword = keyword;
      this.changeGroupAndOrderAndKeyword(defaultGroup,order, keyword);
    };

    console.log(this.state.favoriteTopicList);
    const options = this.state.favoriteTopicList.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name+"("+item.count+")"}
      </Option>
    ));
    return (
      <div className="user-posts">
        <div className="user-post-operator">
          <Select
            value={group}
            style={{
              width: 180,
              marginRight: 40,
            }}
            onChange={(value: number) => {
              this.changeGroupAndOrderAndKeyword(value,order);
            }}
          >
            {options}
          </Select>
          <Select
            value={order}
            style={{
              width: 180,
              marginRight: 40,
            }}
            onChange={(value: number) => {
              this.changeGroupAndOrderAndKeyword(group,value);
            }}
          >
            <Option value={PostOrder.PostTime}>按发帖时间排序</Option>
            <Option value={PostOrder.LastReply}>按最后回复排序</Option>
            <Option value={PostOrder.FavorTime}>按收藏顺序排序</Option>
          </Select>
          <Search
            defaultValue={this.keyword}
            placeholder="输入关键词"
            onSearch={handleSearch}
            style={{ width: 280, marginRight: 30 }}
            enterButton={
              <Button type="primary" style={{ width: 60 }}>
                搜索
              </Button>
            }
          />
          <MyFavoritesPostsManager history={this.props.history} updateFavoriteTopicList={this.updateFavoriteTopicList} favoriteTopicList={this.state.favoriteTopicList}/>
          <br />
          <div className="user-post-operator-tips">
            收藏搜索目前只能按照最后回复排序
          </div>
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
              keyword={this.keyword}
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
    getInfo: (
      page: number,
      order: number,
      group: number,
      forceLoad: boolean | undefined,
      keyword = ""
    ) => {
      dispatch(getFavoritePosts(page, order, group,forceLoad, keyword));
    },
  };
}

export default connect(mapState, mapDispatch)(withRouter(Posts));
