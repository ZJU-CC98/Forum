import * as React from 'react';
import * as Utility from '../../Utility';
import { UbbContainer } from '../UbbContainer';
import Announcement from './Announcement';
import Ad from './Advertisement';



export class SiteManage extends React.Component {    
    render() {
        return (<div style={{ backgroundColor: 'white' }}>
            <div style={{ display: "flex", justifyContent:"center",fontSize:"24px" }}>全站管理</div>
            <Announcement />
            <Ad />
        </div>);
    }
}