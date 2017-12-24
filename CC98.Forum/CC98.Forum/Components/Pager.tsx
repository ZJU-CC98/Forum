import * as React from 'react';
import {
    Link
} from 'react-router-dom';

import { PageModel } from './PageModel'

export class Pager extends React.Component<{ page: number, url: string, totalPage: number }, { nextPage: number }> {
    constructor(props, content) {
        super(props, content)
        this.state = {
            nextPage: this.props.page
        }
    }

    handleInput = (event) => {
        const nextPage = parseInt(event.target.value, 10)

        if (isNaN(nextPage) || nextPage < 1
            || nextPage > this.props.totalPage
        )
            return 

        this.setState({
            nextPage
        })
    }

    render() {
        const pageSize: number = 8
        const pageLen: number = 3

        const { page: curPage, url, totalPage } = this.props
        const pageList: number[] = []

        let left: number = Math.max(1, curPage - pageLen)
        let right: number = Math.min(totalPage, curPage + pageLen)

        if (right - left !== pageLen * 2) {
            let l = pageLen * 2 - (right - curPage)
            let r = pageLen * 2 - (curPage - left)

            left = Math.max(1, curPage - l)
            right = Math.min(totalPage, curPage + r)
        }

        for (let page: number = left; page <= right; page++) {
            pageList.push(page)
        }

        const first: boolean = pageList[0] !== 1
        const last: boolean = pageList[pageList.length-1] !== totalPage
        const prev: boolean = left !== 1
        const next: boolean = right !== totalPage
        const goto: boolean = totalPage > 20

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