
/**
 * 热门话题类
 */
export class HotTopic {

    //属性
    title: string;
    boardName: string;
boardid:number;
id:number;

    //构造方法
    constructor(title,boardName,id,boardid) {
        this.title = title;
        this.boardName = boardName;
this.id=id;
this.boardid=boardid;
    }
}