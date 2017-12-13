import * as React from 'react';
import * as Utility from '../Utility';
import { UbbContainer } from './UbbContainer';

class SiteManageState {
    /**
     * 全站公告内容
     */
    announcement: string;
    /**
     * 提示信息
     */
    info: string;
}

export class SiteManage extends React.Component<null, SiteManageState> {
    constructor(props) {
        super(props);
        this.state = {
            announcement: '加载中',
            info: ''
        };
        this.changeSiteAnnouncement = this.changeSiteAnnouncement.bind(this);
    }
    async componentDidMount() {
        const url = 'http://apitest.niconi.cc/config/global';
        let res = await fetch(url);
        let data = await res.json();
        this.setState({
            announcement: data.announcement
        });
    }

    async changeSiteAnnouncement() {
        const url = 'http://apitest.niconi.cc/config/global/announcement';
        const token = await Utility.getToken();
        const announcement = this.state.announcement;
        let headers = new Headers();
        headers.append('Authorization', token);
        headers.append('Content-Type', 'application/json');
        let res = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ announcement })
        });
        if (res.status === 200) {
            this.setState({ info: '修改全站公告成功' });
            setTimeout(() => {
                this.setState({ info: '' });
            }, 1000);
        }
    }

    render() {
        return (<div>
            <p>全站管理</p>
            <div>
                <p style={{height: '2rem'}}>{this.state.info}</p>
                <div>
                    <p>全站公告<button type="button" onClick={this.changeSiteAnnouncement}>提交修改</button></p>                    
                    <textarea
                        style={{width: '100%', height: '20rem', resize: 'none'}}
                        onChange={(e) => { this.setState({ announcement: e.target.value }); }}
                        value={this.state.announcement}
                    ></textarea>
                    <UbbContainer code={this.state.announcement} />
                </div>
            </div>
        </div>);
    }
}