import * as React from 'react';
import { IIndex, IHotTopic, IMainpageAutoContent, IMainpageEditableContent } from '@cc98/api';
import { Announcement } from './Announcement'

import * as Utility from '../../Utility';

import { Link } from 'react-router-dom';
import DocumentTitle from '../../Components/DocumentTitle';
import { CountDown } from '../../Components/CountDown'

const defaultData: IIndex = {
    announcement: "",
    hotTopic: [{
        id: 0,
        title: "",
        boardId: 0,
        boardName: "",
        participantCount: 0,
        replyCount: 0,
        hitCount: 0,
        authorName: "",
        createTime: "",
        type: 0,
    }],
    recommendationReading: [{
        id: 0,
        type: 0,
        title: "",
        content: "",
        url: "",
        imageUrl: "",
        enable: false,
        time: "",
        orderWeight: 0,
        expiredTime: null,
    }],
    recommendationFunction: [{
        id: 0,
        type: 0,
        title: "",
        content: null,
        url: "",
        imageUrl: "",
        enable: false,
        time: "",
        orderWeight: 0,
        expiredTime: null,
    }],
    schoolNews: [{
        id: 0,
        type: 0,
        title: "",
        content: null,
        url: "",
        imageUrl: null,
        enable: false,
        time: "",
        orderWeight: 0,
        expiredTime: null,
    }],
    schoolEvent: [{
        id: 0,
        boardId: 0,
        title: "",
        state: 0,
        type: 0,
        isInternalOnly: false,
        isVote: false,
    }],
    academics: [{
        id: 0,
        boardId: 0,
        title: "",
        state: 0,
        type: 0,
        isInternalOnly: false,
        isVote: false,
    }],
    study: [{
        id: 0,
        boardId: 0,
        title: "",
        state: 0,
        type: 0,
        isInternalOnly: false,
        isVote: false,
    }],
    emotion: [{
        id: 0,
        boardId: 0,
        title: "",
        state: 0,
        type: 0,
        isInternalOnly: false,
        isVote: false,
    }],
    fleaMarket: [{
        id: 0,
        boardId: 0,
        title: "",
        state: 0,
        type: 0,
        isInternalOnly: false,
        isVote: false,
    }],
    partTimeJob: [{
        id: 0,
        boardId: 0,
        title: "",
        state: 0,
        type: 0,
        isInternalOnly: false,
        isVote: false,
    }],
    fullTimeJob: [{
        id: 0,
        boardId: 0,
        title: "",
        state: 0,
        type: 0,
        isInternalOnly: false,
        isVote: false,
    }],
    todayCount: 0,
    topicCount: 0,
    postCount: 0,
    userCount: 0,
    lastUserName: "",
    onlineUserCount: 0,
    lastUpdateTime: "",
}

export class Index extends React.Component<{}, { data }> {
    constructor(props) {
        super(props);
        this.state = {
            data: defaultData,
        }
    }

    render() {
        return <>
            <DocumentTitle title={`CC98论坛`} />
            {/*<AnnouncementComponent data={data.announcement} />*/}
        </>
    }
}