import * as React from 'react';
import { AppState } from '../States/AppState';

export class Footer extends React.Component<{}, AppState> {   //底部
    render() {
        return <div className="footer">
            <div className="column">
                <div className="footerRow">
                    <div style={{ marginRight: "15px", color: "#000" }}>CC98运营管理团队</div>
                    <a href="https://www.cc98.org" target="_blank">CC98论坛</a>|
                    <a href="https://space.bilibili.com/222288454" target="_blank">bilibili官号</a>|
                    <a href="https://www.nexushd.org" target="_blank">NexusHD高清社区</a>|
                    <a href="/user/id/517471" target="_blank">雕塑流年</a>|
                    <a href="https://space.bilibili.com/695376760" target="_blank">CC98舞团</a>|
                    <a href="https://gaming.cc98.org" target="_blank">CC98竞猜中心</a>|
                    <a href="https://card.cc98.org" target="_blank">CC98抽卡游戏</a>|
                    <a href="https://account.cc98.org" target="_blank">CC98账户管理 (账号密码找回)</a>|
                    <a href="https://openid.cc98.org" target="_blank">CC98登录中心</a>
                </div>
                <div className="footerRow">
                    <div style={{ marginRight: "15px", color: "#000" }}>友情链接</div>
                    <a href="http://www.zju.edu.cn" target="_blank">浙江大学</a>|
                    <a href="http://xcb.zju.edu.cn" target="_blank">浙江大学党委宣传部</a>|
                    <a href="http://www.cs.zju.edu.cn" target="_blank">浙江大学计算机学院</a>|
                    <a href="https://zjuers.com" target="_blank">ZJUers轻首页</a>|
                    <a href="https://www.qsc.zju.edu.cn" target="_blank">求是潮</a>|
                    <a href="http://www.zjulib.com" target="_blank">浙大图助</a>|
                    <a href="https://www.zdgd.zju.edu.cn" target="_blank" style={{ color: "#787878" }}>浙江大学广播电视网</a>|
                    <a href="http://www.zju88.org/agent/index.do" target="_blank" style={{ color: "#787878" }}>飘渺水云间</a>|
                    <a href="http://luckweb.057101.com/bt2/index.asp" target="_blank" style={{ color: "#787878" }}>缘网</a>
                </div>
                <div className="footerRow">
                    Copyright © 2003-{(new Date()).getFullYear()} CC98 Durian v3.5.0 | <a href="mailto:contact@cc98.org">Email: contact@cc98.org</a>
                </div>
            </div>
        </div>
    }
}
