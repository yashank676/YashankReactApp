import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';

import Stage1 from "./components/stage_1";
import Stage2 from "./components/stage_2";
import { MyContext } from "./context"


class App extends React.Component{
  
  static contextType = MyContext;
  
  render()
  {
    return (
      <div className="wrapper">
        <div className="center-wrapper">
          <h1>Who Pays the bill ?</h1>
          {
            this.context.state.stage === 1 ?
            <Stage1/>
            :
            <Stage2/>
          }
        </div>
      </div>
    );
  }

}

export default App;
