import React, {useEffect, useState} from 'react'
import moment from 'moment'
import './style.css'
import Smoke from '../../../assets/smoke.png'
import Snow from '../../../assets/snow.png'
import Rain from '../../../assets/rain.png'
import Drizzle from '../../../assets/drizzle.png'
import Clouds from '../../../assets/clouds.png'
import Clear from '../../../assets/clear.png'
import ThunderStrom from '../../../assets/thunderstrom.png'

export default function HourlyWeather({city, timeStamp}) {
    const [getData, setGetData] = useState([])
    const [cityState, setCityState] = useState('')
    const [icon, setIcon] = useState()


    useEffect(()=> {
      // const getDate = moment().toDate()
      const value = moment.unix(timeStamp).format('YYYY-MM-DD')
        fetch(`${process.env.REACT_APP_API_URL}/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(res => res.json())
        .then(result => {
          const filteredArray = result.list.filter(item => {
            let date = item.dt_txt.split(' ')
            if(date[0] === value) {
              iconfunc(item?.weather[0].icon)
              return item
            }
          })
          setGetData([...filteredArray])
          setCityState(result.city.name)
        })
        .catch(error => {
        });
    },[city])

    const iconfunc = (code) => {
      fetch(`http://openweathermap.org/img/wn/${code}@2x.png`)
      .then(res => setIcon(res.url))
    }
    const iconHandler = (name) => {
      console.log('getting:',name)
      switch(name) {
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
  return (
    <div className='hourly'>
      <h3>More On {cityState}</h3>
      <div className='hourly_card'>
        {
          getData?.map(data => <div className='more-content'>
              <h4>{data.main.temp}&#8451;</h4>
              <p>{data.weather[0].main}{iconHandler(data.weather[0].main)}</p>
              <p>{data.weather[0].description}</p>
              <p>{moment(data.dt_txt.split(' ')[1].toString(), ["HH:mm"]).format("hh:mm a")}</p>
          </div>)
        }
      </div>
    </div>
  )
}
