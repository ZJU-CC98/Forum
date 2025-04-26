﻿import * as React from 'react';
import { FocusTopic } from '../../Props/FocusTopic';
import * as Utility from '../../Utility';
import Focus from './Focus';

var APlayer = require('aplayer');
var audioPlayerCount = 0;
var DPlayer = require('dplayer');
var videoPlayerCount = 0;

/**
 * 卡片模式的单个主题
 */
export class CardTopicSingle extends React.Component<FocusTopic> {
    imageCount: number = 0;

    constructor(props) {
        super(props);
        //this.state = { mediaContent: this.props.mediaContent };
    }

    componentDidMount() {
        if (!this.props.userId) {
            $(`#card_portrait_${this.props.id}`).removeAttr('href');
            $(`#card_portrait_${this.props.id}`).removeAttr('target');
            $(`#card_username_${this.props.id}`).removeAttr('href');
            $(`#card_username_${this.props.id}`).removeAttr('target');
            $(`#card_lastpost_${this.props.id}`).removeAttr('href');
            $(`#card_lastpost_${this.props.id}`).removeAttr('target');
            $(`#card_portrait_image_${this.props.id}`).addClass('card-topic-anonymous');
        }
    }

    showOriginalImage(thumbnailUrl: string, idx: number = 0) {
        let imageUrl = this.getOriginalImageUrl(thumbnailUrl);
        $(`#card_original_image_${this.props.id}`).attr('src', imageUrl);
        $(`#card_original_image_area_${this.props.id}`).show();
        $(`#card_thumbnail_area_${this.props.id}`).hide();
        if (this.imageCount > 1) {
            $(`#card_thumbnail_mini_area_${this.props.id}`).show();
            $(`#card_thumbnail_mini_image_${this.props.id}_${idx}`).addClass('card-topic-thumbnail-mini-clicked');
            this.props.mediaContent.thumbnail.forEach((_, i, __) => {
                if (idx !== i) {
                    $(`#card_thumbnail_mini_image_${this.props.id}_${i}`).removeClass('card-topic-thumbnail-mini-clicked');
                }
            })

        }
    }

    hideOriginalImage() {
        $(`#card_original_image_area_${this.props.id}`).hide();
        $(`#card_thumbnail_area_${this.props.id}`).show();
        if (this.imageCount > 1) {
            $(`#card_thumbnail_mini_area_${this.props.id}`).hide();
        }
    }

    getOriginalImageUrl(thumbnailUrl: string): string {
        return thumbnailUrl.replace("v2-upload/thumbnail/earlier/", "v2-upload/")
            .replace("v2-upload/thumbnail/", "v2-upload/")
            .replace("v4-upload/t/", "v4-upload/d/");
    }

    changeMiniImage(thumbnailUrl: string, idx: number) {
        let imageUrl = this.getOriginalImageUrl(thumbnailUrl);
        $(`#card_original_image_${this.props.id}`).attr('src', imageUrl);
        $(`#card_thumbnail_mini_image_${this.props.id}_${idx}`).addClass('card-topic-thumbnail-mini-clicked');
        this.props.mediaContent.thumbnail.forEach((_, i, __) => {
            if (idx !== i) {
                $(`#card_thumbnail_mini_image_${this.props.id}_${i}`).removeClass('card-topic-thumbnail-mini-clicked');
            }
        })
    }

    convertThumbnail(item: string, index: number) {
        return (
            <img
                key={`thumbnail_${item}`}
                src={item}
                onClick={() => { this.showOriginalImage(item, index); }}
            />
        );
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
        let userName: any = this.props.userName;

        this.imageCount = !this.props.mediaContent || !this.props.mediaContent.thumbnail ?
            0 :
            (this.props.mediaContent.thumbnail.length > 6 ?
                6 :
                this.props.mediaContent.thumbnail.length);
        let thumbnailContent = null;
        if (this.props.contentType === 4) {
            switch (this.imageCount) {
                case 1:
                    thumbnailContent = (
                        <div className="card-topic-thumbnail-1">
                            {this.props.mediaContent.thumbnail.map((str, i) => { return <img key={`thumbnail_${this.props.id}_${i}`} src={str} onClick={() => { this.showOriginalImage(str, i); }} /> })}
                        </div>);
                    break;
                case 2:
                case 4:
                    thumbnailContent = (
                        <div className="card-topic-thumbnail-2">
                            {this.props.mediaContent.thumbnail.map((str, i) => { return <img key={`thumbnail_${this.props.id}_${i}`} src={str} onClick={() => { this.showOriginalImage(str, i); }} /> })}
                        </div>);
                    break;
                case 3:
                case 5:
                case 6:
                    thumbnailContent = (
                        <div className="card-topic-thumbnail-3">
                            {this.props.mediaContent.thumbnail.map((str, i) => { return <img key={`thumbnail_${this.props.id}_${i}`} src={str} onClick={() => { this.showOriginalImage(str, i); }} /> })}
                        </div>);
                    break;
                default:
                    break;
            }
        }

        return (<div className="card-topic">
            <a className="card-topic-left" href={userUrl} target="_blank" id={`card_portrait_${this.props.id}`}>
                <img className="card-topic-portraitUrl" id={`card_portrait_image_${this.props.id}`} src={this.props.portraitUrl}></img>
            </a>
            <div className="card-topic-middle">
                <a className="card-topic-userName" href={userUrl} target="_blank" id={`card_username_${this.props.id}`}>{userName}</a>
                <a className="card-topic-time" href={topicUrl} target="_blank">{this.props.time}</a>
                <a className="card-topic-title" href={topicUrl} target="_blank">{this.props.title.trim() ? this.props.title : <span style={{ display: 'inline-block', width: '5rem' }}></span>}</a>
                <div className="card-topic-thumbnail-mini" id={`card_thumbnail_mini_area_${this.props.id}`}>
                    {this.imageCount > 1
                        ? this.props.mediaContent.thumbnail.map((str, i) => { return <img key={`thumbnail_mini_${this.props.id}_${i}`} id={`card_thumbnail_mini_image_${this.props.id}_${i}`} src={str} onClick={() => { this.changeMiniImage(str, i) }} /> })
                        : null}
                </div>
                <div className="card-topic-original-image" id={`card_original_image_area_${this.props.id}`}>
                    <img src="" id={`card_original_image_${this.props.id}`} onClick={() => { this.hideOriginalImage(); }} />
                </div>
                <div className="card-topic-thumbnail" id={`card_thumbnail_area_${this.props.id}`}>{thumbnailContent}</div>
                {this.props.contentType === 3 ? convertAudioPlayer(this.props) : null}
                {this.props.contentType === 2 ? convertVideoPlayer(this.props) : null}
                <div className="card-topic-board">
                    <div className="card-topic-boardName"><a href={boardUrl} target="_blank">{this.props.boardName}</a></div>
                    {this.props.tag1 ? <div className="card-topic-tag">{this.props.tag1}</div> : null}
                    {this.props.tag2 ? <div className="card-topic-tag">{this.props.tag2}</div> : null}
                </div>
                <div className="card-topic-info">
                    <div><a href={topicUrl} target="_blank"><i className="fa fa-eye fa-lg"></i>{this.props.hitCount}</a></div>
                    <div><a href={topicUrl} target="_blank"><i className="fa fa-commenting-o fa-lg"></i>{this.props.replyCount}</a></div>
                    {/* <div><i className="fa fa-thumbs-o-up fa-lg"></i>{this.props.likeCount}</div> */}
                    <div>最后回复：
                        <a href={lastPostUserUrl} target="_blank" id={`card_lastpost_${this.props.id}`}>{this.props.lastPostUser}</a>
                    </div>
                    <div><a href={lastPostUrl} target="_blank">{this.props.lastPostTime}</a></div>
                </div>
            </div>
        </div>);
    }
}

interface IVideoProps {
    src: string;
    pic: string;
    isLandscape: boolean;
}

class VideoPlayer extends React.Component<IVideoProps> {
    div: HTMLDivElement;
    dp: any;

    componentDidMount(): void {
        try {
            videoPlayerCount += 1;
            this.dp = new DPlayer({
                lang: 'zh-cn',
                element: this.div,
                autoplay: false,
                preload: 'metadata',
                loop: false,
                video: {
                    url: this.props.src,
                    pic: this.props.pic,
                    type: 'auto'
                },
            });
        } catch { }

        this.dp.on('abort', e => null);

        // 对全屏下高度的调整
        this.dp.on('fullscreen', e => this.setState({ height: 'auto' }));
        this.dp.on('fullscreen_cancel', e => this.setState({ height: '28.8984375rem' }));
        this.dp.on('webfullscreen', e => this.setState({ height: '100%' }));
        this.dp.on('webfullscreen_cancel', e => this.setState({ height: '28.8984375rem' }));
        this.div.getElementsByClassName('dplayer-menu')[0].innerHTML = '<div class="dplayer-menu-item"><a target="_blank" href="https://github.com/MoePlayer/DPlayer">关于 DPlayer 播放器</a></div>';

        let fullIn = this.div.getElementsByClassName('dplayer-full-in-icon')[0];
        if (fullIn) {
            fullIn.remove();
        }

        //竖屏视频的设置和全屏按钮会与时间重叠，移除
        if (!this.props.isLandscape) {
            let setting = this.div.getElementsByClassName('dplayer-setting')[0];
            if (setting) {
                setting.remove();
            }
            let full = this.div.getElementsByClassName('dplayer-full')[0];
            if (full) {
                full.remove();
            }
        }
    }

    componentWillUnmount() {
        this.dp && this.dp.destroy();
    }

    render() {
        if (this.props.isLandscape) {
            return <div className="dplayer"
                style={{ whiteSpace: 'normal', width: '380px', margin: '0 0 15px 0' }}
                ref={it => this.div = it}>
            </div>
        } else {
            return <div className="dplayer"
                style={{ whiteSpace: 'normal', width: '210px', margin: '0 0 15px 0' }}
                ref={it => this.div = it}>
            </div>;
        }
    }
}

function convertVideoPlayer(item: FocusTopic) {
    return (
        <VideoPlayer
            key={`card_video_${item.id}`}
            src={item.mediaContent.video}
            pic={item.mediaContent.thumbnail[0]}
            isLandscape={item.mediaContent.width >= item.mediaContent.height}
        />
    );
}

interface IAudioProps {
    src: string;
    title: string;
    userName: string;
    topicId: number;
}

class AudioPlayer extends React.Component<IAudioProps> {
    div: HTMLDivElement;
    ap: any;

    componentDidMount() {
        try {
            audioPlayerCount += 1;
            //console.log(`player count: ${audioPlayerCount}`);
            this.ap = new APlayer({
                element: this.div,
                autoplay: false,
                preload: 'metadata',
                loop: 'none',
                music: {
                    url: encodeURI(this.props.src),
                    title: this.props.title,
                    author: this.props.userName,
                    pic: '/static/images/audio_cover.png'
                }
            });
        } catch (e) {
            // IE 11 下会抛一个 InvalidStateError 的错误，忽略
        }
    }

    componentWillUnmount() {
        this.ap && this.ap.destroy();
    }

    render() {
        return <div className="aplayer"
            style={{ whiteSpace: 'normal', margin: '0 0 15px 0' }}
            ref={it => this.div = it}>
        </div>;
    }
}

function convertAudioPlayer(item: FocusTopic) {
    return (
        <AudioPlayer
            key={`card_audio_${item.id}`}
            title={item.title}
            src={item.mediaContent.audio}
            userName={item.userName}
            topicId={item.id}
        />
    );
}