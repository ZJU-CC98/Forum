import * as React from "react";
import Modal from "antd/es/modal";
import Form from "antd/es/form";
import Menu from "antd/es/menu";
import AutoComplete from "antd/es/auto-complete";
import InputNumber from "antd/es/input-number";
import * as Utility from "../../Utility";
import Select from "antd/es/select";
import Checkbox from "antd/es/checkbox";
import { SketchPicker } from "react-color";
import { FormComponentProps } from "antd/es/form";
import Carousel from "antd/es/carousel";
import { setLocalStorage, getLocalStorage } from "../../Utility/storageUtility";
import { getLockReasonPresets, matchesLockReasonPreset } from "../../Utility/lockReasonPresets";
const FormItem = Form.Item;
const Option = Select.Option;
const Item = Menu.Item;
const CheckboxGroup = Checkbox.Group;

/**
 * 理由历史缓存（与小程序版 modalReasonOptions 同构）：
 * Record<string, string[]>，外层 key 为操作类型（lock/unlock/deleteTopic...），
 * 内层为该操作的历史理由，按「最老 -> 最新」排列。
 */
const REASON_HISTORY_KEY = "modalReasonOptions";
/** 每个操作最多保存的历史理由条数 */
const MAX_REASON_HISTORY = 15;

/** 读取某个操作的历史理由（含防御性清洗，脏数据一律忽略） */
function getReasonHistory(key: string): string[] {
  if (!key) return [];
  const map: any = getLocalStorage(REASON_HISTORY_KEY);
  if (!map || typeof map !== "object" || Array.isArray(map)) return [];
  const arr = map[key];
  if (!Array.isArray(arr)) return [];
  return arr
    .filter((item) => typeof item === "string" && item.length > 0)
    .slice(-MAX_REASON_HISTORY);
}

/** 保存某个操作使用的理由：已存在则移到最新处，超出上限时删除最老的 */
function saveReasonHistory(key: string, reason: string): void {
  if (!key) return;
  const value = (reason || "").trim();
  if (value.length === 0) return;
  const map: any = getLocalStorage(REASON_HISTORY_KEY) || {};
  if (typeof map !== "object" || Array.isArray(map)) return;
  const options = Array.isArray(map[key])
    ? map[key].filter((item) => typeof item === "string" && item !== value)
    : [];
  options.push(value);
  while (options.length > MAX_REASON_HISTORY) {
    options.shift();
  }
  map[key] = options;
  setLocalStorage(REASON_HISTORY_KEY, map);
}

/**
 * 控件属性。
 */
interface FormProps extends FormComponentProps<any> {
  visible;
  onCancel;
  topicInfo;
  update;
  boardId;
  /**
   * 是否为管理员模式。
   */
  isManager: boolean;
  /**
   * 允许的属性列表。
   */
  permissions: string[];
}
interface FormStates {
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
const plainOptions = ["加粗", "斜体"];
const defaultCheckedList = [];
export default Form.create<FormProps>()(
  class extends React.Component<FormProps, FormStates> {
    constructor(props) {
      super(props);
      this.state = {
        current: "1",
        option: "",
        childBoard: "似水流年",
        childBoards: [
          { name: "似水流年", id: 758 },
          { name: "心灵之约", id: 182 },
          { name: "论坛指南", id: 184 },
        ],
        background: "#fff",
        checkedList: [],
        indeterminate: true,
        checkAll: false,
        days: 0,
        boardsData: [],
      };
    }
    onCreate = () => {
      const form = this.props.form;
      form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        //Select tags 模式的值是数组：取最后一个非空项；兜底用已输入但未回车的文本
        let reason = Array.isArray(values.reason)
          ? values.reason
              .filter((item: string) => typeof item === "string" && item.trim() !== "")
              .pop() || ""
          : values.reason || "";
        if ((reason || "").trim() === "" && this.reasonSearchText.trim() !== "") {
          reason = this.reasonSearchText.trim();
        }
        const reasonKey = this.getReasonKey();
        let days = parseInt(this.state.days);
        let status = "ok";
        switch (this.state.current) {
          //锁定
          case "1":
            //解锁
            if (this.props.topicInfo.state === 1) {
              status = await Utility.unLockTopic(
                this.props.topicInfo.id,
                this.props.boardId,
                reason
              );
            }
            //锁定
            else {
              status = await Utility.lockTopic(
                this.props.topicInfo.id,
                this.props.boardId,
                reason,
                days
              );
            }
            break;
          //热门
          case "2":
            //允许热门
            if (this.props.topicInfo.disableHot) {
              status = await Utility.cancelDisableHot(
                this.props.topicInfo.id,
                reason
              );
            }
            //禁止热门
            else {
              status = await Utility.setDisableHot(
                this.props.topicInfo.id,
                reason
              );
            }
            break;
          //删除
          case "3":
            status = await Utility.deleteTopic(this.props.topicInfo.id, reason);
            break;
          //移动
          case "4":
            status = await Utility.moveTopic(
              this.props.topicInfo.id,
              this.state.childBoard,
              reason
            );
            break;
          //提升
          case "5":
            status = await Utility.upTopic(
              this.props.topicInfo.id,
              this.props.boardId,
              reason
            );
            break;
          //固顶
          case "6":
            //取消固顶
            if (this.props.topicInfo.topState === 2) {
              status = await Utility.removeBoardTopTopic(
                this.props.topicInfo.id,
                this.props.boardId,
                reason
              );
            }
            //固顶
            else {
              status = await Utility.addBoardTopTopic(
                this.props.topicInfo.id,
                this.props.boardId,
                2,
                days,
                reason
              );
            }
            break;
          //全站固顶
          case "7":
            //取消全站固顶
            if (this.props.topicInfo.topState === 4) {
              status = await Utility.removeBoardTopTopic(
                this.props.topicInfo.id,
                this.props.boardId,
                reason
              );
            }
            //全站固顶
            else {
              status = await Utility.addBoardTopTopic(
                this.props.topicInfo.id,
                this.props.boardId,
                4,
                days,
                reason
              );
            }
            break;
          //加精
          case "8":
            //解除加精
            if (this.props.topicInfo.bestState === 1) {
              status = await Utility.cancelBestTopic(
                this.props.topicInfo.id,
                reason
              );
            }
            //加精
            else {
              status = await Utility.setBestTopic(
                this.props.topicInfo.id,
                reason
              );
            }
            break;
          //高亮
          case "9":
            let isBold = false,
              isItalic = false;
            for (let i of this.state.checkedList) {
              if (i === "加粗") isBold = true;
              if (i === "斜体") isItalic = true;
            }
            await Utility.setHighlight(
              this.props.topicInfo.id,
              isBold,
              isItalic,
              this.state.background,
              days,
              reason
            );
            break;
        }
        if (status === "ok") {
          //操作成功后才记入理由历史；锁定时与预置一致的理由不入缓存（与小程序版一致）
          const isPreset =
            reasonKey === "lock" &&
            matchesLockReasonPreset(reason, this.props.boardId);
          if (!isPreset) {
            saveReasonHistory(reasonKey, reason);
          }
          this.props.update();
          this.props.onCancel();
        } else {
          alert("操作失败");
        }
      });
    };
    handleChangeComplete = (color) => {
      this.setState({ background: color.hex });
    };
    /** 理由下拉框中已输入但尚未回车的文本（确认时兜底收集，避免丢字） */
    reasonSearchText = "";
    /** 当前操作对应的理由历史 key */
    getReasonKey = () => {
      switch (this.state.current) {
        case "1":
          return this.props.topicInfo.state === 1 ? "unlock" : "lock";
        case "2":
          return "hot";
        case "3":
          return "deleteTopic";
        case "4":
          return "moveTopic";
        case "5":
          return "promote";
        case "6":
        case "7":
          return "top";
        case "8":
          return "best";
        case "9":
          return "highlight";
        default:
          return "topicManage";
      }
    };
    /**
     * 理由输入项：文本输入框（AutoComplete），点选候选后整体替换为完整理由文本，
     * 与小程序版一致——候选列表显示简称，插入的完整文本可继续编辑（如填写「【】」占位）。
     * 预置分组仅在锁定操作时展示；非锁定操作只展示历史。
     */
    reasonFormItem = () => {
      const { getFieldDecorator } = this.props.form;
      const history = getReasonHistory(this.getReasonKey());
      const presets =
        this.state.current === "1" && this.props.topicInfo.state !== 1
          ? getLockReasonPresets(this.props.boardId)
          : null;
      const groups: React.ReactNode[] = [];
      if (history.length > 0) {
        groups.push(
          <Select.OptGroup key="history" label="历史填入">
            {history.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select.OptGroup>
        );
      }
      if (presets && presets.board.length > 0) {
        groups.push(
          <Select.OptGroup key="board" label="本版预置">
            {presets.board.map((preset) => (
              <Option key={preset.label} value={preset.content}>
                {preset.label}
              </Option>
            ))}
          </Select.OptGroup>
        );
      }
      if (presets) {
        groups.push(
          <Select.OptGroup key="general" label="通用预置">
            {presets.general.map((preset) => (
              <Option key={preset.label} value={preset.content}>
                {preset.label}
              </Option>
            ))}
          </Select.OptGroup>
        );
      }
      return (
        <FormItem label="理由">
          {getFieldDecorator("reason", {
            initialValue: "",
            rules: [{ required: true, message: "请输入理由" }],
          })(
            <AutoComplete
              style={{ width: "100%" }}
              dropdownMatchSelectWidth={false}
              filterOption={false}
              optionLabelProp="value"
              placeholder="可输入理由，或从候选中选择"
              onSearch={(v) => {
                this.reasonSearchText = v;
              }}
            >
              {/* antd3 AutoComplete 的 children 类型声明未覆盖 OptGroup 数组，运行时直通 rc-select 支持 */}
              {groups as any}
            </AutoComplete>
          )}
        </FormItem>
      );
    };
    handleBoardChange = (value) => {
      const boardId = value;
      let boardsInfo = this.state.boardsData;
      for (let board of boardsInfo) {
        if (board.id == boardId) {
          this.setState({
            childBoards: board.boards,
            childBoard: board.boards[0].name,
          });
          break;
        }
      }
    };
    onDaysChange = (value) => {
      this.setState({
        days: value,
      });
    };
    onChildBoardChange = (value) => {
      this.setState({
        childBoard: value,
      });
    };
    handleClick = (e) => {
      console.log("click ", e);
      //切换操作类型时清掉上一步留下的理由输入与未回车文本
      this.reasonSearchText = "";
      this.props.form.resetFields();
      this.setState({
        current: e.key,
      });
    };
    onChange = (checkedList) => {
      this.setState({
        checkedList,
        indeterminate:
          !!checkedList.length && checkedList.length < plainOptions.length,
        checkAll: checkedList.length === plainOptions.length,
      });
    };

    onCheckAllChange = (e) => {
      this.setState({
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    };

    async componentDidMount() {
      let prevBoards = localStorage.getItem("boardsInfo");
      if (prevBoards) {
        if (prevBoards.indexOf("obj-") !== 0) {
          localStorage.removeItem("boardsInfo");
        }
      }
      const boardsData = await Utility.getBoards();
      this.setState({ boardsData });
    }

    render() {
      let boards = this.state.boardsData;
      let childBoards = this.state.childBoards;
      console.log(childBoards);
      const boardOptions = boards.map((board) => (
        <Option key={board.id}>{board.name}</Option>
      ));
      const childBoardOptions = this.state.childBoards.map((board) => {
        if (board.id !== 182) {
          return <Option key={board.id}>{board.name}</Option>;
        } else return null;
      });

      let rcForm = null;
      const { visible, onCancel } = this.props;
      const { getFieldDecorator } = this.props.form;

      let formWithReason = (
        <Form>
          {this.reasonFormItem()}
        </Form>
      );
      let formWithDays = (
        <Form>
          <FormItem label="天数">
            <Select value={this.state.days} onChange={this.onDaysChange}>
              {this.state.current === "1" ? <Option key="0">0</Option> : null}
              <Option key="7">7</Option>
              <Option key="14">14</Option>
              <Option key="30">30</Option>
              <Option key="98">98</Option>
              <Option key="180">180</Option>
              <Option key="365">365</Option>
              <Option key="1000">1000</Option>
              <Option key="10000">10000 (作为永久使用)</Option>
            </Select>
          </FormItem>
          {this.reasonFormItem()}
        </Form>
      );
      let formWithBoardMessage = (
        <Form>
          {this.reasonFormItem()}
          <FormItem>
            <Select
              defaultValue={boards.length > 0 ? boards[0].name : ""}
              style={{ width: 120 }}
              onChange={this.handleBoardChange}
            >
              {boardOptions}
            </Select>
            <Select
              defaultValue={childBoards.length > 0 ? childBoards[0].name : ""}
              style={{ marginLeft: "2rem", width: 120 }}
              onChange={this.onChildBoardChange}
              key={childBoards.length > 0 ? childBoards[0].name : ""}
            >
              {childBoardOptions}
            </Select>
          </FormItem>
        </Form>
      );
      let formWithColorPicker = (
        <Form>
          <FormItem>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
            >
              Check all
            </Checkbox>
            <CheckboxGroup
              options={plainOptions}
              value={this.state.checkedList}
              onChange={this.onChange}
            />
          </FormItem>
          <FormItem label="天数">
            <Select value={this.state.days} onChange={this.onDaysChange}>
              {this.state.current === "1" ? <Option key="0">0</Option> : null}
              <Option key="7">7</Option>
              <Option key="14">14</Option>
              <Option key="30">30</Option>
              <Option key="98">98</Option>
              <Option key="180">180</Option>
              <Option key="365">365</Option>
              <Option key="1000">1000</Option>
              <Option key="10000">10000 (作为永久使用)</Option>
            </Select>
          </FormItem>
          {this.reasonFormItem()}
          <FormItem label="颜色">
            <SketchPicker
              color={this.state.background}
              onChangeComplete={this.handleChangeComplete}
            />
          </FormItem>
        </Form>
      );

      switch (this.state.current) {
        case "1":
          if (this.props.topicInfo.state === 1) rcForm = formWithReason;
          else rcForm = formWithDays;
          break;
        case "2":
          rcForm = formWithReason;
          break;
        case "3":
          rcForm = formWithReason;
          break;
        case "4":
          rcForm = formWithBoardMessage;
          break;
        case "5":
          rcForm = formWithReason;
          break;
        case "6":
          if (this.props.topicInfo.topState === 2) rcForm = formWithReason;
          else rcForm = formWithDays;
          break;
        case "7":
          if (this.props.topicInfo.topState === 4) rcForm = formWithReason;
          else rcForm = formWithDays;
          break;
        case "8":
          rcForm = formWithReason;
          break;
        case "9":
          rcForm = formWithColorPicker;
          break;
      }
      return (
        <Modal
          visible={this.props.visible}
          title="帖子管理"
          okText="确认"
          cancelText="取消"
          onOk={this.onCreate}
          onCancel={onCancel}
          width={"50rem"}
          maskClosable={false}
        >
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{
              display: "flex",
              marginBottom: "1rem",
              justifyContent: "space-around",
            }}
          >
            <Item key="1">
              {this.props.topicInfo.state === 1 ? "解锁" : "锁定"}
            </Item>
            <Item key="2">
              {this.props.topicInfo.disableHot ? "允许热门" : "禁止热门"}
            </Item>
            <Item key="3">删除</Item>
            <Item key="4">移动</Item>
            <Item key="5">提升</Item>
            <Item key="6">
              {this.props.topicInfo.topState === 2 ? "取消固顶" : "固顶"}
            </Item>
            <Item key="7">
              {this.props.topicInfo.topState === 4
                ? "取消全站固顶"
                : "全站固顶"}
            </Item>
            <Item key="8">
              {this.props.topicInfo.bestState === 1 ? "解除精华" : "加精"}
            </Item>
            <Item key="9">高亮</Item>
          </Menu>

          {rcForm}
        </Modal>
      );
    }
  }
);
