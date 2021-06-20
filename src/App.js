import React from "react";
import "./App.css";
import { ImgLoader } from "./components/imgLoader/ImgLoader";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ImgLoader />
      </div>
    );
  }
}

export default App;
