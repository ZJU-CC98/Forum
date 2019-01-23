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
