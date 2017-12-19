// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusTopic } from '../../Props/FocusTopic';
import * as Utility from '../../Utility';
/**
 * 我关注的某个版面的单个主题
 */
export class FocusTopicSingle extends React.Component<FocusTopic> {

    componentDidMount() {
        if (!this.props.tag1) {
            $(`#tag_${this.props.id}`).addClass('displaynone');
        }

        if (!this.props.userId) {
            $(`#user_${this.props.id}`).attr('href','');
        }
    }

    render() {
        let tagInfo = '';
        if (this.props.tag1) {
            if (this.props.tag2) {
                tagInfo = `标签：${this.props.tag1}/${this.props.tag2}`;
            }
            else {
                tagInfo = `标签：${this.props.tag1}`;
            }
        }
        let topicUrl = `/topic/${this.props.id}`;
        let userUrl = `/user/id/${this.props.userId}`;
        let boardUrl = `/list/${this.props.boardId}`;
        let a: any = parseInt(this.props.replyCount+1) / 10;
        let b = parseInt(a) + 1;
        let c = parseInt(this.props.replyCount) - (b - 1) * 10;
        let lastPostUrl = `${topicUrl}/${b}#${c}`;
        return (<div className="focus-topic">
                            <a className="focus-topic-left" href={userUrl} target="_blank" id={`user_${this.props.id}`}>
                                        <img className="focus-topic-portraitUrl" src={this.props.portraitUrl}></img>
                                        <div className="focus-topic-text">
                                            <div className="focus-topic-userName">{this.props.userName}</div>
                                            <div className="focus-topic-fans">{`粉丝   ${this.props.fanCount}`}</div>
                                        </div>
                            </a>
                            <div className="focus-topic-middle">
                                <a className="focus-topic-title" href={topicUrl} target="_blank">{this.props.title}</a>
                                <div className="focus-topic-info">
                                    <div id={`tag_${this.props.id}`}>{tagInfo}</div>
                                    <div><i className="fa fa-clock-o fa-lg"></i>{this.props.time}</div>
                                    <div><i className="fa fa-eye fa-lg"></i> {this.props.hitCount}</div>
                                    <div><a href={lastPostUrl} target="_blank">最后回复：{this.props.lastPostUser}</a></div>
                                    <div><a href={lastPostUrl} target="_blank">{this.props.lastPostTime}</a></div>
                                </div>
                            </div>
                    <div className="focus-topic-rightBar"></div>
                    <a className="focus-topic-right" href={boardUrl} target="_blank"><div className="focus-topic-board">{this.props.boardName}</div></a>
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