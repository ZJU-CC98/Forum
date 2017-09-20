// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { FocusPost } from '../Props/FocusPost';
/**
 * 我关注的某个版面的单个主题
 */
export class FocusPostComponent extends React.Component<FocusPost> {
   
    render() {
 var topicUrl = `/topic/${this.props.id}`;
        return (<div className="focus-post">
                    <img className="focus-post-portraitUrl" src={this.props.portraitUrl}></img>
                    <div className="focus-post-info1">
                        <div className="focus-post-authorInfo">
                            <div className="focus-post-blackText">{this.props.authorName}</div>
                            <div className="focus-post-redText">{this.props.fanCount}</div>
                            <div className="focus-post-blackText">粉丝</div>
                        </div>
                        <div className="focus-post-title"><a href={topicUrl}>{this.props.title}</a></div>
                    </div>
                    <div className="focus-post-info2">
                        <div className="focus-post-board">{this.props.boardName} / {this.props.createTime}</div>
                        <div className="focus-post-response">
                            <div><i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{this.props.likeCount}</div>
                            <div><i className="fa fa-thumbs-o-down" aria-hidden="true"></i>{this.props.dislikeCount}</div>
                            <div><i className="fa fa-eye" aria-hidden="true"></i>{this.props.hitCount}</div>
                            <div><i className="fa fa-commenting-o" aria-hidden="true"></i>{this.props.replyCount}</div>
                        </div>
                    </div>
                </div>);

    }
}