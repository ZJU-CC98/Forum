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
var MymessagePerson = /** @class */ (function (_super) {
    __extends(MymessagePerson, _super);
    function MymessagePerson() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MymessagePerson.prototype.render = function () {
        return (React.createElement("div", { className: 'mymessage-message-person' },
            React.createElement("img", { className: 'mymessage-message-pPortraitUrl', src: this.props.portraitUrl }),
            React.createElement("div", { className: 'mymessage-message-pInfo' },
                React.createElement("div", { className: 'mymessage-message-pName' }, this.props.name),
                React.createElement("div", { className: 'mymessage-message-pMessage' },
                    "[",
                    this.props.title,
                    "]",
                    this.props.content))));
    };
    return MymessagePerson;
}(React.Component));
exports.MymessagePerson = MymessagePerson;
//# sourceMappingURL=MymessagePerson.js.map