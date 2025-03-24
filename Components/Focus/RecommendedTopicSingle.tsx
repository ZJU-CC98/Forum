import * as React from 'react';
import { RecommendedTopic } from '../../Props/RecommendedTopic';
import * as Utility from '../../Utility';
/**
 * 随机精选（推荐）的单个主题
 */
export class RecommendedTopicSingle extends React.Component<RecommendedTopic> {

    componentDidMount() {
        if (!this.props.topic.userId) {
            $(`#user_${this.props.topic.id}`).removeAttr('href');
            $(`#user_${this.props.topic.id}`).removeAttr('target');
        }
    }

    render() {
        let topicUrl = `/topic/${this.props.topic.id}/1`;
        let userUrl = `/user/id/${this.props.topic.userId}`;
        let boardUrl = `/board/${this.props.topic.boardId}`;
        let a: any = (this.props.topic.floorCount / 10) + 1;
        let b = parseInt(a);
        let c = this.props.topic.floorCount + 10 - b * 10;
        let pageNum = `${b}#${c}`;
        if (c === 0) {
            pageNum = `${b - 1}#10`;
        }
        let userName: any = this.props.topic.userName;

        return (<div className="focus-topic">
            <a className="focus-topic-left" href={userUrl} target="_blank" id={`user_${this.props.topic.id}`}>
                <img className="focus-topic-portraitUrl" src={this.props.topic.portraitUrl}></img>
                <div className="focus-topic-userName">{this.props.topic.userName}</div>
            </a>
            <div className="focus-topic-middle">
                <a className="focus-topic-title" href={topicUrl} target="_blank">{this.props.topic.title.trim()?this.props.topic.title:<span style={{ display: 'inline-block', width: '5rem' }}></span>}</a>
                <div className="focus-topic-info">
                    <div><i className="fa fa-clock-o fa-lg"></i>{this.props.topic.time}</div>
                    <div className="focus-topic-content"><i className="fa fa-commenting-o fa-lg"></i>{this.props.content}</div>
                </div>
            </div>
            <div className="focus-topic-rightBar"></div>
            <a className="focus-topic-right" href={boardUrl} target="_blank"><div className="focus-topic-board">{this.props.topic.boardName}</div></a>
        </div>);
    }
}