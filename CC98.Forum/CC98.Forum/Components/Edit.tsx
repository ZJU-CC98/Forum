import * as React from 'react';
import * as Utility from '../Utility';
import { AppState } from '../States/AppState';
import * as $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link,

    withRouter
} from 'react-router-dom';
import { match } from "react-router";
import { RouteComponent } from './RouteComponent';
import { UbbEditor } from './UbbEditor';
import { Constants } from './Constant';
import store from '../Store';
import * as ErrorActions from '../Actions/Error';
declare let editormd: any;
declare let testEditor: any;

export class Edit extends RouteComponent<{ history }, { topicInfo, boardName, tags, ready, mode, content, title, postInfo, tag1, tag2, fetchState, boardId, type, masters: string[] }, { mode: string, id: number }> {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.changeEditor = this.changeEditor.bind(this);
        this.sendMdTopic = this.sendMdTopic.bind(this);
        this.sendUbbTopic = this.sendUbbTopic.bind(this);
        this.editUBB = this.editUBB.bind(this);
        this.changeAcademicType = this.changeAcademicType.bind(this);
        this.changeActivityType = this.changeActivityType.bind(this);
        this.changeNormalType = this.changeNormalType.bind(this);
        this.state = ({
            masters: [], tags: [], boardName: "", ready: false, mode: 0, content: "", title: "", postInfo: { floor: 0, title: "", content: "", contentType: 0 }, tag1: "", tag2: "", fetchState: 'ok', boardId: 1, type: 0, topicInfo: {}
        });
    }

    async componentDidMount() {
        const mode = this.match.params.mode;
        const id = this.match.params.id;
        const token = await Utility.getToken();
        const headers = new Headers();
        headers.append("Authorization", token);
        let url, response, data, tags;
        switch (mode) {
            case 'postTopic':
                url = `/Board/${id}`;
                response = await Utility.cc98Fetch(url, { headers });
                data = await response.json();
                const boardName = data.name;
                //获取标签
                tags = await Utility.getBoardTag(id);
                this.setState({ boardName: boardName, tags: tags, boardId: id, masters: data.boardMasters });
                break;
            case 'edit':
                url = `/post/${id}/original`;
                response = await Utility.cc98Fetch(url, { headers });
                if (response.status === 403) {
                    this.setState({ fetchState: "not allowed" });
                }
                data = await response.json();
                const topicInfo = await Utility.getTopicInfo(data.topicId);
                let tag1Name = await Utility.getTagNamebyId(topicInfo.tag1);
                if (!tag1Name) tag1Name = "";
                let tag2Name = await Utility.getTagNamebyId(topicInfo.tag2);
                if (!tag2Name) tag2Name = "";
                let type = topicInfo.type;
                tags = await Utility.getBoardTag(data.boardId);

                Utility.setLocalStorage("contentCache", data.content);
                const cache = Utility.getLocalStorage("contentCache");
                console.log("cache after saving = " + cache);


                //console.log(tags);

                url = `/Board/${data.boardId}`;
                response = await Utility.cc98Fetch(url, { headers });
                let masters = (await response.json()).boardMasters;
                if (!(Utility.isMaster(masters) || (Utility.getLocalStorage('userInfo').userTitleIds || []).indexOf(91) !== -1) && type === 1) {
                    type = 0;
                }
                const boardName1 = await Utility.getBoardName(data.boardId);
                if (data.contentType === 0) {
                    this.setState({ masters, postInfo: data, content: data.content, title: data.title, boardName: boardName1, boardId: data.boardId, type: type, tags: tags, topicInfo: topicInfo, tag1: tag1Name, tag2: tag2Name, mode: 0 });
                } else
                    this.setState({ masters, postInfo: data, content: data.content, title: data.title, boardName: boardName1, boardId: data.boardId, type: type, tags: tags, topicInfo: topicInfo, tag1: tag1Name, tag2: tag2Name, mode: 1 });
                break;
        }

    }
    changeNormalType() {

        this.setState({ type: 0 });
    }
    changeAcademicType() {

        this.setState({ type: 2 });
    }
    changeActivityType() {

        this.setState({ type: 1 });
    }
    ready() {
        this.setState({ ready: true });
    }
    changeEditor() {
        if (this.state.mode === 0) {
            console.log("change mode to 1");
            this.setState({ mode: 1 });
        } else {
            console.log("change mode to 2");
            this.setState({ mode: 0 });
        }
    }
    update(value) {
        this.setState({ content: value });
    }
    async sendMdTopic() {
        if (this.state.title == "") {
            alert("请输入标题!");
        } else {
            try {
                let tag1Id, tag2Id;
                let url = `/board/${this.match.params.id}/topic`;
                let c = Constants.testEditor.getMarkdown();
                let content;
                const type = this.state.type;
                tag1Id = await Utility.getTagIdbyName(this.state.tag1);
                tag2Id = await Utility.getTagIdbyName(this.state.tag2);
                if (tag1Id && !tag2Id) {

                    content = {
                        content: c,
                        contentType: 1,
                        title: this.state.title,
                        tag1: tag1Id,
                        type: this.state.type
                    };
                }
                else if (tag2Id) {

                    content = {
                        content: c,
                        contentType: 1,
                        title: this.state.title,
                        tag1: tag1Id,
                        tag2: tag2Id,
                        type: this.state.type
                    };
                }
                else {
                    content = {
                        content: c,
                        contentType: 1,
                        title: this.state.title,
                        type: this.state.type
                    };
                }

                let contentJson = JSON.stringify(content);
                let token = await Utility.getToken();
                let myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Content-Type", 'application/json');
                let mes = await Utility.cc98Fetch(url, {

                    method: 'POST',

                    headers: myHeaders,

                    body: contentJson

                }
                );
                if (mes.status === 402) {
                    alert("请输入内容");
                }
                //   testEditor.setMarkdown("");
                const topicId = await mes.text();
                //根据返回的topicid，发送@信息       
                const atUsers = Utility.atHanderler(c);
                //如果存在合法的@，则发送@信息，否则不发送，直接跳转至所发帖子
                if (atUsers) {
                    const atUsersJSON = JSON.stringify(atUsers);
                    const url2 = `/notification/at?topicid=${topicId}`;
                    let myHeaders2 = new Headers();
                    myHeaders2.append("Content-Type", 'application/json');
                    myHeaders2.append("Authorization", token);
                    let response2 = await Utility.cc98Fetch(url2, {
                        method: 'POST',
                        headers: myHeaders2,
                        body: atUsersJSON
                    });
                }
                Utility.removeLocalStorage("contentCache");
                this.props.history.push(`/topic/${topicId}`);
            } catch (e) {
                //console.log("Error");
                console.log(e);
            }
        }

    }
    async sendUbbTopic() {
        if (this.state.title == "") {
            alert("请输入标题！");
        } else {
            const url = `/board/${this.match.params.id}/topic`;
            let content;
            let tag1Id, tag2Id;
            const type = this.state.type;
            //console.log(this.state);
            tag1Id = await Utility.getTagIdbyName(this.state.tag1);
            tag2Id = await Utility.getTagIdbyName(this.state.tag2);
            if (tag1Id && !tag2Id) {
                content = {
                    content: this.state.content,
                    contentType: 0,
                    title: this.state.title,
                    tag1: tag1Id,
                    type: this.state.type
                };
            }
            else if (tag2Id) {
                content = {
                    content: this.state.content,
                    contentType: 0,
                    title: this.state.title,
                    tag1: tag1Id,
                    tag2: tag2Id,
                    type: this.state.type
                };
            }
            else {
                content = {
                    content: this.state.content,
                    contentType: 0,
                    title: this.state.title,
                    type: this.state.type
                };
            }
            const contentJson = JSON.stringify(content);
            const token = await Utility.getToken();
            let myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            myHeaders.append("Content-Type", 'application/json');
            let response = await Utility.cc98Fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: contentJson
            }
            );
            //发帖成功，api返回topicid
            const topicId = await response.text();
            console.log("topicid=" + topicId);
            if (topicId === 'cannot_post_in_this_board')
                store.dispatch(ErrorActions.throwError(('CannotPost')));
            else {
                //根据返回的topicid，发送@信息       
                const atUsers = Utility.atHanderler(this.state.content);
                //如果存在合法的@，则发送@信息，否则不发送，直接跳转至所发帖子
                if (atUsers) {
                    const atUsersJSON = JSON.stringify(atUsers);
                    const url2 = `/notification/at?topicid=${topicId}`;
                    let myHeaders2 = new Headers();
                    myHeaders2.append("Content-Type", 'application/json');
                    myHeaders2.append("Authorization", token);
                    let response2 = await Utility.cc98Fetch(url2, {
                        method: 'POST',
                        headers: myHeaders2,
                        body: atUsersJSON
                    });
                }
                Utility.removeLocalStorage("contentCache");
                this.props.history.push(`/topic/${topicId}`);
            }
        }


    }

    async editUBB() {
        const url = `/post/${this.match.params.id}`;
        let tag1Id, tag2Id, content;
        //console.log(this.state);
        tag1Id = await Utility.getTagIdbyName(this.state.tag1);
        tag2Id = await Utility.getTagIdbyName(this.state.tag2);
        if (tag1Id && !tag2Id) {
            content = {
                content: this.state.content,
                contentType: 0,
                title: this.state.title,
                tag1: tag1Id,
                type: this.state.type
            };
        }
        else if (tag2Id) {
            content = {
                content: this.state.content,
                contentType: 0,
                title: this.state.title,
                tag1: tag1Id,
                tag2: tag2Id,
                type: this.state.type
            };
        }
        else {
            content = {
                content: this.state.content,
                contentType: 0,
                title: this.state.title,
                type: this.state.type
            };
        }
        const body = JSON.stringify(content);
        const token = await Utility.getToken();
        const headers = await Utility.formAuthorizeHeader();
        headers.append("Content-Type", 'application/json');
        const response = await Utility.cc98Fetch(url, { method: "PUT", headers, body });
        const floor = this.state.postInfo.floor;
        const pageFloor = floor % 10 === 0 ? 10 : floor % 10;
        const page = floor % 10 === 0 ? floor / 10 : (floor - floor % 10) / 10 + 1;
        Utility.removeLocalStorage("contentCache");
        const redirectUrl = `/topic/${this.state.postInfo.topicId}/${page}#${pageFloor}`;
        this.props.history.push(redirectUrl);
    }
    async editMd() {
        const url = `/post/${this.match.params.id}`;
        let c = Constants.testEditor.getMarkdown();
        Constants.testEditor.setMarkdown("");
        let content, tag1Id, tag2Id;
        tag1Id = await Utility.getTagIdbyName(this.state.tag1);
        tag2Id = await Utility.getTagIdbyName(this.state.tag2);
        if (tag1Id && !tag2Id) {
            tag1Id = await Utility.getTagIdbyName(this.state.tag1);
            content = {
                content: c,
                contentType: 1,
                title: this.state.title,
                tag1: tag1Id,
                type: this.state.type
            };
        }
        else if (tag2Id) {

            content = {
                content: c,
                contentType: 1,
                title: this.state.title,
                tag1: tag1Id,
                tag2: tag2Id,
                type: this.state.type
            };
        }
        else {
            content = {
                content: c,
                contentType: 1,
                title: this.state.title,
                type: this.state.type
            };
        }
        const body = JSON.stringify(content);
        const token = await Utility.getToken();
        const headers = await Utility.formAuthorizeHeader();
        headers.append("Content-Type", 'application/json');
        const response = await Utility.cc98Fetch(url, { method: "PUT", headers, body });
        const floor = this.state.postInfo.floor;
        const pageFloor = floor % 10 === 0 ? 10 : floor % 10;
        const page = floor % 10 === 0 ? floor / 10 : (floor - floor % 10) / 10 + 1;
        const redirectUrl = `/topic/${this.state.postInfo.topicId}/${page}#${pageFloor}`;
        Utility.removeLocalStorage("contentCache");
        this.props.history.push(redirectUrl);
    }
    onTitleChange(title, tag1, tag2) {
        //console.log("handle change");
        //console.log("tag1=" + tag1);
        if (title != "")
            this.setState({ title: title, tag1: tag1, tag2: tag2 });
        else
            this.setState({ tag1: tag1, tag2: tag2 });
    }
    onUbbChange(content) {
        this.setState({ content: content });
    }
    render() {
        const contentCache = Utility.getLocalStorage("contentCache");
        console.log("in render");
        console.log("mode = " + this.state.mode);
        console.log("content = " + this.state.content);
        console.log("cache = " + contentCache);
        const mode = this.match.params.mode;
        const id = this.match.params.id;
        const url = `/list/${this.state.boardId}`;
        let editor;
        let titleInput = null;
        if (mode === "postTopic") {
            titleInput = <InputTitle boardId={id} tags={this.state.tags} onChange={this.onTitleChange.bind(this)} title={this.state.postInfo.title} tag1={0} tag2={0} />;
            if (this.state.mode === 0) {
                editor = <div><div className="createTopicContent">
                    <div className="createTopicListName">主题内容</div>
                    <div id="post-topic-changeMode" onClick={this.changeEditor} className="hiddenImage" style={{ width: "12rem", marginBottom: "0.5rem" }}>
                        切换到Markdown编辑器</div>
                </div>
                    <UbbEditor update={this.update} value={this.state.content} option={{ height: 20, submit: this.sendUbbTopic.bind(this) }} />
                    <div className="row" style={{ justifyContent: "center" }}>
                        <div id="post-topic-button" onClick={this.sendUbbTopic.bind(this)} className="button blue" style={{ marginTop: "1.25rem", marginBottom: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem", alignSelf: "center" }}>发帖</div>
                    </div></div>
                    ;
            } else {
                editor = <div><div className="createTopicContent">
                    <div className="createTopicListName">主题内容</div>
                    <div id="post-topic-changeMode" onClick={this.changeEditor} className="hiddenImage" style={{ width: "12rem", marginBottom: "0.5rem" }}>切换到UBB编辑器</div>
                </div>
                    <InputMdContent postInfo={this.state.postInfo} content={contentCache} onChange={this.sendMdTopic.bind(this)} ready={this.state.ready} mode={this.match.params.mode} /></div>;
            }
        } else if (mode === "edit") {
            if (this.state.mode === 0) {
                console.log("content from md to ubb = " + contentCache);
                editor = <div><div className="createTopicContent">
                    <div className="createTopicListName">主题内容</div>
                    <div id="post-topic-changeMode" onClick={this.changeEditor} className="hiddenImage" style={{ width: "12rem", marginBottom: "0.5rem" }}>切换到Markdown编辑器</div>
                </div>
                    <UbbEditor update={this.update} value={this.state.content} option={{ submit: this.editUBB.bind(this) }} />
                    <div className="row" style={{ justifyContent: "center" }}>
                        <div id="post-topic-button" onClick={this.editUBB} className="button blue" style={{ marginTop: "1.25rem", marginBottom: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem", alignSelf: "center" }}>编辑</div>
                    </div></div>
                    ;
            } else if (this.state.mode === 1) {
                editor = <div><div className="createTopicContent">
                    <div className="createTopicListName">主题内容</div>
                    <div id="post-topic-changeMode" onClick={this.changeEditor} className="hiddenImage" style={{ width: "12rem", marginBottom: "0.5rem" }}>切换到UBB编辑器</div>
                </div>
                    <InputMdContent postInfo={this.state.postInfo} content={contentCache} onChange={this.editMd.bind(this)} ready={this.state.ready} mode={this.match.params.mode} /></div>;
            }
            if (this.state.postInfo.floor === 1) {
                titleInput = <InputTitle boardId={id} tags={this.state.tags} onChange={this.onTitleChange.bind(this)} title={this.state.postInfo.title} tag1={this.state.topicInfo.tag1} tag2={this.state.topicInfo.tag2} />;
            }
        }
        console.log("默认type:" + this.state.type);
        let topicType = <div className="createTopicType">
            <div className="createTopicListName">发帖类型</div>
            <input type="radio" name="type" value="普通" onClick={this.changeNormalType} checked={this.state.type === 0 ? true : false} /> 普通
            <input type="radio" name="type" value="学术信息" onClick={this.changeAcademicType} checked={this.state.type === 2 ? true : false} /> 学术信息
            <div style={{ color: 'rgb(255,0,0)' }}>（活动帖和学术贴请选择正确的发帖类型)</div>
        </div>;

        console.log(Utility.isMaster(this.state.masters))

        // issue #38 普通用户不显示校园活动
        if (Utility.isMaster(this.state.masters) || (Utility.getLocalStorage('userInfo').userTitleIds || []).indexOf(91) !== -1) {
            topicType = <div className="createTopicType">
                <div className="createTopicListName">发帖类型</div>
                <input type="radio" name="type" value="普通" onClick={this.changeNormalType} checked={this.state.type === 0 ? true : false} /> 普通
                <input type="radio" name="type" value="学术信息" onClick={this.changeAcademicType} checked={this.state.type === 2 ? true : false} /> 学术信息
                <input type="radio" name="type" value="校园活动" onClick={this.changeActivityType} checked={this.state.type === 1 ? true : false} /> 校园活动
                <div style={{ color: 'rgb(255,0,0)' }}>（活动帖和学术贴请选择正确的发帖类型)</div>
            </div>;
        }

        return <div className="createTopic">
            <Category url={url} boardName={this.state.boardName} mode={mode} />
            {titleInput}
            {topicType}
            <Options />
            {editor}
        </div>;
    }

}


/**
 * 编辑界面的导航器组件
 */
export class Category extends React.Component<{ url: string, boardName: string, mode: string }, { url: string, boardName: string, }>{
    constructor(props) {
        super(props);
        this.state = ({
            url: "",
            boardName: "",       
        });
    }
    //在子组件中，this.props的值不会自动更新，每当父组件的传值发生变化时，需要在子组件的的componentWillReceiveProps中去手动更新
    componentWillReceiveProps(nextProps) {
        this.setState({
            url: nextProps.url,
            boardName: nextProps.boardName,
   
        });
    }
    render() {
        let categoryText: string;
        if (this.props.mode === "postTopic") categoryText = "发表主题";
        else if (this.props.mode === "edit") categoryText = "编辑主题";
        return <div className="row" style={{ alignItems: "baseline", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}>
            <Link style={{ color: "grey", fontSize: "1rem", marginRight: "0.5rem" }} to={"/"}>首页</Link>
            <i className="fa fa-chevron-right"></i>
            <Link style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }} to={this.state.url} >{this.state.boardName}</Link>
            <i className="fa fa-chevron-right"></i>
            <div style={{ color: "grey", fontSize: "1rem", marginLeft: "0.5rem", marginRight: "0.5rem" }}>{categoryText}</div>
        </div>;
    }
}

/**
 * 编辑界面的标签
 * 用于特定版面的发主题/编辑主题
 * TODO:尚未完成
 */
export class Tags extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
        this.state = ({
        });
    }

    render() {
        return <div></div>
    }
}

/**
 * 编辑界面的标题
 * 用于发主题/编辑主题
 * TODO:尚未完成
 */
export class InputTitle extends React.Component<{ boardId, onChange, tags, title, tag1, tag2 }, { title: string, tags, tag1, tag2, hasEvent: boolean }>{
    constructor(props) {
        super(props);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.generateTagOption = this.generateTagOption.bind(this);
        this.state = ({ title: this.props.title, tags: this.props.tags, tag1: "", tag2: "", hasEvent: false });
    }

    handleTitleChange(event) {
        let tag1, tag2;
        if (this.state.tags.length === 0) {
            this.props.onChange(event.target.value, "", "");
            this.setState({ title: event.target.value });
        } else if (this.state.tags.length === 1) {
            tag1 = $(".tagBoxSelect").text();
            this.props.onChange(event.target.value, tag1, "");
            this.setState({ title: event.target.value });
        } else {
            tag1 = $(".tagBoxSelect").text();
            tag2 = $(".tagBoxSelect1").text();

            this.props.onChange(event.target.value, tag1, tag2);
            this.setState({ title: event.target.value });
        }

    }
    handleTagChange() {
        const tag1 = $(".tagBoxSelect").text();
        const tag2 = $(".tagBoxSelect1").text();
        //console.log("tagtext");
        //console.log($(".tagBoxSelect").text());
        this.props.onChange("", tag1, tag2);
    }


    componentWillReceiveProps(newProps) {

        if (newProps.title && !this.state.title)
            this.setState({ title: newProps.title, tags: newProps.tags });
        else
            this.setState({ tags: newProps.tags });
    }

    componentDidMount() {
        //如果有默认tags就绑定事件
        if (this.state.tags.length > 0) {
            this.bindEvent();
        }
    }

    componentDidUpdate() {
        //如果没绑定过事件则绑定事件
        if (!this.state.hasEvent) {
            this.bindEvent();
        }
    }

    bindEvent = async () => {
        const tagBoxSelect = $('.tagBoxSelect');
        //获取不到元素的时候不绑定事件
        if (tagBoxSelect.length === 0) {
            return;
        } else {
            //获取到则标记已绑定过事件
            this.setState({
                hasEvent: true
            });
        }
        const downArrow = $('.downArrow');
        const tagBoxSub = $('.tagBoxSub');
        const tagBoxLi = tagBoxSub.find('li');

        $(document).click(function () {

            tagBoxSub.css('display', 'none');
        });

        tagBoxSelect.click(function () {
            //console.log("click1");
            if (tagBoxSub.css('display') === 'block') tagBoxSub.css('display', 'none');
            else tagBoxSub.css('display', 'block');
            return false;   //阻止事件冒泡
        });

        downArrow.click(function () {
            if (tagBoxSub.css('display') === 'block') tagBoxSub.css('display', 'none');
            else tagBoxSub.css('display', 'block');
            return false;   //阻止事件冒泡
        });

        /*在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，
        如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），
        或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。*/

        tagBoxLi.click(function () {
            tagBoxSelect.text($(this).text());

        });

        tagBoxLi.mouseover(function () {
            this.className = 'hover';
        });

        tagBoxLi.mouseout(function () {
            this.className = '';
        });

        const tagBoxSelect1 = $('.tagBoxSelect1');
        const downArrow1 = $('.downArrow1');
        const tagBoxSub1 = $('.tagBoxSub1');
        const tagBoxLi1 = tagBoxSub1.find('li');
        $(document).click(function () {
            tagBoxSub1.css('display', 'none');
        });

        tagBoxSelect1.click(function () {
            if (tagBoxSub1.css('display') === 'block') tagBoxSub1.css('display', 'none');
            else tagBoxSub1.css('display', 'block');
            return false;   //阻止事件冒泡
        });

        downArrow1.click(function () {
            if (tagBoxSub1.css('display') === 'block') tagBoxSub1.css('display', 'none');
            else tagBoxSub1.css('display', 'block');
            return false;   //阻止事件冒泡
        });

        /*在一个对象上触发某类事件（比如单击onclick事件），如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，
        如果没有定义此事件处理程序或者事件返回true，那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），
        或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）。*/

        tagBoxLi1.click(function () {
            tagBoxSelect1.text($(this).text());
        });

        tagBoxLi1.mouseover(function () {
            this.className = 'hover';
        });

        tagBoxLi1.mouseout(function () {
            this.className = '';
        });
        let tag1 = "", tag2 = "";
        if (this.props.tag1 !== 0) {
            tag1 = await Utility.getTagNamebyId(this.props.tag1);
        }
        if (this.props.tag2 !== 0) {
            tag2 = await Utility.getTagNamebyId(this.props.tag2);
        }
        if (this.props.title && !this.state.title)
            this.setState({ title: this.props.title, tags: this.props.tags, tag1: tag1, tag2: tag2 });
        else
            this.setState({ tags: this.props.tags, tag1: tag1, tag2: tag2 });
    }

    generateTagOption(item) {
        return <li onClick={this.handleTagChange}>{item.name}</li>;
    }
    render() {

        let drop1 = null;
        let drop2 = null;
        if (this.state.tags.length > 0) drop1 = <ul className="tagBoxSub">
            {this.state.tags[0].tags.map(this.generateTagOption)}
        </ul>;
        if (this.state.tags.length === 2)
            drop2 = <ul className="tagBoxSub1">
                {this.state.tags[1].tags.map(this.generateTagOption)}
            </ul>;
        let tagInfo = null;
        if (this.state.tags.length === 2) {
            let defaultTag1 = this.state.tags[0].tags[0].name;
            let defaultTag2 = this.state.tags[1].tags[0].name;
            if (this.state.tag1) defaultTag1 = this.state.tag1;
            if (this.state.tag2) defaultTag2 = this.state.tag2;
            tagInfo = <div className="row"><div className="column" style={{ marginTop: "6.1rem", height: "8rem", zindex: "1000", marginLeft: "0.5rem" }}>
                <div style={{ display: "flex" }}>
                    <div className="tagBoxSelect">{defaultTag1}</div>
                    <div className="downArrow"><img src="/static/images/downArrow.png" width="12" height="12" /></div>
                </div>
                {drop1}
            </div>
                <div className="column" style={{ marginTop: "6.1rem", height: "8rem", zindex: "1000", marginLeft: "0.5rem" }}>
                    <div style={{ display: "flex" }}>
                        <div className="tagBoxSelect1">{defaultTag2}</div>
                        <div className="downArrow1"><img src="/static/images/downArrow.png" width="12" height="12" /></div>
                    </div>
                    {drop2}
                </div></div >;
        } else if (this.state.tags.length == 1) {
            let defaultTag1 = this.state.tags[0].tags[0].name;
            if (this.state.tag1) defaultTag1 = this.state.tag1;
            tagInfo = <div className="column" style={{ marginTop: "6.1rem", height: "8rem", zindex: "1000", marginLeft: "0.5rem" }}>
                <div style={{ display: "flex" }}>
                    <div className="tagBoxSelect">{defaultTag1}</div>
                    <div className="downArrow"><img src="/static/images/downArrow.png" width="12" height="12" /></div>
                </div>
                {drop1}
            </div>
                ;
        }
        return <div className="createTopicTitle">
            <div className="createTopicListName">主题标题</div>
            {tagInfo}
            <input value={this.state.title} placeholder="请输入新主题的标题" onChange={this.handleTitleChange.bind(this)} />
        </div>
    }
}




/**
 * 编辑界面的选项
 * 用于发主题/编辑主题
 * 所有版面仅管理员可以设置仅楼主可见
 * TODO:尚未完成
 */
export class Options extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
        this.state = ({
        });
    }

    render() {
        return <div className="createTopicOption">
            <div className="createTopicListName">选项</div>
            <input type="radio" checked={true} name="option" value="all" />回复所有人可见
            <input type="radio" name="option" value="host" />回复仅楼主可见
            <input type="radio" name="option" value="special" />回复仅特定用户可见
            </div>
    }
}


export class InputMdContent extends React.Component<{ mode, content, postInfo, ready, onChange }, { content }>{
    constructor(props) {
        super(props);
        this.state = ({ content: "" });
    }

    componentDidMount() {
        let content = '';
        if (this.props.postInfo.content) {
            content = this.props.content;
        }
        editormd.emoji.path = '/static/images/emoji/';
        Constants.testEditor = editormd("testEditor", {
            width: "100%",
            height: 450,
            path: "/static/scripts/lib/editor.md/lib/",
            saveHTMLToTextarea: false,
            emoji: true,
            appendMarkdown: content,
            toc: true,
            tocm: true,
            toolbarIcons: function () {
                return [
                    "undo", "redo", "|", "emoji",
                    "bold", "del", "italic", "quote", "|",
                    "h1", "h2", "h3", "h4", "|",
                    "list-ul", "list-ol", "hr", "|",
                    "link", "testIcon", "image", "code", "table", "html-entities",
                ]
            },
            toolbarIconsClass: {
                testIcon: "fa-upload"  // 指定一个FontAawsome的图标类
            },
            // 自定义工具栏按钮的事件处理
            toolbarHandlers: {
                testIcon: function (cm, icon, cursor, selection) {
                    var str = $("#upload-files").click();

                }
            },
        });

        this.setState({});
    }
    send() {
        const content = Constants.testEditor.getMarkdown();
        this.props.onChange(content);
    }
    render() {
        return <div style={{ width: "100%", display: "flex", flexDirection: "column" }}><div id="sendTopic">
            <form>
                <input type='file' id='upload-files' style={{ display: 'none ' }} onChange={Utility.uploadEvent} />
                <div id="testEditor" className="editormd">
                    <textarea className="editormd-markdown-textarea" name="testEditor-markdown-doc"  ></textarea>
                </div>
            </form>
            <div className="row" style={{ justifyContent: "center", marginBottom: "1.25rem " }}>
                <div id="post-topic-button" className="button blue" style={{ marginTop: "1.25rem", width: "4.5rem", letterSpacing: "0.3125rem" }} onClick={this.send.bind(this)}>{this.props.mode === 'postTopic' ? "发帖" : "编辑"}</div>
            </div>
        </div>
        </div>;
    }
}
export const ShowEdit = withRouter(Edit);