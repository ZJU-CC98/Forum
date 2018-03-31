import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from '../../Store';
import * as Actions from '../../Actions/UserCenter';
import * as Appstate from '../../States/AppState';
import { RootState } from '../../Store';
import * as Utility from '../../Utility';

/**
 * 获取用户的粉丝信息
 * @param page 当前页数
 * @author AsukaSong
 */
export const getUserFansInfo: ActionCreator<ThunkAction<Promise<Action>, RootState, void>> = (page: number) => async (dispatch, getState) => {
    try {
        dispatch(Actions.userCenterLoading());
        const store = getState().userInfo;
        // 没有粉丝
        if (store.currentUserInfo.fanCount === 0) {
            return dispatch(Actions.userCenterLoaded());
        }
        // 如果未请求完所有帖子并且帖子总数小于请求的页数
        // 换言之，当用户向后翻页，或直接通过url定位页数时
        let shouldLoad = store.currentUserFansInfo.length < (page - 1) * 10 + 1;
        // 当用户向前翻页，且之前的页数中存在未加载过的项
        if (!shouldLoad) {// 需要加载就不用判断了，节省资源
            for (let i = (page - 1) * 10; i <  Math.min(page * 10, store.currentUserFansInfo.length); i++) {
                if (!store.currentUserFansInfo[i]) {
                    shouldLoad = true;
                    break;
                }
            }
        }
        if (!shouldLoad) {
            return dispatch(Actions.userCenterLoaded());
        }
        let url = `/me/follower?from=${(page - 1) * 10}&size=10`;
        const headers = await Utility.formAuthorizeHeader();
        let res = await Utility.cc98Fetch(url, { headers });
        if (res.status !== 200) { throw new Error(res.statusText); }
        const data: number[] = await res.json();
        // 当请求到空数组时，必然是因为用户通过url访问到了越界的长度
        if (data.length === 0) {
            dispatch(Actions.changeUserFansInfo([]));
            dispatch(Actions.usercenterPageLoadFinish(0));
            return dispatch(Actions.userCenterLoaded());
        }
        const query = data.join('&id=');
        url = `/user?id=${query}`;
        res = await Utility.cc98Fetch(url, { headers });
        if (res.status !== 200) { throw new Error(res.statusText); }
        const fanData: Appstate.UserInfo[] = await res.json();
        const prevFans = store.currentUserFansInfo;
        fanData.forEach((item, index) => prevFans[index + (page - 1) * 10] = item);
        dispatch(Actions.changeUserFansInfo(prevFans));
        return dispatch(Actions.userCenterLoaded());
    } catch (e) {
        return dispatch(Actions.userCenterError(e.message));
    }
}
