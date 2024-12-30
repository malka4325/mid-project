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

function App() {
  return (
    <div className="App">
    {/* <Todos/> */}
{/* <Users/> */}
<Posts/>
    </div>
  );
}

export default App;

