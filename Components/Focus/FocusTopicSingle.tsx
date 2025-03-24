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
        if (!this.props.userId) {
            $(`#user_${this.props.id}`).removeAttr('href');
            $(`#user_${this.props.id}`).removeAttr('target');
            $(`#lastpost_${this.props.id}`).removeAttr('href');
            $(`#lastpost_${this.props.id}`).removeAttr('target');
        }
    }

    render() {
        let topicUrl = `/topic/${this.props.id}/1`;
        let userUrl = `/user/id/${this.props.userId}`;
        let boardUrl = `/board/${this.props.boardId}`;
        let a: any = (this.props.floorCount / 10) + 1;
        let b = parseInt(a);
        let c = this.props.floorCount + 10 - b * 10;
        let pageNum = `${b}#${c}`;
        if (c === 0) {
            pageNum = `${b - 1}#10`;
        }
        let lastPostUrl = `/topic/${this.props.id}/${pageNum}`;
        let lastPostUserUrl = `/user/name/${encodeURI(this.props.lastPostUser)}`;
        let tagInfo = '';
        let userName: any = this.props.userName;
        /* if (this.props.userName.length > 9) {
             userName = <div style={{ fontSize: "14px" }}>{this.props.userName}</div>;
         }*/
        if (this.props.tag1) {
            if (this.props.tag2) {
                tagInfo = `标签：${this.props.tag1} / ${this.props.tag2}`;
            }
            else {
                tagInfo = `标签：${this.props.tag1}`;
            }
            return (<div className="focus-topic">
                <a className="focus-topic-left" href={userUrl} target="_blank" id={`user_${this.props.id}`}>
                    <img className="focus-topic-portraitUrl" src={this.props.portraitUrl}></img>
                    <div className="focus-topic-userName">{userName}</div>
                </a>
                <div className="focus-topic-middle">
                    <a className="focus-topic-title" href={topicUrl} target="_blank">{this.props.title.trim()?this.props.title:<span style={{ display: 'inline-block', width: '5rem' }}></span>}</a>
                    <div className="focus-topic-info">
                        <div>{tagInfo}</div>
                        <div><i className="fa fa-clock-o fa-lg"></i>{this.props.time}</div>
                        <div><i className="fa fa-eye fa-lg"></i> {this.props.hitCount}</div>
                        <div>最后回复：<a href={lastPostUserUrl} target="_blank" id={`lastpost_${this.props.id}`}>{this.props.lastPostUser}</a></div>
                        <div><a href={lastPostUrl} target="_blank">{this.props.lastPostTime}</a></div>
                    </div>
                </div>
                <div className="focus-topic-rightBar"></div>
                <a className="focus-topic-right" href={boardUrl} target="_blank"><div className="focus-topic-board">{this.props.boardName}</div></a>
            </div>);
        }
        else {
            return (<div className="focus-topic">
                <a className="focus-topic-left" href={userUrl} target="_blank" id={`user_${this.props.id}`}>
                    <img className="focus-topic-portraitUrl" src={this.props.portraitUrl}></img>
                    <div className="focus-topic-userName">{this.props.userName}</div>
                </a>
                <div className="focus-topic-middle">
                    <a className="focus-topic-title" href={topicUrl} target="_blank">{this.props.title.trim()?this.props.title:<span style={{ display: 'inline-block', width: '5rem' }}></span>}</a>
                    <div className="focus-topic-info">
                        <div><i className="fa fa-clock-o fa-lg"></i>{this.props.time}</div>
                        <div><i className="fa fa-eye fa-lg"></i> {this.props.hitCount}</div>
                        <div>最后回复：<a href={lastPostUserUrl} target="_blank" id={`lastpost_${this.props.id}`}>{this.props.lastPostUser}</a></div>
                        <div><a href={lastPostUrl} target="_blank">{this.props.lastPostTime}</a></div>
                    </div>
                </div>
                <div className="focus-topic-rightBar"></div>
                <a className="focus-topic-right" href={boardUrl} target="_blank"><div className="focus-topic-board">{this.props.boardName}</div></a>
            </div>);
        }
    }
}


/*
export class FocusTopicSingle extends React.Component<FocusTopic> {
   
    render() {
        let topicUrl = `/topic/${this.props.id}`;
        let boardUrl = `/board/${this.props.boardId}`;
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