import * as React from 'react';
import { Link } from 'react-router-dom';

export type router = {
    breadcrumbName: string;
    path?: string;
};

type props = {
    routers: router[];
};

export class Breadcrumb extends React.Component<props> {
    render(){
        const linkStyle = (index: number) => (Object.assign({
            color: "grey", 
            fontSize: "1rem", 
            marginRight: "0.5rem"
        }, index !== 0 ? { marginLeft: "0.5rem" } : null // 第一个链接不加左边距
        ) as React.CSSProperties);

        const elements = this.props.routers.map((item, index) => item.path ? 
            <Link style={linkStyle(index)} key={item.breadcrumbName} to={item.path}>{item.breadcrumbName}</Link> :
            <span style={linkStyle(index)} key={item.breadcrumbName}>{item.breadcrumbName}</span>
        );

        // 添加箭头
        for (let i = 1; i < elements.length; i += 2) {
            elements.splice(i, 0, <i className="fa fa-chevron-right"></i>);
        }

        return (
            <div
                className="row"     
                style={{ alignItems: "baseline", width: "100% ", justifyContent: "flex-start", color: "grey", fontSize: "0.75rem", marginBottom: "1rem" }}
            >
                {elements}
            </div>
        );
    }
}