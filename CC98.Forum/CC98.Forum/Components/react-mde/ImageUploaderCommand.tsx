
import * as Utility from '../../Utility';
import * as React from 'react';
let url = "";
async function handleUpload(e, o) {
    url = await Utility.uploadEvent(e); 
    const instance = o.default.editor
    const text = `![](${url})\n\n`
    instance.setValue(text)
}

const customCommand = {
    buttonContentBuilder: ({ iconProvider }) =>
        <div>
            <label id='upload-label' style={{ cursor: "pointer", paddingBottom: "0.5rem", paddingTop: "0,5rem", paddingLeft: "1rem", paddingRight: "1rem" }} htmlFor="upload-files"><i className={`fa fa-image`} /></label>
            <input type="file" id="upload-files" style={{ display: 'none ' }} onChange={e => handleUpload(e, this)} />
        </div>,
    buttonProps: {
        handleSubmit:
            (text) => {
                console.log("in handle submit" + text);
            }
    },
    editor:null
};
export default customCommand;