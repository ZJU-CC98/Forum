import * as React from 'react';
import * as Utility from '../../Utility';
import { UbbContainer } from '../UbbContainer';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
const {TextArea} = Input;
interface AnnouncementState {
    /**
     * 全站公告内容
     */
    announcement: string;
    /**
     * 提示信息
     */
    info: string;
}

type props = {

}

export default class Announcement extends React.Component<props, AnnouncementState> {
    constructor(props) {
        super(props);
        this.state = {
            announcement: '加载中',
            info: ''
        };
        this.changeSiteAnnouncement = this.changeSiteAnnouncement.bind(this);
        this.clearMainPageCache = this.clearMainPageCache.bind(this);
    }
    async componentDidMount() {
        const url = '/config/global';
        let res = await Utility.cc98Fetch(url);
        let data = await res.json();
        this.setState({
            announcement: data.announcement
        });
    }

    async changeSiteAnnouncement() {
        try {
            const url = '/config/global/announcement';
            const token = await Utility.getToken();
            const announcement = this.state.announcement;
            let headers = new Headers();
            headers.append('Authorization', token);
            headers.append('Content-Type', 'application/json');
            let res = await Utility.cc98Fetch(url, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ announcement })
            });
            if (res.status === 200) {
                this.setState({ info: '修改全站公告成功' });
                setTimeout(() => {
                    this.setState({ info: '' });
                }, 1000);
            } else {
                throw new Error(res.status.toString());
            }
        } catch(e) {
            this.setState({ info: `修改失败${e.message}`});
        }
    }

    async clearMainPageCache() {
        try {
            let headers = await Utility.formAuthorizeHeader();
            let res = await Utility.cc98Fetch('/config/index/update', { 
                method: 'PUT',
                headers 
            });
            if(res.status === 200) {
                this.setState({ info: '清除首页缓存成功' });
                setTimeout(() => {
                    this.setState({ info: '' });
                }, 1000);
            } else {
                throw new Error(res.status.toString());
            }
        } catch(e) {
            this.setState({ info: `清除首页缓存失败 ${e.message}` });
        }

    }

    render() {
        return (
            <div style={{marginLeft:"1rem",marginRight:"1rem"}}>
                <p style={{ height: '2rem' }}>{this.state.info}</p>
                <div >
                    <div style={{ display: "flex", fontSize: "20px", alignItems: "center" ,justifyContent:"center",marginBottom:"1rem"}}><div style={{ marginTop: "10px", marginLeft: "15px", marginRight:"15px" }}>全站公告</div>
                         <div style={{marginLeft:"15px"}}> <Button type="primary"  onClick={this.changeSiteAnnouncement}>提交修改</Button> </div>
                        <div style={{marginLeft:"15px"}}> <Button type="primary" onClick={this.clearMainPageCache}>清除首页缓存</Button> </div>
                    </div>
                    <TextArea
                        spellCheck={false}
                        rows={8}
                        onChange={(e) => { this.setState({ announcement: e.target.value }); }}
                        value={this.state.announcement}
                    ></TextArea>
                    <div className="announcement">
            <div className="mainPageTitle1">
                <div className="mainPageTitleRow" style={{ width: '100%' }}>
                    <i className="fa fa-volume-up"></i>
                    <div style={{ flexGrow: 1 }} className="mainPageTitleText">全站公告</div>
                    {/*<CountDown endDate={new Date('05/26/2018 05:30 PM')} />*/}
                </div>
            </div>
            <div className="announcementContent"><UbbContainer code={this.state.announcement} /></div>
        </div>
                </div>
            </div>
        );
    }
}