import { ReactMdeTypes, MarkdownUtil, DraftUtil } from "@cc98/hell-react-mde";
import { ButtonComponent } from "./ButtonComponent";
import * as Utility from '../../../Utility';
import * as React from 'react';
let url = "";
async function handleUpload(e) {
    url = await Utility.uploadEvent(e);
}
async function uploadAsync() {
    // $("#upload-files").click();
    $("#upload-files").change(async function (e) {
        url = await Utility.uploadEvent(e);
    })
}
const customCommand: ReactMdeTypes.Command = {
    buttonContentBuilder: ({ iconProvider }) =>
        <div>
            <label style={{ cursor: "pointer" }} htmlFor="upload-files"><i className={`fa fa-image`} /></label>
            <input type="file" id="upload-files" style={{ display: 'none ' }} onChange={handleUpload} />
        </div>,
    execute: async (state) => {
        localStorage.setItem("react-mde-imageurl-status", "start")
        console.log("in execute");
        const fun = () => new Promise((resolve) => {
            let stId = setInterval(() => {
                let urlTry = localStorage.getItem("react-mde-imageurl-status");
                console.log(urlTry);
                if (urlTry === "fail" || urlTry === "success") {
                    url = urlTry;
                    clearInterval(stId);
                    resolve(localStorage.getItem("react-mde-imageurl"));
                }
            }, 1000);
        })
        const v = await fun()
        console.log("in then b = " + v);
        const { text, selection } = DraftUtil.getMarkdownStateFromDraftState(state);
        console.log(text);
        console.log(selection);
        const { newText, insertionLength } = MarkdownUtil.insertText(text, "![", selection.start);
        const finalText = MarkdownUtil.insertText(newText, `](${v})`, selection.end + insertionLength).newText;
        return DraftUtil.buildNewDraftState(
            state,
            {
                text: finalText,
                selection: {
                    start: selection.start + insertionLength,
                    end: selection.end + insertionLength,
                },
            },
        );
    },
    buttonProps: {
        handleSubmit:
            (text) => {
                console.log("in handle submit" + text);
            }
    },
};
export default customCommand;