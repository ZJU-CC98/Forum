import * as React from 'react';
//import Form from 'antd/lib/form';
//import Input from 'antd/lib/input';
import {Form,Input} from 'antd';
const FormItem = Form.Item;
interface Props{
 
    userId;
    postId;
    update;
    topicId;
    privilege;
    boardId;
    floor;
    d_wealth;
    m_wealth;
    boardName;
    form?:any;
}
export default class extends React.Component<Props,{}>{
    render() {
        const { getFieldDecorator } = this.props.form;
        return (<Form layout="vertical">
            <FormItem label="名称">
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入名称' }]
               
                }
                )(
                    <Input />
                )}
            </FormItem>
            <FormItem label="图片链接">
                {getFieldDecorator('pic', {
                    rules: [{ required: true, message: '请输入图片链接' }]
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="价格">
                {getFieldDecorator('value', {
                    rules: [{ required: true, message: '请输入价格' }]
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="token类型">
                {getFieldDecorator('token', {
                    rules: [{ required: true, message: '请输入token类型' }]
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="提供者">
                {getFieldDecorator('provider', {
                    rules: [{ required: true, message: '请输入提供者' }]
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem label="简介">
                {getFieldDecorator('intro', {
                    rules: [{ required: true, message: '请输入应用简介' }]
                })(
                    <Input />
                )}
            </FormItem>
           
        </Form>
            )
    }
}