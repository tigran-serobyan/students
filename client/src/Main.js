import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Students from './Students';
import NewStudent from './NewStudent';
import EditStudent from './EditStudent';

function Main() {
  return (
    <main>
      <div class="messages"></div>
      <Routes>
        <Route path='/' element={<Students />}></Route>
        <Route path='/new' element={<NewStudent />}></Route>
        <Route path='/student/:username' element={<EditStudent />}></Route>
      </Routes>
    </main>
  );
}

export default Main;
