import * as React from 'react';
import * as Utility from '../../Utility';
import * as $ from 'jquery';
import { UbbContainer } from '.././UbbContainer';
import { Constants } from '../Constant';
import { UbbEditor } from '../UbbEditor';
import TopicManagement from './Topic-TopicManagement-v2';
import { NoticeMessage } from '../NoticeMessage';
import { Prompt } from 'react-router-dom';
import Button from 'antd/es/button';
import * as moment from 'moment';
declare let editormd: any;
interface Props {
	boardInfo;
	onChange;
	content;
	topicInfo;
}
export class SendTopic extends React.Component<Props, { content: string, mode: number, masters: string[], buttonInfo, buttonDisabled, manageVisible }>{
	constructor(props) {
		super(props);
		this.sendUbbTopic = this.sendUbbTopic.bind(this);
		this.changeEditor = this.changeEditor.bind(this);
		this.showManagement = this.showManagement.bind(this);
		this.onChange = this.onChange.bind(this);
		this.close = this.close.bind(this);
		this.update = this.update.bind(this);
		let initContent = "";
		if (Utility.getLocalStorage("temporaryContent-" + this.props.topicInfo.id)) {
			initContent = Utility.getLocalStorage("temporaryContent-" + this.props.topicInfo.id);
			console.log("use cache content");
		}
		this.state = ({ content: initContent, mode: 0, masters: [], buttonDisabled: false, buttonInfo: "回复", manageVisible: false });
	}
	showManageUI = (v) => {
		this.setState({ manageVisible: v });
	}
	handleCancel = () => {
		this.setState({ manageVisible: false });
	}
	update(value) {
		console.log("update1");
		console.log(value);
		this.setState({ content: value });
	}

	onChange() {
		this.props.onChange();
	}
	showManagement() {
		this.setState({ manageVisible: true });
	}
	close() {
		const UIId = `#manage${this.props.topicInfo.id}`;
		$(UIId).css('display', 'none');
	}
	componentWillUnmount() {
		if (this.state.content) {
			Utility.setLocalStorage("temporaryContent-" + this.props.topicInfo.id, this.state.content);
		} else {
			Utility.removeLocalStorage("temporaryContent-" + this.props.topicInfo.id);
		}

		// remove the event listener
		window.onbeforeunload = null;
	}
	componentDidMount() {
		// confirm before user close the window
		// when there's content in the editor
		// should be removed before the component unmounts
		window.onbeforeunload = () => {
			if (this.state.content) return '您还有内容未发布，确认离开吗？';
			return null;
		}

		if (this.state.mode === 1) {

			const fileUrl = `${Utility.getApiUrl}/file`;
			editormd.emoji.path = '/static/images/emoji/';
			Constants.testEditor = editormd('test-editormd', {
				width: '100%',
				height: 400,
				path: '/static/scripts/lib/editor.md/lib/',
				saveHTMLToTextarea: false,
				imageUpload: false,
				imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
				imageUploadURL: fileUrl,
				emoji: true,
				toc: true,
				tocm: true,
				toolbarIcons() {
					return [
						'undo', 'redo', '|', 'emoji',
						'bold', 'del', 'italic', 'quote', '|',
						'h1', 'h2', 'h3', 'h4', '|',
						'list-ul', 'list-ol', 'hr', '|',
						'link', 'image', 'testIcon', 'code', 'table', 'html-entities',
					];
				},
				toolbarIconsClass: {
					testIcon: 'fa-upload'  // 指定一个FontAawsome的图标类
				},
				// 自定义工具栏按钮的事件处理
				toolbarHandlers: {
					testIcon() {
						$('#upload-files').click();

					}
				},
			});
		}
		const time = moment(this.props.content.replyTime).format('YYYY-MM-DD HH:mm:ss');
		const url = `/topic/${this.props.topicInfo.id}#${this.props.content.floor}`;
		const masters = this.props.boardInfo.masters;
		if (this.props.content) {
			if (this.state.mode === 1) {
				const str = `>**以下是引用${this.props.content.floor}楼：用户${this.props.content.userName}在${time}的发言：**
${this.props.content.content}
`;
				Constants.testEditor.appendMarkdown(str);

				this.setState({ masters: masters });
			} else {
				const str = `
[quote][b]以下是引用${this.props.content.floor}楼：用户${this.props.content.userName}在${time}的发言：
[color=blue][url=${url}]>>查看原帖<<[/url][/color][/b]${this.props.content.content}[/quote]
`;
console.log("update2");
console.log(str);
				this.setState({ masters: masters, content: str });
			}
		}


	}
	componentWillReceiveProps(newProps) {
		console.log("newProps");
		console.log(newProps);
		const time = moment(newProps.content.replyTime).format('YYYY-MM-DD HH:mm:ss');
		if (newProps.content.userName) {
			if (this.state.mode === 1) {
				const str = `>**以下是引用${newProps.content.floor}楼：用户${newProps.content.userName}在${time}的发言：**
${newProps.content.content}
`;
				Constants.testEditor.appendMarkdown(str);
			} else {
				let floor = newProps.content.floor, page, url;
				if (floor > 10) {
					page = parseInt(((floor - 1) / 10).toString()) + 1;
					floor = floor % 10;
					url = `/topic/${this.props.topicInfo.id}/${page}#${floor === 0 ? 10 : floor}`;
				} else {
					url = `/topic/${this.props.topicInfo.id}#${newProps.content.floor}`;
				}
				const str = `[quote][b]以下是引用${newProps.content.floor}楼：用户${newProps.content.userName}在${time}的发言：[color=blue][url=${url}]>>查看原帖<<[/url][/color][/b]
${newProps.content.content}[/quote]
`;
console.log("update3");
console.log(str);
				this.setState({ content: str });
			}
		}else{
			this.setState({content:""});
		}
	}

	async componentDidUpdate() {
		if (this.state.mode === 1) {

			const fileUrl = `${Utility.getApiUrl}/file`;
			editormd.emoji.path = '/static/images/emoji/';
			Constants.testEditor = editormd('test-editormd', {
				width: '100%',
				height: 400,
				path: '/static/scripts/lib/editor.md/lib/',
				saveHTMLToTextarea: false,
				imageUpload: false,
				imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
				imageUploadURL: fileUrl,
				emoji: true,
				toc: true,
				tocm: true,
				toolbarIcons() {
					return [
						'undo', 'redo', '|', 'emoji',
						'bold', 'del', 'italic', 'quote', '|',
						'h1', 'h2', 'h3', 'h4', '|',
						'list-ul', 'list-ol', 'hr', '|',
						'link', 'image', 'testIcon', 'code', 'table', 'html-entities',
					];
				},
				toolbarIconsClass: {
					testIcon: 'fa-upload'  // 指定一个FontAawsome的图标类
				},
				// 自定义工具栏按钮的事件处理
				toolbarHandlers: {
					testIcon() {
						$('#upload-files').click();
					}
				},
			});
			Constants.testEditor.setMarkdown(this.state.content);
		}
	}

	async sendUbbTopic() {
		this.setState({ buttonDisabled: true, buttonInfo: "..." });
		const url = `/topic/${this.props.topicInfo.id}/post`;
		let bodyInfo;
		if (Utility.quoteJudger(this.state.content)) {
			//console.log("有引用内容，postId是", this.props.content.postId);
		//	let data = await Utility.getBasicPostsInfo([this.props.content.postId]);
			//console.log("该postId对应的楼层信息",data);
			bodyInfo = {
				content: this.state.content,
				contentType: 0,
				title: '',
				parentId: this.props.content.postId
			};
		}
		else {
			//console.log("没有引用内容");
			bodyInfo = {
				content: this.state.content,
				contentType: 0,
				title: ''
			};
		}
		const body = JSON.stringify(bodyInfo);
		//console.log("body内容",body);
		const token = await Utility.getToken();
		const headers = new Headers();
		headers.append('Authorization', token);
		headers.append('Content-Type', 'application/json');
		const mes = await Utility.cc98Fetch(url, {
			method: 'POST',
			headers,
			body
		}
		);
		if (mes.status === 402) {
			Utility.noticeMessageShow('postNone');
			this.setState({ buttonDisabled: false, buttonInfo: "发帖" });
		}
		else if (mes.status === 403) {
			Utility.noticeMessageShow('postFast');
			this.setState({ buttonDisabled: false, buttonInfo: "发帖" });
		} else if (mes.status === 200) {
			const atUsers = Utility.atHanderler(this.state.content);
			//如果存在合法的@，则发送@信息，否则不发送，直接跳转至所发帖子
			if (atUsers) {
				const postId = await mes.text();
				const topicId = this.props.topicInfo.id;
				const atUsersJSON = JSON.stringify(atUsers);
				const url2 = `/notification/at?topicid=${topicId}&postid=${postId}`;
				let myHeaders2 = new Headers();
				myHeaders2.append("Content-Type", 'application/json');
				myHeaders2.append("Authorization", token);
				let response2 = await Utility.cc98Fetch(url2, {
					method: 'POST',
					headers: myHeaders2,
					body: atUsersJSON
				});
			}
			console.log('2222222222222222')
			Utility.removeLocalStorage("temporaryContent-" + this.props.topicInfo.id);
			this.setState({ content: '', buttonDisabled: false, buttonInfo: "发帖" });
			this.props.onChange();
		}

	}

	async sendMdTopic() {
		try {
			this.setState({ buttonDisabled: true, buttonInfo: "..." });
			const url = `/topic/${this.props.topicInfo.id}/post`;
			const c = Constants.testEditor.getMarkdown();
			Constants.testEditor.setMarkdown('');
			const content = {
				content: c,
				contentType: 1,
				title: ''
			};
			const contentJson = JSON.stringify(content);
			const token = Utility.getLocalStorage('accessToken');
			const myHeaders = new Headers();
			myHeaders.append('Authorization', token);
			myHeaders.append('Content-Type', 'application/json');
			const mes = await Utility.cc98Fetch(url, {
				method: 'POST',
				headers: myHeaders,
				body: contentJson
			}
			);
			if (mes.status === 402) {
				Utility.noticeMessageShow('postNone');
				this.setState({ buttonDisabled: false, buttonInfo: "发帖" });
			}
			else if (mes.status === 403) {
				Utility.noticeMessageShow('postFast');
				this.setState({ buttonDisabled: false, buttonInfo: "发帖" });
			}
			else if (mes.status === 200) {
				const atUsers = Utility.atHanderler(c);
				//如果存在合法的@，则发送@信息，否则不发送，直接跳转至所发帖子
				if (atUsers) {
					const postId = await mes.text();
					const topicId = this.props.topicInfo.id;
					const atUsersJSON = JSON.stringify(atUsers);
					const url2 = `/notification/at?topicid=${topicId}&postid=${postId}`;
					let myHeaders2 = new Headers();
					myHeaders2.append("Content-Type", 'application/json');
					myHeaders2.append("Authorization", token);
					let response2 = await Utility.cc98Fetch(url2, {
						method: 'POST',
						headers: myHeaders2,
						body: atUsersJSON
					});
				}
				Utility.removeLocalStorage("temporaryContent");
				this.props.onChange();

				const fileUrl = `${Utility.getApiUrl}/file`;
				editormd.emoji.path = '/static/images/emoji/';
				Constants.testEditor = editormd('test-editormd', {
					width: '100%',
					height: 400,
					path: '/static/scripts/lib/editor.md/lib/',
					saveHTMLToTextarea: false,
					imageUpload: false,
					imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
					imageUploadURL: fileUrl,
					emoji: true,
					toc: true,
					tocm: true,
					toolbarIcons() {
						return [
							'undo', 'redo', '|', 'emoji',
							'bold', 'del', 'italic', 'quote', '|',
							'h1', 'h2', 'h3', 'h4', '|',
							'list-ul', 'list-ol', 'hr', '|',
							'link', 'image', 'testIcon', 'code', 'table', 'html-entities',
						];
					},
					toolbarIconsClass: {
						testIcon: 'fa-upload'  // 指定一个FontAawsome的图标类
					},
					// 自定义工具栏按钮的事件处理
					toolbarHandlers: {
						testIcon() {
							$('#upload-files').click();

						}
					},
				});

				this.setState({ content: '', buttonDisabled: false, buttonInfo: "发帖" });
			}
		} catch (e) {
			console.log('Error');
			console.log(e);
		}
	}
	showIP() {
		$('.findIP').css('display', 'flex');
	}
	changeEditor() {
		if (this.state.mode === 0) {
			this.setState({ mode: 1 });
		} else {
			this.setState({ mode: 0 });
		}
	}

	getInitialState() {
		return { value: '' };
	}
	handleChange(event) {
		console.log("update5");
		console.log(event.target.value);
		this.setState({ content: event.target.value });
	}
	render() {
		console.log("rerender");
		console.log(this.props.content);
		console.log(this.state.content);
		let mode, editor;
		if (this.state.mode === 0) {
			mode = '使用UBB模式编辑';
			editor = <div>
				<UbbEditor update={this.update} value={this.state.content} option={{ height: 20, submit: this.sendUbbTopic }} />
				<div className="row" style={{ justifyContent: 'center', marginBottom: '1.25rem ' }}>
					<button id="post-topic-button" onClick={this.sendUbbTopic} disabled={this.state.buttonDisabled} className="button blue" style={{ marginTop: '1.25rem', width: '6rem', height: '2rem', lineHeight: '0.8rem' }}>{this.state.buttonInfo}
					</button>
				</div></div>;
		}
		else {
			mode = '使用Markdown编辑';
			editor = <div id="sendTopic">
				<form>
					<input type="file" id="upload-files" style={{ display: 'none ' }} onChange={Utility.uploadEvent} />
					<div id="test-editormd" className="editormd">
						<textarea className="editormd-markdown-textarea" name="test-editormd-markdown-doc"   ></textarea>
					</div>
				</form>
				<div className="row" style={{ justifyContent: 'center', marginBottom: '1.25rem ' }}>
					<button id="post-topic-button" disabled={this.state.buttonDisabled} onClick={this.sendMdTopic.bind(this)} className="button blue" style={{ marginTop: '1.25rem', width: '4.5rem', height: "2rem", lineHeight: "0.8rem" }}>{this.state.buttonInfo}</button>


				</div>

			</div>;
		}


		const uploadInfo = null;
		if (this.state.mode === 1) {

		}
		let manageBTN = null;
		if (Utility.isMaster(this.props.boardInfo.boardMasters))
			manageBTN = <div><Button type="primary" onClick={this.showManagement}>管理</Button>
			</div>;

		return <div id="sendTopicInfo" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
			<div className="row" style={{ justifyContent: 'flex-end' }}>

				<div id="post-topic-changeMode" className="changeEditor" onClick={this.changeEditor.bind(this)} style={{ width: '14rem', marginBottom: "0.5rem" }}>{this.state.mode === 1 ? '切换到Ubb编辑器' : '切换到Markdown编辑器'}
				</div></div>
			{editor}
			{manageBTN}
			<TopicManagement update={this.onChange} boardId={this.props.boardInfo.id} topicInfo={this.props.topicInfo} onCancel={this.handleCancel} visible={this.state.manageVisible} />
			<NoticeMessage text="回复失败, 10s之内仅可进行一次回帖，请稍作休息" id="postFast" top="26%" left="38%" />
			<NoticeMessage text="回复失败, 请输入内容" id="postNone" top="26%" left="44%" />
			<NoticeMessage text="操作成功" id="operationSuccess" top="26%" left="44%" />
			<Prompt message={location => (this.state.content && location.pathname.indexOf(this.props.topicInfo.id)) === -1 ? "确定要离开吗？" : true} />
		</div>;
	}
}
