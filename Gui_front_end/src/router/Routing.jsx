import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from '../page/LoginGui'
import Home_Gui from '../page/Home_Gui'
import HomeInstitutions from '../page/HomeInstitutions';
import LoginRol from '../page/LoginRol';

function Routing() {

  return (
    
    <div id='root'>
        <Router>
          <Routes>
            <Route path="/Gui" element={<Login />} />
            <Route path="/Gui_home" element={<Home_Gui />} />
            <Route path="/Institutions" element={<HomeInstitutions />} />
            <Route path="/Login" element={<LoginRol />} />
          </Routes>
        </Router>
    </div>
  )
}
export default Routing
