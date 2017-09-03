"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = require("react");
var MymessageReceiver = (function (_super) {
    __extends(MymessageReceiver, _super);
    function MymessageReceiver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    componentDidMount() {
        document.getElementById(String(this.props.id)).innerHTML = '修改后的内容';//UBBCode(this.props.cotent,'')
    }
    */
    MymessageReceiver.prototype.render = function () {
        return (React.createElement("div", { className: 'mymessage-message-wc' },
            React.createElement("div", { className: 'mymessage-message-wcTime' }, this.props.sendTime),
            React.createElement("div", { className: 'mymessage-message-wcReceiver' },
                React.createElement("img", { className: 'mymessage-message-wcPortraitUrl', src: this.props.chatPortraitUrl }),
                React.createElement("div", { className: 'mymessage-message-wcContent' },
                    React.createElement("div", { className: 'mymessage-message-wcText', id: String(this.props.id) },
                        "\u3010",
                        this.props.title,
                        "\u3011",
                        this.props.content)),
                React.createElement("div", { className: 'mymessage-message-wcRead1' },
                    React.createElement("div", { className: 'mymessage-message-wcRead2' }, this.props.isRead ? '已读' : '未读')))));
    };
    return MymessageReceiver;
}(React.Component));
exports.MymessageReceiver = MymessageReceiver;
//# sourceMappingURL=MymessageReceiver.js.map