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
var MyMessageResponsebox = (function (_super) {
    __extends(MyMessageResponsebox, _super);
    function MyMessageResponsebox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    componentDidMount() {
        document.getElementById(String(this.props.id)).innerHTML = '修改后的内容';//UBBCode(this.props.cotent,'')
    }
    */
    MyMessageResponsebox.prototype.render = function () {
        return (React.createElement("div", { className: 'mymessage-response-box' },
            React.createElement("div", { className: 'mymessage-response-box-left' },
                React.createElement("img", { className: 'mymessage-response-img', src: this.props.chatPortraitUrl })),
            React.createElement("div", { className: 'mymessage-response-box-middle' },
                React.createElement("div", { className: 'mymessage-response-box-middle-name' }, this.props.senderName),
                React.createElement("div", { className: 'mymessage-response-box-middle-title' }, this.props.title),
                React.createElement("div", { className: 'mymessage-response-box-middle-date' }, this.props.sendTime),
                React.createElement("div", { className: "mymessage-response-box-middle-content" }, this.props.content)),
            React.createElement("div", { className: 'mymessage-response-box-right' }, "\u67E5\u770B")));
    };
    return MyMessageResponsebox;
}(React.Component));
exports.MyMessageResponsebox = MyMessageResponsebox;
//# sourceMappingURL=MyMessageResponsebox.js.map