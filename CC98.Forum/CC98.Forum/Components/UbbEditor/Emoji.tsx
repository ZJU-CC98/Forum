import * as React from 'react';
import LazyImage from './LazyImage';

/**
 * 均从父组件中传递
 * 功能参考父组件的state与方法
 */
interface EmojiProps {
    handleEmojiButtonClick: (emoji: string) => void;
    height: number;
    emojiIsShown: boolean;
    emojiType: string;
    changeEmojiType: (em: 'em' | 'ac' | 'mj' | 'tb') => void;
}

export default class Emoji extends React.Component<EmojiProps> {
    render() {
        //新建数组通过map生成<img>
        //麻将脸系列
        const mohjong = {
            //动物系列只用16个，o(1)......
            animal: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011', '012', '013', '014', '015', '016'].map((item) => (<LazyImage
                key={`[a:${item}]`}
                src={`/static/images/mahjong/animal2017/${item}.png`}
                onClick={() => { this.props.handleEmojiButtonClick(`[a:${item}]`) }}
            ></LazyImage>)),
            //卡通系列10个，同样o(1)......
            carton: ['003.png', '018.gif', '019.png', '046.png', '049.gif', '059.png', '096.gif', '134.png', '189.png', '217.png'].map((item) => (<LazyImage
                key={`[c:${item.slice(0, 3)}]`}
                src={`/static/images/mahjong/carton2017/${item}`}
                onClick={() => { this.props.handleEmojiButtonClick(`[c:${item.slice(0, 3)}]`) }}
            ></LazyImage>)),
            //其他表情三位数，从1算起，index+1
            face: new Array(208).fill(0).map((item, index) => {
                //小于10的加两个0
                if (index < 9) { return `00${index + 1}`; }
                //小于100的加一个0
                else if (index < 99) { return `0${index + 1}`; }
                //其余默认
                else { return `${index + 1}` }
            }).map((item, index) => {
                //处理后缀为gif的表情，o(1)......
                if ([4, 9, 56, 61, 62, 87, 115, 120, 137, 168, 169, 175, 206].indexOf(index + 1) !== -1) { return `${item}.gif`; }
                else { return `${item}.png`; }
            }).map((item) => (<LazyImage
                key={`[f:${item.slice(0, 3)}]`}
                src={`/static/images/mahjong/face2017/${item}`}
                onClick={() => { this.props.handleEmojiButtonClick(`[f:${item.slice(0, 3)}]`) }}
            ></LazyImage>))
        };

        //基本同上
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
                        key={`[em${item}]`}
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
                    key={`[ac${item}]`}
                    src={`/static/images/ac/${item}.png`}
                    onClick={() => { this.props.handleEmojiButtonClick(`[ac${item}]`) }}
                ></LazyImage>)),
            'mj': [...mohjong.animal, ...mohjong.carton, ...mohjong.face],
            'tb': new Array(33).fill(0)
                .map((item, index) => {
                    if (index < 9) { return `0${index + 1}`; }
                    else { return `${index + 1}`; }
                }).map((item) => (<LazyImage
                    key={`[tb${item}]`}
                    src={`/static/images/tb/tb${item}.png`}
                    onClick={() => { this.props.handleEmojiButtonClick(`[tb${item}]`) }}
                ></LazyImage>))
        };

        //表情栏上的info
        const info = {
            'ac': <p className="ubb-emoji-info">该组表情由 <a target="_blank" href="//www.acfun.cn">AcFun弹幕视频网</a> 提供</p>,
            'mj': <p className="ubb-emoji-info">该组表情由 <a target="_blank" href="//bbs.saraba1st.com/2b/forum.php">stage1st论坛</a> 提供</p>,
            'tb': <p className="ubb-emoji-info">该组表情由 <a target="_blank" href="//tieba.baidu.com ">百度贴吧</a> 提供</p>,
            'em': null
        };

        const { height, emojiType, emojiIsShown } = this.props;

        return (
            <div
                className="ubb-emoji"
                style={emojiIsShown ? { height: '22rem', borderWidth: '1px'} : { height: '0rem'}}
            >
                <div className="ubb-emoji-buttons">
                    <button 
                        type="button" 
                        className={emojiType === 'ac' ? 'ubb-emoji-button-active' : 'ubb-emoji-button'} 
                        onClick={(e) => { e.stopPropagation(); this.props.changeEmojiType('ac'); }}
                    >AC娘</button>
                    <button 
                        type="button" 
                        className={emojiType === 'mj' ? 'ubb-emoji-button-active' : 'ubb-emoji-button'} 
                        onClick={(e) => { e.stopPropagation(); this.props.changeEmojiType('mj'); }}
                    >麻将脸</button>
                    <button 
                        type="button" 
                        className={emojiType === 'tb' ? 'ubb-emoji-button-active' : 'ubb-emoji-button'} 
                        onClick={(e) => { e.stopPropagation(); this.props.changeEmojiType('tb'); }}
                    >贴吧</button>
                    <button 
                        type="button" 
                        className={emojiType === 'em' ? 'ubb-emoji-button-active' : 'ubb-emoji-button'} 
                        onClick={(e) => { e.stopPropagation(); this.props.changeEmojiType('em'); }}
                    >经典</button>
                </div>
                <div className={`ubb-emoji-content ubb-emoji-content-${emojiType}`}>
                    {info[emojiType]}
                    {emoji[emojiType]}
                </div>
            </div>
        );
    }
}
