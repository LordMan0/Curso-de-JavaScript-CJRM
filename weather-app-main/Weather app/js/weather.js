const APIKey = 'VPZ4OWM3TtQBNd4CTQw9SKntb2Ge83w4'
const baseUrl = 'http://dataservice.accuweather.com/'

const getCityInfoUrl = cityName => 
    `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getWeatherInfoUrl = cityKey => 
    `${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br` 

const getFetchData = async url => {
    try {
        const response = await fetch(url)

        if (!response.ok){
            throw new Error('Não foi possível obter os dados da requisição.')
        }

        return response.json()
    } catch ({ name, message }) {
        alert(`${name}: ${message}`)
    }
}

const getCityInfo = cityName => getFetchData(getCityInfoUrl(cityName))
const getWeatherInfo = cityKey => getFetchData(getWeatherInfoUrl(cityKey))