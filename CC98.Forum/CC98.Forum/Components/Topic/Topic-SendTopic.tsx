import * as React from "react";
import * as Utility from "../../Utility";
import * as $ from "jquery";
import { UbbContainer } from ".././UbbContainer";
import { Constants } from "../Constant";
import { UbbEditor } from "../UbbEditor";
import TopicManagement from "./Topic-TopicManagement-v2";
import ManageHistory from "./Topic-ManageHistory";
import { NoticeMessage, SendTopicNoticeMessage } from "../NoticeMessage";
import { Prompt } from "react-router-dom";
import Button from "antd/es/button";
import * as moment from "moment";
import ReactMde, {
	ReactMdeTypes,
	ReactMdeCommands,
} from "@cc98/hell-react-mde";
import * as Showdown from "showdown";
import CustomCommand from "./topic-react-mde/imageUploaderCommand";
import { RightTagHandler } from "../../Ubb/RightTagHandler";
import IPTable from "./Topic-IPData";
import { Util } from "bizcharts";
var xssFilter = require("showdown-xss-filter");

interface Props {
	boardInfo;
	onChange;
	content;
	topicInfo;
}

interface State {
	content: string;
	mode: number;
	masters: string[];
	buttonInfo;
	buttonDisabled;
	manageVisible;
	mdeState;
	commands;
	IPData;
	postCache: string;
	anonymouslyPostButtonInfo;
	manageHistoryVisible;
	wealth: number | string;
}

interface ErrorMessage {
	/**错误代码 */
	statusCode: number;
	/**错误说明文本 */
	errorMessageText: string;
	/**错误说明描述 */
	errorMessageDescription: string;
}

/**
 * POST失败返回的错误说明集合
 */
const errorMessageSet: ErrorMessage[] = [
	{
		statusCode: 400,
		errorMessageText: "wealth_not_enough_for_anonymous_post",
		errorMessageDescription: "你在当前可选匿名版面进行匿名回复所需的财富值不足。"
	},
	{
		statusCode: 402,
		errorMessageText: "content_is_empty",
		errorMessageDescription: "你的回复内容为空。"
	},
	{
		statusCode: 403,
		errorMessageText: "cannot_post_in_this_board",
		errorMessageDescription: "你已被当前版面TP，或根据当前版面的特殊规定你无法回帖。"
	},
	{
		statusCode: 403,
		errorMessageText: "cannot_post_anonymous",
		errorMessageDescription: "你的某个匿名主题或者回复已被TP，在其到期或被解除TP前，你无法在全站发布任何匿名帖子。"
	},
	{
		statusCode: 403,
		errorMessageText: "topic_is_locked",
		errorMessageDescription: "当前主题已被锁定。"
	},
	{
		statusCode: 403,
		errorMessageText: "board_is_locked",
		errorMessageDescription: "当前版面已被锁定。"
	},
	{
		statusCode: 403,
		errorMessageText: "user_state_is_abnormal",
		errorMessageDescription: "你已被全站TP，或你的账号已被锁定。"
	},
	{
		statusCode: 403,
		errorMessageText: "cannot_entry_board",
		errorMessageDescription: "你不能进入当前版面。"
	},
	{
		statusCode: 403,
		errorMessageText: "last_post_in_10_seconds",
		errorMessageDescription: "你在10秒内只能发言一次。"
	},
]

export class SendTopic extends React.Component<Props, State> {
	converter: Showdown.Converter;
	constructor(props) {
		super(props);
		this.sendUbbTopic = this.sendUbbTopic.bind(this);
		this.changeEditor = this.changeEditor.bind(this);
		this.showManagement = this.showManagement.bind(this);

		this.onChange = this.onChange.bind(this);
		this.close = this.close.bind(this);
		this.update = this.update.bind(this);
		let initContent = "";
		if (
			Utility.getLocalStorage("temporaryContent-" + this.props.topicInfo.id)
		) {
			initContent = Utility.getLocalStorage(
				"temporaryContent-" + this.props.topicInfo.id
			);
		}
		this.converter = new Showdown.Converter({
			tables: true,
			strikethrough: true,
			simplifiedAutoLink: true,
			extensions: [xssFilter],
		});
		this.state = {
			content: initContent,
			mode: 0,
			masters: [],
			buttonDisabled: false,
			buttonInfo: "回复",
			manageVisible: false,
			mdeState: initContent,
			commands: [],
			IPData: [],
			postCache: "",
			anonymouslyPostButtonInfo: "匿名回复",
			manageHistoryVisible: false,
			wealth: "",
		};
	}
	// handleValueChange = (mdeState: ReactMdeTypes.MdeState) => {
	// 	console.log(mdeState);
	//     this.setState({mdeState,content:mdeState.markdown.toString()});
	// }
	handleValueChange = (value) => {
		this.setState({ mdeState: value });
	};
	showManageUI = (v) => {
		this.setState({ manageVisible: v });
	};
	handleCancel = () => {
		this.setState({ manageVisible: false });
	};
	update(value) {
		this.setState({ content: value });
	}

	onChange() {
		this.props.onChange();
	}
	showManagement() {
		this.setState({ manageVisible: true });
	}
	showManageHistory = () => {
		this.setState({ manageHistoryVisible: true });
	};
	close() {
		const UIId = `#manage${this.props.topicInfo.id}`;
		$(UIId).css("display", "none");
	}
	/** 存取缓存使用的Key值字符串 */
	cachestr = `post-cache-${this.props.topicInfo.id}`;

	/** 为发帖失败准备的缓存 */
	cacheForPost(type: "ubb" | "markdown") {
		/**缓存的内容 */
		let content
		if (type === "ubb") {
			content = this.state.content
		}
		else if (type = "markdown") {
			content = this.state.mdeState
		}
		Utility.setLocalStorage(this.cachestr, content);
		this.setState({
			postCache: content
		});
	}
	/** 获取缓存并更新state */
	getCache = () => {
		this.setState({
			postCache: Utility.getLocalStorage(this.cachestr),
		});
	};
	/** 清除缓存 */
	cleancache = () => {
		Utility.removeLocalStorage(this.cachestr);
		this.setState({
			postCache: "",
		});
	};

	/**生成一条错误提示 */
	generateErrorNoticeMessage = (errorMessage: ErrorMessage) => {
		return <SendTopicNoticeMessage
			text={errorMessage.errorMessageDescription}
			id={errorMessage.errorMessageText}
		/>
	}

	componentWillUnmount() {
		if (this.state.content) {
			Utility.setLocalStorage(
				"temporaryContent-" + this.props.topicInfo.id,
				this.state.content
			);
		} else if (this.state.mdeState) {
			Utility.setLocalStorage(
				"temporaryContent-" + this.props.topicInfo.id,
				this.state.mdeState
			);
		} else {
			Utility.removeLocalStorage("temporaryContent-" + this.props.topicInfo.id);
		}

		// remove the event listener
		window.onbeforeunload = null;
	}

	async componentDidMount() {
		CustomCommand.editor = this;
		const getCommands: () => ReactMdeTypes.CommandGroup[] = () => [
			{ commands: [CustomCommand] },
		];
		const defaultCommands = ReactMdeCommands.getDefaultCommands();
		const myCommands = defaultCommands.concat(getCommands());
		myCommands[1].commands.length = 3;
		this.setState({ commands: myCommands });
		// confirm before user close the window
		// when there's content in the editor
		// should be removed before the component unmounts
		window.onbeforeunload = () => {
			if (this.state.content) return "您还有内容未发布，确认离开吗？";
			return null;
		};

		const time = moment(this.props.content.replyTime).format(
			"YYYY-MM-DD HH:mm:ss"
		);
		const url = `/topic/${this.props.topicInfo.id}#${this.props.content.floor}`;
		const masters = this.props.boardInfo.masters;
		if (this.props.content) {
			if (this.state.mode === 1) {
				const str = `> **以下是引用${this.props.content.floor}楼：用户${this.props.content.userName}在${time}的发言：**\n\n > ${this.props.content.content}
`;

				this.setState({ masters: masters, content: str, mdeState: str });
			} else {
				const str = `
[quote][b]以下是引用${this.props.content.floor}楼：用户${this.props.content.userName}在${time}的发言：
[color=blue][url=${url}]>>查看原帖<<[/url][/color][/b]${this.props.content.content}[/quote]
`;
				this.setState({ masters: masters, content: str });
			}
		}
		//查询财富值余额
		let wealth;
		try {
			wealth = await Utility.getUserWealth();
		} catch (e) {
			wealth = "查询财富值余额失败，请前往个人中心查看";
		}
		this.setState({
			wealth: wealth,
		})

		this.getCache()
	}

	componentWillReceiveProps(newProps) {
		const time = moment(newProps.content.replyTime).format(
			"YYYY-MM-DD HH:mm:ss"
		);
		if (newProps.content.userName) {
			if (this.state.mode === 1) {
				const str = `>**以下是引用${newProps.content.floor}楼：用户${newProps.content.userName}在${time}的发言：**
${newProps.content.content}
`;

				this.setState({ content: str, mdeState: str });
			} else {
				let floor = newProps.content.floor,
					page,
					url;
				if (floor > 10) {
					page = parseInt(((floor - 1) / 10).toString()) + 1;
					floor = floor % 10;
					url = `/topic/${this.props.topicInfo.id}/${page}#${floor === 0 ? 10 : floor
						}`;
				} else {
					url = `/topic/${this.props.topicInfo.id}#${newProps.content.floor}`;
				}
				const str = `[quote][b]以下是引用${newProps.content.floor}楼：用户${newProps.content.userName}在${time}的发言：[color=blue][url=${url}]>>查看原帖<<[/url][/color][/b]
${newProps.content.content}[/quote]
`;
				this.setState({ content: str });
			}
		} else {
			this.setState({ content: "", mdeState: "" });
		}
	}

	/** 发送UBB主题 */
	async sendUbbTopic(isAnonymous: boolean) {
		this.setState({
			buttonDisabled: true,
			buttonInfo: "...",
			anonymouslyPostButtonInfo: "...",
		});
		const url = `/topic/${this.props.topicInfo.id}/post`;
		let bodyInfo;
		try {
			if (Utility.quoteJudger(this.state.content)) {
				bodyInfo = {
					content: this.state.content,
					contentType: 0,
					title: "",
					parentId: this.props.content.postId,
					isAnonymous: isAnonymous,
				};
			} else {
				bodyInfo = {
					content: this.state.content,
					contentType: 0,
					title: "",
					isAnonymous: isAnonymous,
				};
			}
			const body = JSON.stringify(bodyInfo);
			const token = await Utility.getToken();
			const headers = new Headers();
			headers.append("Authorization", token);
			headers.append("Content-Type", "application/json");
			const mes = await Utility.cc98Fetch(url, {
				method: "POST",
				headers,
				body,
			});
			//处理post失败的情况
			if (mes.status === 400 || mes.status === 402 || mes.status === 403) {
				/**post失败返回的错误说明 */
				let errorMessageText = await mes.text();
				/**所有错误说明文本的集合 */
				const errorMessageTextSet: string[] = [];
				for (let errorMessage of errorMessageSet) {
					errorMessageTextSet.push(errorMessage.errorMessageText)
				}
				//console.log(errorMessageTextSet)
				if (errorMessageTextSet.indexOf(errorMessageText) === -1) {
					errorMessageText = "unknown_error"
				}
				//console.log(errorMessageText);

				Utility.noticeMessageShow(errorMessageText);
				//改变发帖按钮状态为不可点击
				this.setState({
					buttonDisabled: false,
					buttonInfo: "回复",
					anonymouslyPostButtonInfo: "匿名回复",
				});
				this.cacheForPost("ubb");
			}
			//post成功
			else if (mes.status === 200) {
				const atUsers = Utility.atHanderler(this.state.content);
				//如果存在合法的@，则发送@信息，否则不发送，直接跳转至所发帖子
				if (atUsers) {
					const postId = await mes.text();
					const topicId = this.props.topicInfo.id;
					const atUsersJSON = JSON.stringify(atUsers);
					const url2 = `/notification/at?topicid=${topicId}&postid=${postId}`;
					let myHeaders2 = new Headers();
					myHeaders2.append("Content-Type", "application/json");
					myHeaders2.append("Authorization", token);
					let response2 = await Utility.cc98Fetch(url2, {
						method: "POST",
						headers: myHeaders2,
						body: atUsersJSON,
					});
				}

				Utility.removeLocalStorage(
					"temporaryContent-" + this.props.topicInfo.id
				);
				this.setState({
					buttonDisabled: false,
					buttonInfo: "回复",
					anonymouslyPostButtonInfo: "匿名回复",
				});
				this.props.onChange();
			}
			//status既不是400/402/403，也不是200（存在这种情况吗……）
			else {
				this.cacheForPost("ubb");
				Utility.noticeMessageShow("other");
				this.setState({
					buttonDisabled: false,
					buttonInfo: "请刷新",
					anonymouslyPostButtonInfo: "请刷新",
				});
			}
		} catch (e) {
			this.cacheForPost("ubb");
			Utility.noticeMessageShow("other");
			this.setState({
				buttonDisabled: false,
				buttonInfo: "请刷新",
				anonymouslyPostButtonInfo: "请刷新",
			});
		}
	}

	/**发送md主题 */
	sendMdTopic = async (isAnonymous: boolean) => {
		this.setState({
			buttonDisabled: true,
			buttonInfo: "...",
			anonymouslyPostButtonInfo: "...",
		});
		const url = `/topic/${this.props.topicInfo.id}/post`;
		try {
			let c = this.state.mdeState;
			//console.log(c);
			const content = {
				content: c,
				contentType: 1,
				title: "",
				isAnonymous: isAnonymous,
			};
			const contentJson = JSON.stringify(content);
			const token = Utility.getLocalStorage("accessToken");
			const myHeaders = new Headers();
			myHeaders.append("Authorization", token);
			myHeaders.append("Content-Type", "application/json");
			const mes = await Utility.cc98Fetch(url, {
				method: "POST",
				headers: myHeaders,
				body: contentJson,
			});
			//处理post失败的情况
			if (mes.status === 400 || mes.status === 402 || mes.status === 403) {
				/**post失败返回的错误说明 */
				let errorMessageText = await mes.text();
				/**所有错误说明文本的集合 */
				const errorMessageTextSet: string[] = [];
				for (let errorMessage of errorMessageSet) {
					errorMessageTextSet.push(errorMessage.errorMessageText)
				}
				//console.log(errorMessageTextSet)
				if (errorMessageTextSet.indexOf(errorMessageText) === -1) {
					errorMessageText = "unknown_error"
				}
				//console.log(errorMessageText);

				Utility.noticeMessageShow(errorMessageText);
				//改变发帖按钮状态为不可点击
				this.setState({
					buttonDisabled: false,
					buttonInfo: "回复",
					anonymouslyPostButtonInfo: "匿名回复",
				});
				this.cacheForPost("markdown");
			}
			//post成功
			else if (mes.status === 200) {
				const atUsers = Utility.atHanderler(c);
				//如果存在合法的@，则发送@信息，否则不发送，直接跳转至所发帖子
				if (atUsers) {
					const postId = await mes.text();
					const topicId = this.props.topicInfo.id;
					const atUsersJSON = JSON.stringify(atUsers);
					const url2 = `/notification/at?topicid=${topicId}&postid=${postId}`;
					let myHeaders2 = new Headers();
					myHeaders2.append("Content-Type", "application/json");
					myHeaders2.append("Authorization", token);
					let response2 = await Utility.cc98Fetch(url2, {
						method: "POST",
						headers: myHeaders2,
						body: atUsersJSON,
					});
				}
				Utility.removeLocalStorage("temporaryContent");
				this.props.onChange();

				this.setState({
					buttonDisabled: false,
					buttonInfo: "回复",
					anonymouslyPostButtonInfo: "匿名回复",
				});
			}
			//status既不是400/402/403，也不是200（存在这种情况吗……）
			else {
				this.cacheForPost("markdown");
				Utility.noticeMessageShow("other");
				this.setState({
					buttonDisabled: false,
					buttonInfo: "请刷新",
					anonymouslyPostButtonInfo: "请刷新",
				});
			}
		} catch (e) {
			this.cacheForPost("markdown");
			Utility.noticeMessageShow("other");
			this.setState({
				buttonDisabled: false,
				buttonInfo: "请刷新",
				anonymouslyPostButtonInfo: "请刷新",
			});
		}
	};

	/** 实名发送UBB内容 */
	postUbbContent = () => {
		this.sendUbbTopic(false);
	};

	/** 匿名发送UBB内容 */
	postAnonymousUbbContent = () => {
		if (this.props.boardInfo.anonymousState !== 1) {
			if (!confirm("你真的要匿名吗？")) return;
		}

		this.sendUbbTopic(true);
	};

	/** 实名发送Markdown内容 */
	postMdContent = () => {
		this.sendMdTopic(false);
	};

	/** 匿名发送Markdown内容 */
	postAnonymousMdContent = () => {
		if (this.props.boardInfo.anonymousState !== 1) {
			if (!confirm("你真的要匿名吗？")) return;
		}

		this.sendMdTopic(true);
	};

	showIP = async () => {
		const IPData = await Utility.findIP(this.props.topicInfo.id);
		this.setState({ IPData });
	};
	closeIP = () => this.setState({ IPData: [] });
	changeEditor() {
		if (this.state.mode === 0) {
			this.setState({ mode: 1 });
		} else {
			this.setState({ mode: 0 });
		}
	}

	getInitialState() {
		return { value: "" };
	}

	setValue = (v) => {
		this.setState({ mdeState: this.state.mdeState + v }, () => {
			this.setState({ mdeState: this.state.mdeState });
		});
	};

	render() {
		//发帖时间超过365天提示
		const s1 = new Date();
		const s2 = new Date(this.props.topicInfo.time);
		const s = s1.getTime() - s2.getTime();
		const f = (s / 1000 / 60 / 60 / 24).toFixed(0);
		let ft = null;
		if (Number(f) > 365) {
			ft = (
				<div className="row" style={{ color: "red" }}>
					提示：该贴发布于{f}天前，如无必要请勿回复。
				</div>
			);
		}
		let mode, editor;
		//版面匿名状态，包括不可匿名、强制匿名（心灵）以及可选匿名
		//不可匿名为0，强制匿名为1，可选匿名为2
		const anonymousState = this.props.boardInfo.anonymousState;
		let ubbButtons;
		let markdownButtons;
		//不可匿名版面
		if (anonymousState === 0) {
			ubbButtons = (
				<button
					id="post-topic-button"
					onClick={this.postUbbContent}
					disabled={this.state.buttonDisabled}
					className="button blue"
				>
					{this.state.buttonInfo}
				</button>
			);
			markdownButtons = (
				<button
					id="post-topic-button-md"
					onClick={this.postMdContent}
					disabled={this.state.buttonDisabled}
					className="button blue"
				>
					{this.state.buttonInfo}
				</button>
			);
		} else if (anonymousState === 1) {
			ubbButtons = (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<button
						id="post-topic-button-anonymous"
						onClick={this.postAnonymousUbbContent}
						disabled={this.state.buttonDisabled}
						className="button grey"
					>
						{this.state.anonymouslyPostButtonInfo}
					</button>
					<p>根据设置，你在本楼的回复都是匿名，并且不花费财富值。</p>
				</div>
			);
			markdownButtons = (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<button
						id="post-topic-button-md-anonymous"
						onClick={this.postAnonymousMdContent}
						disabled={this.state.buttonDisabled}
						className="button grey"
					>
						{this.state.anonymouslyPostButtonInfo}
					</button>
					<p>根据设置，你在本楼的回复都是匿名，并且不花费财富值。</p>
				</div>
			);
		} else if (anonymousState === 2) {
			if (this.props.topicInfo.isAnonymous && this.props.topicInfo.isMe) {
				ubbButtons = (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<button
							id="post-topic-button-anonymous"
							onClick={this.postAnonymousUbbContent}
							disabled={this.state.buttonDisabled}
							className="button grey"
						>
							{this.state.anonymouslyPostButtonInfo}
						</button>
						<p>根据设置，你在本楼的回复都是匿名，并且不花费财富值。</p>
					</div>
				);
				markdownButtons = (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<button
							id="post-topic-button-md-anonymous"
							onClick={this.postAnonymousMdContent}
							disabled={this.state.buttonDisabled}
							className="button grey"
						>
							{this.state.anonymouslyPostButtonInfo}
						</button>
						<p>根据设置，你在本楼的回复都是匿名，并且不花费财富值。</p>
					</div>
				);
			} else {
				ubbButtons = (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<div>
							<button
								id="post-topic-button"
								onClick={this.postUbbContent}
								disabled={this.state.buttonDisabled}
								className="button blue"
							>
								{this.state.buttonInfo}
							</button>
							<button
								id="post-topic-button-anonymous"
								onClick={this.postAnonymousUbbContent}
								disabled={this.state.buttonDisabled}
								className="button grey"
							>
								{this.state.anonymouslyPostButtonInfo}
							</button>
						</div>
						<p>
							在本版面匿名回复每次需消耗2000财富值。你当前的财富值余额为：
							{this.state.wealth}
						</p>
					</div>
				);
				markdownButtons = (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<div>
							<button
								id="post-topic-button-md"
								onClick={this.postMdContent}
								disabled={this.state.buttonDisabled}
								className="button blue"
							>
								{this.state.buttonInfo}
							</button>
							<button
								id="post-topic-button-md-anonymous"
								onClick={this.postAnonymousMdContent}
								disabled={this.state.buttonDisabled}
								className="button grey"
							>
								{this.state.anonymouslyPostButtonInfo}
							</button>
						</div>
						<p>
							在本版面匿名回复每次需消耗2000财富值。你当前的财富值余额为：
							{this.state.wealth}
						</p>
					</div>
				);
			}
		}
		//根据ubb或markdown模式，显示相应的编辑器和按钮
		if (this.state.mode === 0) {
			mode = "使用UBB模式编辑";
			editor = (
				<div>
					{ft}
					<UbbEditor
						update={this.update}
						value={this.state.content}
						option={{ height: 20, submit: this.postUbbContent }}
					/>
					<div
						className="row"
						style={{ justifyContent: "center", marginBottom: "1.25rem " }}
					>
						{ubbButtons}
					</div>
				</div>
			);
		} else {
			mode = "使用Markdown编辑";
			//console.log("react mde")
			//console.log(this.state.mdeState)
			editor = (
				<div>
					<div>
						{ft}
						<ReactMde
							value={this.state.mdeState}
							onChange={this.handleValueChange}
							generateMarkdownPreview={(markdown) => {
								console.log(this.converter.makeHtml(markdown));
								return Promise.resolve(this.converter.makeHtml(markdown));
							}}
							commands={this.state.commands}
							minEditorHeight={330}
							maxEditorHeight={500}
							buttonContentOptions={{
								iconProvider: (name) => {
									console.log(name);
									if (name === "heading")
										return <i className={`fa fa-header`} />;
									return <i className={`fa fa-${name}`} />;
								},
							}}
						/>
					</div>
					<div
						className="row"
						style={{ justifyContent: "center", marginTop: "5rem " }}
					>
						{markdownButtons}
					</div>
				</div>
			);
		}
		//管理按钮

		const manageItems = [];
		const isManager = Utility.isMaster(this.props.boardInfo.boardMasters);
		const myInfo = Utility.getLocalStorage("userInfo");
		const isMe = myInfo && myInfo.id === this.props.topicInfo.userId;
		const hasManageFeature = isMe &&
			this.props.topicInfo.topicAuthorPermissions &&
			this.props.topicInfo.topicAuthorPermissions.length !== 0;

		if (isManager || hasManageFeature) {
			manageItems.push(<Button type="primary" onClick={this.showManagement}>管理</Button>);
			manageItems.push(<Button type="primary" onClick={this.showManageHistory} style={{ marginLeft: "2rem" }}>管理记录</Button>);
		}

		if (isManager) {
			manageItems.push(<Button type="primary" onClick={this.showIP} style={{ marginLeft: "2rem" }}>查看IP</Button>);
		}

		const manageButtonRegion = <div>{manageItems}</div>;
		//缓存按钮
		let cacheButton = null;
		if (Utility.getLocalStorage(this.cachestr)) {
			cacheButton = (
				<div>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<button
							id="post-topic-cache-button"
							onClick={this.cleancache}
							className="button blue"
							style={{
								width: "100%",
								height: "2rem",
								lineHeight: "0.8rem",
								marginBottom: "1rem",
								fontSize: "1rem"
							}}
						>
							下面文本框中的内容为前一次回帖失败时的缓存，你可以复制到相应的UBB/Markdown编辑器中重新编辑。点击这个按钮将清除缓存。
						</button>
						{/** 
						<button
							id="post-topic-cache-button-clean"
							onClick={this.cleancache}
							className="button blue"
							style={{
								width: "12rem",
								height: "2rem",
								lineHeight: "0.8rem",
								marginBottom: "1rem",
								fontSize: "1rem"
							}}
						>
							清空本帖缓存的内容
						</button>
						*/}
					</div>
					<input
						id="cache-text"
						type="text"
						style={{ marginBottom: "1rem" }}
						onChange={this.getCache}
						value={this.state.postCache}
					/>
				</div>
			);
		}

		return (
			<div
				id="sendTopicInfo"
				style={{ width: "100%", display: "flex", flexDirection: "column" }}
			>
				<div className="row" style={{ justifyContent: "flex-end" }}>
					<div
						id="post-topic-changeMode"
						className="changeEditor"
						onClick={this.changeEditor.bind(this)}
						style={{ width: "14rem", marginBottom: "0.5rem" }}
					>
						{this.state.mode === 1 ? "切换到UBB编辑器" : "切换到Markdown编辑器"}
					</div>
				</div>
				{editor}
				{cacheButton}
				{manageButtonRegion}
				{this.state.manageVisible && (
					<TopicManagement
						update={this.onChange}
						boardId={this.props.boardInfo.id}
						topicInfo={this.props.topicInfo}
						onCancel={this.handleCancel}
						visible={this.state.manageVisible}
						isManager={isManager}
						permissions={this.props.topicInfo.topicAuthorPermissions}
					/>
				)}
				{this.state.manageHistoryVisible && (
					<ManageHistory
						topicInfo={this.props.topicInfo}
						onClose={() => this.setState({ manageHistoryVisible: false })}
						visible={this.state.manageHistoryVisible}
					/>
				)}
				{this.state.IPData.length !== 0 && (
					<IPTable IPData={this.state.IPData} changeStatus={this.closeIP} />
				)}

				{/**错误提示 */}
				{errorMessageSet.map(this.generateErrorNoticeMessage)}
				<SendTopicNoticeMessage
					text="other"
					id="出现了意料之外的错误，请稍后重试。如果依然出现该问题，请联系管理员。"
				/>
				<SendTopicNoticeMessage
					text="unknown_error"
					id="原因未知，请刷新重试。如果依然出现该问题，请联系管理员。"
				/>

				<Prompt
					message={(location) =>
						(this.state.content &&
							location.pathname.indexOf(this.props.topicInfo.id)) === -1
							? "确定要离开吗？"
							: true
					}
				/>
			</div>
		);
	}
}
