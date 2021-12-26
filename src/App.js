import './App.css';
import MakeList from "./Common/Components/MakeList/List";
import Edit from "./Common/Components/MakeList/Edit";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1><Link to="/" className='link'>Lista proizvođača</Link></h1>
          <h1>Link2</h1>
        </header>
        <div className="content">
            <Routes>
              <Route path = "/" element={<MakeList/>}/>
              <Route path = "/editMake" element={<Edit/>}/>
            </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;