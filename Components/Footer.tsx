import * as React from 'react';
import { AppState } from '../States/AppState';

export class Footer extends React.Component<{}, AppState> {   //底部
    render() {
        return <div className="footer">
            <div className="column">
                <div className="footerRow">
                    <div style={{ marginRight: "15px", color: "#000" }}>友情链接</div>
                    <a href="http://www.zju.edu.cn" target="_blank">浙江大学</a>|
                    <a href="http://xcb.zju.edu.cn" target="_blank">党委宣传部</a>|
                    <a href="http://www.cs.zju.edu.cn" target="_blank">计算机学院</a>|
                    <a href="http://www.nexushd.org" target="_blank">NexusHD高清社区</a>|
                    <a href="http://www.qsc.zju.edu.cn" target="_blank">求是潮</a>|
                    <a href="https://zjuers.com" target="_blank">ZJUers轻首页</a>
                </div>
                <div className="footerRowLight">
                    <a href="https://www.zdgd.zju.edu.cn" target="_blank">浙江大学广播电视网</a>|
                    <a href="http://www.zju88.org/agent/index.do" target="_blank">飘渺水云间</a>|
                    <a href="http://luckweb.057101.com/bt2/index.asp" target="_blank">缘网</a>
                </div>
                <div className="footerRow">
                    Copyright © 2003-{(new Date()).getFullYear()} CC98 Durian v3.5.0 | <a href="mailto:contact@cc98.org">Email: contact@cc98.org</a>
                </div>
            </div>
        </div>
    }
}
