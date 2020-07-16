import * as React from 'react';
import Modal from 'antd/es/modal';
import Form from 'antd/es/form';
import Menu from 'antd/es/menu';
import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';
import * as Utility from '../../Utility';
import Select from 'antd/es/select';
import Checkbox from 'antd/es/checkbox';
import { SketchPicker } from 'react-color';
import { FormComponentProps } from 'antd/es/form';
import  Carousel from 'antd/es/carousel';
import { setLocalStorage } from '../../Utility/storageUtility';
const FormItem = Form.Item;
const Option = Select.Option;
const Item = Menu.Item;
const CheckboxGroup = Checkbox.Group;
interface Props {
    visible;
    onCancel;
    topicInfo;
    update;
    boardId;

}
interface States {
    current;
    option;
    childBoard;
    childBoards;
    background;
    checkedList;
    checkAll;
    indeterminate;
    days;
    boardsData;
}
const plainOptions = ['加粗', '斜体'];
const defaultCheckedList = [];
export default Form.create<Props>()(class extends React.Component<Props & FormComponentProps, States>{
    constructor(props) {
        super(props);
        this.state = {
            current: "1", option: "", childBoard: "似水流年", childBoards: [{ name: "似水流年", id: 758 }], background: "#fff", checkedList: [],
            indeterminate: true,
            checkAll: false, days: 0, boardsData: []
        }
    }
    onCreate = () => {
        const form = this.props.form;
        form.validateFields(async (err, values) => {
            if (err) {
                return;
            }
            const reason = values.reason;
            let days = parseInt(this.state.days);
            let status = 'ok';
            switch (this.state.current) {
                //锁定
                case '1':
                    //解锁
                    if (this.props.topicInfo.state === 1) {
                        status = await Utility.unLockTopic(this.props.topicInfo.id, this.props.boardId, reason);
                    }
                    //锁定
                    else {

                        status = await Utility.lockTopic(this.props.topicInfo.id, this.props.boardId, reason, days);
                    }
                    break;
                //热门
                case '2':
                    //允许热门
                    if (this.props.topicInfo.disableHot) {
                        status = await Utility.cancelDisableHot(this.props.topicInfo.id, reason);
                    }
                    //禁止热门
                    else {
                        status = await Utility.setDisableHot(this.props.topicInfo.id, reason);
                    }
                    break;
                //删除
                case '3':
                    status = await Utility.deleteTopic(this.props.topicInfo.id, reason);
                    break;
                //移动
                case '4':
                    status = await Utility.moveTopic(this.props.topicInfo.id, this.state.childBoard, reason);
                    break;
                //提升
                case '5':
                    status = await Utility.upTopic(this.props.topicInfo.id, this.props.boardId, reason);
                    break;
                //固顶
                case '6':
                    //取消固顶
                    if (this.props.topicInfo.topState === 2) {
                        status = await Utility.removeBoardTopTopic(this.props.topicInfo.id, this.props.boardId, reason);
                    }
                    //固顶
                    else {
                        status = await Utility.addBoardTopTopic(this.props.topicInfo.id, this.props.boardId, 2, days, reason);
                    }
                    break;
                //全站固顶
                case '7':
                    //取消全站固顶
                    if (this.props.topicInfo.topState === 4) {
                        status = await Utility.removeBoardTopTopic(this.props.topicInfo.id, this.props.boardId, reason);
                    }
                    //全站固顶
                    else {
                        status = await Utility.addBoardTopTopic(this.props.topicInfo.id, this.props.boardId, 4, days, reason);
                    }
                    break;
                //加精
                case '8':
                    //解除加精
                    if (this.props.topicInfo.bestState === 1) {
                        status = await Utility.cancelBestTopic(this.props.topicInfo.id, reason);
                    }
                    //加精
                    else {
                        status = await Utility.setBestTopic(this.props.topicInfo.id, reason);
                    }
                    break;
                //高亮
                case '9':
                    let isBold = false, isItalic = false;
                    for (let i of this.state.checkedList) {
                        if (i === '加粗') isBold = true;
                        if (i === '斜体') isItalic = true;
                    }
                    await Utility.setHighlight(this.props.topicInfo.id, isBold, isItalic, this.state.background, days, reason);
                    break;
            }
            if (status === 'ok') {
                this.props.update();
                this.props.onCancel();
            } else {
                alert("操作失败");
            }
        })
    }
    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
    };
    handleBoardChange = (value) => {
        const boardId = value;
        let boardsInfo =this.state.boardsData
        for (let board of boardsInfo) {
            if (board.id == boardId) {
                this.setState({ childBoards: board.boards, childBoard: board.boards[0].name });
                break;
            }
        }
    }
    onDaysChange = (value) => {

        this.setState({
            days: value
        });
    }
    onChildBoardChange = (value) => {

        this.setState({
            childBoard: value
        });
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
    }

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }

    async componentDidMount(){
        let prevBoards = localStorage.getItem("boardsInfo")
        if(prevBoards){
            if(prevBoards.indexOf('obj-') !== 0){
                localStorage.removeItem('boardsInfo')
            }
        }
        const boardsData = await Utility.getBoards()
        this.setState({boardsData})
    }

    render() {
        let boards = this.state.boardsData
        const boardOptions = boards.map(board => <Option key={board.id}>{board.name}</Option>);
        const childBoardOptions = this.state.childBoards.map(board => { if (board.id !== 182) { return <Option key={board.id}>{board.name}</Option> } else return null; });

        let rcForm = null;
        const { visible, onCancel } = this.props;;
        const { getFieldDecorator } = this.props.form;

        let formWithReason = <Form>
            <FormItem label="理由">
                {getFieldDecorator('reason', {
                    rules: [{ required: true, message: '请输入理由' }]
                }
                )(
                    <Input />
                )}
            </FormItem>
        </Form>;
        let formWithDays = <Form>
            <FormItem label="天数">
                <Select value={this.state.days} onChange={this.onDaysChange}>
                    {this.state.current === '1' ? <Option key='0'>0</Option> : null}
                    <Option key='7'>7</Option>
                    <Option key='14'>14</Option>
                    <Option key='30'>30</Option>
                    <Option key='98'>98</Option>
                    <Option key='1000'>1000</Option>
                </Select>
            </FormItem>
            <FormItem label="理由">
                {getFieldDecorator('reason', {
                    rules: [{ required: true, message: '请输入理由' }]
                }
                )(
                    <Input />
                )}
            </FormItem>
        </Form>;
        let formWithBoardMessage = <Form>
            <FormItem label="理由">
                {getFieldDecorator('reason', {
                    rules: [{ required: true, message: '请输入理由' }]
                }
                )(
                    <Input />
                )}
            </FormItem>
            <FormItem>
                <Select defaultValue={boards.length>0?boards[0].name:''} style={{ width: 120 }} onChange={this.handleBoardChange}>
                    {boardOptions}
                </Select>
                <Select style={{ marginLeft: "2rem", width: 120 }} onChange={this.onChildBoardChange}>
                    {childBoardOptions}
                </Select>

            </FormItem>
        </Form>;
        let formWithColorPicker = <Form>
            <FormItem>
                <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}
                >
                    Check all
          </Checkbox>
                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
            </FormItem>
            <FormItem label="天数">

                <Select value={this.state.days} onChange={this.onDaysChange}>
                    {this.state.current === '1' ? <Option key='0'>0</Option> : null}
                    <Option key='7'>7</Option>
                    <Option key='14'>14</Option>
                    <Option key='30'>30</Option>
                    <Option key='98'>98</Option>
                    <Option key='1000'>1000</Option>
                </Select>

            </FormItem>
            <FormItem label="理由">
                {getFieldDecorator('reason', {
                    rules: [{ required: true, message: '请输入理由' }]
                }
                )(
                    <Input />
                )}
            </FormItem>
            <FormItem label="颜色">
                <SketchPicker color={this.state.background}
                    onChangeComplete={this.handleChangeComplete}
                />
            </FormItem>
        </Form>;


        switch (this.state.current) {
            case '1':
                if (this.props.topicInfo.state === 1)
                    rcForm = formWithReason;
                else
                    rcForm = formWithDays;
                break;
            case '2':
                rcForm = formWithReason;
                break;
            case '3':
                rcForm = formWithReason;
                break;
            case '4':
                rcForm = formWithBoardMessage;
                break;
            case '5':
                rcForm = formWithReason;
                break;
            case '6':
                if (this.props.topicInfo.topState === 2)
                    rcForm = formWithReason;
                else
                    rcForm = formWithDays;
                break;
            case '7':
                if (this.props.topicInfo.topState === 4)
                    rcForm = formWithReason;
                else
                    rcForm = formWithDays;
                break;
            case '8':
                rcForm = formWithReason;
                break;
            case '9':
                rcForm = formWithColorPicker;
                break;
        }
        return (
            <Modal
                visible={visible}
                title="帖子管理"
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
                    style={{ display: "flex", marginBottom: "1rem", justifyContent: "space-around" }}
                >
                    <Item key="1">{this.props.topicInfo.state === 1 ? "解锁" : "锁定"}</Item>
                    <Item key="2">{this.props.topicInfo.disableHot ? "允许热门" : "禁止热门"}</Item>
                    <Item key="3">删除</Item>
                    <Item key="4">移动</Item>
                    <Item key="5">提升</Item>
                    <Item key="6">{this.props.topicInfo.topState === 2 ? "取消固顶" : "固顶"}</Item>
                    <Item key="7">{this.props.topicInfo.topState === 4 ? '取消全站固顶' : '全站固顶'}</Item>
                    <Item key="8">{this.props.topicInfo.bestState === 1 ? "解除精华" : "加精"}</Item>
                    <Item key="9">高亮</Item>
                </Menu>

                {rcForm}
            </Modal>
        )
    }
})