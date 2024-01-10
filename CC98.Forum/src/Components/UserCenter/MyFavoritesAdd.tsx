import { Select } from "antd";
import React from "react";
import { getFavoriteAllTopic } from "../../Utility";

const { Option } = Select;
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
type ModalcontentProps = { option: (e: any) => void };
class MyFavoritesAddModalcontent extends React.Component<ModalcontentProps> {
  state = {
    favoriteTopicList: defaultFavoriteTopicGroup,
  };
  componentDidMount(): void {
    this.updateFavoriteTopicList();
  }

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
  };
  render(): React.ReactNode {
    const options = this.state.favoriteTopicList.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name + " (" + item.count + ")"}
      </Option>
    ));
    return (
      <Select
        style={{
          width: 180,
          marginRight: 40,
        }}
        defaultValue={0}
        onChange={(value) => this.props.option(value)}
      >
        {options}
      </Select>
    );
  }
}
export default MyFavoritesAddModalcontent;