import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/NotesState';

import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';

function App() {
  return (
    <NoteState>
    <BrowserRouter>
      <Navbar />
      <div className='container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
      </div>
    </BrowserRouter>
    </NoteState>
  );
}


export default App;
