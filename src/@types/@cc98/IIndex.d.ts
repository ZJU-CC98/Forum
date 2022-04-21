declare module '@cc98/api' {
    /** 首页 */
    export interface IIndex {
        /** 全站公告 */
        announcement: string,
        /** 热门话题 */
        hotTopic: IHotTopic[],
        /** 推荐阅读 */
        recommendationReading: IMainpageEditableContent[],
        /** 推荐功能 */
        recommendationFunction: IMainpageEditableContent[],
        /** 校园新闻 */
        schoolNews: IMainpageEditableContent[],
        /** 校园活动 */
        schoolEvent: IMainpageAutoContent[],
        /** 学术信息 */
        academics: IMainpageAutoContent[],
        /** 学习园地 */
        study: IMainpageAutoContent[],
        /** 感性·情感 */
        emotion: IMainpageAutoContent[],
        /** 跳蚤市场 */
        fleaMarket: IMainpageAutoContent[],
        /** 实习兼职 */
        partTimeJob: IMainpageAutoContent[],
        /** 求职广场 */
        fullTimeJob: IMainpageAutoContent[],
        /** 今日帖数 */
        todayCount: number,
        /** 总主题数 */
        topicCount: number,
        /** 总帖数 */
        postCount: number,
        /** 总用户数 */
        userCount: number,
        /** 最新注册用户名 */
        lastUserName: string,
        /** 当前在线用户数 */
        onlineUserCount: number,
        /** 首页数据最后刷新时间 */
        lastUpdateTime: string,
    }


    /** 热门话题 */
    export interface IHotTopic {
        /** 帖子id */
        id: number,
        /** 帖子标题 */
        title: string,
        /** 版面id */
        boardId: number,
        /** 版面名称 */
        boardName: string,
        /** 参与主题的用户数 */
        participantCount: number,
        /** 总回复数 */
        replyCount: number,
        /** 总点击数 */
        hitCount: number,
        /** 作者名，空值为匿名 */
        authorName: string | null,
        /** 发表时间 */
        createTime: string,
        /** 帖子类型 */
        type: number,
    }

    /** 
     * 首页可编辑的内容
     * 包括推荐阅读、推荐功能和校园新闻
     */
    export interface IMainpageEditableContent {
        /** 首页内容id */
        id: number,
        /** 
         * 首页可编辑内容类型
         * 1为推荐阅读 
         * 2为推荐功能
         * 3为校园新闻
         */
        type: number,
        /** 标题 */
        title: string,
        /** 内容 */
        content: string | null,
        /** 链接 */
        url: string,
        /** 图片链接 */
        imageUrl: string | null,
        /** 是否生效 */
        enable: boolean,
        /** 时间 */
        time: string,
        /** 排序权重 */
        orderWeight: number,
        /** 过期时间，空值为不过期 */
        expiredTime: null | string,
    }

    /** 
     * 首页自动生成的内容
     * 包括
     */
    export interface IMainpageAutoContent {
        /** 帖子id */
        id: number,
        /** 版面id */
        boardId: number,
        /** 帖子标题 */
        title: string,
        /** 帖子状态 */
        state: number,
        /** 帖子类型 */
        type: number,
        /** 是否仅限内部版面 */
        isInternalOnly: boolean,
        /** 是否是投票帖 */
        isVote: boolean,
    }
}
