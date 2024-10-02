import React from 'react'
import { getStaff } from '../../service/LoginGui'
function listStaff() {
    const [staff, setStaff] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const [selectedStudent, setSelectedStaff] = useState(null);
 
    useEffect(() => {
        getStaffData(); 
    }, []);

    const getStaffData = async () => {
        const response = await getStaff();
        setStaff(response);
    };

    const openModal = () => {
        setSelectedStaff(staff);
        setSeeMore(true);
    };
    const closeModal = () => {
      setSelectedStaff(null);
        setSeeMore(false);
    };
  return (
    <div>


    </div>
  )
}

export default listStaff