import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';

import Teacher from './Teacher';
import Student from './Student';
import StudentLayout from './layout/StudentLayout';
import { LayoutProvider } from './context/LayoutContext';
import JoinPage from './JoinPage';

function App() {
  return (
    <div className="App">
      <LayoutProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/c/:roomId' element={<Teacher />} />
            <Route path='/j/:roomId' element={<JoinPage />} />
            <Route path='/room/:roomId' element={<Student />} />
          </Routes>
        </BrowserRouter>
      </LayoutProvider>
    </div>
    
  );
}

export default App;
