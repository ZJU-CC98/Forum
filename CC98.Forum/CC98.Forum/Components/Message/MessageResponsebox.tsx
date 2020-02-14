// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { MessageResponseProps } from '../../Props/MessageResponseProps';
import * as Utility from '../../Utility';
import { UbbContainer } from '../UbbContainer';
import { UbbCompatiblityMode } from '../../Ubb/UbbCodeExtension';
import * as moment from 'moment';

export class MessageResponsebox extends React.Component<MessageResponseProps> {
    
    render() {
        let boardName = `[url=/board/${this.props.boardId}][color=dodgerblue]${this.props.boardName}[/color][/url]`;
        //有可能出错后返回boardId为0，未知版面
        if (this.props.boardId === 0) {
            boardName = `[color=dodgerblue]${this.props.boardName}[/color]`;
        }
        let a: any = (this.props.floor / 10) + 1;
        let b = parseInt(a);
        let c = this.props.floor + 10 - b * 10;
        let pageNum = `${b}#${c}`;
        if (c === 0) {
            pageNum = `${b-1}#10`;
        }
        let content;
        if (this.props.isRead) {
            let userName;
            let title;
            if (this.props.userId > 0) {
                userName = `[url=/user/id/${this.props.userId}][color=gray]${this.props.userName}[/color][/url]`;
            }
            else {
                userName = `[color=gray]${this.props.userName}[/color]`;
            }
            if (this.props.boardId) {
                title = `[url=/topic/${this.props.topicId}/${pageNum}][color=#0b5394]${this.props.topicTitle}[/color][/url]`;
            }
            else {
                title = `[color=#0b5394]${this.props.topicTitle}[/color]`;
            }
            content = ` ${userName} [color=gray]在《${title}》中回复了你。[/color]`;
        }
        else {
            let userName;
            let title;
            if (this.props.userId > 0) {
                userName = `[url=/user/id/${this.props.userId}][color=gray][b]${this.props.userName}[/b][/color][/url]`;
            }
            else {
                userName = `[color=gray][b]${this.props.userName}[/b][/color]`;
            }
            if (this.props.boardId) {
                title = `[url=/topic/${this.props.topicId}/${pageNum}][color=#0b5394]${this.props.topicTitle}[/color][/url]`;
            }
            else {
                title = `[color=#0b5394]${this.props.topicTitle}[/color]`;
            }
            content = ` ${userName} [color=gray][b]在《${title}》中回复了你。[/b][/color]`;
        }
        return (<div className="message-response-box">
                    <div className="message-response-box-middle">
                        <div className="message-response-box-middle1">
                            <div className="message-response-box-middle-title">
                                <UbbContainer code={boardName} />
                            </div>
                            <div className="message-response-box-middle-date" >
                                {moment(this.props.time).format('YYYY-MM-DD HH:mm:ss')}
                            </div>
                        </div>
                <div className="message-response-box-middle-content">
                    <UbbContainer code={content} options={{ allowAutoPlay: false, autoDetectUrl: true, allowExternalUrl: true, allowImage: false, allowMediaContent: false, compatibility: UbbCompatiblityMode.Recommended, allowEmotion: false, allowExternalImage: false, allowToolbox:false }} />
                        </div>
                    </div>
                </div>
        );
    }
}