// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import * as Utility from '../../Utility';
import DocumentTitle from '../DocumentTitle';
import { NoticeMessage } from '../NoticeMessage';

type UserBooleanSetting = "是" | "否";

/**
 * 用户消息设置选项。
 */
export class NoticeSetting {
    /**
     * 回复消息。
     */
    response: UserBooleanSetting;
    /**
     * AT 消息。
     */
    attme: UserBooleanSetting;
    /**
     * 系统消息。
     */
    system: UserBooleanSetting;
    /**
     * 用户消息。
     */
    message: UserBooleanSetting;
    /**
     * 跳转到最新回复。
     */
    post: UserBooleanSetting;
}

export class MessageSetting extends React.Component {

    async componentDidMount() {
        let noticeSetting = Utility.getLocalStorage<NoticeSetting>("noticeSetting");
        if (noticeSetting) {
            if (noticeSetting.response === "否") {
                $("#responseSetting1").removeAttr('checked');
                $("#responseSetting2").attr('checked', 'checked');
            }
            else {
                $("#responseSetting1").attr('checked', 'checked');
                $("#responseSetting2").removeAttr('checked');
            }
            if (noticeSetting.attme === "否") {
                $("#attmeSetting1").removeAttr('checked');
                $("#attmeSetting2").attr('checked', 'checked');
            }
            else {
                $("#attmeSetting1").attr('checked', 'checked');
                $("#attmeSetting2").removeAttr('checked');
            }
            if (noticeSetting.system === "否") {
                $("#systemSetting1").removeAttr('checked');
                $("#systemSetting2").attr('checked', 'checked');
            }
            else {
                $("#systemSetting1").attr('checked', 'checked');
                $("#systemSetting2").removeAttr('checked');
            }
            if (noticeSetting.message === "否") {
                $("#messageSetting1").removeAttr('checked');
                $("#messageSetting2").attr('checked', 'checked');
            }
            else {
                $("#messageSetting1").attr('checked', 'checked');
                $("#messageSetting2").removeAttr('checked');
            }
            if (noticeSetting.post === "否") {
                $("#postSetting1").removeAttr('checked');
                $("#postSetting2").attr('checked', 'checked');
            }
            else {;
                $("#postSetting1").attr('checked', 'checked');
                $("#postSetting2").removeAttr('checked');
            }
        }
        else {
            let noticeSetting = { response: "是", attme: "是", system: "是", message: "是", post: "否" };
            Utility.setLocalStorage("noticeSetting", noticeSetting);
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
        Utility.noticeMessageShow('saveSuccess');
    }

    render() {
        return <div className="message-right">
            <DocumentTitle title={`消息设置-CC98论坛`} />
            <div className="message-setting">
                <div className="message-settingbox">
                    <div className="radioTitle">是否显示回复通知</div>
                    <input type="radio" name="responseSetting" id="responseSetting1" value="是" checked />
                    <div>是</div>
                    <input type="radio" name="responseSetting" id="responseSetting2" value="否" />
                    <div>否</div>
                </div>
                <div className="message-settingbox">
                    <div className="radioTitle">是否显示@通知</div>
                    <input type="radio" name="attmeSetting" id="attmeSetting1" value="是" checked />
                    <div>是</div>
                    <input type="radio" name="attmeSetting" id="attmeSetting2" value="否" />
                    <div>否</div>
                </div>
                <div className="message-settingbox">
                    <div className="radioTitle">是否显示系统通知</div>
                    <input type="radio" name="systemSetting" id="systemSetting1" value="是" checked />
                    <div>是</div>
                    <input type="radio" name="systemSetting" id="systemSetting2" value="否" />
                    <div>否</div>
                </div>
                <div className="message-settingbox">
                    <div className="radioTitle">是否显示私信通知</div>
                    <input type="radio" name="messageSetting" id="messageSetting1" value="是" checked />
                    <div>是</div>
                    <input type="radio" name="messageSetting" id="messageSetting2" value="否" />
                    <div>否</div>
                </div>
                <div className="message-settingbox">
                    <div className="radioTitle">回帖是否跳至最新回复</div>
                    <input type="radio" name="postSetting" id="postSetting1" value="是" />
                    <div>是</div>
                    <input type="radio" name="postSetting" id="postSetting2" value="否" checked/>
                    <div>否</div>
                </div>
                <button className="message-setting-btn" onClick={this.setMessageSetting}>保存消息设置</button>
                <NoticeMessage text="保存成功" id="saveSuccess" top="31%" left="43%"/>
            </div>
        </div>;
    }
}