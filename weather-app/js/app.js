const formContainer = document.querySelector('[data-js="form-container"]')
const cityNameText = document.querySelector('[data-js="city-name"]')
const cityWeatherText = document.querySelector('[data-js="city-weather"]')
const cityTemperatureText = document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const weatherDetails = document.querySelector('[data-js="weather-details"]')
const timeImgContainer = document.querySelector('[data-js="time-img-container"]')
const timeImg = document.querySelector('[data-js="time"]')
const timeIcon = document.querySelector('[data-js="time-icon"]')

const updateColorTheme = isDayTime => {
    document.body.style.backgroundColor = isDayTime ? '#88bee2' : '#233047'
    cityCard.style.backgroundColor = isDayTime ? '#7db4da' : '#2e4261'
}

const showCityCard = () => {
    if (cityCard.classList.contains('d-none')) {
        timeImgContainer.classList.remove('d-none')
        cityCard.classList.remove('d-none')
    }
}

const fetchCityWeatherInfo = async cityName => {
    const [{ Key, LocalizedName }] = await getCityInfo(cityName)
    const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = await getWeatherInfo(Key)

    return { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon }
}

const showCityWeatherInfo = async cityName => {
    const { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon } = 
        await fetchCityWeatherInfo(cityName)
    
    const timeIconImg = `<img class="icon" src="./src/icons/${WeatherIcon}.svg" />`
    
    updateColorTheme(IsDayTime)

    timeImg.src = IsDayTime ? './src/sun.svg' : './src/moon.svg'
    timeIcon.innerHTML = timeIconImg
    cityNameText.textContent = LocalizedName
    cityWeatherText.textContent = WeatherText
    cityTemperatureText.textContent = Temperature.Metric.Value

    showCityCard()
}

const handleCityForm = event => {
    event.preventDefault()

    const inputValue = event.target.city.value

    showCityWeatherInfo(inputValue)
    formContainer.reset()
}

formContainer.addEventListener('submit', handleCityForm)
