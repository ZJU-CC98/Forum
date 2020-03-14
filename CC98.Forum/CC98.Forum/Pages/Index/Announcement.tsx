import * as React from 'react';
import { CountDown } from '../../Components/CountDown';
import { UbbContainer } from '../../Components/UbbContainer';

/**
 * 全站公告组件
 * TODO:IndexTitle
 **/
export class Announcement extends React.Component<{ data }, {}> {
    render() {
        const data = this.props.data;
        if (data == "") return null
        else return (
            <div className="announcement">
                <div className="mainPageTitle1">
                    <div className="mainPageTitleRow" style={{ width: '100%' }}>
                        <i className="fa fa-volume-up"></i>
                        <div style={{ flexGrow: 1 }} className="mainPageTitleText">全站公告</div>
                        {/*<CountDown endDate={new Date('05/26/2018 05:30 PM')} />*/}
                    </div>
                </div>
                <div className="announcementContent"><UbbContainer code={data} /></div>
            </div>
        )
    } 
}