// import './App.css'
// import Routing from './router/routing'
// function App() {
//   return (
//     <>
//       <Routing/>
//     </>
//   )
// }

// export default App
import './App.css';
import Routing from './router/routing';
import React, { useEffect, useState } from 'react';

function App() {
  const [currentTime, setCurrentTime] = useState('');

  const updateTime = () => {
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    const timeString = now.toLocaleTimeString('en-US', options).replace('.', '');
    setCurrentTime(timeString);
  };

  useEffect(() => {
    updateTime(); 
    const intervalId = setInterval(updateTime, 1000); // Actualiza la hora cada segundo

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Routing />
      <h2 className="current-time">{currentTime}</h2>
    </>
  );
}

export default App;
