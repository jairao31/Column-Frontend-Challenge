import * as React from "react";
import * as ReactDOM from "react-dom";
import "./App.css";

import { Editor } from "@tinymce/tinymce-react";
import { getNewspaperContext, render, computePrice } from "./utils";

function App() {
  const [sampleState, setSampleState] = React.useState("Initial text?");
  const [finalRate, setFinalRate] = React.useState(0);
  const [previewText, setPreviewText] = React.useState("");

  React.useEffect(() => {
    console.log(getNewspaperContext());
  }, []);

  const editorRef = React.useRef(null);

  const log = () => {
    if (editorRef.current) {
      var div = document.createElement("div");
      div.innerHTML = editorRef.current.getContent();
      // console.log(editorRef.current.getContent());
      const text = editorRef.current.getContent().replace(/<[^>]+>/gi, "");
      // console.log(text);

      if (text === "") {
        setPreviewText(text);
        setFinalRate(0);
      } else {
        const wordList = text.split(" ");

        setPreviewText(text);
        let price = computePrice(getNewspaperContext().rate, wordList.length);
        setFinalRate(price);
      }
    }
  };

  const getFileWords = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsText(file);
    }
    reader.addEventListener(
      "load",
      () => {
        // this will then display a text file
        setSampleState(reader.result);
      },
      false
    );
  };

  const clear = () => {
    setSampleState("");
    setPreviewText("");
    setFinalRate(0);
  };

  return (
    <div className="main-container">
      <div>
        <div className="heading">
          <h1>Draft Notice</h1>
          <label className="upload-btn" htmlFor="file-upload">
            Upload File
          </label>
          <input
            id="file-upload"
            style={{ display: "none" }}
            onChange={getFileWords}
            type={"file"}
            name="file"
          />
        </div>
        <p>Copy and Paste notice content below, or upload a file</p>

        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={sampleState}
          init={{
            height: 500,
            width: 700,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              // "wordcount",
            ],
            toolbar:
              "undo redo " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button onClick={log}>Log editor content</button>
        <button onClick={clear}>Clear</button>
      </div>
      <div>
        <h1>Preview</h1>
        <img
          src={render(previewText).image}
          width={render(previewText).width}
          height={render(previewText).height}
        />
        <p>Expected Price: ${finalRate}</p>
        <br />
        <label htmlFor="column-wide">Columns Wide </label>
        <select name="column-wide" id="column-wide">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <br />
        <br />
        <label for="fname">First name:</label>
        <input type="text" id="fname" name="fname" />
        <br />
      </div>
    </div>
  );
}

export default App;
