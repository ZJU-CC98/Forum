import React from 'react'
import {getAnnualReview, getLocalStorage} from '../../Utility'
import Page1 from './page1'
import Page2 from './page2'
import Page3 from './page3'
import Page4 from './page4'
import Page5 from './page5'
import Page6 from './page6'
import Cover from './cover'
import {Icon, Spin} from 'antd'
export default class extends React.Component{
    state={
        data: null,
        page: 0
    }
    async componentDidMount() {
        const data = await getAnnualReview()
        this.setState({data})
    }
    previousPage  = () => {
        if(this.state.page>0){
            this.setState({page: this.state.page - 1})
        }
    }


    nextPage = () => {
        if(this.state.page<6){
            this.setState({page: this.state.page + 1})
        }
    }

    render(){
        const {data, page} = this.state
        const isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
        if(!data) return <Spin />
        if(getLocalStorage('userInfo')){
            data.userInfo = getLocalStorage('userInfo')
        }
        return <div className={isMobile? 'annual-review-body' : 'annual-review-body'}>
             {page!==0?<Icon type="up" onClick={this.previousPage} style={{fontSize: '2rem',  cursor: 'pointer', zIndex: 99}}/>:<div style={{height: '2rem'}}></div>}
             {page===0&&<Cover />}
            {page===1&&<Page1 data={data} />}
            {page===2&&<Page2 data={data} />}
            {page===3&&<Page3 data={data} />}
            {page===4&&<Page4 data={data} />}
            {page===5&&<Page5 data={data} />}
            {page===6&&<Page6 data={data} />}
            {page!==6&&<Icon type="down" onClick={this.nextPage} style={{fontSize: '2rem',  cursor: 'pointer',zIndex: 99}}/>}
        </div>
    }
}