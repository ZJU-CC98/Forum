import * as React from "react";
import { Modal, List, Spin } from "antd";
import { getManageHistory } from "../../Utility";
import moment from "moment";

interface Props {
  visible;
  topicInfo;
  onClose;
}

interface State {
  visible: boolean;
  data: any;
  loading: boolean;
}
export default class extends React.Component<Props, State> {
  state: State = {
    visible: true,
    data: null,
    loading: false,
  };
  onClick = () => this.props.onClose();
  async componentDidMount() {
    this.setState({ loading: true });
    const data = await getManageHistory(this.props.topicInfo.id, 0);
    this.setState({ data, loading: false });
  }
  render() {
    const { topicInfo } = this.props;
    const { visible, data, loading } = this.state;
    return (
      <>
        <Modal
          visible={visible}
          title="管理记录"
          okText="确认"
          cancelText="取消"
          onOk={this.onClick}
          onCancel={this.onClick}
          width={"50rem"}
          style={{ height: "50rem", overflow: "scroll" }}
        >
          {data && (
            <List
              dataSource={data ? data.data : []}
              pagination={{
                onChange: async (page) => {
                  this.setState({ loading: true });
                  const from = (page - 1) * 7;
                  let res = await getManageHistory(topicInfo.id, from);
                  this.setState({ data: res, loading: false });
                },
                pageSize: 7,
                total: data.count,
              }}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={item.content}
                    description={
                      <div>
                        <span>对象:{item.targetUserName || "匿名"}</span>
                        <span
                          style={{ marginLeft: "2rem", marginRight: "2rem" }}
                        >
                          时间:
                          {moment(item.time).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                      </div>
                    }
                  />
                  <div>
                    {" "}
                    <div>操作人:{item.operatorUserName}</div>
                    <div>IP:{item.ip}</div>
                  </div>
                </List.Item>
              )}
            >
              {loading && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          )}
        </Modal>
      </>
    );
  }
}
