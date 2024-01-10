import * as React from 'react';
import * as Ubb from './Core';
import { Link } from 'react-router-dom';

export class BoardTagHandler extends Ubb.RecursiveTagHandler {
    
    get supportedTagNames(): string {
		return 'board';
	}

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
        
        const boardId = tagData.mainValue;
        
        // const topicTagContent = innerContent;
        // const boardID = tagData.value(0);//因为现在帖子的url不需要boardid，所以这里其实是无意义的
        // let topicID;
        // if (tagData.parameterCount === 1) topicID = parseInt(tagData.value(0));//如果只有一个参数,则认为它是topicid
        // if (tagData.parameterCount === 2) topicID = parseInt(tagData.value(1));//如果有2个参数,则认为第2个是topicid
        // const url = `/topic/${topicID}`;
        // //return <a href={url}>{topicTagContent}</ a> 
        // return <Link to={url}>{topicTagContent}</Link>

        const url = `/board/${boardId}`;
        return <Link to={url}>{innerContent}</Link>;
    }
}