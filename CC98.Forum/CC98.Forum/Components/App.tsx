import * as React from 'react';
import { AppState } from '../States/AppState';
import * as ReactDOM from 'react-dom';
import { match } from 'react-router';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import { Post } from './post';
import { List } from './List';
import { CurUserPost } from './CurUserPost';
import { BoardList } from './BoardList';
import { UserCenter } from './UserCenter';
import { MyMessage } from './MyMessage';
import { AllNewPost } from './AllNewPost';
import { Header } from './Header';
import { MainPage } from './MainPage';
import { User } from './User';
import { Login } from './Login';

import { UbbContainer } from './UbbContainer';
import * as Ubb from '../Ubb/UbbCodeExtension';


export class RouteComponent<TProps, TState, TMatch> extends React.Component<TProps, TState> {
	match: match<TMatch>;
	constructor(props, context) {
		super(props, context);
		this.match = props.match;
	}
}
/* <h1>Ashida Mana~</h1>
				<li><Link to="/topic/4723305">moe</Link></li>
                <li><Link to="/boardlist">meow</Link></li>
                <li><a href={`https://login.cc98.org/OAuth/Authorize?scope=getuserinfo*&response_type=token&client_id=9428333a-a0e3-486b-b375-7904f1bceba9&redirect_uri=http%3A%2F%2Flocalhost%3A${location.port}%2Fusercenter`} > 登陆</a></li>
                <li><Link to="/usercenter">个人中心</Link></li>
                <li><Link to="/messagebox">信箱</Link></li>
                <li><Link to="newtopics">新帖 </Link></li>
                 <hr />*/
export class App extends React.Component<{}, AppState> {

	render() {
		const data =
			'妹子是河南人 96年的 双鱼座 现在是浙江大学传媒学院研一新生 坐标：西溪 身高162 颜值见照片啦 喜欢健身 吃吃喝喝 追剧（传媒学子的基本素养） 性格随和 非常好相处 有一点点“傻白甜” 厨艺也很棒，吃过她做的大盘鸡，超级美味！ 之前有过一次恋爱经历，但因为对方没有“男友力”，缺乏安全感就分手了 和小姐姐一起做室友很偶然也很有缘分，觉得她就是那种比较单纯，性格非常温和，虽然比我小，但是非常会照顾人，希望她能够早日在浙大找到对的人！ 所以希望你~ 有一个强壮的体魄，身高在178左右（可以约健身房哦！） 有一颗温暖的心灵，让妹子有所依靠 诚恳、踏实、爱奋斗~ QQ：2577047698 （希望你加QQ时能够介绍一下自己，也能分享一张自己的照片~） 之前妹子qq验证出了点问题，现在ok了哦，所以有意的小哥哥们就上吧！ 当当当当~王道时间： [upload=jpg,1]http://file.cc98.org/uploadfile/2017/9/18/2344641658.jpg[/upload]（昨天刚刚新鲜出炉的开学典礼照片哟~） [upload=jpg,1]http://file.cc98.org/uploadfile/2017/9/18/2351342848.jpg[/upload]（还有美腻的自拍！） 非诚勿扰哦！ [em07]';

		return <div>
			<UbbContainer code={data} />
			<Router>
				<div style={{ backGroundColor: '#F5FAFD', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
					<Header />
					<Route exact path="/" component={MainPage}></Route>
					<Route exact path="/topic/:topicid/:page?" component={Post} />
					<Route exact path="/topic/:topicid/user/:userName/:page?" component={CurUserPost} />
					<Route path="/list/:boardid/:page?" component={List} />
					<Route exact path="/boardlist" component={BoardList} />
					<Route path="/usercenter" component={UserCenter} />
					<Route path="/messagebox" component={MyMessage} />
					<Route path="/newtopics" component={AllNewPost} />
					<Route path="/user" component={User} />
					<Route path="/login" component={Login} />
				</div>
			</Router></div>;
	}
}
