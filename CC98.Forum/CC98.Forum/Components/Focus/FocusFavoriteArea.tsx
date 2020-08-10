import * as React from "react";
import { FocusTopicArea } from "./FocusTopicArea";
import * as Utility from "../../Utility";
/**
 * 表示我收藏的版面的主题列表
 */
export class FocusFavoriteArea extends React.Component {
  componentDidMount() {
    $("#myFocusBoard").removeClass("focus-title-hover");
    $("#myFocusUser").removeClass("focus-title-hover");
    $("#myFocusFavorite").addClass("focus-title-hover");
  }

  render() {
    return (
      <div>
        <FocusTopicArea id={-2} name="收藏主题" />
      </div>
    );
  }
}
