// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Utility from '../../Utility';
import { changeUserInfo } from '../../Actions';
import { connect } from 'react-redux';
import { UserInfo } from '../../States/AppState';

interface Props {
	/**
	 * 更新store中的信息
	 */
	changeUserInfo: (userInfo: UserInfo)=>void;
	/** 
	 * store中的用户信息
	 */
	userInfo: UserInfo;
}
interface States {
	/**
	 * 提示信息
	 */
	info: string;
	/**
	 * 用户当前的头像地址
	 */
	avatarURL: string;
	/**
	 * 本地图片选框是否显示
	 */
	isShown: boolean;
	/**
	 * 本地图片选框总高度
	 */
	divheight: number;
	/**
	 * 本地图片选框总宽度
	 */
	divWidth: number;
	/**
	 * 本地图片选框选择器宽度（与高度相同）
	 */
	selectorWidth: number;
	/**
	 * 本地图片选框选择器上距上边框距离
	 */
	selectorTop: number;
	/**
	 * 本地图片选框选择器上距左边框距离
	 */
	selectorLeft: number;
	/**
	 * 渲染到的头像地址
	 */
	avatarNow: string;
	/**
	 * 是否在加载过程
	 */
	isLoading: boolean;
	/**
	 * 用户选择的本地图片宽度
	 */
	naturalWidth: number;
	/**
	 * 用户选择的本地图片高度
	 */
	naturalHeight: number;
	/**
	 * IMG对象
	 */
	img: HTMLImageElement;
	/**
	 * 选择器最大宽度（与高度相同）
	 */
	NUM_MAX: number;
	/**
	 * 缩放倍数
	 */
	scaling: number;
	/**
	 * 是否在选用默认头像
	 */
	choosingDefault: boolean;
	/**
	 * 用户选择的本体图片类型（扩展名）
	 */
	fileType: string;
}

/**
 * 用户中心页
 * 修改头像组件
 */
class UserCenterConfigAvatar extends React.Component<Props, States> {
	/**
	 * 对Canvas的引用
	 */
	myCanvas: HTMLCanvasElement;
	/**
	 * 对选择器的引用
	 */
	selector: HTMLDivElement;
	/**
	 * 对调整器的引用
	 */
	resize: HTMLSpanElement;
	/**
	 * 新头像用的Canvas画布
	 */
	newAvatar: HTMLCanvasElement;
	/**
	 * 覆盖在用户选择头像的灰色蒙版
	 */
	cover: HTMLDivElement;
	/**
	 * 当前正在拖拽的元素
	 */
	dragging: HTMLElement;
	/**
	 * 拖曳X偏移
	 */
	diffX: number;
	/**
	 * 拖曳Y偏移
	 */
	diffY: number;
	constructor(props: Props) {
		super(props);
		const userInfo = Utility.getLocalStorage('userInfo');
		this.state = {
			avatarURL: '',
			info: '',
			isShown: false,
			divheight: 0,
			divWidth: 0,
			selectorWidth: 160,
			selectorLeft: 0,
			selectorTop: 0,
			avatarNow: props.userInfo.portraitUrl,
			isLoading: false,
			naturalWidth: 0,
			naturalHeight: 0,
			img: null,
			NUM_MAX: 0,
			scaling: 1,
			choosingDefault: false,
			fileType: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleIMGLoad = this.handleIMGLoad.bind(this);
		this.handleSelectorMove = this.handleSelectorMove.bind(this);
		this.handleResizeMove = this.handleResizeMove.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCoverMouseMove = this.handleCoverMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.setDefaultAvatar = this.setDefaultAvatar.bind(this);
	}

	//用户选择本地图像后触发
	handleChange(e) {
		let file: File = e.target.files[0];
		//判断文件类型
		if (!file.type.match('image.*')) {
			this.setState({
				info: '请选择图片文件',
				isShown: false,
				divheight: 0
			});
			return false;
		}
		//记录文件类型
		this.setState({ fileType: file.type });
		//读取文件并准备显示在网页中
		let render = new FileReader();

		render.readAsDataURL(file);
		render.addEventListener('load', (e) => {
			this.setState({
				isShown: true,
				avatarURL: (e as any).target.result
			});
		});
	}

	//图片读取完毕触发的函数
	handleIMGLoad(width, height, img) {
		//处理过小的图片
		if (width < 160 || height < 160) {
			this.setState({
				info: '图片至少为 160*160',
				isShown: false,
				divheight: 0
			});
			return;
		}
		//获取Canvas2D对象
		let ctx = this.myCanvas.getContext('2d');
		let scaling = this.state.scaling;
		//处理宽度大于1000的图片，记录缩放倍数
		while (width / scaling > 800) {
			scaling = scaling * 1.1;
		}
		//处理Canvas宽高，注意不同与css，这里宽高是HTML属性
		this.myCanvas.width = width / scaling;
		this.myCanvas.height = height / scaling;
		//绘制图片
		ctx.drawImage(img, 0, 0, width, height, 0, 0, width / scaling, height / scaling);
		this.setState({
			divheight: height / scaling + 50,
			divWidth: width / scaling + 50,
			isShown: true,
			info: '请选择要显示的区域',
			selectorLeft: width / scaling / 4,
			selectorTop: height / scaling / 4,
			selectorWidth: Math.min(height / scaling, width / scaling) / 2,
			naturalWidth: width / scaling,
			naturalHeight: height / scaling,
			img: img,
			NUM_MAX: Math.min(500, width / scaling, height / scaling),
			scaling: scaling
		});
	}

	//鼠标松开时清除拖曳对象
	handleMouseUp() {
		this.dragging = null;
	}

	//用原生的事件绑定，react的事件绑定会丢失一些信息
	componentDidMount() {
		this.selector.addEventListener('mousedown', this.handleSelectorMove);
		this.selector.addEventListener('mousemove', this.handleSelectorMove);
		this.selector.addEventListener('mouseup', this.handleSelectorMove);
		this.resize.addEventListener('mousedown', this.handleResizeMove);
		this.resize.addEventListener('mousemove', this.handleResizeMove);
		this.resize.addEventListener('mouseup', this.handleResizeMove);
		this.cover.addEventListener('mousemove', this.handleCoverMouseMove);
		this.cover.addEventListener('mouseup', this.handleCoverMouseMove);
		window.addEventListener('mouseup', this.handleMouseUp);
	}

	//组件卸载时解除事件绑定
	componentWillUnmount() {
		this.selector.removeEventListener('mousedown', this.handleSelectorMove);
		this.selector.removeEventListener('mousemove', this.handleSelectorMove);
		this.selector.removeEventListener('mouseup', this.handleSelectorMove);
		this.resize.removeEventListener('mousedown', this.handleResizeMove);
		this.resize.removeEventListener('mousemove', this.handleResizeMove);
		this.resize.removeEventListener('mouseup', this.handleResizeMove);
		this.cover.removeEventListener('mousemove', this.handleCoverMouseMove);
		this.cover.removeEventListener('mouseup', this.handleCoverMouseMove);
		window.removeEventListener('mouseup', this.handleMouseUp);
	}

	//处理选择器的拖曳
	handleSelectorMove(event) {
		//如果当前正在拖曳调整器，则将事件传递给相应的函数处理
		if (this.dragging !== undefined && this.dragging !== null && this.dragging.id === 'resize') {
			this.handleCoverMouseMove(event);
		} else {
			switch (event.type) {
				//按下鼠标时记录当前位置
				case 'mousedown':
					this.diffX = event.clientX - event.target.offsetLeft;
					this.diffY = event.clientY - event.target.offsetTop;
					this.dragging = event.target;
					break;
				//鼠标移动时不断调整选择器位置
				case 'mousemove':
					if (this.dragging !== null) {
						let y = event.clientY - this.diffY,
							x = event.clientX - this.diffX;
						this.setState((prevState) => {
							if (y < 0) { y = 0; }
							if (x < 0) { x = 0; }
							if (y > prevState.naturalHeight - this.state.selectorWidth) { y = prevState.naturalHeight - this.state.selectorWidth; }
							if (x > prevState.naturalWidth - this.state.selectorWidth) { x = prevState.naturalWidth - this.state.selectorWidth; }
							return {
								selectorTop: y,
								selectorLeft: x
							}
						});
					}
					break;
				//鼠标松开时清空记录
				case 'mouseup':
					this.dragging = null;
					break;
			}
		}
	}

	//处理选择器的拖曳，大部分同上
	handleResizeMove(event) {
		switch (event.type) {
			case 'mousedown':
				this.diffX = event.clientX - event.target.offsetLeft;
				this.dragging = event.target;
				break;
			case 'mousemove':
				if (this.dragging !== null) {
					this.diffY = event.clientX - event.target.offsetLeft;
					this.setState((prevState) => {
						let num = prevState.selectorWidth + this.diffY - this.diffX;
						let max = Math.min(prevState.NUM_MAX, prevState.naturalWidth - prevState.selectorLeft, prevState.naturalHeight - prevState.selectorTop);
						if (!isNaN(num)) {
							if (num < 100) { num = 100 }
							if (num > max) { num = max }
						}
						return {
							selectorWidth: isNaN(num) ? prevState.selectorWidth : num
						};
					});
				}
				break;
			case 'mouseup':
				this.dragging = null;
				break;
		}
	}

	//处理鼠标移动过快时脱离拖曳元素，大部分同上
	handleCoverMouseMove(e) {
		switch (e.type) {
			case 'mouseup':
				this.dragging = null;
				break;
			case 'mousemove':
				if (this.dragging !== undefined && this.dragging !== null && this.dragging.id === 'resize') {
					this.diffY = e.clientX - this.dragging.offsetLeft;
					this.setState((prevState) => {
						let num = prevState.selectorWidth + this.diffY - this.diffX;
						if (!isNaN(num)) {
							let max = Math.min(prevState.NUM_MAX, prevState.naturalWidth - prevState.selectorLeft, prevState.naturalHeight - prevState.selectorTop);
							if (num < 100) { num = 100 }
							if (num > max) { num = max }
						}
						return {
							selectorWidth: isNaN(num) ? prevState.selectorWidth : num
						};
					});
				} else if (this.dragging !== undefined && this.dragging !== null && this.dragging.id === 'selector') {
					let y = e.clientY - this.diffY,
						x = e.clientX - this.diffX;
					this.setState((prevState) => {
						if (y < 0) { y = 0; }
						if (x < 0) { x = 0; }
						if (y > prevState.naturalHeight - this.state.selectorWidth) { y = prevState.naturalHeight - this.state.selectorWidth; }
						if (x > prevState.naturalWidth - this.state.selectorWidth) { x = prevState.naturalWidth - this.state.selectorWidth; }
						return {
							selectorTop: y,
							selectorLeft: x
						}
					});
				}
				break;

		}
	}

	//处理本地图片的剪切
	handleSubmit() {
		//用新画布绘制头像
		let canvas = this.newAvatar;
		let ctx = canvas.getContext('2d');
		const x = this.state.selectorLeft,
			y = this.state.selectorTop,
			width = this.state.selectorWidth;
		canvas.width = width;
		canvas.height = width;
		ctx.drawImage(this.state.img, x * this.state.scaling, y * this.state.scaling, width * this.state.scaling, width * this.state.scaling, 0, 0, width, width);
		//Canvas内容转为文件，toBlob第二个参数为文件类型，第三个参数为压缩率（仅对jpeg有效）
		canvas.toBlob(async (result) => {
			let file: any = new Blob([result], { type: this.state.fileType });
			file.lastModifiedDate = Date.now();
            file.name = '头像.' + this.state.fileType.slice(this.state.fileType.indexOf('/') + 1, this.state.fileType.length);
			try{
				//上传头像文件到API
				const url = `/file/portrait`;
				let myHeaders = new Headers();
				myHeaders.append('Authorization', await Utility.getToken());
				let formdata = new FormData();
				formdata.append('files', file, file.name);
				formdata.append('contentType', "multipart/form-data");
				let res = await Utility.cc98Fetch(url, {
					method: 'POST',
					headers: myHeaders,
					body: formdata
				});
				let data: string[] = await res.json();
				if (res.status === 200 && data.length !== 0) {
					//根据返回的图片地址修改个人信息
					this.changeAvatar(data[0]);
				}				
			}catch(e){
				this.setState({
					info: '修改失败',
					isLoading: false,
					isShown: false,
					divheight: 0,
                    choosingDefault: false,
                    avatarURL: ''
				});
			}
		}, this.state.fileType, 0.75);
	}

	//选择默认头像
	async setDefaultAvatar(e: React.MouseEvent<HTMLImageElement>) {
		var ele = e.target as HTMLImageElement;
		await this.changeAvatar(ele.src);
	}

	//根据传入的头像地址修改头像地址
	async changeAvatar(avatarUrl: string) {
		try {
			this.setState({
				isLoading: true
			});
			const token = await Utility.getToken();
			const url = '/me/portrait';
			let myHeaders = new Headers();
			myHeaders.append('Content-Type', 'application/json');
			myHeaders.append('Authorization', token);
			let res = await Utility.cc98Fetch(url, {
				method: 'PUT',
				headers: myHeaders,
				body: JSON.stringify(avatarUrl)
			});
			if (res.status === 200) {
				this.setState({
					info: '修改成功',
					avatarNow: avatarUrl,
					isLoading: false,
					isShown: false,
					divheight: 0,
                    choosingDefault: false,
                    avatarURL: ''
				});
				let userInfo = Utility.getLocalStorage('userInfo');
				userInfo.portraitUrl = avatarUrl;
				//修改store中的info
				this.props.changeUserInfo(userInfo);
				//修改缓存中的info
				Utility.setLocalStorage("userInfo", userInfo);
				Utility.setLocalStorage(`userId_${userInfo.id}`, userInfo, 3600);
				Utility.setLocalStorage(`userName_${userInfo.name}`, userInfo, 3600);
			} else {
				throw new Error();
			}

		} catch (e) {
			this.setState({
				info: '修改失败',
				isLoading: false,
				isShown: false,
				divheight: 0,
                choosingDefault: false,
                avatarURL: ''
			});
		}
	}

	render() {
		const style = {
			display: 'none'
		};
		const userInfo = Utility.getLocalStorage('userInfo');
		return (
			<div>
				<h2>修改头像</h2>
				<div className="user-center-config-avatar">
					<img src={this.state.avatarNow}></img>
					<div>
						<button id="chooseDefaultAvatar" type="button" onClick={() => this.setState({ choosingDefault: true, info: '暂时只有两枚' })}>选择论坛头像</button>
						<div>
                            <input onChange={e => { this.handleChange(e); e.target.value = ""; }} id="uploadAvatar" type="file" accept="image/*" style={style} />
							<label htmlFor="uploadAvatar" onClick={() => this.setState({ choosingDefault: false })}><p>选择本地图片</p></label>
							<p style={{ color: 'red', margin: '0' }}>{this.state.info}</p>
							<button type="button" className="config-submit-button" style={this.state.isShown ? {} : style} onClick={this.handleSubmit} disabled={this.state.isLoading}>提交</button>
						</div>
					</div>
					<div className="user-center-config-avatar-preview" style={this.state.isShown ? { opacity: 1, marginTop: '2rem' } : { zIndex: -1 }}>
						<div style={{ position: 'absolute', width: '824px', overflow: 'hidden', paddingBottom: '50px' }}>
							<canvas id="newAvatar" style={style} ref={(a) => { this.newAvatar = a; }}></canvas>
							<canvas ref={(canvas) => { this.myCanvas = canvas }} style={this.state.isShown ? { position: 'relative' } : { display: 'none' }} />
							<div id="cover" ref={(div) => { this.cover = div; }} style={{ width: `${this.state.divWidth}px`, height: `${this.state.divheight}px`, top: 0 }}></div>
							<div className="imgdata" style={this.state.isShown ? { width: `${this.state.selectorWidth}px`, height: `${this.state.selectorWidth}px`, borderRadius: `${this.state.selectorWidth / 2}px`, top: `${this.state.selectorTop}px`, left: `${this.state.selectorLeft}px` } : style}>
								<img src={this.state.avatarURL} style={{ position: 'relative', top: `-${this.state.selectorTop}px`, left: `-${this.state.selectorLeft}px`, width: `${this.state.naturalWidth}px`, height: `${this.state.naturalHeight}px` }} />
							</div>
							<div id="selector" ref={(div) => { this.selector = div; }} style={this.state.isShown ? { width: `${this.state.selectorWidth}px`, height: `${this.state.selectorWidth}px`, borderRadius: `${this.state.selectorWidth / 2}px`, top: `${this.state.selectorTop}px`, left: `${this.state.selectorLeft}px` } : style}></div>
							<span id="resize" ref={(span) => { this.resize = span; }} style={{ top: `${this.state.selectorWidth + this.state.selectorTop}px`, left: `${this.state.selectorWidth + this.state.selectorLeft}px` }}></span>
						</div>
						<img onLoad={(e) => { this.handleIMGLoad((e as any).target.naturalWidth, (e as any).target.naturalHeight, (e as any).target); }} style={style} src={this.state.avatarURL} />
					</div>
					<div style={{ width: '100%', height: `${this.state.divheight}px`, transitionDuration: '.5s' }}></div>
					<div style={this.state.choosingDefault ? { display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' } : { display: 'none' }}>
						<img style={{ margin: '3rem', cursor: 'pointer' }} onClick={this.setDefaultAvatar} src="/static/images/default_avatar_boy.png" />
						<img style={{ margin: '3rem', cursor: 'pointer' }} onClick={this.setDefaultAvatar} src="/static/images/default_avatar_girl.png" />
					</div>
				</div>
			</div>
		);
	}
}

function mapState(state) {
	return {
		userInfo: state.userInfo.currentUserInfo
	};
}

function mapDispatch(dispatch) {
	return {
		changeUserInfo: (newInfo) => {
			dispatch(changeUserInfo(newInfo));
		}
	};
}

export default connect(mapState, mapDispatch)(UserCenterConfigAvatar);