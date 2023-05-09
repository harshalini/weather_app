const apikey = "5639b3c043858245052773c333bb2579";
const city = document.querySelector("#city");
const temp = document.querySelector("#temperature");
const cloud = document.querySelector("#clouds");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const img = document.querySelector("#img");

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;


            fetch(url).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
                weatherReport(data);
            })
        })
    }
})

function weatherReport(data) {
    var urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${apikey}`;

    fetch(urlcast).then((res) => {
        return res.json();
    }).then((forecast) => {
        console.log(forecast);
        hourForecast(forecast);
        dayForecast(forecast)
        city.innerText = data.name + ', ' + data.sys.country;
        temp.innerText = Math.floor(data.main.temp - 273) + ' °C';
        cloud.innerText = data.weather[0].description;
        humidity.innerText = "Humidity: " + data.main.humidity + "%";
        wind.innerText = "Wind: " + data.wind.speed + " miles/hour";
        let icon1 = data.weather[0].icon;
        let iconurl = "https://api.openweathermap.org/img/w/" + icon1 + ".png";
        img.src = iconurl
    })
}

function hourForecast(forecast) {
    document.querySelector('.templist').innerHTML = ''
    for (let i = 0; i < 5; i++) {

        var date = new Date(forecast.list[i].dt * 1000)
        console.log((date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', ''))

        let hourR = document.createElement('div');
        hourR.setAttribute('class', 'next');

        let div = document.createElement('div');
        let time = document.createElement('p');
        time.setAttribute('class', 'time')
        time.innerText = (date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', '');

        let temperature = document.createElement('p');
        temperature.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';

        div.appendChild(time)
        div.appendChild(temperature)

        let desc = document.createElement('p');
        desc.setAttribute('class', 'desc')
        desc.innerText = forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc)
        document.querySelector('.templist').appendChild(hourR);
    }
}

function dayForecast(forecast) {
    document.querySelector('.weekF').innerHTML = ''
    for (let i = 8; i < forecast.list.length; i += 8) {
        console.log(forecast.list[i]);
        let div = document.createElement('div');
        div.setAttribute('class', 'dayF');

        let day = document.createElement('p');
        day.setAttribute('class', 'date')
        day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(undefined, 'Asia/Kolkata');
        div.appendChild(day);

        let temp = document.createElement('p');
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';
        div.appendChild(temp)

        let description = document.createElement('p');
        description.setAttribute('class', 'desc')
        description.innerText = forecast.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div)
    }
}

function searchByCity() {
    var place = document.getElementById('input').value;
    var urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&` + `appid=${apikey}`;

    fetch(urlsearch).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        weatherReport(data);
    })
    document.getElementById('input').value = '';
}