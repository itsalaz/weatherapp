
// config.js
import API_KEY from './config.js'

const searchButton = document.querySelector('#searchButton')
const citySearch = document.querySelector('#city__search')

const weatherIcon = {
  'Thunderstorm': './images/lightning.png',
  'Drizzle': './images/raining.png',
  'Rain': './images/raining.png',
  'Snow': './images/snow.png',
  'Atmosphere': './images/sunny__cloudy__weather.png',
  'Clear': './images/sunny__weather__icon.png',
  'Clouds': './images/sunny__cloudy__weather.png'
}


searchButton.addEventListener('click', (e) => {
  e.preventDefault()
  const cityName = citySearch.value
  weatherData(cityName)
  citySearch.value = ''
})


citySearch.addEventListener('input', function() {
  citySearch.style.color = 'white'
  })


citySearch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    searchButton.click()
  }
})





document.addEventListener('DOMContentLoaded', () => {
  const defaultCity = 'New York'
  weatherData(defaultCity)
})



function weatherData(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
       currentWeather(data)
    })


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      displayForecast(data)
    })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      displayForecastDates(data)
    })


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      displayForecastIcons(data)
    })
}


// Defines and sets weather attributes that get called by weatherData
function currentWeather(data) {
  document.querySelector('.city__name').textContent = data.name
  document.querySelector('.weather__temperature').textContent = `${Math.round((data.main.temp - 273.15) * 9/5 + 32)}°F`
  document.querySelector('.weather__content').textContent = data.weather[0].main

  document.querySelector('.humidity__details').textContent = data.main.humidity + '%'
  document.querySelector('.wind__details').textContent = `${Math.round(data.wind.speed)}` + "mph"
  document.querySelector('.visibility__details').textContent = (data.visibility / 1000) + 'km'


  const currentWeatherIcon = document.querySelector('#current__weather__icon')
  currentWeatherIcon.src = weatherIcon[data.weather[0].main]
}


function displayForecast(data) {
  const dayTemp = document.querySelectorAll('.day_temp')
  for (let i = 0; i < dayTemp.length; i++) {
    dayTemp[i].textContent = `${Math.round((data.list[i * 8].main.temp - 273.15) * 9/5 + 32)}°F` // converting weather from Kelvin to Farenheit, i*8 because updates every 3 hours (8 times daily) 
    }
  }

  function displayForecastDates(data) {
    const datesElements = document.querySelectorAll('.dates')
    for(let i = 0; i < datesElements.length; i++) {
      const timestamp = data.list[i*8].dt
      const date = new Date(timestamp * 1000)
      const formattedDates = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric'})
      datesElements.forEach((timestamp, index) => {
          datesElements[i].textContent = formattedDates
    })
  }
}

  function displayForecastIcons(data) {
    console.log(data)
    const displayIcons = document.querySelectorAll('.weather__icon')
    console.log(displayIcons)
    for(let i=0; i < displayIcons.length; i++) {
        displayIcons[i].src = weatherIcon[data.list[i].weather[0].main]
    }
  }



