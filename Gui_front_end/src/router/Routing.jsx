import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home_Gui from '../page/Home_Gui'
import HomeInstitutions from '../page/HomeInstitutions';
// import LoginRol from '../page/LoginRol';
import HomePadres from '../page/HomePadres.jsx';
import Error from '../component/error/error'
import HomeProfe from '../page/HomeProfe';
import Login2 from '../component/prueba/login'
import PrivateRoute from './PrivateRoute';

function Routing() {

  return (
    
    <div id='root'>
        <Router>
          <Routes>
            <Route path="/gui_home" element={<PrivateRoute> <Home_Gui /> </PrivateRoute>} />
            <Route path="/institutions" element={<PrivateRoute> <HomeInstitutions /> </PrivateRoute>} />
            <Route path="/home_padres" element={<PrivateRoute> <HomePadres /> </PrivateRoute>} />
            <Route path="/home_profesores" element={<PrivateRoute> <HomeProfe /> </PrivateRoute>} />


            <Route path="/" element={<Login2 />} />
            <Route path="/login" element={<Login2 />} />
            <Route path="/error" element={<Error />} />
            <Route path="/*" element={<Error />} />            
          </Routes>
        </Router>
    </div>
  )
}
export default Routing