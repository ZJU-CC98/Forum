import * as React from 'react';
import { AppState } from '../States/AppState';
import * as $ from 'jquery';

export class Footer extends React.Component<{}, AppState> {   //顶部条的下拉菜单组件 
    render() {     
        return <div className="footer">
            <div className="footerRow">友情链接    |    浙江大学    |    浙江大学计算机学院    |    浙江大学体育学院    |    浙江大学文创学院    |    浙江大学挖掘机学院</div>
            <div className="footerRow">浙江大学挖掘机学院    |    浙江大学挖掘机学院    |    浙江大学挖掘机学院    |    浙江大学挖掘机学院    |    浙江大学挖掘机学院    |    浙江大学挖掘机学院    |    浙江大学挖掘机学院</div>
            <div className="footerRow">Copyright © 2003-2017 CC98 Network Association. Email: contact@cc98.org <a href="http://www.cc98.org/onlineshow.asp"> 论坛统计</a></div>
        </div>
    }
}