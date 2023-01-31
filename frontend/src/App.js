import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages & Components imports
import Navbar from './components/Navbar/Navbar';
import Task from './pages/Tasks/Task';
import NewTask from './pages/Tasks/NewTask';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='' element={<Navigate to={"/tasks"} />} />
          <Route path='/tasks' element={<Task />} />
          <Route path='/tasks/new' element={<NewTask/>}/>
        </Routes>
      </BrowserRouter>
    </>


  );
}