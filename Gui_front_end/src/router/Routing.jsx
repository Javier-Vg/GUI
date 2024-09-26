import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from '../page/LoginGui'
import Home_Gui from '../page/Home_Gui'
import HomeInstitutions from '../page/HomeInstitutions';

function Routing() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path="LoginGUI/" element={<Login />} />
            <Route path="Gui/" element={<Home_Gui />} />
            <Route path="/home-institutions" element={<HomeInstitutions />} />
          </Routes>
        </Router>
    </div>
  )
}
export default Routing
