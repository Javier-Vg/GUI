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