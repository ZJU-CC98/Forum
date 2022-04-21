declare module '@cc98/api' {
  export interface IUser {
    /**
     * 用户名
     */
    name: string
    /**
     * 用户性别
     * 男：1
     * 女：0
     */
    gender: 0 | 1
    /**
     * 用户生日
     */
    birthday: string | null
    /**
     * 用户个人简介图片
     */
    photourl: string
    /**
     * 用户个人简介
     */
    introduction: string
    /**
     * 用户签名档
     */
    signatureCode: string
    /**
     * 用户 ID
     */
    id: number
    /**
     * 当前用户是否关注了该用户
     */
    isFollowing: boolean
    /**
     * 邮箱地址
     */
    emailAddress: string
    /**
     * QQ
     */
    qq: string
    /**
     * 发帖数
     */
    postCount: number
    /**
     * 威望
     */
    prestige: number
    /**
     * 显示的用户组
     */
    displayTitle: string
    /**
     * 全站权限等级
     */
    privilege: string
    /**
     * 注册时间
     */
    registerTime: string
    /**
     * 最后登录时间
     */
    lastLogOnTime: string
    /**
     * 自定义头衔
     */
    customTitle: string
    /**
     * 用户锁定状态：0正常  1锁定  2屏蔽  3全站TP
     */
    lockState: 0 | 1 | 2 | 3
    /**
     * 风评
     */
    popularity: number
    /**
     * 用户拥有的头衔 ID 们
     */
    userTitleIds: number[]
    /**
     * 当前显示的头衔 ID
     */
    displayTitleId: number
    /**
     * 粉丝数
     */
    fanCount: number
    /**
     * 财富值
     */
    wealth: number
    /**
     * 用户头像地址
     */
    portraitUrl: string
    /**
     * 用户关注的版面 ID 数组
     */
    customBoards: number[]
    /**
     * 用户关注数
     */
    followCount: number
    /**
     * 用户选择的主题
     */
    theme: number
    /**
     * 等级（已经废弃）
     */
    levelTitle: string
    /**
     * 用户版主头衔信息
     */
    boardMasterTitles: IBoardMasterTitle[]
    /**
     * 被删除的数量
     */
    deleteCount: number
  }
}
