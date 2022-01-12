import './App.css';
import Edit from "./Pages/Make/Components/Edit";
import MakeHome from './Pages/Make/Components/MakeHome';
import ModelHome from './Pages/Model/Components/ModelHome';
import EditModel from './Pages/Model/Components/EditModel';
import MakeStore from './Pages/Make/Stores/MakeStore';
import ModelStore from './Pages/Model/Stores/ModelStore';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  const updateState = () => {
    if(MakeStore.runOnce === true){
      MakeStore.setRunOnce();
    }
    if(ModelStore.runOnce === true){
      ModelStore.setRunOnce();
    }
    
  }
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1><Link to="/" className='link' onClick={updateState}>Make list</Link></h1>
          <h1><Link to="/models" className="link"onClick={updateState}>Model list</Link></h1>
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
    </div>
  );
}

export default App;
