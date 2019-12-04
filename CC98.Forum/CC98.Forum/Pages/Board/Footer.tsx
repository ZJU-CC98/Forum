import * as React from 'react';
import * as Utility from '../../Utility';
import {
  Button,
  Modal,
  List,
  Spin,
  Transfer,
  Select,
  notification,
  Icon
} from 'antd';
import {
  multiDelete as aDelete,
  multiLock as aLock,
  getBoardRecords
} from './action';
import { Link } from 'react-router-dom';
import { IBoard, ITopic } from '@cc98/api';
import moment from 'moment';

const Option = Select.Option;

interface Props {
  data: IBoard;
  list: ITopic[];
}

interface State {
  visible: boolean;
  tpList: any;
  loading: boolean;
  hasMore: boolean;
  manageVisible: boolean;
  recordVisible: boolean;
}
export default class extends React.Component<Props, State> {
  state = {
    visible: false,
    tpList: [],
    loading: false,
    hasMore: true,
    manageVisible: false,
    recordVisible: false
  };
  showModal = async () => {
    let res = await Utility.getTpUsers(this.props.data.id, 0, 20);
    this.setState({
      visible: true,
      tpList: res
    });
  };
  handleOk = () => {
    this.setState({
      manageVisible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  cancelTp = async item => {
    const response = await Utility.cancelStopBoardPost(
      item.userId,
      this.props.data.id
    );
    if (response === 'ok') {
      let data = await Utility.getTpUsers(this.props.data.id, 0, 5);
      this.setState({ tpList: data });
    } else {
      alert('操作失败,原因：' + response);
    }
  };

  openRecord = () => this.setState({ recordVisible: true });
  render() {
    const { data, list } = this.props;
    const id = data.id;
    const isMaster = Utility.isMaster(data.boardMasters);
    return (
      <>
        <div
          className="row"
          style={{ width: '100%', justifyContent: 'flex-end' }}
        >
          <Button onClick={this.openRecord}>查看版面事件</Button>
          <Button onClick={this.showModal}>小黑屋</Button>
          {isMaster && (
            <Button onClick={() => this.setState({ manageVisible: true })}>
              批量管理
            </Button>
          )}
        </div>

        <Manage
          key={this.state.manageVisible.toString()}
          data={data}
          list={list}
          visible={this.state.manageVisible}
          onClose={this.handleOk}
        />
        <Modal
          title="小黑屋"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={isMaster ? '60rem' : '45rem'}
        >
          <List
            dataSource={this.state.tpList}
            pagination={{
              onChange: async page => {
                const from = (page - 1) * 5;
                let data = await Utility.getTpUsers(id, from, 5);
                let res = this.state.tpList.concat(data);
                this.setState({ tpList: res });
              },
              pageSize: 5
            }}
            renderItem={item => (
              <List.Item key={item.userId}>
                <List.Item.Meta
                  title={
                    item.userName? <a href={`https://www.cc98.org/user/${item.userId}`}>
                      {item.userName}
                    </a>:<div>匿名</div>
                  }
                  description={
                    <div>
                      <span>天数:{item.days}</span>
                      <span style={{ marginLeft: '2rem', marginRight: '2rem' }}>
                        到期时间:
                        {moment(item.expiredTime).format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                      <Button
                        onClick={this.cancelTp.bind(this, item)}
                        type="primary"
                        style={{ display: isMaster ? '' : 'none' }}
                      >
                        解除tp
                      </Button>
                    </div>
                  }
                />
                <div>操作人:{item.operatorUserName}</div>
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </Modal>
        <Modal
          title="版面事件"
          visible={this.state.recordVisible}
          onOk={() => this.setState({ recordVisible: false })}
          onCancel={() => this.setState({ recordVisible: false })}
          width={'60rem'}
        >
          <Record id={id.toString()} />
        </Modal>
      </>
    );
  }
}

interface ChildProps {
  data: IBoard;
  list: ITopic[];
  visible: boolean;
  onClose: () => void;
}
interface ChildState {
  targetKeys: string[];
  selectedKeys: string[];
  lockVisible: boolean;
  deleteVisible: boolean;
  reason: string;
  value: number;
}
class Manage extends React.Component<ChildProps, ChildState> {
  state = {
    targetKeys: [],
    selectedKeys: [],
    lockVisible: false,
    deleteVisible: false,
    reason: '',
    value: 7
  };
  handleChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };
  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
    });
  };
  handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };
  openNotification = () => {
    const args = {
      message: '操作错误',
      description: '请至少选择一个帖子',
      duration: 4.5,
      icon: <Icon type="close-circle" style={{ color: 'red' }} />
    };
    notification.open(args);
  };
  multiDelete = async () => {
    const { targetKeys, reason } = this.state;
    if (targetKeys.length === 0) {
      this.openNotification();
      return;
    }
    await aDelete(targetKeys, reason);
    this.setState({ deleteVisible: false });
  };
  multiLock = async () => {
    const { targetKeys, reason, value } = this.state;
    if (targetKeys.length === 0) {
      this.openNotification();
      return;
    }
    await aLock(targetKeys, reason, value);
    this.setState({ lockVisible: false });
  };

  render() {
    const { data, list, visible } = this.props;
    const { targetKeys, selectedKeys, lockVisible, deleteVisible } = this.state;
    const dList = [];
    for (const item of list) {
      dList.push({
        key: item.id.toString(),
        title: item.title
      });
    }
    return (
      <>
        <Modal
          title="批量管理"
          visible={visible}
          onOk={() => this.props.onClose()}
          onCancel={() => this.props.onClose()}
          width={'50rem'}
          footer={[
            <Button onClick={() => this.props.onClose()}>取消</Button>,
            <Button
              type="primary"
              onClick={() => this.setState({ lockVisible: true })}
            >
              锁沉
            </Button>,
            <Button
              type="primary"
              onClick={() => this.setState({ deleteVisible: true })}
            >
              删除
            </Button>
          ]}
        >
          <Transfer
            dataSource={dList}
            titles={['Source', 'Target']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={this.handleChange}
            onSelectChange={this.handleSelectChange}
            render={item => item.title}
            listStyle={{ width: '20rem', height: '40rem' }}
          />
        </Modal>
        <Modal
          title="批量删除"
          visible={deleteVisible}
          onOk={() => this.multiDelete()}
          onCancel={() => this.setState({ deleteVisible: false })}
        >
          <div>理由</div>
          <Select
            style={{ width: 120 }}
            mode="tags"
            onSelect={v => {
              this.setState({ reason: v.toString() });
              console.log(v);
            }}
          >
            <Option value="重复发帖">重复发帖</Option>
            <Option value="管理要求">管理要求</Option>
            <Option value="已解决">已解决</Option>
            <Option value="内容不符">内容不符</Option>
            <Option value="违反版规">违反版规</Option>
          </Select>
        </Modal>
        <Modal
          title="批量锁沉"
          visible={lockVisible}
          onOk={() => this.multiLock()}
          onCancel={() => this.setState({ lockVisible: false })}
        >
          <div>理由</div>
          <Select
            style={{ width: 120 }}
            mode="tags"
            onSelect={v => this.setState({ reason: v.toString() })}
          >
            <Option value="重复发帖">重复发帖</Option>
            <Option value="管理要求">管理要求</Option>
            <Option value="已解决">已解决</Option>
            <Option value="内容不符">内容不符</Option>
            <Option value="违反版规">违反版规</Option>
          </Select>
          <div>天数</div>
          <Select
            style={{ width: 120 }}
            defaultValue="7"
            onSelect={v => this.setState({ value: parseInt(v.toString()) })}
          >
            <Option value="7">7</Option>
            <Option value="30">30</Option>
            <Option value="98">98</Option>
            <Option value="1000">1000</Option>
          </Select>
        </Modal>
      </>
    );
  }
}
interface RecordProps {
  id: string;
}
interface RecordState {
  current: number;
  data: any;
  loading: boolean;
}
class Record extends React.Component<RecordProps, RecordState> {
  state = {
    current: 1,
    data: null,
    loading: false
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const data = await getBoardRecords(this.props.id, 0);
    this.setState({ data, loading: false });
  }

  render() {
    const { id } = this.props;
    const { loading, data } = this.state;
    return (
      data && (
        <List
          dataSource={data ? data.boardEvents : []}
          pagination={{
            onChange: async page => {
              this.setState({ loading: true });
              const from = (page - 1) * 7;
              let res = await getBoardRecords(id, from);
              let list = res.boardEvents;
              res.boardEvents = list;
              this.setState({ data: res, loading: false });
            },
            pageSize: 7,
            total: data.count
          }}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={
                  <a href={`https://www.cc98.org/topic/${item.topicId}`}>
                    {item.content}
                  </a>
                }
                description={
                  <div>
                    <span>对象:{item.targetUserName||'匿名'}</span>
                    <span style={{ marginLeft: '2rem', marginRight: '2rem' }}>
                      时间:
                      {moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                  </div>
                }
              />
              <div>操作人:{item.operatorUserName}</div>
            </List.Item>
          )}
        >
          {loading && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      )
    );
  }
}
