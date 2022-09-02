import {useState, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'

import SignupForm from './components/Form/SignupForm';
import Weather from './components/Weather/Weather';

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    }
    fetchData();
  }, [lat,long])
  
  return (  
    <div className="App">
      <Routes>
        <Route path='/' element={<SignupForm />}/>
      </Routes>
      <Routes>
        <Route path='/weather' element={<Weather lat={lat} long={long}/>} />
      </Routes>
    </div>
  );
}

export default App;
