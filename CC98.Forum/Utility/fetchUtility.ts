import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  getAccessToken,
} from "./storageUtility";

import {
  Constants, // used in cc98Fetch
} from "../Components/Constant";

import store, { history } from "../Store";
import * as Actions from "../Actions/UserCenter";

/**
 * 获取当前的用户登录令牌。
 * @returns {string} 用户当前有效的登录令牌。
 */
export async function getToken() : Promise<string> {
  const refreshToken = getLocalStorage<string>("refresh_token");
  if (!refreshToken) {
    return null;
  }

  let token = getAccessToken();
  if (token) {
    return token;
  }

  const url = "https://openid.cc98.org/connect/token";
  const requestBody = {
    client_id: "9a1fd200-8687-44b1-4c20-08d50a96e5cd",
    client_secret: "8b53f727-08e2-4509-8857-e34bf92b27f2",
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  const response = await fetch(url, {
    method: "POST",
    headers,
    // body: $.param(requestBody)
    body: Object.keys(requestBody)
      .map((key) => `${key}=${requestBody[key]}`)
      .join("&"),
  });
  const data = await response.json();

  if (data.access_token) {
    token = "Bearer " + encodeURIComponent(data.access_token);
    setLocalStorage("accessToken", token, data.expires_in);
    return token;
  } else {
    removeLocalStorage("userInfo");
    removeLocalStorage("accessToken");
    removeLocalStorage("refresh_token");
    store.dispatch(Actions.userLogOff());
    history.push("/logon");
  }
}

export async function formAuthorizeHeader() : Promise<Headers> {
  const token = await getToken();
  const headers = new Headers();
  headers.append("Authorization", token);
  return headers;
}

export async function cc98Fetch(url, init?: RequestInit) : Promise<Response> {
  // const response1 = await fetch("/config.production.json");
  // let data;
  // if (response1.status !== 404) {
  //     const data1 = await response1.json();
  //     const response2 = await fetch("/config.json");
  //     const data2 = await response2.json();
  //     data = { ...data2, ...data1 };
  // } else {
  //     const response2 = await fetch("/config.json");
  //     data = await response2.json();
  // }
  // const baseUrl = data.apiUrl;

  const baseUrl = Constants.config.apiUrl;
  const fetchUrl = new URL(url, baseUrl).toString();
  let response: Response;
  if (init) {
    response = await fetch(fetchUrl, init);
  } else {
    response = await fetch(fetchUrl);
  }
  return response;
}
