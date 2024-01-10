import * as React from 'react';
import { userInfo } from 'os';

/**
 * 组件使用的属性对象。
 */
interface Props {
    userInfo: {
        introduction: string,
        postCount: number,
        fanCount: number,
        prestige: number,
        popularity: number
    }
}

/**
 * 用户回复区域顶部的用户信息栏。
 */
export default class TopicReplyUserBar extends React.Component<Props> {

    constructor(props, context) {
        super(props, context);
    }

    getIntroduction() {
        if (this.props.userInfo.introduction) {
            return <span>{this.props.userInfo.introduction}</span>;
        } else {
            return <span style={{color: 'gray'}}>这个人很懒，没有留下介绍</span>;
        }
    }

    render(){
        return <div className="reply-user-bar">
            <div style={{margin: '0.5rem', display: 'flex', flexDirection: 'row', flex: '1'}}>
                <div style={{flex: '1'}}>
                    <small>{this.getIntroduction()}</small>
                </div>
                <div style={{flex: '0 0 auto'}}>
                    <small style={{color: 'gray'}}>
                        <span style={{marginLeft: '0.5rem'}}>威望 {this.props.userInfo.prestige}</span>
                        <span style={{marginLeft: '0.5rem'}}>风评 {this.props.userInfo.popularity}</span>
                        <span style={{marginLeft: '0.5rem'}}>贴数 {this.props.userInfo.postCount}</span>
                        <span style={{marginLeft: '0.5rem'}}>粉丝 {this.props.userInfo.fanCount}</span>
                    </small>
                </div>
            </div>
        </div>
    }
}