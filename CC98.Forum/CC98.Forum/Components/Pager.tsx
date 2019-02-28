import * as React from 'react';
import {
    Link
} from 'react-router-dom';


type ModelProps = { 
    text: string
    url: string 
    active?: boolean 
}

class PageModel extends React.PureComponent<ModelProps, {}> {
    render() {
        const { text, url, active } = this.props

        return (
            <li className="page-item">
                <Link
                    className={`page-link${active ? " active" : ""}`}
                    to={url}
                >
                    {text}
                </Link>
            </li>
        )
    }
}


type Porps = {
    page: number
    url: string
    totalPage: number
}

type State = {
    nextPage: number
}

export class Pager extends React.Component<Porps, State> {
    constructor(props, content) {
        super(props, content)
        this.state = {
            nextPage: this.props.page
        }
    }

    handleInput = (event) => {
        const nextPage = parseInt(event.target.value, 10)

        if (isNaN(nextPage) || nextPage < 1 || nextPage > this.props.totalPage) {
            return 
        }

        this.setState({
            nextPage
        })
    }

    render() {
        const pageLen = 3

        const { page: curPage, url, totalPage } = this.props
        const pageList: number[] = []

        let left = Math.max(1, curPage - pageLen)
        let right = Math.min(totalPage, curPage + pageLen)

        if (right - left !== pageLen * 2) {
            let l = pageLen * 2 - (right - curPage)
            let r = pageLen * 2 - (curPage - left)

            left = Math.max(1, curPage - l)
            right = Math.min(totalPage, curPage + r)
        }

        for (let page: number = left; page <= right; page++) {
            pageList.push(page)
        }

        const first = pageList[0] !== 1
        const last = pageList[pageList.length-1] !== totalPage
        const prev = left !== 1
        const next = right !== totalPage
        const goto = totalPage > 20

        return (
            <div className="pagination">
                <ul className="page-nav">
                    {first &&
                        <PageModel
                            text="1"
                            url={`${url}1#1`}
                        />
                    }

                    {prev &&
                        <PageModel
                            text="&lsaquo;"
                            url={`${url}${curPage - 1}#1`}
                        />
                    }

                    {pageList.map((page) =>
                        <PageModel
                            key={page}
                            text={`${page}`}
                            url={`${url}${page}#1`}
                            active={curPage === page}
                        />
                    )}

                    {next &&
                        <PageModel
                            text="&rsaquo;"
                            url={`${url}${curPage + 1}#1`}
                        />
                    }

                    {last &&
                        <PageModel
                            text={`${totalPage}`}
                            url={`${url}${totalPage}#1`}
                        />
                    }
                </ul>

                {goto &&
                    <div className="page-goto">
                        <div><input onChange={this.handleInput}  placeholder={`跳转到`}/></div>
                        <div><Link to={`${url}${this.state.nextPage}#1`}> Go </Link></div>
                    </div>
                }
            </div>
        )
    }
}