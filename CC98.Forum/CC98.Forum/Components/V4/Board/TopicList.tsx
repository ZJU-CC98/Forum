import * as React from 'react';
import { cc98Fetch } from '../../../Utility/fetchUtility';
// import { IBoard } from '@cc98/api';
import TopicItem from './TopicItem';
import { getUsersInfo } from '../../../Utility/Fetch/getUsersInfo';

interface Props {
  data: any;
  page?: string;
}
interface State {
  topicList: any;
  userMap: any;
}
interface userMap {
  [key: number]: any;
}
export default class extends React.Component<Props, State> {
  state = {
    topicList: [],
    userMap: null
  };

  async componentDidMount() {
    await this.getTopicList();
    await this.getUsersInfo();
  }

  getUsersInfo = async () => {
    const { data } = this.props;
    if (data.anonymousState === 0) {
      const userIds = [];
      const { topicList } = this.state;
      for (const topicItem of topicList) {
        userIds.push(topicItem.userId);
      }
      const usersInfo = await getUsersInfo(userIds);
      console.log(usersInfo);
      const userMap = {};
      usersInfo.forEach(userInfo => {
        if (userInfo) {
          userMap[userInfo.id] = userInfo;
        }
      });
      console.log(userMap);
      this.setState({ userMap });
    }
  };

  getTopicList = async () => {
    const { data, page } = this.props;
    const boardId = data.id;
    const _page = page ? parseInt(page, 10) : 1;
    const from = (_page - 1) * 20;
    const size = 20;
    const url = `/Board/${boardId}/topic?from=${from}&size=${size}`;
    const response = await cc98Fetch(url);
    const topicList = await response.json();
    this.setState({ topicList });
  };

  render() {
    const { topicList, userMap } = this.state;
    return (
      <>
        {topicList.map(
          (data, index) =>
            userMap && (
              <TopicItem
                key={data.id}
                data={data}
                userInfo={userMap[data.userId]}
                index={index}
              />
            )
        )}
      </>
    );
  }
}
