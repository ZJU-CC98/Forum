declare module '@cc98/api' {
  export interface IAward {
    /**
     * 操作内容
     */
    content: string
    /**
     * 操作人
     */
    operatorName: string
    /**
     * 操作理由
     */
    reason: string
    /**
     * 时间
     */
    time: Date
    /**
     * 类型
     */
    type: number
    /**
     * TODO:
     */
    id: number
  }
}
