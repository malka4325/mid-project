
import './App.css';

import Todos from './Components/Todos/Todos';
import Users from './Components/Users/Users';

import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './index.css';
import './flags.css';
import Posts from './Components/Posts/Posts';
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';

function App() {
  return (
    <div className="App">

<Router>
  
            <Routes>
            <Route path="/" element={<HomePage />} />
                <Route path="/nav" element={<Nav />} >
                <Route path="/nav/posts" element={<Posts />} />
                <Route path="/nav/users" element={<Users />} />
                <Route path="/nav/todos" element={<Todos />} />
                </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;

