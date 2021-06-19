import React from "react";
import "./App.css";
import { ImgLoader } from "./components/imgLoader/ImgLoader";
import { SaveImg } from './components/SaveImg/SaveImg'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ImgLoader />
        <SaveImg title={'оригинал'}/>
        <SaveImg title={'миниатюру'}/>
      </div>
    );
  }
}

export default App;
