import { Button, Form, Input, Menu, Modal, Select, Tabs, message } from "antd";
import * as React from "react";
import {
  createFavGroup,
  deleteFavGroup,
  getFavoriteAllTopic,
  noticeMessageShow,
  updateFavGroup,
} from "../../Utility";
import { FormComponentProps } from "antd/es/form";
import { type } from "os";
const Item = Menu.Item;
const FormItem = Form.Item;
type FavoriteTopicGroupType = {
  count: number;
  createTime: string;
  id: number;
  name: string;
};
const { Option } = Select;
const defaultFavoriteTopicGroup: FavoriteTopicGroupType[] = [
  {
    id: 0,
    name: "默认分组",
    count: 10,
    createTime: "1998-09-08T09:08:00+08:00",
  },
];
enum Options {
  Default = "0",
  Create = "1",
  Rename = "2",
  Delete = "3",
}
import { History } from "history";
import { NoticeMessage } from "../NoticeMessage";
type Props = FormComponentProps<any> & {
  history: History;
  updateFavoriteTopicList: () => Promise<void>;
  favoriteTopicList: FavoriteTopicGroupType[];
};
export default Form.create<Props>()(
  class MyFavoritesPostsManager extends React.Component<Props> {
    state = {
      visible: false,
      option: Options.Create,
      confirmLoading: false,
      // favoriteTopicList: defaultFavoriteTopicGroup,
    };

    async componentDidMount() {
    }
    handleMenuClick = (e: { key: any }) => {
      this.setState({
        option: e.key,
      });
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleOk = async (e: any) => {
      this.props.form.validateFields(async (err, values) => {
        if (err) {
          return false;
        }
        this.setState({
          confirmLoading: true,
        });
        switch (this.state.option) {
          case Options.Create:
            console.log(this.props.form.getFieldsValue());
            let createRes = await createFavGroup(
              this.props.form.getFieldValue("name")
            );
            if (createRes !== "ok") {
              noticeMessageShow("maxFavGroup");
              return false;
            }
            break;
          case Options.Rename:
            console.log(this.props.form.getFieldsValue());
            let renameRes = await updateFavGroup(
              this.props.form.getFieldValue("id"),
              this.props.form.getFieldValue("name")
            );
            if (renameRes !== "ok") {
              noticeMessageShow("other");
              return false;
            }
            break;
          case Options.Delete:
            console.log(this.props.form.getFieldsValue());
            let deleteRes = await deleteFavGroup(
              this.props.form.getFieldValue("id")
            );
            if (deleteRes !== "ok") {
              noticeMessageShow("other");
              return false;
            }
            break;
          default:
            break;
        }
        console.log(this.props.form.getFieldsValue());
        noticeMessageShow("success");
        await this.props.updateFavoriteTopicList();
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      });
    };

    handleCancel = () => {
      console.log("Clicked cancel button");
      this.setState({
        visible: false,
      });
    };
    render() {
      const { getFieldDecorator } = this.props.form;
      const { visible, confirmLoading } = this.state;
      const options = this.props.favoriteTopicList.map((item) =>
        item.id === 0 ? null : (
          <Option key={item.id} value={item.id}>
            {item.name + "(" + item.count + ")"}
          </Option>
        )
      );
      const isFavoriteTopicListMax =
        this.props.favoriteTopicList.length - 1 === 10;
      let EmptyForm = (
        <Form>
          <div>没有可供操作的收藏组</div>
          <div>默认分组不可删除或重命名</div>
        </Form>
      );
      let createForm = (
        <Form>
          <FormItem label="分组名称">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: this.state.option === Options.Create,
                  max: 20,
                  message: "请输入最多二十个字符且不为空的名称",
                },
              ],
            })(<Input disabled={isFavoriteTopicListMax} />)}
            {`目前支持的分组上限为10个，你已经创建了${
              this.props.favoriteTopicList.length - 1
            }个分组`}
          </FormItem>
        </Form>
      );

      let renameForm =
        this.props.favoriteTopicList.length === 1 ? (
          EmptyForm
        ) : (
          <Form>
            <FormItem label="分组名称">
              {getFieldDecorator("id", {
                rules: [
                  {
                    required: this.state.option === Options.Rename,
                    message: "请选择需要更名的收藏组",
                  },
                ],
              })(<Select>{options}</Select>)}
            </FormItem>
            <FormItem label="新分组名称">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: this.state.option === Options.Rename,
                    max: 20,
                    message: "请输入最多二十个字符且不为空的名称",
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Form>
        );

      let deleteForm =
        this.props.favoriteTopicList.length === 1 ? (
          EmptyForm
        ) : (
          <Form>
            <FormItem label="分组名称">
              {getFieldDecorator("id", {
                rules: [
                  {
                    required: this.state.option === Options.Delete,
                    message: "请选择需要删除的收藏组",
                  },
                ],
              })(<Select>{options}</Select>)}
            </FormItem>
          </Form>
        );

      let optionForm = null;
      switch (this.state.option) {
        case Options.Create:
          optionForm = createForm;
          break;
        case Options.Rename:
          optionForm = renameForm;
          break;
        case Options.Delete:
          optionForm = deleteForm;
          break;
        default:
          break;
      }

      return (
        <span>
          <Button type="primary" style={{ width: 80 }} onClick={this.showModal}>
            管理分组
          </Button>
          <NoticeMessage
            text="收藏分组达到上限"
            id="maxFavGroup"
            top="33%"
            left="40%"
          />
          <NoticeMessage text="操作成功" id="success" top="33%" left="40%" />
          <NoticeMessage text="操作失败" id="other" top="33%" left="40%" />
          <Modal
            title="收藏管理"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            key="FavoriteTopicManageModal"
            destroyOnClose={true}
          >
            <div style={{ height: "250px" }}>
              <Menu
                onClick={this.handleMenuClick}
                selectedKeys={[this.state.option + ""]}
                mode="horizontal"
                style={{
                  display: "flex",
                  marginBottom: "1rem",
                  justifyContent: "space-around",
                }}
              >
                <Item key="1">新增分组</Item>
                <Item key="2">编辑分组</Item>
                <Item key="3">删除分组</Item>
              </Menu>
              {optionForm}
            </div>
          </Modal>
        </span>
      );
    }
  }
);
