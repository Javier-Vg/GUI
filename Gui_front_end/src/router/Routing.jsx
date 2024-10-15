import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from '../page/LoginGui'
import Home_Gui from '../page/Home_Gui'
import HomeInstitutions from '../page/HomeInstitutions';
import LoginRol from '../page/LoginRol';
import HomePadres from '../page/Homepadres';
import Error from '../component/error/error'
import HomeProfe from '../page/HomeProfe';

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
            <Route path="/home_profesores" element={<HomeProfe />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </Router>
    </div>
  )
}
export default Routing