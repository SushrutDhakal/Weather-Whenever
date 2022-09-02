import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCircle, faMap } from '@fortawesome/free-solid-svg-icons'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment'
import 'react-tabs/style/react-tabs.css';
import { useNavigate, useLocation } from 'react-router-dom'
import FadeLoader from "react-spinners/FadeLoader";
import { avatar } from '../../util/avatar';
import backgroundCloud from '../../assets/backgroundClouds.jpg'
import backgroundSnow from '../../assets/backgroundSnow.jpg'
import backgroundDrizzle from '../../assets/backgroundDrizzle.jpg'
import backgroundRain from '../../assets/backgroundRain.jpg'
import backgroundClear from '../../assets/backgroundClear.png'
import backgroundSmoke from '../../assets/backgroundSmoke.jpg'
import backgroundThunderStorm from '../../assets/backgroundThunderStorm.jpg'
import Smoke from '../../assets/smoke.png'
import Snow from '../../assets/snow.png'
import Rain from '../../assets/rain.png'
import Drizzle from '../../assets/drizzle.png'
import Clouds from '../../assets/clouds.png'
import Clear from '../../assets/clear.png'
import ThunderStrom from '../../assets/thunderstrom.png'
import './style.css'
import HourlyWeather from './HourlyWeather/HourlyWeather';

export default function Weather({ lat, long }) {
  const [city, setCity] = useState('')
  const [data, setData] = useState()
  const [weatherData, setWeatherData] = useState({})
  const [loader, setLoader] = useState(false)
  const [icon, setIcon] = useState('')
  const [timeStamp, setTimeStamp] = useState('')
  const [iconCode, setIconCode] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const name = location.state.name.split(' ')
  let filteredAvatar;
  if ((!data && weatherData?.main?.temp > 17) || (data && data?.main?.temp > 17)) {
    avatar.find(item => {
      if (item.name.includes(name[0]) && item.name.includes(name[1]) && item.name.includes('Summer')) {
        filteredAvatar = <img src={item.source} alt='avatar' className='filterAvatar' />
      }
    })
  }
  if ((!data && weatherData?.main?.temp > 0 && !data && weatherData?.main?.temp <= 17) || (data && data?.main?.temp > 0 && data && data?.main?.temp <= 17)) {
    avatar.find(item => {
      if (item.name.includes(name[0]) && item.name.includes(name[1]) && item.name.includes('Spring')) {
        filteredAvatar = <img src={item.source} alt='avatar' className='filterAvatar' />
      }
    })
  }
  if ((!data && weatherData?.main?.temp < 0) || (data && data?.main?.temp < 0)) {
    avatar.find(item => {
      if (item.name.includes(name[0]) && item.name.includes(name[1]) && item.name.includes('Winter')) {
        filteredAvatar = <img src={item.source} alt='avatar' className='filterAvatar' />
      }
    })
  }

  useEffect(() => {
    setLoader(true)
    fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(res => res.json())
      .then(result => {
        iconfunc(result.weather[0].icon)
        setWeatherData(result)
        setCity(result.name)
        setTimeStamp(result.dt)
        setLoader(false)
        console.log('loogogog:', iconCode)
      })
      .catch(error => {
        setLoader(false)
      });
  }, [])
  const iconfunc = (code) => {
    fetch(`http://openweathermap.org/img/wn/${code}@2x.png`)
      .then(res => setIcon(res.url))
    console.log('check image:', icon)
  }

  const citySearchHandler = async (e) => {
    e.preventDefault()
    setLoader(true)
    await fetch(`${process.env.REACT_APP_API_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(res => res.json())
      .then(result => {
        iconfunc(result.weather[0].icon)
        setData(result)
        setLoader(false)

      })
      .catch(error => {
        setLoader(false)
      }
      );
  }

  const searchHandler = (e) => {
    setCity(e.target.value)
  }
  const iconHandler = (name) => {
    console.log('getting:', name)
    switch (name) {
      case 'Smoke':
        return <img src={Smoke} alt='icon' />
      case 'Haze':
        return <img src={Smoke} alt='icon' />
      case 'Clouds':
        return <img src={Clouds} alt='icon' />
      case 'Snow':
        return <img src={Snow} alt='icon' />
      case 'Rain':
        return <img src={Rain} alt='icon' />
      case 'Drizzle':
        return <img src={Drizzle} alt='icon' />
      case 'Clear':
        return <img src={Clear} alt='icon' />
      case 'ThunderStrom':
        return <img src={ThunderStrom} alt='icon' />
      default:
        return
    }
  }
  const backgroundHandler = (name) => {
    switch (name) {
      case 'Smoke':
        return <img src={backgroundSmoke} alt='background' />
      case 'Haze':
        return <img src={backgroundSmoke} alt='background' />
      case 'Clouds':
        return <img src={backgroundCloud} alt='background' />
      case 'Snow':
        return <img src={backgroundSnow} alt='background' />
      case 'Rain':
        return <img src={backgroundRain} alt='background' />
      case 'Drizzle':
        return <img src={backgroundDrizzle} alt='background' />
      case 'Clear':
        return <img src={backgroundClear} alt='background' />
      case 'ThunderStrom':
        return <img src={backgroundThunderStorm} alt='background' />
      default:
        return
    }
  }
  return (
    <div className='weather'>
      {loader &&
        <div className='loader'>
          <FadeLoader color={'#01579b'} loading={true} size={250} />
        </div>
      }
      <div className='search' >
        <div className='bg-image'>
          {data ? data?.weather?.map(item => backgroundHandler(item.main)) :
            weatherData?.weather?.map(item => backgroundHandler(item.main))
          }
          <div className='location'><FontAwesomeIcon icon={faMap} size='xs' style={{ marginRight: 10 }} /><span>{city}</span></div>
          <div>
            <h3>The Only Weather App You Need !</h3>
            <hr />
            <form onSubmit={citySearchHandler}>
              <input type='search' placeholder='Enter Location' onChange={searchHandler} value={city} />
              <button className='icon' onClick={citySearchHandler} type='submit'><FontAwesomeIcon icon={faSearch} /></button>
            </form>
          </div>
        </div>
      </div>
      <div className="avatar">
        <Tabs>
          <TabList>
            <Tab>Weather <FontAwesomeIcon icon={faCircle} className='circle' size='xs' /></Tab>
            <Tab>Avatar <FontAwesomeIcon icon={faCircle} className='circle' size='xs' /></Tab>
          </TabList>
          <TabPanel>
            <h3>Today</h3>
            <div className='weather_card'>
              {data ?
                <div className='weather_data'>
                  <div className='first'>
                    <h3 className='temp'>{data?.main?.temp}&#8451;</h3>
                    {data?.weather?.map(item =>
                      <><p className='imgPara'><span>{item.main}</span>{iconHandler(item.main)}</p>
                        <p style={{ color: '#ccc' }}>{item.description}</p>
                        <p>{moment.unix(data?.dt?.toString()).format("ddd,MMM,yyyy").split(",").join(' ')}</p>
                      </>)}
                  </div>
                  <div>
                    <p><span>Wind: </span><span>{data?.wind?.speed}</span></p>
                    <p><span>Humidity: </span><span>{data?.main?.humidity}%</span></p>
                    <p><span>Pressure: </span><span>{data?.main?.pressure}</span></p>
                    <p><span>Min Temp: </span><span>{data?.main?.temp_min}&#8451;</span></p>
                    <p><span>Max Temp: </span><span>{data?.main?.temp_max}&#8451;</span></p>
                  </div>
                </div>
                :
                <div className='weather_data'>
                  <div>
                    <h3 className='temp'>{weatherData?.main?.temp}&#8451;</h3>
                    {weatherData?.weather?.map(item =>
                      <><p className='imgPara'><span>{item.main}</span>{iconHandler(item.main)}</p>
                        <p style={{ color: '#ccc' }}>{item.description}</p>
                        <p>{moment.unix(weatherData?.dt?.toString()).format("ddd,MMM,yyyy").split(",").join(' ')}</p>

                      </>)}

                  </div>
                  <div>
                    <p><span>Wind: </span><span>{weatherData?.wind?.speed}</span></p>
                    <p><span>Humidity: </span><span>{weatherData?.main?.humidity}%</span></p>
                    <p><span>Pressure: </span><span>{weatherData?.main?.pressure}</span></p>
                    <p><span>Min Temp: </span><span>{weatherData?.main?.temp_min}&#8451;</span></p>
                    <p><span>Max Temp: </span><span>{weatherData?.main?.temp_max}&#8451;</span></p>
                  </div>
                </div>
              }
            </div>
            <div><HourlyWeather
              lat={lat}
              long={long}
              city={city}
              timeStamp={timeStamp.toString()}
            /></div>
          </TabPanel>
          <TabPanel>
            {filteredAvatar}
          </TabPanel>
        </Tabs>
        <button onClick={() => navigate('/')}>Logout</button>
      </div>
    </div>
  )
}
