import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages & Components imports
import Navbar from './components/Navbar/Navbar';
import Tasks from './pages/Tasks/Tasks';
import AddTask from './pages/Tasks/AddTask';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='' element={<Navigate to={"/tasks"} />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/tasks/new' element={<AddTask/>}/>
        </Routes>
      </BrowserRouter>
    </>


  );
}