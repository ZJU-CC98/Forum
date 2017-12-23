// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import * as Utility from '../../Utility';

export class MessageSetting extends React.Component {

    setMessageSetting() {
        let responseSetting = $('input:radio[name="responseSetting"]:checked').val();
        let attmeSetting = $('input:radio[name="attmeSetting"]:checked').val();
        let systemSetting = $('input:radio[name="systemSetting"]:checked').val();
        let messageSetting = $('input:radio[name="messageSetting"]:checked').val();
        let noticeSetting = { response: responseSetting, attme: attmeSetting, system: systemSetting, message: messageSetting };
        Utility.setLocalStorage("noticeSetting", noticeSetting);
    }

    render() {
        return <div className="message-right">
            <div className="message-setting">
                <div className="message-settingbox">
                    <div>是否显示回复通知</div>
                    <input type="radio" name="responseSetting" id="responseSetting1" value="是" />
                    <input type="radio" name="responseSetting" id="responseSetting2" value="否" />
                </div>
                <div className="message-settingbox">
                    <div>是否显示@通知</div>
                    <input type="radio" name="attmeSetting" id="attmeSetting1" value="是" />
                    <input type="radio" name="attmeSetting" id="attmeSetting2" value="否" />
                </div>
                <div className="message-settingbox">
                    <div>是否显示系统通知</div>
                    <input type="radio" name="systemSetting" id="systemSetting1" value="是" />
                    <input type="radio" name="systemSetting" id="systemSetting2" value="否" />
                </div>
                <div className="message-settingbox">
                    <div>是否显示私信通知</div>
                    <input type="radio" name="messageSetting" id="messageSetting1" value="是" />
                    <input type="radio" name="messageSetting" id="messageSetting2" value="否" />
                </div>
            </div>
            <button >保存消息设置</button>
        </div>;
    }
}