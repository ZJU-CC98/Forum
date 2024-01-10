import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import * as Actions from "../../Actions/UserCenter";
import * as Appstate from "../../States/AppState";
import { RootState, RootAction } from "../../Store";
import * as Utility from "../../Utility";

/**
 * 获取用户最近发过的主题
 * @param page 当前页数
 * @author AsukaSong
 */
export const getRecentTopics: ActionCreator<ThunkAction<
  Promise<Action>,
  RootState,
  void,
  RootAction
>> = (page: number) => async (dispatch, getState) => {
  try {
    dispatch(Actions.userCenterLoading());
    const recentPosts = getState().userInfo.recentTopics;
    const hasTotal = getState().userInfo.hasTotal.mytopics;
    // 如果未请求完所有帖子并且帖子总数小于请求的页数
    // 换言之，当用户向后翻页，或直接通过url定位页数时
    let shouldLoad = recentPosts.length < (page - 1) * 10 + 1 && !hasTotal;
    // 当用户向前翻页，且翻页后的部分中存在undefined时
    // 仅当用户通过url定位页数后向前翻页才会出现的情况
    for (
      let j = (page - 1) * 10;
      j < Math.min(recentPosts.length, page * 10);
      j++
    ) {
      if (!recentPosts[j]) {
        shouldLoad = true;
        break;
      }
    }
    if (!shouldLoad) {
      return dispatch(Actions.userCenterLoaded());
    }
    // 请求11条信息
    const url = `/me/recent-topic?from=${(page - 1) * 10}&size=11`;
    const headers = await Utility.formAuthorizeHeader();
    const res = await Utility.cc98Fetch(url, { headers });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const posts: Appstate.UserRecentTopic[] = await res.json();
    let i = posts.length === 11 ? 10 : posts.length;
    // 如果小于11条则总数加载完毕
    if (posts.length !== 11) {
      dispatch(Actions.usercenterPageLoadFinish(page));
    }
    // 显示其中10条
    while (i--) {
      // Store中记录所有的主题
      posts[i].boardName = await Utility.getBoardName(posts[i].boardId);
      recentPosts[(page - 1) * 10 + i] = posts[i];
    }
    dispatch(Actions.changeUserRecentTopics(recentPosts));
    return dispatch(Actions.userCenterLoaded());
  } catch (e) {
    return dispatch(Actions.userCenterError(e.message));
  }
};
interface PostsAndTotal {
  posts: Appstate.UserRecentPost[];
  total: number;
}
/**
 * 获取用户最近的回复
 * @param page 当前页数
 * @author AsukaSong
 */
export const getRecentPosts: ActionCreator<ThunkAction<
  Promise<Action>,
  RootState,
  void,
  RootAction
>> = (page: number, ishot: number) => async (dispatch, getState) => {
  try {
    dispatch(Actions.userCenterLoading());
    const recentPosts = getState().userInfo.recentPosts;
    const hasTotal = getState().userInfo.hasTotal.myposts;
    // 如果未请求完所有帖子并且帖子总数小于请求的页数
    // 换言之，当用户向后翻页，或直接通过url定位页数时
    let shouldLoad = true;
    if (!shouldLoad) {
      return dispatch(Actions.userCenterLoaded());
    }
    // 请求11条信息
    const url = `/me/${ishot === 0 ? "recent" : "hot"}-post?from=${(page - 1) *
      10}&size=11`;
    const headers = await Utility.formAuthorizeHeader();
    const res = await Utility.cc98Fetch(url, { headers });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    const posts: Appstate.UserRecentPost[] = data.data;
    const total = Math.floor(data.count / 10) + 1;
    let i = posts.length === 11 ? 10 : posts.length;
    // 如果小于11条则总数加载完毕
    if (posts.length !== 11) {
      dispatch(Actions.usercenterPageLoadFinish(page));
    }
    // 显示其中10条
    while (i--) {
      // Store中记录所有的主题
      posts[i].boardName = await Utility.getBoardName(posts[i].boardId);
      recentPosts[(page - 1) * 10 + i] = posts[i];
    }
    dispatch(
      Actions.changeUserRecentPosts({
        posts: recentPosts,
        total,
      } as PostsAndTotal)
    );
    return dispatch(Actions.userCenterLoaded());
  } catch (e) {
    return dispatch(Actions.userCenterError(e.message));
  }
};

/**
 * 获取用户发过的热门回复
 * @param page 当前页数
 * @author AsukaSong
 */
export const getHotPosts: ActionCreator<ThunkAction<
  Promise<Action>,
  RootState,
  void,
  RootAction
>> = (page: number) => async (dispatch, getState) => {
  try {
    dispatch(Actions.userCenterLoading());
    const recentPosts = getState().userInfo.recentPosts;
    const hasTotal = getState().userInfo.hasTotal.myposts;
    // 如果未请求完所有帖子并且帖子总数小于请求的页数
    // 换言之，当用户向后翻页，或直接通过url定位页数时
    let shouldLoad = recentPosts.length < (page - 1) * 10 + 1 && !hasTotal;
    // 当用户向前翻页，且翻页后的部分中存在undefined时
    // 仅当用户通过url定位页数后向前翻页才会出现的情况
    for (
      let j = (page - 1) * 10;
      j < Math.min(recentPosts.length, page * 10);
      j++
    ) {
      if (!recentPosts[j]) {
        shouldLoad = true;
        break;
      }
    }
    if (!shouldLoad) {
      return dispatch(Actions.userCenterLoaded());
    }
    // 请求11条信息
    const url = `/me/hot-post?from=${(page - 1) * 10}&size=11`;
    const headers = await Utility.formAuthorizeHeader();
    const res = await Utility.cc98Fetch(url, { headers });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    const posts: Appstate.UserRecentPost[] = data.data;
    const total = Math.floor(data.count / 10) + 1;
    let i = posts.length === 11 ? 10 : posts.length;
    // 如果小于11条则总数加载完毕
    if (posts.length !== 11) {
      dispatch(Actions.usercenterPageLoadFinish(page));
    }
    // 显示其中10条
    while (i--) {
      // Store中记录所有的主题
      posts[i].boardName = await Utility.getBoardName(posts[i].boardId);
      recentPosts[(page - 1) * 10 + i] = posts[i];
    }
    dispatch(
      Actions.changeUserHotPosts({ posts: recentPosts, total } as PostsAndTotal)
    );
    return dispatch(Actions.userCenterLoaded());
  } catch (e) {
    return dispatch(Actions.userCenterError(e.message));
  }
};
