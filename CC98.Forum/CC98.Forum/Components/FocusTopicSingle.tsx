// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusTopic } from '../Props/FocusTopic';
import * as moment from 'moment';
/**
 * 我关注的某个版面的单个主题
 */
export class FocusTopicSingle extends React.Component<FocusTopic> {
   
    render() {
 var topicUrl = `/topic/${this.props.id}`;
        return (<div className="focus-post">
                    <img className="focus-post-portraitUrl" src={this.props.portraitUrl}></img>
                    <div className="focus-post-info1">
                        <div className="focus-post-authorInfo">
                            <div className="focus-post-blackText">{this.props.userName}</div>
                            <div className="focus-post-redText">{this.props.fanCount}</div>
                            <div className="focus-post-blackText">粉丝</div>
                        </div>
                        <div className="focus-post-title"><a href={topicUrl}>{this.props.title}</a></div>
                    </div>
                    <div className="focus-post-info2">
                <div className="focus-post-board">{this.props.boardName} / {moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}</div>
                        <div className="focus-post-response">
                            <div><i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{this.props.likeCount}</div>
                            
                            <div><i className="fa fa-eye" aria-hidden="true"></i>{this.props.hitCount}</div>
                            <div><i className="fa fa-commenting-o" aria-hidden="true"></i>{this.props.replyCount}</div>
                        </div>
                    </div>
                </div>);

    }
}