// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from "react";
import { FocusTopicArea } from "./FocusTopicArea";
import * as Utility from "../../Utility";
/**
 * 表示我关注的版面的主题列表
 */
export class FocusUserArea extends React.Component {
  componentDidMount() {
    $("#myFocusBoard").removeClass("focus-title-hover");
    $("#myFocusFavorite").removeClass("focus-title-hover");
    $("#myFocusUser").addClass("focus-title-hover");
  }

  render() {

    return (
      <div>
        <FocusTopicArea id={-1} name="关注用户" />
      </div>
    );
  }
}
