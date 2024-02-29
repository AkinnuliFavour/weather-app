import api from '../../api/forecast'
import {useEffect, useState} from 'react'

import SearchBar from "../../components/SearchBar"
import { FaLocationDot, FaTemperatureHigh } from 'react-icons/fa6'
import TemperatureCard from "../../components/TemperatureCard"
import ErrorMessage from '../../components/ErrorMessage'
import { dayValues, monthValues } from '../../constants/constants'

interface Response {
  data:{
    current:{
      condition:{
        text: string,
        icon: string
      },
      feelslike_c: string,
      pressure_mb: string,
      humidity: string,
      precip_mm: string,
      wind_kph: string
    },
    forecast:{
      forecastday:{
        date: string,
        day:{
          condition:{
            text: string,
            icon: string
          },
          avgtemp_c: string
        }
      }[]
    },
    location:{
      country: string
      localtime: string
      name: string
      region: string
    }
  }
}

const Home = () => {
    const [forecasts, setForecasts] = useState<Response>()
    const [location, setLocation] = useState('')

    useEffect(
        () => {
            const getWeatherForecast = async() => {
              if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    async(position: GeolocationPosition) => {
                        try {
                          const weatherForecast: Response = await api.get('forecast.json', {
                              headers:{
                                SameSite: 'None' && 'Secure',
                              },
                              params:{
                                  key: import.meta.env.VITE_API_KEY,
                                  q: location || `${position.coords.latitude}, ${position.coords.longitude}` ,
                                  days: 4,
                              }
                      })
                      setForecasts(weatherForecast)
                      } catch (error) {
                          if(error instanceof Error) throw new Error(`Error: ${error.message}`)
                      }
                    }
                )
              }
              }
            getWeatherForecast()
        }, [location]
    )

    const futureForecasts = forecasts?.data.forecast.forecastday

    let date
    forecasts ? (date = new Date(forecasts?.data.location.localtime)) : date = new Date()
    const day = date?.getDay()
    const dayNumber = date?.getDate()
    const month = date?.getMonth()

    if(!forecasts) return <ErrorMessage />

  return (
    <main className='p-8 min-h-screen w-full bg-gradient-to-tr from-[#00B4FF] to-[#7A5CC1] text-gray-700 md:flex md:flex-col md:justify-around'>
        <SearchBar location={location} setLocation={setLocation}/>
        <section className="mt-10 grid grid-cols-1 sm:flex justify-around items-center lg:px-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <FaLocationDot className='text-xl'/>
              <p className="text-xl font-semibold">{forecasts.data.location.region} {forecasts.data.location.name}</p>
            </div>
            <div className="mt-8 font-bold text-xl md:self-start ">
              <p className="text-2xl">{monthValues[month]} {dayNumber}</p>
              <p>{dayValues[day]}</p>
            </div>
          </div>
          <div className="mt-12 md:mt-0 flex flex-col items-center justify-center">
            <img src={forecasts?.data?.current?.condition?.icon} alt="" className="sm:w-40 self-center"/>
            <p className='font-bold text-xl'>{forecasts.data.current.condition.text}</p>
          </div>
          <div  className="mt-12 flex flex-col items-center">
            <div className="flex items-center gap-2">
              <FaTemperatureHigh className='text-xl'/>
              <p className="text-2xl font-extrabold">
                {
                  `${forecasts?.data?.current?.feelslike_c}`
                }&#176;c
              </p>
            </div>
            <div className="mt-4 flex flex-col items-center gap-4 font-semibold">
              <p>Pressure: <span className="font-bold">{`${(Number(forecasts?.data?.current?.pressure_mb) * 0.750062).toFixed(0)}mmHg`}</span></p>
              <p>Humidity: <span className="font-bold">{forecasts?.data?.current?.humidity}%</span></p>
              <p>Precipitation: <span className="font-bold">{forecasts?.data?.current?.precip_mm}</span>mm</p>
              <p>Wind: <span className="font-bold">{(Number(forecasts?.data?.current?.wind_kph) * 0.2778).toFixed(0)}m/s</span></p>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 justify-items-center gap-8 md:flex md:justify-around mt-10">
          {futureForecasts && futureForecasts.map(
            futureForecast =>
             <TemperatureCard key={futureForecast.date} image={futureForecast.day.condition.icon} temp={futureForecast.day.avgtemp_c} dateString={futureForecast.date} text={futureForecast.day.condition.text}/>
          )}
        </section>
    </main>
  )
}

export default Home
