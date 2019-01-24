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
  const headers = await formAuthorizeHeader();
  const url = `/Board/${boardId}/topic?from=${page}&size=20`;
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

export async function getTopic(topicId: number) {
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
