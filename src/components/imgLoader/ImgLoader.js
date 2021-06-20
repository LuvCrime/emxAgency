import React from "react";
import autoBind from "react-autobind";
import "./imgLoader.scss";
import { SaveImg } from "../SaveImgButton/SaveImgButton";

export class ImgLoader extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      start: null,
      end: null,
      arrows: [],
      color: "#000000",
    };
    autoBind(this);
  }

  canvasHeandler(e, type) {
    const canvas = document.createElement("canvas");
    canvas.classList.add("loaded-img");
    const context = canvas.getContext("2d");
    canvas.addEventListener("click", (e) => {
      const pos = this.getMousePos(canvas, e, image);
      if (this.state.start) {
        this.setState({
          arrows: this.state.arrows.concat({
            start: this.state.start,
            end: this.state.end,
            color: this.state.color,
          }),
          start: null,
          end: null,
        });
        return;
      }
      this.setState(
        {
          start: pos,
          end: pos,
        },
        () => {
          this.reRenderCanvas(context, image);
        }
      );
    });

    canvas.addEventListener("mousemove", (e) => {
      const pos = this.getMousePos(canvas, e, image);
      this.setState(
        {
          end: pos,
        },
        () => {
          this.reRenderCanvas(context, image);
        }
      );
    });

    const reader = new FileReader();
    const image = new Image();

    reader.onload = () => {
      image.src = reader.result;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        const selectedDiv = document.querySelector(".loader-wrapper");
        selectedDiv.appendChild(canvas);
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

  reRenderCanvas(context, image) {
    if (!this.state.start || !this.state.end) {
      return;
    }
    context.drawImage(image, 0, 0);

    this.drawLineWithArrows(
      this.state.start.x,
      this.state.start.y,
      this.state.end.x,
      this.state.end.y,
      5,
      8,
      false,
      true,
      context,
      this.state.color
    );

    this.state.arrows.forEach(({ start, end, color }) => {
      this.drawLineWithArrows(
        start.x,
        start.y,
        end.x,
        end.y,
        5,
        8,
        false,
        true,
        context,
        color
      );
    });
  }

  getMousePos(canvas, evt, image) {
    var rect = canvas.getBoundingClientRect();
    var k = image.width / canvas.clientWidth;
    return {
      x: (evt.clientX - rect.left) * k,
      y: (evt.clientY - rect.top) * k,
    };
  }

  // x0,y0: the line's starting point
  // x1,y1: the line's ending point
  // width: the distance the arrowhead perpendicularly extends away from the line
  // height: the distance the arrowhead extends backward from the endpoint
  // arrowStart: true/false directing to draw arrowhead at the line's starting point
  // arrowEnd: true/false directing to draw arrowhead at the line's ending point

  drawLineWithArrows(
    x0,
    y0,
    x1,
    y1,
    aWidth,
    aLength,
    arrowStart,
    arrowEnd,
    ctx,
    color
  ) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    var angle = Math.atan2(dy, dx);
    var length = Math.sqrt(dx * dx + dy * dy);

    ctx.translate(x0, y0);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    if (arrowStart) {
      ctx.moveTo(aLength, -aWidth);
      ctx.lineTo(0, 0);
      ctx.lineTo(aLength, aWidth);
    }
    if (arrowEnd) {
      ctx.moveTo(length - aLength, -aWidth);
      ctx.lineTo(length, 0);
      ctx.lineTo(length - aLength, aWidth);
    }
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  colorHandler(e) {
    this.setState({
      color: e.target.value,
    });
  }

  render() {
    return (
      <>
        <div className="content-wrapper">
          <div className="loader-wrapper">
            <span className="label-loader">
              Выберите файл или перетащите его сюда
            </span>
            <label className="custom-file-upload">
              <input
                className="drag-and-drope"
                type="file"
                onDrop={(e) => this.canvasHeandler(e, "onDrop")}
                onChange={(e) => this.canvasHeandler(e, "onChange")}
              />
            </label>

            <input
              type="color"
              id="head"
              name="head"
              value={this.state.color}
              onChange={(e) => this.colorHandler(e)}
            ></input>
          </div>
          <div className="save-buttons">
            <SaveImg title={"оригинал"} />
            <SaveImg title={"миниатюру"} />
          </div>
        </div>
      </>
    );
  }
}
