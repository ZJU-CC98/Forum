import * as React from 'react';
import {
    Link
} from 'react-router-dom';

export class PageModel extends React.Component<{ text: string, url: string, active?: boolean }, {}> {
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