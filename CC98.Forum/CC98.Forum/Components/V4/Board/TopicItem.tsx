import * as React from 'react';
import * as dayjs from 'dayjs';
import { Row, Col, Icon } from 'antd';
interface Props {
  data: any;
  userInfo: any;
  index: number;
}

export default ({ data, userInfo, index }: Props) => {
  const backgroundStyle =
    index % 2 === 0
      ? { backgroundColor: '#e8f3f7' }
      : { backgroundColor: '#fff' };
  return (
    <Row className="board-body" style={backgroundStyle} align={'middle'}>
      <Col span={2}>
        <img className="cc98userpicture" src={userInfo.portraitUrl} />
      </Col>

      <Col span={22}>
        <div className="board-topic-options">
          <Row className="board-row-first">
            <a
              className="board-topic-title"
              href={'https://www.cc98.org/topic/' + data.id}
            >
              {data.title.length > 100
                ? data.title.substring(0, 100) + '……'
                : data.title}
            </a>
          </Row>
          <Row className="board-row-second">
            <Col span={6}>
              <Icon type="user" />
              {data.userName}
            </Col>
            <Col span={6}>
              <Icon type="eye" />
              {data.hitCount}
            </Col>
            <Col span={12}>
              <Row justify={'end'}>
                <Col span={4}>最后回复</Col>
                <Col span={16}>
                  <div className="board-lastReply">
                    {data.lastPostUser}/
                    {dayjs(data.lastPostTime).format('YYYY-MM-DD hh:mm')}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};
