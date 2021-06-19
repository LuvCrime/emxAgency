import React from "react";
import autoBind from "react-autobind";

export class SaveImg extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onImgSave(imgSize) {
    const canvasSave = document.querySelector(".loaded-img");
    if (canvasSave === null) {
      return;
    }
    if (imgSize === "оригинал") {
      this.downloadCanvas(canvasSave);
    } else {
      this.resizeImg(canvasSave).then((canvas) => {
        this.downloadCanvas(canvas);
      });
    }
  }

  downloadCanvas(canvas) {
    window.location.href = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
  }

  resizeImg(img) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = Math.min(200, img.width);
    canvas.height = canvas.width * (img.height / img.width);
    return createImageBitmap(img, {
      resizeWidth: canvas.width,
      resizeHeight: canvas.height,
      resizeQuality: "high",
    }).then((imageBitmap) => {
      context.drawImage(imageBitmap, 0, 0);
      return canvas;
    });
  }

  render() {
    return (
      <button
        to="#"
        className="save-button"
        onClick={(e) => this.onImgSave(this.props.title)}
      >
        Скачать {this.props.title}
      </button>
    );
  }
}
