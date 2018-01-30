// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import * as Utility from '../../Utility';
import DocumentTitle from '../DocumentTitle';

export class MessageSetting extends React.Component {

    componentDidMount() {
        let noticeSetting = Utility.getLocalStorage("noticeSetting");
        if (noticeSetting) {
            if (noticeSetting.response === "否") {
                $("#responseSetting1").attr('checked', 'false');
                $("#responseSetting2").attr('checked', 'true');
            }
            if (noticeSetting.attme === "否") {
                $("#attmeSetting1").attr('checked', 'false');
                $("#attmeSetting2").attr('checked', 'true');
            }
            if (noticeSetting.system === "否") {
                $("#systemSetting1").attr('checked', 'false');
                $("#systemSetting2").attr('checked', 'true');
            }
            if (noticeSetting.message === "否") {
                $("#messageSetting1").attr('checked', 'false');
                $("#messageSetting2").attr('checked', 'true');
            }
            if (noticeSetting.post === "否") {
                $("#postSetting1").attr('checked', 'false');
                $("#postSetting2").attr('checked', 'true');
            }
        }
    }

    setMessageSetting() {
        let responseSetting = $('input:radio[name="responseSetting"]:checked').val();
        let attmeSetting = $('input:radio[name="attmeSetting"]:checked').val();
        let systemSetting = $('input:radio[name="systemSetting"]:checked').val();
        let messageSetting = $('input:radio[name="messageSetting"]:checked').val();
        let postSetting = $('input:radio[name="postSetting"]:checked').val();
        let noticeSetting = { response: responseSetting, attme: attmeSetting, system: systemSetting, message: messageSetting, post: postSetting };
        Utility.setLocalStorage("noticeSetting", noticeSetting);
        alert("保存成功");
    }

    render() {
        return <div className="message-right">
            <DocumentTitle title={`消息设置-CC98论坛`} />
            <div className="message-setting">
                <div className="message-settingbox">
                    <div className="redioTitle">是否显示回复通知</div>
                    <input type="radio" name="responseSetting" id="responseSetting1" value="是" checked />
                    <div>是</div>
                    <input type="radio" name="responseSetting" id="responseSetting2" value="否" />
                    <div>否</div>
                </div>
                <div className="message-settingbox">
                    <div className="redioTitle">是否显示@通知</div>
                    <input type="radio" name="attmeSetting" id="attmeSetting1" value="是" checked />
                    <div>是</div>
                    <input type="radio" name="attmeSetting" id="attmeSetting2" value="否" />
                    <div>否</div>
                </div>
                <div className="message-settingbox">
                    <div className="redioTitle">是否显示系统通知</div>
                    <input type="radio" name="systemSetting" id="systemSetting1" value="是" checked />
                    <div>是</div>
                    <input type="radio" name="systemSetting" id="systemSetting2" value="否" />
                    <div>否</div>
                </div>
                <div className="message-settingbox">
                    <div className="redioTitle">是否显示私信通知</div>
                    <input type="radio" name="messageSetting" id="messageSetting1" value="是" checked />
                    <div>是</div>
                    <input type="radio" name="messageSetting" id="messageSetting2" value="否" />
                    <div>否</div>
                </div>
                <div className="message-settingbox">
                    <div className="redioTitle">回帖后是否跳转至最新回复</div>
                    <input type="radio" name="postSetting" id="postSetting1" value="是" />
                    <div>是</div>
                    <input type="radio" name="postSetting" id="postSetting2" value="否" checked />
                    <div>否</div>
                </div>
                <button className="message-setting-btn" onClick={this.setMessageSetting}>保存消息设置</button>
            </div>
        </div>;
    }
}