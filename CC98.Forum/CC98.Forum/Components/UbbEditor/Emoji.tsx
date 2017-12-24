import * as React from 'react';
import LazyImage from './LazyImage';

interface EmojiProps {
    handleEmojiButtonClick: (emoji: string) => void;
    height: number;
    emojiIsShown: boolean;
    emojiType: string;
    changeEmojiType: (em: 'em' | 'ac' | 'mj' | 'tb') => void;
}

export default class Emoji extends React.Component<EmojiProps> {
    render() {
        const mohjong = {
            animal: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011', '012', '013', '014', '015', '016'].map((item) => (<LazyImage
                src={`/static/images/mahjong/animal2017/${item}.png`}
                onClick={() => { this.props.handleEmojiButtonClick(`[a:${item}]`) }}
            ></LazyImage>)),
            carton: ['003.png', '018.gif', '019.png', '046.png', '049.gif', '059.png', '096.gif', '134.png', '189.png', '217.png'].map((item) => (<LazyImage
                src={`/static/images/mahjong/carton2017/${item}`}
                onClick={() => { this.props.handleEmojiButtonClick(`[c:${item.slice(0, 3)}]`) }}
            ></LazyImage>)),
            face: new Array(208).fill(0).map((item, index) => {
                if (index < 9) { return `00${index + 1}`; }
                else if (index < 99) { return `0${index + 1}`; }
                else { return `${index + 1}` }
            }).map((item, index) => {
                if ([4, 9, 56, 61, 62, 87, 115, 120, 137, 168, 169, 175, 206].indexOf(index + 1) !== -1) { return `${item}.gif`; }
                else { return `${item}.png`; }
            }).map((item) => (<LazyImage
                src={`/static/images/mahjong/face2017/${item}`}
                onClick={() => { this.props.handleEmojiButtonClick(`[f:${item.slice(0, 3)}]`) }}
            ></LazyImage>))
        };

        const emoji = {
            'em': new Array(92).fill(0)
                .map((item, index) => {
                    if (index < 10) {
                        return `0${index}`;
                    } else if ((index < 44) || (70 < index && index < 92)) {
                        return `${index}`;
                    }
                })
                .map((item) => (
                    item ? (<LazyImage
                        src={`/static/images/em/em${item}.gif`}
                        onClick={() => { this.props.handleEmojiButtonClick(`[em${item}]`) }}
                    ></LazyImage>) : null
                )),
            'ac': new Array(149).fill(0)
                .map((item, index) => {
                    if (index < 9) { return `0${index + 1}`; }
                    else if (index < 54) { return `${index + 1}`; }
                    else if (index < 94) { return `${index + 947}`; }
                    else { return `${index + 1907}`; }
                }).map((item) => (<LazyImage
                    src={`/static/images/ac/${item}.png`}
                    onClick={() => { this.props.handleEmojiButtonClick(`[ac${item}]`) }}
                ></LazyImage>)),
            'mj': [...mohjong.animal, ...mohjong.carton, ...mohjong.face],
            'tb': new Array(33).fill(0)
                .map((item, index) => {
                    if (index < 9) { return `0${index + 1}`; }
                    else { return `${index + 1}`; }
                }).map((item) => (<LazyImage
                    src={`/static/images/tb/tb${item}.png`}
                    onClick={() => { this.props.handleEmojiButtonClick(`[tb${item}]`) }}
                ></LazyImage>))
        };

        const info = {
            'ac': <p className="ubb-emoji-info">该组表情由 <a target="_blank" href="//www.acfun.cn">AcFun弹幕视频网</a> 提供</p>,
            'mj': <p className="ubb-emoji-info">该组表情由 <a target="_blank" href="//bbs.saraba1st.com/2b/forum.php">stage1st论坛</a> 提供</p>,
            'tb': <p className="ubb-emoji-info">该组表情由 <a target="_blank" href="//tieba.baidu.com ">百度贴吧</a> 提供</p>,
            'em': null
        };

        const height = this.props.height;

        return (
            <div
                className="ubb-emoji"
                style={this.props.emojiIsShown ? { height: '22rem', borderWidth: '1px', top: `-${height + 4}rem` } : { height: '0rem', top: `-${height + 4}rem` }}
            >
                <div className="ubb-emoji-buttons">
                    <button 
                        type="button" 
                        className={this.props.emojiType === 'ac' ? 'ubb-emoji-button-active' : 'ubb-emoji-button'} 
                        onClick={(e) => { e.stopPropagation(); this.props.changeEmojiType('ac'); }}
                    >AC娘</button>
                    <button 
                        type="button" 
                        className={this.props.emojiType === 'mj' ? 'ubb-emoji-button-active' : 'ubb-emoji-button'} 
                        onClick={(e) => { e.stopPropagation(); this.props.changeEmojiType('mj'); }}
                    >麻将脸</button>
                    <button 
                        type="button" 
                        className={this.props.emojiType === 'tb' ? 'ubb-emoji-button-active' : 'ubb-emoji-button'} 
                        onClick={(e) => { e.stopPropagation(); this.props.changeEmojiType('tb'); }}
                    >贴吧</button>
                    <button 
                        type="button" 
                        className={this.props.emojiType === 'em' ? 'ubb-emoji-button-active' : 'ubb-emoji-button'} 
                        onClick={(e) => { e.stopPropagation(); this.props.changeEmojiType('em'); }}
                    >经典</button>
                </div>
                <div className={`ubb-emoji-content ubb-emoji-content-${this.props.emojiType}`}>
                    {info[this.props.emojiType]}
                    {emoji[this.props.emojiType]}
                </div>
            </div>
        );
    }
}
