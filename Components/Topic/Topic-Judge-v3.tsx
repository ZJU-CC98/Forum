import * as React from "react";
import Modal from "antd/es/modal";
import Form from "antd/es/form";
import Menu from "antd/es/menu";
import Tag from "antd/es/tag";
import * as Utility from "../../Utility";
import Select from "antd/es/select";
import { FormComponentProps } from "antd/es/form";
import { Empty } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const Item = Menu.Item;
interface FormProps extends FormComponentProps<any> {
  visible;
  onCancel;
  item;
  update;
}
interface FormStates {
  current;
  option;
  loading;
  positiveTags: JudgeTag[];
  negativeTags: JudgeTag[];
}
type JudgeTag = {
  id: number;
  reason: string;
  type: number;
  enabled: boolean;
};

export default Form.create<FormProps>()(
  class extends React.Component<FormProps, FormStates> {
    constructor(props) {
      super(props);
      this.state = {
        current: "0",
        option: "",
        loading: false,
        positiveTags: [],
        negativeTags: [],
      };
    }
    handleChange = (value) => {
      console.log(value);
      this.setState({ option: value });
    };
    onCreate = () => {
      let status = "",
        value = "";
      const form = this.props.form;
      form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        this.setState({ loading: true });
        value = values.reason;
        console.log(value, this.state.current);
        switch (this.state.current) {
          case "1":
            status = await Utility.positiveJudge(this.props.item.id, value, 1);
            break;
          case "2":
            status = await Utility.negativeJudge(this.props.item.id, value, 2);
            break;
          case "0":
            alert("请选择加风评还是扣风评。");
            break;
        }
        this.setState({ loading: false });
        // debugger;
        if (status === "ok") {
          this.props.update();
          this.props.onCancel();
        } else {
          switch (status) {
            case "post_data_error":
              alert("提交数据类型错误");
              break;
            case "cannot_rate_yourself":
              alert("您不能给自己评分哦~");
              break;
            case "post_more_than_7_days":
              alert("超过7天的发言内容无法评分");
              break;
            case "you_cannot_rate":
              alert("您还没有资格评分~");
              break;
            case "board_cannot_rate":
              alert("该版面无法评分");
              break;
            case "has_rated_today":
              alert("您今天已经评分过了~");
              break;
            case "has_rated_this_post":
              alert("您已对当前发言进行过评分操作~");
              break;
            case "post_not_exists":
              alert("发言不存在");
              break;
            case "topic_not_exists":
              alert("主题不存在");
              break;
            case "post_user_not_exists":
              alert("发言用户不存在");
              break;
            default:
              alert("未知错误");
              break;
          }
        }
      });
    };
    handleClick = (e) => {
      //控制加分or扣分选项卡
      console.log("click ", e);
      //如果是加分选项卡，且加分理由未获取，则获取加分理由
      if (e.key === "1" && this.state.positiveTags.length === 0) {
        Utility.getJudgeTags(1).then((res) => {
          this.setState({ positiveTags: res });
        });
      }
      //如果是扣分选项卡，且扣分理由未获取，则获取扣分理由
      if (e.key === "2" && this.state.negativeTags.length === 0) {
        Utility.getJudgeTags(2).then((res) => {
          this.setState({ negativeTags: res });
        });
      }

      //清空已选择的理由
      this.setState({ option: "" });
      //清空表单选中项
      this.props.form.resetFields();

      this.setState({
        current: e.key,
      });
    };

    render() {
      const { visible, onCancel } = this.props;
      const { getFieldDecorator } = this.props.form;

      const positiveForm = (
        <Form key="positiveForm">
          <FormItem label="理由">
            {getFieldDecorator("reason", {
              rules: [{ required: true, message: "请选择理由" }],
            })(
              <Select
                style={{ width: 200 }}
                onChange={this.handleChange}
                key="positiveForm-Select"
              >
                {this.state.positiveTags.map(
                  (tag) =>
                    tag.enabled && (
                      <Option value={tag.id} key={tag.id}>
                        {tag.reason}
                      </Option>
                    )
                )}
              </Select>
            )}
          </FormItem>
        </Form>
      );

      const negativeForm = (
        <Form key="negativeForm">
          <FormItem label="理由">
            {getFieldDecorator("reason", {
              rules: [{ required: true, message: "请选择理由" }],
            })(
              <Select
                style={{ width: 200 }}
                onChange={this.handleChange}
                key="nagativeForm-Select"
              >
                {this.state.negativeTags.map(
                  (tag) =>
                    tag.enabled && (
                      <Option value={tag.id} key={tag.id}>
                        {tag.reason}
                      </Option>
                    )
                )}
              </Select>
            )}
          </FormItem>
        </Form>
      );

      const disabledForm = (
        <Form>
          <FormItem label="理由">
            {getFieldDecorator("reason", {
              rules: [{ required: true, message: "请选择理由" }],
            })(<Select style={{ width: 200 }} disabled={true}></Select>)}
            <div>提示：请先点击“+1”或者“-1”，再选择理由。</div>
          </FormItem>
        </Form>
      );

      return (
        <Modal
          visible={visible}
          title="评分"
          okText="确认"
          cancelText="取消"
          onOk={this.onCreate}
          onCancel={onCancel}
          confirmLoading={this.state.loading}
        >
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{
              display: "flex",
              marginBottom: "1rem",
              justifyContent: "space-around",
            }}
          >
            <Item key="1">
              <img
                style={{ width: "2rem" }}
                src="/static/images/j-plus1.png"
              ></img>
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  fontSize: "16px",
                }}
              >
                +1
              </span>
            </Item>
            <Item disabled>|</Item>
            <Item key="2">
              <img
                style={{ width: "2rem" }}
                src="/static/images/j-minus1.png"
              ></img>
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  fontSize: "16px",
                }}
              >
                -1
              </span>
            </Item>
          </Menu>
          <Tag color="blue">
            500帖以上的用户可以进行评分（每日一次），超过7天的发言内容无法评分。
          </Tag>
          {/* {rcForm} */}
          {this.state.current === "1" ? positiveForm : null}
          {this.state.current === "2" ? negativeForm : null}
          {this.state.current === "0" ? disabledForm : null}
        </Modal>
      );
    }
  }
);
