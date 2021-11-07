let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let yearMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let searchedLocation
let currentWeather
let forecast

let search = document.getElementById('search')
let searchBtn = document.getElementById('submit')
search.addEventListener('keyup', function() {
 getData(search.value)
})
searchBtn.addEventListener('click', function() {
 getData(search.value)
})

async function getData(locationName = 'Cairo') {
 let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bdc21864b12b418db3f124105212609&q=${locationName}&days=3`)
 let data = await response.json()
 searchedLocation = data.location
 currentWeather = data.current
 forecast = data.forecast.forecastday
 display()
}
getData()

function display() {
 const d1 = new Date(`${forecast[0].date}`)
 const d2 = new Date(`${forecast[1].date}`)
 const d3 = new Date(`${forecast[2].date}`)

 document.getElementById('today').innerHTML = `
  <div class="day">${weekday[d1.getDay()]}</div>
  <div class="date">${d1.getDate()} ${yearMonth[d1.getMonth()]}</div>
  <div class="clr"></div>
 `

 document.getElementById('current').innerHTML = `
  <div class="location">${searchedLocation.name}</div>
  <div class="degree">
    <div class="num">${currentWeather.temp_c}<sup>o</sup>C</div>
    <div class="forecast-icon">
      <img src="${currentWeather.condition.icon}" alt="" width="90">
    </div>
  </div>
  <div class="custom">${currentWeather.condition.text}</div>
  <span><img src="images/icon-umberella.png" alt="">${currentWeather.humidity}%</span>
  <span><img src="images/icon-wind.png" alt="">${currentWeather.wind_kph} km/h</span>
  <span><img src="images/icon-compass.png" alt="">${currentWeather.wind_dir}</span>
 `

 document.getElementById('nextDay').innerHTML = `
  <div class="forecast-header">
  <div class="day">${weekday[d2.getDay()]}</div>
  </div>
  <div class="forecast-content">
    <div class="forecast-icon">
      <img src="${forecast[1].day.condition.icon}" alt="" width="48">
    </div>
    <div class="degree">${forecast[1].day.maxtemp_c}<sup>o</sup>C</div>
    <small>${forecast[1].day.mintemp_c}<sup>o</sup>C</small>
    <div class="custom">${forecast[1].day.condition.text}</div>
  </div>
 `

 document.getElementById('thirdDay').innerHTML = `
  <div class="forecast-header">
  <div class="day">${weekday[d3.getDay()]}</div>
  </div>
  <div class="forecast-content">
    <div class="forecast-icon">
      <img src="${forecast[2].day.condition.icon}" alt="" width="48">
    </div>
    <div class="degree">${forecast[2].day.maxtemp_c}<sup>o</sup>C</div>
    <small>${forecast[2].day.mintemp_c}<sup>o</sup>C</small>
    <div class="custom">${forecast[2].day.condition.text}</div>
  </div>
 `
}

