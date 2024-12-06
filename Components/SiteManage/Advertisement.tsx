import * as React from 'react';
import { cc98Fetch, getToken } from '../../Utility';
import Button from 'antd/es/button';
import Table from 'antd/es/table';
import Checkbox from 'antd/es/checkbox';
import Input from 'antd/es/input';
import * as moment from 'moment';
const PostForumIndexColumnInfoType = [
  '推荐阅读',
  '推荐功能',
  '校园新闻',
  'Banner',
  '', //占位
  '', //占位
  '优惠活动'
];

const urls = [
  '/index/column/recommandationreading',
  '/index/column/recommandationfunction',
  '/index/column/schoolnews',
  '/config/global/advertisement',
  '', //占位
  '', //占位
  '/config/global/special-offer'
];

class PostForumIndexColumnInfo {
  id: number;
  /**
   * 1=推荐阅读，2=推荐功能，3=校园新闻，4=Banner，7=优惠活动
   */
  type: number;
  /**
   * 必须，Banner表示对Banner的简单描述
   */
  title: string;
  /**
   * 只有推荐阅读需要
   */
  content: string;
  /**
   * 校园新闻不需要
   */
  url: string;
  /**
   * 校园新闻不需要
   */
  imageUrl: string;
  /**
   * 排序权重，只有推荐阅读和推荐功能需要
   */
  orderWeight: number;
  /**
   * 是否显示
   */
  enable: boolean;
  /**
   * Banner和优惠活动需要，大于0的整数
   */
  days: number;
  /**
   *
   */
  isNew: boolean;
  /**
   *
   */
  expiredTime: string;
  visibility: number;
}

interface State {
  /**
   * 反馈信息
   */
  info: string;
  /**
   * 请求时返回的数据
   */
  data: PostForumIndexColumnInfo[];
  /**
   * 1=推荐阅读，2=推荐功能，3=校园新闻，4=Banner，7=优惠活动
   */
  type: number;
  /**
   * 当前页
   */
  current: number;
}

type props = {};

export default class extends React.Component<props, State> {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      data: [],
      type: 0,
      current: 1
    };
    this.getInfo = this.getInfo.bind(this);
    this.putCurData = this.putCurData.bind(this);
    this.handleTdChange = this.handleTdChange.bind(this);
    this.add = this.add.bind(this);
  }

  async getInfo(url) {
    this.setState({
      type: urls.indexOf(url) + 1,
      data: []
    });
    try {
      const token: string = await getToken();
      let headers = new Headers();
      headers.append('Authorization', token);
      let res = await cc98Fetch(url + '/all', { headers });
      let data = await res.json();
      this.setState({ data });
    } catch (e) {
      this.setState({
        info: e.message
      });
    }
  }

  handleTdChange(key, value, index: number) {
    this.setState(prevState => {
      let { data } = prevState as State;
      if (key === "visibility") {
        let v = prevState.type === 4 ? 1 : 0;
        try {
          v = parseInt(value);
        } catch {
        }
        data[index] = { ...data[index], [key]: v };
      } else {
        data[index] = { ...data[index], [key]: value };
      }

      //console.log(data);
      this.setState({ data });
    });
  }

  async putCurData(index: number) {
    let url: string, method: string;
    if (this.state.data[index].isNew) {
      url = '/index/column/';
      method = 'POST';
    } else {
      url = '/index/column/' + this.state.data[index].id;
      method = 'PUT';
    }
    try {
      const token: string = await getToken();
      let headers = new Headers();
      headers.append('Authorization', token);
      headers.append('Content-Type', 'application/json');
      let res = await cc98Fetch(url, {
        method: method,
        headers,
        body: JSON.stringify(this.state.data[index])
      });
      if (res.status === 200) {
        this.setState({
          info: '修改成功'
        });
      } else {
        throw new Error(res.status.toString());
      }
    } catch (e) {
      this.setState({
        info: e.message
      });
    }
  }

  add() {
    this.setState(prevState => {
      let newData = new PostForumIndexColumnInfo();
      newData.enable = true;
      newData.isNew = true;
      newData.type = prevState.type;
      newData.id = prevState.data[0].id + 1;
      newData.visibility = prevState.type === 4 ? 1 : 0;
      return {
        data: [newData, ...prevState.data]
      };
    });
  }

  onPageChange = v => {
    this.setState({ current: v.current });
  };

  render() {
    const { current } = this.state;
    const Columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        width: 60
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        render: text => PostForumIndexColumnInfoType[text - 1]
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 200,
        render: (text, record, index) => (
          <Input
            type="text"
            onChange={e =>
              this.handleTdChange(
                'title',
                e.target.value,
                (current - 1) * 10 + index
              )
            }
            value={text}
          />
        )
      },
      this.state.type === 1
        ? {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
          width: 200,
          render: (text, record, index) => (
            <Input
              type="text"
              onChange={e =>
                this.handleTdChange(
                  'content',
                  e.target.value,
                  (current - 1) * 10 + index
                )
              }
              value={text}
            />
          )
        }
        : null,
      {
        title: 'url',
        dataIndex: 'url',
        key: 'url',
        width: 200,
        render: (text, record, index) => (
          <Input
            type="text"
            onChange={e =>
              this.handleTdChange(
                'url',
                e.target.value,
                (current - 1) * 10 + index
              )
            }
            value={text}
          />
        )
      },
      this.state.type !== 3 && this.state.type !== 7
        ? {
          title: '图片url',
          dataIndex: 'imageUrl',
          key: 'imageUrl',
          width: 200,
          render: (text, record, index) => (
            <Input
              type="text"
              onChange={e =>
                this.handleTdChange(
                  'imageUrl',
                  e.target.value,
                  (current - 1) * 10 + index
                )
              }
              value={text}
            />
          )
        }
        : null,
      this.state.type === 1 || this.state.type === 2
        ? {
          title: '排序权重',
          dataIndex: 'orderWeight',
          key: 'orderWeight',
          width: 100,
          render: (text, record, index) => (
            <Input
              type="text"
              onChange={e =>
                this.handleTdChange(
                  'orderWeight',
                  e.target.value,
                  (current - 1) * 10 + index
                )
              }
              value={text}
            />
          )
        }
        : null,
      {
        title: '有效',
        dataIndex: 'enable',
        key: 'enable',
        width: 80,
        render: (text, record, index) => (
          <Checkbox
            checked={text}
            onChange={e =>
              this.handleTdChange(
                'enable',
                (e.target as HTMLInputElement).checked,
                (current - 1) * 10 + index
              )
            }
          />
        )
      },
      this.state.type === 4 || this.state.type === 7
        ? {
          title: '天数 (新增和修改都填距现在时间)',
          dataIndex: 'days',
          key: 'days',
          render: (text, record, index) => (
            <Input
              type="text"
              onChange={e =>
                this.handleTdChange(
                  'days',
                  e.target.value,
                  (current - 1) * 10 + index
                )
              }
              value={text}
            />
          )
        }
        : null,
      this.state.type === 4 || this.state.type === 7
        ? {
          title: '过期时间',
          dataIndex: 'expiredTime',
          key: 'expiredTime',
          render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
        : null,
      {
        title: '可见性 (0-都可见 1-仅登录 2-仅未登录)',
        dataIndex: 'visibility',
        key: 'visibility',
        render: (text, record, index) => (
          <Input
            type="text"
            onChange={e =>
              this.handleTdChange(
                'visibility',
                e.target.value,
                (current - 1) * 10 + index
              )
            }
            value={text}
          />
        )
      },
      {
        title: '保存',
        dataIndex: 'save',
        key: 'save',
        width: 100,
        render: (text, record, index) => (
          <Button
            type="primary"
            onClick={e => this.putCurData((current - 1) * 10 + index)}
          >
            保存
          </Button>
        )
      }
    ].filter(v => {
      if (v) return v;
    });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
          borderTop: '#eaeaea solid thin',
          paddingTop: '1rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            marginBottom: '1rem'
          }}
        >
          <div style={{ marginTop: '10px' }}>自定义栏目</div>
          <div>
            <Button
              type="primary"
              disabled={this.state.type === 1}
              onClick={() => this.getInfo(urls[0])}
            >
              推荐阅读
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              disabled={this.state.type === 2}
              onClick={() => this.getInfo(urls[1])}
            >
              推荐功能
            </Button>
          </div>
          {/* <div>
            <Button
              type="primary"
              disabled={this.state.type === 3}
              onClick={() => this.getInfo(urls[2])}
            >
              校园新闻
            </Button>
          </div> */}
          <div>
            <Button
              type="primary"
              disabled={this.state.type === 4}
              onClick={() => this.getInfo(urls[3])}
            >
              Banner
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              disabled={this.state.type === 7}
              onClick={() => this.getInfo(urls[6])}
            >
              优惠活动
            </Button>
          </div>
          {this.state.type > 0 ? (
            <div>
              <Button type="primary" onClick={() => this.add()}>
                添加
              </Button>
            </div>
          ) : null}
        </div>
        <div>
          <Table
            bordered
            onChange={this.onPageChange}
            columns={Columns}
            dataSource={this.state.data}
          />
          <p>{this.state.info}</p>
        </div>
      </div>
    );
  }
}