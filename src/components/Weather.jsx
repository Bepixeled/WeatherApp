import React, { useMemo } from 'react'
import { useState, useEffect } from 'react'
import { Sun, Cloud, CloudyDay, Fog, Hail, HeavyRain, Rainy, Snowy, Storm, ThunderStorm, Sunrise, Sunset, FullMoon, CloudyNight } from './Icons'
import UilTear from '@iconscout/react-unicons/icons/uil-tear'
import UilWind from '@iconscout/react-unicons/icons/uil-wind'
import UilEye from '@iconscout/react-unicons/icons/uil-eye'





function Weather() {
  const [weatherData, setWeatherData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]); 
  const [city, setCity] = useState('Hannover');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [hourlyIcon, setHourlyIcon] = useState('');
  const [dailyIcon, setDailyIcon] = useState('');

 

  useEffect(() => {
    const searchInput = document.getElementById("search");
    const button = document.getElementById("button");
    const handleClick = (e) => {
      e.preventDefault();
      setCity(searchInput.value);
    };
    const handleKeyUp = (e) => {
      if (e.key === "Enter") {
        setCity(searchInput.value);
      }
    };

    button.addEventListener("click", handleClick);
    searchInput.addEventListener("keyup", handleKeyUp);

    return () => {
      button.removeEventListener("click", handleClick);
      searchInput.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (city) {
          const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days%2Chours%2Ccurrent&key=YJQU5PM3S52D3PMBWCBX5VTB4&contentType=json`);
          const data = await response.json();
          setWeatherData(data.currentConditions);
          const currentTime = new Date().getHours();
          setHourlyData(data.days[0].hours.slice(currentTime, currentTime + 6));
          setDailyData(data.days);
          
          
          } else {
          console.log("Please enter a city");
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    
    fetchWeather();
    
  }, [city]);

  useEffect(() => {
    setWeatherIcon(weatherData.icon);
    
    if (weatherData.icon === 'clear-day') {
      setWeatherIcon(Sun)
    } else if (weatherData.icon === 'clear-night') {
      setWeatherIcon(FullMoon)
    } else if (weatherData.icon === 'cloudy') {
      setWeatherIcon(Cloud)
    } else if (weatherData.icon === 'fog') {
      setWeatherIcon(Fog)
    } else if (weatherData.icon === 'hail') {
      setWeatherIcon(Hail)
    } else if (weatherData.icon === 'heavy-rain') {
      setWeatherIcon(HeavyRain)
    } else if (weatherData.icon === 'partly-cloudy-day') {
      setWeatherIcon(CloudyDay)
    } else if (weatherData.icon === 'partly-cloudy-night') {
      setWeatherIcon(CloudyNight)
    } else if (weatherData.icon === 'rain') {
      setWeatherIcon(Rainy)
    } else if (weatherData.icon === 'snow') {
      setWeatherIcon(Snowy)
    } else if (weatherData.icon === 'sleet') {
      setWeatherIcon(Snowy)
    } else if (weatherData.icon === 'thunderstorm') {
      setWeatherIcon(ThunderStorm)
    } else if (weatherData.icon === 'tornado') {
      setWeatherIcon(Storm)
    } else {
      setWeatherIcon(ThunderStorm)
    }
  })

  useEffect(() => {
    const icons = hourlyData.slice(1, 6).map((hour) => {
      if (hour.icon === 'clear-day') {
        return Sun;
      } else if (hour.icon === 'clear-night') {
        return FullMoon;
      } else if (hour.icon === 'cloudy') {
        return Cloud;
      } else if (hour.icon === 'fog') {
        return Fog;
      } else if (hour.icon === 'hail') {
        return Hail;
      } else if (hour.icon === 'heavy-rain') {
        return HeavyRain;
      } else if (hour.icon === 'partly-cloudy-day') {
        return CloudyDay;
      } else if (hour.icon === 'partly-cloudy-night') {
        return CloudyNight;
      } else if (hour.icon === 'rain') {
        return Rainy;
      } else if (hour.icon === 'snow' || hour.icon === 'sleet') {
        return Snowy;
      } else if (hour.icon === 'thunderstorm') {
        return ThunderStorm;
      } else if (hour.icon === 'tornado') {
        return Storm;
      } else {
        return ThunderStorm;
      }
    });
  
    setHourlyIcon(icons);
  }, [hourlyData]);

  useEffect(() => {
    const icons = dailyData.slice(1, 6).map((day) => {
      if (day.icon === 'clear-day') {
        return Sun;
      } else if (day.icon === 'clear-night') {
        return FullMoon;
      } else if (day.icon === 'cloudy') {
        return Cloud;
      } else if (day.icon === 'fog') {
        return Fog;
      } else if (day.icon === 'hail') {
        return Hail;
      } else if (day.icon === 'heavy-rain') {
        return HeavyRain;
      } else if (day.icon === 'partly-cloudy-day') {
        return CloudyDay;
      } else if (day.icon === 'partly-cloudy-night') {
        return CloudyNight;
      } else if (day.icon === 'rain') {
        return Rainy;
      } else if (day.icon === 'snow' || day.icon === 'sleet') {
        return Snowy;
      } else if (day.icon === 'thunderstorm') {
        return ThunderStorm;
      } else if (day.icon === 'tornado') {
        return Storm;
      } else {
        return ThunderStorm;
      }
    });
  
    setDailyIcon(icons);
  }, [dailyData]);



  return (
    <div>
      <div className=' w-80 rounded-lg h-auto min-h-24 p-4 bg-gradient-to-b from-light-verdigris-600 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 mt-12'>
        <div className='flex-row flex justify-end relative'> {/* To position the WeatherIcon on the top right corner */}
          <img src={weatherIcon} alt="" className='w-20 h-20 z-30 absolute -translate-y-1/2 translate-x-1/2 left-auto top-0 right-0' />
        </div>
        <div className='flex flex-col items-start'>
          <p>{city}</p>
          <p className='text-4xl font-semibold font-Poppins'>{weatherData && weatherData.temp} °C</p>
          <small className='font-Poppins text-xs'>Feels like {weatherData && weatherData.feelslike}°C</small>
        </div>
        <div className='flex flex-row justify-between items-center mt-8'>
          <div className='bg-gradient-to-b from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 w-20 h-20 rounded-lg flex flex-col justify-center items-center'><UilTear />
            <p>{weatherData && weatherData.humidity}%</p></div>
          <div className='bg-gradient-to-b from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 w-20 h-20 rounded-lg flex flex-col justify-center items-center'><UilWind />
            <p>{weatherData && weatherData.windspeed} km/h</p></div>
          <div className='bg-gradient-to-b from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 w-20 h-20 rounded-lg flex flex-col justify-center items-center'><UilEye />
            <p>{weatherData && weatherData.visibility} km</p></div>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center mt-8 w-80'>
        <div className='bg-gradient-to-b from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 h-20 rounded-lg flex flex-row justify-around items-center w-36 p-2'>
          <img src={Sunrise} className='w-12' />
          <p className='text-lg font-Poppins'>{weatherData && weatherData.sunrise}</p>
        </div>
        <div className='bg-gradient-to-b from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 h-20 rounded-lg flex flex-row justify-around items-center w-36 p-2'>
          <img src={Sunset} className='w-12' /><p className='text-lg font-Poppins'>{weatherData && weatherData.sunset}</p>
        </div>
      </div>
      <div className='w-80 rounded-lg h-auto min-h-24 p-2 bg-gradient-to-b from-light-verdigris-600 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 mt-8'>
        <div className='flex flex-row justify-between items-stretch h-auto w-[]'>

          {hourlyData.slice(1, 6).map((hour, index) => (
            <div
              key={index}
              className='bg-gradient-to-t from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 rounded-lg flex flex-col justify-between items-center align-middle w-14 h-auto p-2 '
            >
              <p
                id='timefc'
                className='font-Poppins text-sm font-semibold mb-2'
              >
                {hour.datetime.split(':').slice(0, 2).join(':')}{' '}

              </p>
              <img src={hourlyIcon[index]} className='w-12' />
              <p id='tempfc' className='font-Poppins text-sm mt-2'>
                {hour.temp}°C
              </p>
            </div>
          ))}


        </div></div>

      <div className='w-80 rounded-lg h-auto min-h-24 p-2 bg-gradient-to-b from-light-verdigris-600 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300 mt-8'>
        <div className='flex flex-row justify-between items-center h-auto'>



          {dailyData.slice(1, 6).map((day, index) => {
            const date = new Date(day.datetime);
            const formattedDate = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });

            return (
              <div
                key={index}
                className='bg-gradient-to-t from-light-verdigris-700 to-light-bondi_blue-700 shadow-md shadow-light-bondi_blue-300  rounded-lg flex flex-col justify-center items-center w-14 h-auto p-2'
              >
                <p id="dailydate" className='font-Poppins text-sm font-semibold mb-2'>{formattedDate}</p>
                <img src={dailyIcon[index]} className='w-12' />
                <p id="dailytemp" className='font-Poppins text-sm mt-2'>{day.tempmax}°C</p>
              </div>
            );
          })}




        </div>
      </div>

    </div>

  )
}

export default Weather