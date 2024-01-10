import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import * as Actions from "../../Actions/UserCenter";
import * as Appstate from "../../States/AppState";
import { RootState, RootAction } from "../../Store";
import * as Utility from "../../Utility";

/**
 * 获取用户收藏的主题
 * @param page 当前页数
 * @author AsukaSong
 */
export const getFavoritePosts: ActionCreator<ThunkAction<Promise<Action>, RootState, void, RootAction>> = (
  page: number,
  order: number = 0,
  group: number = 0,
  //TODO: 下面这段forceLoad基本可以干掉了，我检索了一下这个函数，强制load一直都是true
  forceLoad = false,
  keyword: string = ""
) => async (dispatch, getState) => {
  console.log("getFavoritePosts", page, order, group, forceLoad, keyword);
  try {
    const from = (page - 1) * 10;
    let url = "";
    if (keyword) {
      url = `/topic/me/search-favorite?from=${from}&size=11&keyword=${keyword}`;
    } else {
      url = `/topic/me/favorite?from=${from}&size=11&order=${order}&groupid=${group}`;
    }
    dispatch(Actions.userCenterLoading());
    const userInfo = getState().userInfo;
    const favorPosts = getState().userInfo.currentUserFavoriteTopics;
    const hasTotal = getState().userInfo.hasTotal.myfavoriteposts;
    // debugger;
    if (!forceLoad) {
      // 如果未请求完所有帖子并且帖子总数小于请求的页数
      // 换言之，当用户向后翻页，或直接通过url定位页数时
      let shouldLoad = favorPosts.length < (page - 1) * 10 + 1 && !hasTotal;
      // 当用户向前翻页，且翻页后的部分中存在undefined时
      // 仅当用户通过url定位页数后向前翻页才会出现的情况
      for (let i = (page - 1) * 10; i < Math.min(favorPosts.length, page * 10); i++) {
        if (!favorPosts[i]) {
          shouldLoad = true;
          break;
        }
      }
      if (!shouldLoad) {
        return dispatch(Actions.userCenterLoaded());
      }
    }

    // 请求11条信息
    const headers = await Utility.formAuthorizeHeader();
    const res = await Utility.cc98Fetch(url, { headers });
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const posts: Appstate.UserRecentTopic[] = await res.json();
    let i = posts.length === 11 ? 10 : posts.length;
    // 如果小于11条则总数加载完毕
    if (posts.length !== 11) {
      console.log("total loaded");
      dispatch(Actions.usercenterPageLoadFinish(page));
    }
    // 显示其中10条
    favorPosts.splice(0, favorPosts.length);
    posts.forEach((item) => {
      favorPosts.push(item);
    });
    return dispatch(Actions.userCenterLoaded());
  } catch (e) {
    return dispatch(Actions.userCenterError(e.message));
  }
};
