import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './Registration';
import Thanks from './Thanks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
