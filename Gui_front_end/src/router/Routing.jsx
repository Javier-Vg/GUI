import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from '../page/LoginGui'


function Routing() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path="LoginGUI/" element={<Login />} />
           
          </Routes>
        </Router>
    </div>
  )
}

export default Routing