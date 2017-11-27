// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusTopic } from '../Props/FocusTopic';
declare let moment: any;
/**
 * 我关注的某个版面的单个主题
 */
export class FocusTopicSingle extends React.Component<FocusTopic> {
   
    render() {
        let topicUrl = `/topic/${this.props.id}`;
        let boardUrl = `/list/${this.props.boardId}`;
        return (<div className="focus-topic">
                    <PortaritrUrl userId={this.props.userId} portraitUrl={this.props.portraitUrl} />
                    <div className="focus-topic-info1">
                        <div className="focus-topic-authorInfo">
                            <div className="focus-topic-blackText">{this.props.userName}</div>
                            <div className="focus-topic-redText">{this.props.fanCount}</div>
                            <div className="focus-topic-blackText">粉丝</div>
                        </div>
                        <div className="focus-topic-title"><a href={topicUrl} target="_blank">{this.props.title}</a></div>
                    </div>
                    <div className="focus-topic-info2">
                        <div className="focus-topic-board"><a href={boardUrl} target="_blank">{this.props.boardName}</a>&nbsp;&nbsp;/&nbsp;&nbsp;{moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}</div>
                        <div className="focus-topic-response">
                        <div><i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{this.props.likeCount}</div>
                        <div><i className="fa fa-thumbs-o-down" aria-hidden="true"></i>{this.props.dislikeCount}</div>
                            <div><i className="fa fa-commenting-o" aria-hidden="true"></i>{this.props.replyCount}</div>
                            <div><i className="fa fa-eye" aria-hidden="true"></i>{this.props.hitCount}</div>
                        </div>
                    </div>
                </div>);

    }
}

//返回可点击或者不可点击的头像
export class PortaritrUrl extends React.Component<PortaritrUrlProps> {
    render() {
        if (this.props.userId) {
            let userUrl = `/user/${this.props.userId}`;
            return (<a href={userUrl} target="_blank">
                <img className="focus-topic-portraitUrl" src={this.props.portraitUrl}></img>
            </a>);
        }
        else {
            return <img className="focus-topic-portraitUrl" src={this.props.portraitUrl}></img>;
        }
    }
}

export class PortaritrUrlProps {
    //用户id
    userId: number;
    //用户头像地址
    portraitUrl: string;
}