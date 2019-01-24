import {
  getToken,
  formAuthorizeHeader,
  cc98Fetch
} from '../../Utility/fetchUtility';

export async function getBoardInfo(boardId: string) {
  const headers = await formAuthorizeHeader();
  const url = `/board/${boardId}`;
  const response = await cc98Fetch(url, { headers });
  switch (response.status) {
    case 404:
      return 'not found';
    case 500:
      return 'server error';
  }
  const data = await response.json();
  if (data.canEntry === false) {
    return 'unauthorized';
  }
  return data;
}

export async function getNormalTopics(boardId: number, page: string) {
  const from = (parseInt(page) - 1) * 20;
  const url = `/board/${boardId}/topic?from=${from}&size=20`;
  return await getTopics(url);
}

export async function getBestTopics(boardId: number, page: string) {
  const from = (parseInt(page) - 1) * 20;
  const url = `/topic/best/board/${boardId}?from=${from}&size=20`;
  return await getTopics(url);
}

export async function getSaveTopics(boardId: number, page: string) {
  const from = (parseInt(page) - 1) * 20;
  const url = `/topic/save/board/${boardId}?from=${from}&size=20`;
  return await getTopics(url);
}

export async function getTagTopics(
  boardId: number,
  page: string,
  tag1: number,
  tag2: number
) {
  const from = (parseInt(page) - 1) * 20;
  let query = '';
  if (tag1 !== -1) {
    query += `tag1=${tag1}&`;
  }
  if (tag2 !== -1) {
    query += `tag2=${tag1}&`;
  }
  const url = `/topic/search/board/${boardId}/tag?${query}from=${from}&size=20`;
  return await getTopics(url);
}

export async function getTopTopics(boardId: number) {
  const headers = await formAuthorizeHeader();
  const url = `/topic/toptopics?boardid=${boardId}`;
  const response = await cc98Fetch(url, { headers });
  switch (response.status) {
    case 404:
      return 'not found';
    case 500:
      return 'server error';
  }
  const data = await response.json();
  return data;
}

export async function getShortTopic(topicId: number) {
  const headers = await formAuthorizeHeader();
  const url = `/topic/${topicId}/post?from=0&size=10`;
  const response = await cc98Fetch(url, { headers });
  switch (response.status) {
    case 404:
      return 'not found';
    case 500:
      return 'server error';
  }
  const data = await response.json();
  return data;
}

export async function getTopics(url: string) {
  const headers = await formAuthorizeHeader();
  const response = await cc98Fetch(url, { headers });
  switch (response.status) {
    case 404:
      return 'not found';
    case 500:
      return 'server error';
  }
  const data = await response.json();
  return data;
}

export async function getTags(boardId: number) {
  const headers = await formAuthorizeHeader();
  const url = `/board/${boardId}/tag`;
  const response = await cc98Fetch(url, { headers });
  const data = await response.json();
  return data;
}
