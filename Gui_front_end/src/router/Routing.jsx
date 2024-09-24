import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../page/LoginGui';
import HomeInstitutions from '../page/HomeInstitutions';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/login_gui" element={<Login />} />
        <Route path="/home-institutions" element={<HomeInstitutions />} />

      </Routes>
    </Router>
  );
}

export default Routing;
