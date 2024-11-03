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
import Cookies from 'js-cookie';
import PrivateRoute from './PrivateRoute';

function Routing() {
  const [authCookie, setAuthCookie] = useState(null);

  useEffect(() => {
    // Obtener la cookie "AuthCookie"
    const cookieValue = Cookies.get('AuthCookie');
    setAuthCookie(cookieValue);
  }, []);
  console.log(authCookie);
  
  return (
    
    <div id='root'>
        <Router>
          <Routes>
            <Route path="/gui" element={<Login />} />
            {/* <Route path="/gui_home" element={<Home_Gui />} /> */}
            <Route path="/gui_home" element={<PrivateRoute> <Home_Gui /> </PrivateRoute>} />
            <Route path="/institutions" element={<HomeInstitutions />} />
            <Route path="/login" element={<Login2 />} />
            <Route path="/home_padres" element={<HomePadres />} />
            <Route path="/home_profesores" element={<HomeProfe />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </Router>
    </div>
  )
}
export default Routing