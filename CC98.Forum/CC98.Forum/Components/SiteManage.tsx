import * as React from 'react';
import { UbbContainer } from './UbbContainer';

class SiteManageState {
    /**
     * 全站公告内容
     */
    announcement: string;
}

export class SiteManage extends React.Component<null, SiteManageState> {
    constructor(props) {
        super(props);
        this.state = {
            announcement: '加载中'
        };
    }
    async componentDidMount() {
        const url = 'http://apitest.niconi.cc/config/global';
        let res = await fetch(url);
        let data = await res.json();
        this.setState({
            announcement: data.announcement
        });
    }

    render() {
        return (<div className="site-manage">
            <p>全站管理</p>
            <div className="site-manage-content">
                <div className="site-manage-announcement">
                    <p>全站公告</p>
                    <textarea
                        onChange={(e) => { this.setState({ announcement: e.target.value }); }}
                        value={this.state.announcement}
                    ></textarea>
                    <UbbContainer code={this.state.announcement} />
                </div>
            </div>
        </div>);
    }
}