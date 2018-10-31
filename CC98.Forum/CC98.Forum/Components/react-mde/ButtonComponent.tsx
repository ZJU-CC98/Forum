import * as React from 'react';
import * as Utility from '../../Utility';
export class ButtonComponent extends React.Component<any, any>{
  constructor(props) {
    super(props);
    //props.setValues(imagePlaceholder);
  }


  upload = async (e) => {
    const str = await Utility.uploadEvent(e);
    this.props.handleSubmit(str);
  }

  render() {
    return (
      <div style={{ marginTop: "3px" }}>
        <input type="file" id="upload-files" style={{ display: 'none ' }} onChange={this.upload} />
        <label style={{ cursor: "pointer" }} htmlFor="upload-files" ><i className="fa fa-header" /> </label>
      </div>
    )
  }
}
