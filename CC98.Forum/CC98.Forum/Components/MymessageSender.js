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
var MymessageSender = (function (_super) {
    __extends(MymessageSender, _super);
    function MymessageSender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MymessageSender.prototype.render = function () {
        return (React.createElement("div", { className: 'mymessage-message-wc' },
            React.createElement("div", { className: 'mymessage-message-wcTime' }, this.props.sendTime),
            React.createElement("div", { className: 'mymessage-message-wcSender' },
                React.createElement("img", { className: 'mymessage-message-wcPortraitUrl', src: this.props.myPortraitUrl }),
                React.createElement("div", { className: 'mymessage-message-wcContent' },
                    React.createElement("div", { id: String(this.props.id), className: 'mymessage-message-wcText' },
                        "\u3010",
                        this.props.title,
                        "\u3011",
                        this.props.content)),
                React.createElement("div", { className: 'mymessage-message-wcRead1' },
                    React.createElement("div", { className: 'mymessage-message-wcRead2' }, this.props.isRead ? '已读' : '未读')))));
    };
    return MymessageSender;
}(React.Component));
exports.MymessageSender = MymessageSender;
//# sourceMappingURL=MymessageSender.js.map