import * as React from 'react';
/**
 * 全站TP需提交的BODY类型
 */
class ForumUserOperation {
    /**
     * 1=锁定，2=屏蔽，3=tp
     */
    OperationType: 1 | 2 | 3;
    /**
     * 0=取消，1=执行
     */
    PunishmentType: 0 | 1;
    /**
     * -1表示永久，其余7<Days<1000
     */
    Days?: number;
    /**
     * 理由
     */
    Reason: string
}

class Operation extends React.Component {

}