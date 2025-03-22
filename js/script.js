async function handleAPI(city) {
    const apiKey = '5f8dd999a127b982d69ec06e03d09149';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if(!response.ok) {
            throw new Error('City not found')
        }

        let data = await response.json();
        generateHTML(data);
        weatherIcon(data);
        
    }catch(error){
displayError();
    }
    
}


function generateHTML(data) {
    const main = document.querySelector('main');
    let section = document.querySelector('section');

    if(!section) {
        section= document.createElement('section');
        main.appendChild(section);
    }

    section.classList.remove('invalid');

    section.innerHTML = `
            <figure class="weather-img">
        
          <img class= 'weather-icon' src="" alt="weather icons" />
          <figcaption>
            <h2 class= 'city-name'>
             ${data.name}
             
            </h2>
            <h1 class= 'city-temp'>
            ${Math.round(data.main.temp)}°F
            </h1>
          </figcaption>
        </figure>
        <article class="temp-detail">
          <div class="humidity">
            <figure>
              <img class= 'humidity-img' src="images/humidity.png" alt="humidity image" />
              <figcaption>
                <p class='humidity-p'>Humidity</p>

                <h3 class='humidity-percentage'>
                 ${data.main.humidity}%
                </h3>
              </figcaption>
            </figure>
          </div>
          <div class="wind">
            <figure>
              <img class='wind-img' src="images/wind.png" alt="wind image" />
              <figcaption>
                <p class='wind-p'>Wind Speed</p>

                <h3 class='wind-speed'>
                 ${Math.round(data.wind.speed)} MpH
                </h3>
              </figcaption>
            </figure>
          </div>
        </article>
    `;
    section.classList.add('show')
}

function searchCity() {
let form = document.querySelector('#form');
let input = document.querySelector('#input-city');

form.addEventListener('submit', (e) => {
e.preventDefault();
let inputValue = input.value.trim();

if(inputValue) {
    handleAPI(inputValue);
    input.value = '';
}
});
}
searchCity();

function displayError() {
    let section = document.querySelector('section');
    let main = document.querySelector('main');

    if(!section) {
        section = document.createElement('section');
        main.appendChild(section);
    }

    section.innerHTML = `
            <h2 class='city-name' style='color: red;'>City not found</h2>
        <h1 class='city-temp' style='color: red;'>No temperature data</h1>
        <h3 class='humidity-percentage' style='color: red;'>No humidity data</h3>
        <h3 class='wind-speed' style='color: red;'>No wind data</h3>
    `
    section.classList.add('invalid');
}


function weatherIcon(data) {
let weatherImg = document.querySelector('.weather-icon');

if(data.weather[0].main === 'Clouds') {
    weatherImg.src = 'images/clouds.png';
}

else if(data.weather[0].main === 'Clear') {
    weatherImg.src = 'images/clear.png';
}

else if(data.weather[0].main === 'Rain') {
    weatherImg.src = 'images/rain.png';
}

else if(data.weather[0].main === 'Drizzle') {
    weatherImg.src = 'images/drizzle.png';
}

else if(data.weather[0].main === 'Mist') {
    weatherImg.src = 'images/mist.png';
}
}

