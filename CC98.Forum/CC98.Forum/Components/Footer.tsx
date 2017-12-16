import * as React from 'react';
import { AppState } from '../States/AppState';
import * as $ from 'jquery';

export class Footer extends React.Component<{}, AppState> {   //底部
    render() {
        return <div className="footer">
            <div className="column">
                <div className="footerRow">
                    <div style={{ marginRight: "15px", color: "#000" }}>友情链接</div>
                    <a href="http://www.zju.edu.cn/">浙江大学</a>|
                    <a href="http://www.cs.zju.edu.cn/">浙江大学计算机学院</a>|
                    <a href="http://www.zju88.org/agent/index.do">飘渺水云间</a>|
                    <a href="http://www.qsc.zju.edu.cn/">求是潮</a>|
                    <a href="http://luckweb.057101.com/bt2/index.asp">缘网</a>|
                    <a href="http://www.nexushd.org/login.php">NexusHD</a>|
                    <a href="https://www.zdgd.zju.edu.cn/">浙江大学广播电视网</a>|
                    <a href="http://zy.zju.edu.cn/">浙大搜索</a></div>
                <div className="footerRow">Copyright © 2003-2017 CC98 . Email: contact@cc98.org
                    <a href="http://www.cc98.org/onlineshow.asp"> 论坛统计</a></div>
            </div>
        </div>
    }
}