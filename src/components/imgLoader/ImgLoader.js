import React from "react";
import autoBind from "react-autobind";
import "./imgLoader.scss";
import { SaveImg } from "../SaveImgButton/SaveImgButton";

export class ImgLoader extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    autoBind(this);
  }

  canvasHeandler(e, type) {
    const canvas = document.createElement("canvas");
    canvas.classList.add("loaded-img");
    const reader = new FileReader();
    const image = new Image();

    reader.onload = () => {
      image.src = reader.result;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        const selectedDiv = document.querySelector(".content-wrapper");
        selectedDiv.appendChild(canvas);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
      };
      if (type === "onDrop") {
        reader.readAsDataURL(e.dataTransfer.files[0]);
      }
    };
    if (type !== "onDrop") {
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  render() {
    return (
      <>
        <div className="content-wrapper">
        <span className="label-loader">
            Выберите файл или перетащите его сюда
          </span>
          <label class="custom-file-upload">
            <input
              className="drag-and-drope"
              type="file"
              onDrop={(e) => this.canvasHeandler(e, "onDrop")}
              onChange={(e) => this.canvasHeandler(e, "onChange")}
            />
          </label>
        </div>
        <div className="save-buttons">
          <SaveImg title={"оригинал"} />
          <SaveImg title={"миниатюру"} />
        </div>
      </>
    );
  }
}
