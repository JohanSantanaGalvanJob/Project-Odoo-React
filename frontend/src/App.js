import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages & Components imports
import Navbar from './components/Navbar/Navbar';
import Task from './pages/Task';

export default function App() {
  return (
    <>
    <Navbar/>
      <BrowserRouter>
          <Routes>
            <Route path='/tareas' element={<Task />} />
            <Route path='/' element={"/tareas"} />
            <Route path="*" element={"/tareas"} />
          </Routes>
      </BrowserRouter>
    </>


  );
}