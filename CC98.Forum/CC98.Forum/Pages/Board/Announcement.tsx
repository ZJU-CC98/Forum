import * as React from 'react';
import * as Utility from '../../Utility';
import { Collapse, Button, Divider, Tag, Input, Modal } from 'antd';
import { IBoard } from '@cc98/api';
import { UbbContainer } from '../../Components/UbbContainer';
import { UbbCodeOptions } from '../../Ubb/UbbCodeExtension';
import { editBigPaper as eBP } from './action';

const Panel = Collapse.Panel;
const TextArea = Input.TextArea;

interface Props {
  data: IBoard;
  isFirstPage: boolean;
}
interface State {
  isFollow: boolean;
  loading: boolean;
  editVisible: boolean;
  content: string;
}

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
  width: '100%'
};

export default class extends React.Component<Props, State> {
  state = {
    isFollow: Utility.isFollowThisBoard(this.props.data.id),
    loading: false,
    editVisible: false,
    content: this.props.data.bigPaper
  };
  onError(e) {
    e.preventDefault();
    e.target.src = `/static/images/_CC98.png`;
  }
  generateMasters(item) {
    const name = item.toString();
    const userName = encodeURIComponent(item.toString());
    const webUrl = `/user/name/${userName}`;
    return (
      <div style={{ marginRight: '10px', fontSize: '0.75rem' }}>
        <a href={webUrl}>{name}</a>
      </div>
    );
  }
  async follow() {
    this.setState({ loading: true });
    await Utility.followBoard(this.props.data.id);
    this.setState({ isFollow: true, loading: false });
  }
  async unfollow() {
    this.setState({ loading: true });
    await Utility.unfollowBoard(this.props.data.id);
    this.setState({ isFollow: false, loading: false });
  }
  async editBigPaper() {
    await eBP(this.props.data.id.toString(), this.state.content);
    this.setState({ editVisible: false });
  }

  render() {
    const { data, isFirstPage } = this.props;
    const { isFollow, loading, editVisible, content } = this.state;
    const url = `/static/images/_${data.name}.png`;
    const isMaster = Utility.isMaster(data.boardMasters);
    const shortHand = (
      <div className="row" style={{ height: '4rem' }}>
        <div>
          <img className="board-avatar" onError={this.onError} src={url} />
        </div>

        <div className="board-head-name">{data.name}</div>

        <Divider type="vertical" />

        <div
          className="column"
          style={{ marginLeft: '1rem', marginRight: '1rem' }}
        >
          <div>版面简介：{data.description}</div>
          <div className="row">
            版主：{data.boardMasters.map(this.generateMasters)}
          </div>
        </div>

        <div
          className="row"
          style={{
            marginRight: '1rem',
            flexGrow: 2,
            justifyContent: 'flex-end',
            height: '100%'
          }}
        >
          <div
            className="column"
            style={{
              marginLeft: '1rem',
              marginRight: '1rem',
              height: '100%',
              justifyContent: 'space-around'
            }}
          >
            <div className="row">
              <Tag
                color="grey"
                style={{
                  width: '5rem',
                  textAlign: 'center',
                  marginRight: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }}
              >
                今日贴数
              </Tag>
              <Tag
                className="board-head-information"
                style={{
                  width: '5rem',
                  textAlign: 'center',
                  marginRight: 0,
                  borderLeft: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0
                }}
              >
                {data.todayCount}
              </Tag>
            </div>
            <div className="row">
              <Tag
                color="grey"
                style={{
                  width: '5rem',
                  textAlign: 'center',
                  marginRight: 0,

                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }}
              >
                总主题数
              </Tag>
              <Tag
                className="board-head-information"
                style={{
                  width: '5rem',
                  textAlign: 'center',
                  marginRight: 0,

                  borderLeft: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0
                }}
              >
                {data.topicCount}
              </Tag>
            </div>
          </div>
          <Button
            loading={loading}
            onClick={isFollow ? () => this.unfollow() : () => this.follow()}
          >
            {isFollow ? '取关' : '关注'}
          </Button>
          {isMaster && (
            <Button
              style={{ marginLeft: '0.5rem' }}
              onClick={() => this.setState({ editVisible: true })}
            >
              编辑
            </Button>
          )}
        </div>
      </div>
    );
    return (
      <div style={{ width: '100%' }}>
        <Modal
          title="编辑大字报"
          visible={editVisible}
          onOk={() => this.editBigPaper()}
          onCancel={() => this.setState({ editVisible: false })}
          width={'50rem'}
        >
          支持UBB代码
          <TextArea
            rows={6}
            defaultValue={data.bigPaper}
            onChange={v => this.setState({ content: v.target.value })}
          />
          <UbbContainer
            code={content}
            options={{ ...new UbbCodeOptions(), allowToolbox: true }}
          />
        </Modal>
        <Collapse
          className="board-bigpaper"
          bordered={false}
          defaultActiveKey={isFirstPage ? ['1'] : []}
        >
          <Panel
            key="1"
            showArrow={false}
            header={shortHand}
            style={customPanelStyle}
          >
            {data.bigPaper && <> <Divider />
              <UbbContainer
                code={data.bigPaper}
                options={{ ...new UbbCodeOptions(), allowToolbox: true }}
              /></>}
          </Panel>
        </Collapse>
      </div>
    );
  }
}
