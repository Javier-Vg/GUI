import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from '../page/LoginGui'
import Home_Gui from '../page/Home_Gui'
import HomeInstitutions from '../page/HomeInstitutions';
// import LoginRol from '../page/LoginRol';
import HomePadres from '../page/Homepadres';
import Error from '../component/error/error'
import HomeProfe from '../page/HomeProfe';
import Login2 from '../component/prueba/login'

function Routing() {

  return (
    
    <div id='root'>
        <Router>
          <Routes>
            <Route path="/gui" element={<Login />} />
            <Route path="/gui_home" element={<Home_Gui />} />
            <Route path="/institutions" element={<HomeInstitutions />} />
            <Route path="/login" element={<Login2 />} />
            <Route path="/home_padres" element={<HomePadres />} />
            <Route path="/home_profesores" element={<HomeProfe />} />
            <Route path="/error" element={<Error />} />
            {/* <Route path="/login2" element={<Login2 />} /> */}
          </Routes>
        </Router>
    </div>
  )
}
export default Routing