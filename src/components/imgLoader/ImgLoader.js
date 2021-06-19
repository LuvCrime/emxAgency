import React from "react";
import autoBind from 'react-autobind';

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
          document.body.appendChild(canvas);
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
        <div className="App">
          <input
            className="drag-and-drope"
            type="file"
            onDrop={(e) => this.canvasHeandler(e, "onDrop")}
            onChange={(e) => this.canvasHeandler(e, "onChange")}
          />
        </div>
      );
    }
  }