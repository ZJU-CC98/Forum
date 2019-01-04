declare module '@cc98/api' {
  export interface ISignIn {
    /*
     *今日是否已签到
     */
    hasSignedInToday: boolean
    /*
     *连续签到天数
     */
    lastSignInCount: number
    /*
     *上次签到时间
     */
    lastSignInTime: string
  }
}
