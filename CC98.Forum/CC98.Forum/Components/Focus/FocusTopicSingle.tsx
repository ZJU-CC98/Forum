// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusTopic } from '../../Props/FocusTopic';
declare let moment: any;
/**
 * 我关注的某个版面的单个主题
 */
export class FocusTopicSingle extends React.Component<FocusTopic> {
    render() {
        return (<div className="focus-topic">
                    <div className="focus-topic-left">
                        <img className="focus-topic-portraitUrl" src={this.props.portraitUrl}></img>
                        <div className="focus-topic-text">
                            <div className="focus-topic-userName">{this.props.userName}</div>
                            <div className="focus-topic-fans">粉丝  {this.props.fanCount}</div>
                                </div>
                            </div>
                    <div className="focus-topic-middle">
                        <div className="focus-topic-title">{this.props.title}</div>
                                <div className="focus-topic-info">
                            <div className="focus-topic-infoTag">标签： 你好/再见</div>
                            <div className="focus-topic-infoTiem">{moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}</div>
                            <div className="focus-topic-infoHit">{this.props.hitCount}</div>
                            <div className="focus-topic-infoLastPostUser">{this.props.lastPostUser}</div>
                            <div className="focus-topic-infoLastPostTime">{moment(this.props.lastPostTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                                </div>
                    </div>
                    <div className="focus-topic-right">{this.props.boardName}</div>
                </div>);
    }
}


/*
export class FocusTopicSingle extends React.Component<FocusTopic> {
   
    render() {
        let topicUrl = `/topic/${this.props.id}`;
        let boardUrl = `/list/${this.props.boardId}`;
        return (<div className="focus-topic">
                    <PortaritrUrl userId={this.props.userId} portraitUrl={this.props.portraitUrl} />
                    <div className="focus-topic-info1">
                    <div className="focus-topic-authorInfo">
                    <UserName userId={this.props.userId} userName={this.props.userName} />
                            <div className="focus-topic-fans">粉丝</div>
                            <div className="focus-topic-redText">{this.props.fanCount}</div>
                        </div>
                        <div className="focus-topic-title"><a href={topicUrl} target="_blank">{this.props.title}</a></div>
                    </div>
                    <div className="focus-topic-info2">
                        <div className="focus-topic-board"><a href={boardUrl} target="_blank">{this.props.boardName}</a>&nbsp;&nbsp;/&nbsp;&nbsp;{moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}</div>
                        <div className="focus-topic-response">
                        <div><i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{this.props.likeCount}</div>
                    <div><i className="fa fa-thumbs-o-down" aria-hidden="true"></i>{this.props.dislikeCount}</div>
                            <div><i className="fa fa-eye" aria-hidden="true"></i>{this.props.hitCount}</div>
                            <div><i className="fa fa-commenting-o" aria-hidden="true"></i>{this.props.replyCount}</div>
                        </div>
                    </div>
                </div>);

    }
}




//返回可点击或者不可点击的头像
export class PortaritrUrl extends React.Component<PortaritrUrlProps> {
    render() {
        if (this.props.userId) {
            let userUrl = `/user/id/${this.props.userId}`;
            return (<a href={userUrl} target="_blank">
                <img className="focus-topic-portraitUrl" src={this.props.portraitUrl}></img>
            </a>);
        }
        else {
            return <img className="focus-topic-portraitUrl" src={this.props.portraitUrl}></img>;
        }
    }
}

//返回可点击或者不可点击的用户名
export class UserName extends React.Component<UserNameProps> {
    render() {
        if (this.props.userId) {
            let userUrl = `/user/id/${this.props.userId}`;
            return (<a href={userUrl} target="_blank" className="focus-topic-blackText">
                        <div className="focus-topic-blackText">{this.props.userName}</div>
                    </a>);
        }
        else {
            return <div className="focus-topic-blackText">{this.props.userName}</div>;
        }
    }
}


export class PortaritrUrlProps {
    //用户id
    userId: number;
    //用户头像地址
    portraitUrl: string;
}

export class UserNameProps {
    //用户id
    userId: number;
    //用户名称
    userName: string;
}*/