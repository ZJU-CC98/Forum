import * as React from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';
import { FormComponentProps } from 'antd/es/form';
import Modal from 'antd/es/modal';
import Select from 'antd/es/select';
import Menu from 'antd/es/menu';
import Tag from 'antd/es/tag';
import * as Utility from '../../Utility';

const FormItem = Form.Item;
const Option = Select.Option;

interface Props {
    update;
    privilege;
    item;
    boardId;
    d_wealth;
    m_wealth;
    boardName;
    visible;
    onCancel;
}

export default Form.create<Props>()(class extends React.Component<Props & FormComponentProps, { option, current }>{
    constructor(props) {
        super(props);
        this.state = { option: "", current: "wealth" };
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({ option: value });
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    onCreate = () => {
        console.log(this.state.current);
        const form = this.props.form;
        let value = 0, reason = "", response = null;
        form.validateFields(async (err, values) => {
            if (err) {
                return;
            }
            switch (this.state.current) {
                case 'wealth':
                    value = parseInt(values.wealth);
                    reason = values.reason.toString();
                    response = await Utility.awardWealth(reason, value, this.props.item.id);
                    break;
                case 'prestige':
                    value = parseInt(values.prestige);
                    reason = values.reason.toString();
                    response = await Utility.addPrestige(this.props.item.id, value, reason);
                    break;
                case 'punishwealth':
                    value = parseInt(values.wealth);
                    reason = values.reason.toString();
                    response = await Utility.deductWealth(reason, value, this.props.item.id);
                    break;
                case 'punishprestige':
                    value = parseInt(values.prestige);
                    reason = values.reason.toString();
                    response = await Utility.deductPrestige(this.props.item.id, value, reason);
                    break;
                case 'delete':
                    reason = values.reason.toString();
                    response = await Utility.deletePost(this.props.item.topicId, this.props.item.id, reason);
                    break;
                case 'tp':
                    reason = values.reason.toString();
                    value = parseInt(values.days);
                    response = await Utility.stopBoardPost(this.props.item.id, reason, value);
                    break;
                case 'canceltp':
                    response = await Utility.cancelStopBoardPost(this.props.item.userId, this.props.boardId);
                    break;
            }
            if (response === 'ok') {
                this.props.update();
                this.props.onCancel();
            } else {
                alert(response);
            }
        })

    }
    render() {
        console.log(this.props.item.id);
        const { getFieldDecorator } = this.props.form;
        const { visible, onCancel } = this.props;
        let rcForm = null;
        let m_wealth: any = 0;
        if (!this.props.m_wealth) m_wealth = '不限';
        else m_wealth = this.props.m_wealth;
        switch (this.state.current) {
            case 'wealth':
                rcForm = <Form layout="vertical">
                    <Tag color="blue">您今天在{this.props.boardName}已经发了{this.props.d_wealth}财富值，最多可发{m_wealth} （单次最多1000）</Tag>
                    <FormItem label="财富值">
                        {getFieldDecorator('wealth', {
                            rules: [{ required: true, message: '请输入财富值' }]

                        }
                        )(
                            <InputNumber />
                        )}
                    </FormItem>

                    <FormItem label="理由">
                        {getFieldDecorator('reason', {
                            rules: [{ required: true, message: '请输入理由' }]
                        })(
                            <Select mode={"tags"} style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value="好文章">好文章</Option>
                                <Option value="有用资源">有用资源</Option>
                                <Option value="热心回复">热心回复</Option>

                            </Select>

                        )}
                    </FormItem>

                </Form>;
                break;
            case 'prestige':
                rcForm = <Form layout="vertical">
                    <FormItem label="威望">
                        {getFieldDecorator('prestige', {
                            rules: [{ required: true, message: '请输入威望值' }]
                        })(
                            <InputNumber />
                        )}
                    </FormItem>
                    <FormItem label="理由">
                        {getFieldDecorator('reason', {
                            rules: [{ required: true, message: '请输入理由' }]
                        })(
                            <Select mode={"tags"} style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value="好文章">好文章</Option>
                                <Option value="有用资源">有用资源</Option>
                                <Option value="热心回复">热心回复</Option>

                            </Select>

                        )}
                    </FormItem>

                </Form>;
                break;
            case 'punishwealth':
                rcForm = <Form layout="vertical">
                    <FormItem label="财富值">
                        {getFieldDecorator('wealth', {
                            rules: [{ required: true, message: '请输入财富值' }]

                        }
                        )(
                            <InputNumber />
                        )}
                    </FormItem>

                    <FormItem label="理由">
                        {getFieldDecorator('reason', {
                            rules: [{ required: true, message: '请输入理由' }]
                        })(
                            <Select mode={"tags"} style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value="人身攻击">人身攻击</Option>
                                <Option value="违反版规">违反版规</Option>
                                <Option value="恶意灌水">恶意灌水</Option>

                            </Select>

                        )}
                    </FormItem>

                </Form>

                    ; break;
            case 'punishprestige':
                rcForm = <Form layout="vertical">

                    <FormItem label="威望">
                        {getFieldDecorator('prestige', {
                            rules: [{ required: true, message: '请输入威望值' }]
                        })(
                            <InputNumber />
                        )}
                    </FormItem>
                    <FormItem label="理由">
                        {getFieldDecorator('reason', {
                            rules: [{ required: true, message: '请输入理由' }]
                        })(
                            <Select mode={"tags"} defaultValue="人身攻击" style={{ width: 120 }} onChange={this.handleChange}>
                                <Option value="人身攻击">人身攻击</Option>
                                <Option value="违反版规">违反版规</Option>
                                <Option value="恶意灌水">恶意灌水</Option>

                            </Select>

                        )}
                    </FormItem>

                </Form>

                    ; break;
            case 'delete':
                rcForm = <Form layout="vertical">
                    <FormItem label="理由">
                        {getFieldDecorator('reason', {
                            rules: [{ required: true, message: '请输入理由' }]
                        })(
                            <Input />
                        )}
                    </FormItem>

                </Form>;
                break;
            case 'canceltp':
                rcForm = <div>解除此用户版面 tp</div>;
                break;
            case 'tp':
                rcForm = <Form layout="vertical">
                    <FormItem label="天数">
                        {getFieldDecorator('days', {
                            rules: [{ required: true, message: '请输入tp天数' }]
                        })(
                            <InputNumber />
                        )}
                    </FormItem>
                    <FormItem label="理由">
                        {getFieldDecorator('reason', {
                            rules: [{ required: true, message: '请输入理由' }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>;
                break;
        }
        return (
            <Modal
                visible={visible}
                title="发言管理"
                okText="确认"
                cancelText="取消"
                onOk={this.onCreate}
                onCancel={onCancel}
                width={"50rem"}
            >
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{ marginBottom: "2rem" }}
                >
                    <Menu.Item key="wealth">
                        奖励财富值
                    </Menu.Item>
                    <Menu.Item key="prestige">
                        奖励威望
                    </Menu.Item>
                    <Menu.Item key="punishwealth">
                        扣除财富值
                    </Menu.Item>
                    <Menu.Item key="punishprestige">
                        扣除威望
                    </Menu.Item>
                    <Menu.Item key="delete">
                        删除
                    </Menu.Item>
                    <Menu.Item key="tp">
                        TP
                    </Menu.Item>
                    <Menu.Item key="canceltp">
                        解除TP
                    </Menu.Item>
                </Menu>
                {rcForm}
            </Modal>
        )
    }
})


