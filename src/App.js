import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Form from './pages/Forms';
import View from './pages/View';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/form' element={<Form />}></Route>
            <Route path='/view' element={<View />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
