import './App.css';
import Edit from "./Pages/Make/Components/Edit";
import MakeHome from './Pages/Make/Components/MakeHome';
import ModelHome from './Pages/Model/Components/ModelHome';
import EditModel from './Pages/Model/Components/EditModel';
import { Provider } from "mobx-react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import React from 'react';

class App extends React.Component{
  render(){
    return (
      <div className="App">
          <Provider>
            <Router>
              <header className="App-header">
                <h1><Link to="/" className='link' >Make list</Link></h1>
                <h1><Link to="/models" className="link">Model list</Link></h1>
              </header>
              <div className="content">
                  <Routes>
                    <Route path = "/" element={<MakeHome/>}/>
                    <Route path = "/editMake/:id" element={<Edit/>}/>
                    
                    <Route path = "/models" element={<ModelHome/>}/>
                    <Route path = "/models/:id" element={<EditModel/>} />
                  </Routes>
              </div>
            </Router>
          </Provider>
      </div>
    )  
  }
}
export default App;

