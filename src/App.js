import './App.css';
import List from "./Components/List";
import Edit from "./Pages/Make/Components/Edit";
import Store from './Common/Stores/Store';
import MakeHome from './Pages/Make/Components/MakeHome';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const updateState = () => {
    Store.setRunOnce();
  }
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1><Link to="/" className='link' onClick={updateState}>Lista proizvođača</Link></h1>
        </header>
        <div className="content">
            <Routes>
              <Route path = "/" element={<MakeHome/>}/>
              <Route path = "/editMake/:id" element={<Edit/>}/> 
            </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
