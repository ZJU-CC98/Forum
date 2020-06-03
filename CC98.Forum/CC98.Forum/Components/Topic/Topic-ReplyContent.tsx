import * as React from "react";
import * as Utility from "../../Utility";
import  AwardInfo  from "./Topic-AwardInfo";
import { RouteComponent } from "../RouteComponent";
import { PostManagement } from "./Topic-PostManagement";
import { UbbContainer } from "../UbbContainer";
import { UbbCodeOptions } from "../../Ubb/UbbCodeExtension";
import { VoteContent, voteInfo } from "./VoteInfo";
import { Tag } from "antd";
var remark = require("remark");
var reactRenderer = require("remark-react");
const showdown = require("showdown"),
  showdownExtension = require("showdown-xss-filter");
interface Props {
  postId;
  content;
  contentType;
  topicInfo;
  floor: number;
}
export class ReplyContent extends React.Component<
  Props,
  { postId; vote: voteInfo }
> {
  constructor(props, content) {
    super(props, content);

    this.state = {
      postId: this.props.postId,
      vote: null,
    };

    this.getVote = this.getVote.bind(this);
  }

  // async componentWillReceiveProps(newProps){
  //   console.log('----------')
  //   const domId = `doc-content${newProps.postId}`;
  //   let parseContent = newProps.content.replace(/\n>[\s\S]*?\n\n/g, (v) => v.replace(/\n[^\n](?!>)/g, (v1) => v1.replace(/\n(?!>)/, '\n>')));
  //   if (parseContent[0] === '>') {
  //     const index = parseContent.indexOf('\n\n');
  //     if (index === -1) {
  //       parseContent = parseContent.replace(/\n[^\n](?!>)/g, (v1) => v1.replace(/\n(?!>)/, '\n>'));
  //     } else {
  //       const substr = parseContent.substr(0, index);
  //       parseContent = substr.replace(/\n[^\n](?!>)/g, (v1) => v1.replace(/\n(?!>)/, '\n>')) + parseContent.substr(index + 1, parseContent.length);
  //     }
  //   }
  //   parseContent = parseContent.replace(/发言：\*\*\n/g, "发言：**\n\n");
  //   const converter = new showdown.Converter({ extensions: [showdownExtension] });
  //   converter.setOption('tables',true);
  //   const html = converter.makeHtml(parseContent)
  //   if (document.getElementById(domId)) {
  //     document.getElementById(domId).innerHTML = html
  //   }
  //   if (newProps.floor === 1 && newProps.topicInfo.isVote && !this.state.vote) this.getVote();
  // }
  async componentDidMount() {
    const domId = `doc-content${this.props.postId}-${this.props.floor}`;
    let parseContent = this.props.content.replace(/\n>[\s\S]*?\n\n/g, (v) =>
      v.replace(/\n[^\n](?!>)/g, (v1) => v1.replace(/\n(?!>)/, "\n>"))
    );
    if (parseContent[0] === ">") {
      const index = parseContent.indexOf("\n\n");
      if (index === -1) {
        parseContent = parseContent.replace(/\n[^\n](?!>)/g, (v1) =>
          v1.replace(/\n(?!>)/, "\n>")
        );
      } else {
        const substr = parseContent.substr(0, index);
        parseContent =
          substr.replace(/\n[^\n](?!>)/g, (v1) =>
            v1.replace(/\n(?!>)/, "\n>")
          ) + parseContent.substr(index + 1, parseContent.length);
      }
    }
    parseContent = parseContent.replace(/发言：\*\*\n/g, "发言：**\n\n");
    const converter = new showdown.Converter({
      extensions: [showdownExtension],
    });
    converter.setOption("tables", true);
    const html = converter.makeHtml(parseContent);
    if (document.getElementById(domId)) {
      document.getElementById(domId).innerHTML = html;
    }
    if (
      this.props.floor === 1 &&
      this.props.topicInfo.isVote &&
      !this.state.vote
    )
      this.getVote();
    // const divid = `doc-content${this.props.postId}`;
    // editormd.markdownToHTML(divid, {
    //     htmlDecode: false,
    //     emoji: true,
    //     taskList: true,
    //     tex: true,
    //     flowChart: true,
    //     sequenceDiagram: true,
    //     codeFold: true,
    // });
  }

  // componentDidUpdate() {
  //     const divid = `doc-content${this.props.postId}`;
  //     editormd.markdownToHTML(divid, {
  //         htmlDecode: false,
  //         emoji: true,
  //         taskList: true,
  //         tex: true,
  //         flowChart: true,
  //         sequenceDiagram: true,
  //         codeFold: true,
  //     });
  // }
  async getVote() {
    try {
      let headers = await Utility.formAuthorizeHeader();
      let res = await Utility.cc98Fetch(
        `/topic/${this.props.topicInfo.id}/vote`,
        {
          headers,
        }
      );
      let vote: voteInfo = await res.json();
      this.setState({
        vote,
      });
    } catch (e) {}
  }

  render() {
    const domId = `doc-content${this.props.postId}-${this.props.floor}`;
    let ubbUrlContent = Utility.atUserUbbUrl(this.props.content);
    const ubbMode = (
      <UbbContainer
        code={ubbUrlContent}
        options={{ ...new UbbCodeOptions(), allowToolbox: true }}
      />
    );
    let mdUrlContent = Utility.atUserMdUrl(this.props.content);
    const mdMode = (
      <div className="markdown-container mde-preview">
        <div id={domId} className="mde-preview-content"></div>
        {/* {remark().use(reactRenderer).processSync(parseContent).contents} */}
      </div>
    );
    // const mdMode = <div id={domId}>
    // <textarea name="editormd-markdown-doc" style={{ display: 'none' }}>{mdUrlContent}</textarea>
    // </div>;
    let content;
    //ubb
    content = ubbMode;
    //md
    if (this.props.contentType === 1) {
      content = mdMode;
    }

    return (
      <div className="reply-content">
        {this.state.vote ? (
          <VoteContent
            topicInfo={this.props.topicInfo}
            getInfo={this.getVote}
            voteInfo={this.state.vote}
          />
        ) : null}
        <div
          style={{
            alignSelf: "center",
            marginTop: "1rem",
            marginBottom: "-1rem",
          }}
        >
          {this.props.topicInfo.isAnonymous &&
            this.props.topicInfo.todayCount > 3 && this.props.floor === 1 && (
              <Tag>
                该用户今日在本版发布了{this.props.topicInfo.todayCount}个主题帖
              </Tag>
            )}
        </div>
        <div className="substance">{content}</div>
      </div>
    );
  }
}
