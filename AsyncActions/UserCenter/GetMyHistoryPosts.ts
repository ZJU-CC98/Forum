import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import * as Actions from "../../Actions/UserCenter";
import * as Appstate from "../../States/AppState";
import { RootState, RootAction } from "../../Store";
import * as Utility from "../../Utility";

/**
 * 获取用户我的足迹的主题
 * @param page 当前页数
 * @author XSYangtuo
 */
export const getHistoryPosts: ActionCreator<ThunkAction<Promise<Action>, RootState, void, RootAction>> = (
  page: number,
  //TODO: 下面这段forceLoad基本可以干掉了，我检索了一下这个函数，强制load一直都是true
  forceLoad = false,
) => async (dispatch, getState) => {
  console.log("getHistoryPosts", page, forceLoad);
  try {
    const from = (page - 1) * 10;
    let url = `/me/browsing-record?from=${from}&size=11`;
    dispatch(Actions.userCenterLoading());
    const userInfo = getState().userInfo;
    const historyPosts = getState().userInfo.currentMyHistoryTopics;
    const hasTotal = getState().userInfo.hasTotal.myhistory;
    // debugger;
    if (!forceLoad) {
      // 如果未请求完所有帖子并且帖子总数小于请求的页数
      // 换言之，当用户向后翻页，或直接通过url定位页数时
      let shouldLoad = historyPosts.length < (page - 1) * 10 + 1 && !hasTotal;
      // 当用户向前翻页，且翻页后的部分中存在undefined时
      // 仅当用户通过url定位页数后向前翻页才会出现的情况
      for (let i = (page - 1) * 10; i < Math.min(historyPosts.length, page * 10); i++) {
        if (!historyPosts[i]) {
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
    if(res.status === 403) {
      alert("你刷新的太快啦！可以晚些刷新");
    }
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    const resJSON:any|undefined|null = await res.json();
    const posts: Appstate.UserRecentTopic[]|undefined|null = resJSON?.data;

    if(!posts || posts.length === 0) {
      console.log("no posts");
      historyPosts.splice(0, historyPosts.length);
      return dispatch(Actions.userCenterLoaded());
    }
    getState().userInfo.totalPage.myhistory = Math.ceil((resJSON.count)/ 10) || page+1;
    let i = posts.length === 11 ? 10 : posts.length;
    // 如果小于11条则总数加载完毕
    if (posts.length !== 11) {
      console.log("total loaded");
      dispatch(Actions.usercenterPageLoadFinish(page));
    }
    // 显示其中10条
    historyPosts.splice(0, historyPosts.length);
    posts.forEach((item) => {
      historyPosts.push(item);
    });
    return dispatch(Actions.userCenterLoaded());
  } catch (e) {
    return dispatch(Actions.userCenterError(e.message));
  }
};
/**
 * 更改用户开关历史记录功能
 * @param enabled 是否开启历史记录功能
 * @author XSYangtuo
 */
export const setBrowsingHistoryEnabled: ActionCreator<ThunkAction<Promise<Action>, RootState, void, RootAction>> = (
  enabled: boolean
) => async (dispatch, getState) => {
  const url = `/me/browsing-history?enabled=${enabled?'true':'false'}`;
  const headers = await Utility.formAuthorizeHeader();
  const res = await Utility.cc98Fetch(url, { method: "PUT",headers });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  getState().userInfo.browsingHistoryEnabled = enabled;
  if(enabled){
    return dispatch(getHistoryPosts(1, true));
  } else {
    getState().userInfo.currentMyHistoryTopics = [];
    return dispatch(Actions.userCenterLoaded());
  }
}
  