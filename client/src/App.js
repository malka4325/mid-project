import logo from './logo.svg';
import './App.css';

import Todos from './Components/Todos/Todos';
import Users from './Components/Users/Users';
import AddTodo from './Components/Todos/AddTodo';
import OneTodo from './Components/Todos/OneTodo';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
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
                <Route path="/" element={<Nav />} >
                <Route path="/Home" element={<HomePage />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/users" element={<Users />} />
                <Route path="/todos" element={<Todos />} />
                </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;

