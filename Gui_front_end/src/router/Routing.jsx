<<<<<<< HEAD
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
=======
import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from '../page/LoginGui'
import Home_Gui from '../page/Home_Gui'
function Routing() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path="LoginGUI/" element={<Login />} />
            <Route path="Gui/" element={<Home_Gui />} />
          </Routes>
        </Router>
    </div>
  )
}
export default Routing
>>>>>>> e2fba4107e621ec69022b7688724e936c2f03699
