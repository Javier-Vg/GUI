import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from '../page/LoginGui'
import Home_Gui from '../page/Home_Gui'
import HomeInstitutions from '../page/HomeInstitutions';
import LoginRol from '../page/LoginRol';
import HomePadres from '../page/Homepadres';

function Routing() {

  return (
    
    <div id='root'>
        <Router>
          <Routes>
            <Route path="/gui" element={<Login />} />
            <Route path="/gui_home" element={<Home_Gui />} />
            <Route path="/institutions" element={<HomeInstitutions />} />
            <Route path="/login" element={<LoginRol />} />
            <Route path="/home_padres" element={<HomePadres />} />
          </Routes>
        </Router>
    </div>
  )
}
export default Routing