import * as React from 'react';
import { Collapse, Button, Divider } from 'antd';
import { IBoard } from '@cc98/api';
import { UbbContainer } from '../../Components/UbbContainer';
import { UbbCodeOptions } from '../../Ubb/UbbCodeExtension';
const Panel = Collapse.Panel;

interface Props {
  data: IBoard;
}

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
  width: '100%'
};

export default class extends React.Component<Props> {
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
  render() {
    const { data } = this.props;
    const url = `/static/images/_${data.name}.png`;
    const shortHand = (
      <div className="row">
        <div>
          <img className="board-avatar" onError={this.onError} src={url} />
        </div>

        <div className="board-head-name">{data.name}</div>

        <Divider type="vertical" />

        <div
          className="column"
          style={{ marginLeft: '1rem', marginRight: 'auto' }}
        >
          <div>版面简介：{data.description}</div>
          <div className="row">
            版主：{data.boardMasters.map(this.generateMasters)}
          </div>
        </div>
        <div style={{ marginRight: '1rem' }}>
          <Button> 关注</Button>
        </div>
      </div>
    );
    return (
      <div style={{ width: '100%' }}>
        <Collapse
          className="board-bigpaper"
          bordered={false}
          defaultActiveKey={['1']}
        >
          <Panel
            key="1"
            showArrow={false}
            header={shortHand}
            style={customPanelStyle}
          >
            <UbbContainer
              code={data.bigPaper}
              options={{ ...new UbbCodeOptions(), allowLightbox: true }}
            />
          </Panel>
        </Collapse>
      </div>
    );
  }
}
