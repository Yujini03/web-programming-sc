const getWeatherData = () => [
    {
        location: {
            name: '김해시 분성산',
            coordinates: {lat: 35.245952655055575, lng: 128.89231138360006},
        },
        forecastUrl: 'https://www.weather.go.kr/w/index.do#dong/4825051000/35.245952655055575/128.89231138360006/%EA%B2%BD%EB%82%A8%20%EA%B9%80%ED%95%B4%EC%8B%9C%20%EC%96%B4%EB%B0%A9%EB%8F%99/SCH/%EB%B6%84%EC%84%B1%EC%82%B0',
        iconUrl: 'https://www.weather.go.kr/w//resources/icon/NY@64/A/Light/NB07.png',
        weather: '어제보다 4℃ 낮아요',
        temp: '16.8℃',
    },
    {
        location: {
            name: '부산시 해운대 해수욕장',
            coordinates: {lat: 35.1585232170784, lng: 129.159854668484},
        },
        forecastUrl: 'https://www.weather.go.kr/w/index.do#dong/2635051000/35.1585232170784/129.159854668484/%EB%B6%80%EC%82%B0%20%ED%95%B4%EC%9A%B4%EB%8C%80%EA%B5%AC%20%EC%9A%B0%EB%8F%99/SCH/%ED%95%B4%EC%9A%B4%EB%8C%80%ED%95%B4%EC%88%98%EC%9A%95%EC%9E%A5',
        iconUrl: 'https://www.weather.go.kr/w//resources/icon/NY@64/A/Light/NB17.png',
        weather: '어제보다 5℃ 낮아요',
        temp: '16.9℃',
    },
    {
        location: {
            name: '서울시 남산서울타워',
            coordinates: {lat: 37.55127433407266, lng: 126.98820799353979},
        },
        forecastUrl: 'https://www.weather.go.kr/w/index.do#dong/1114055000/37.55127433407266/126.98820799353979/%EC%84%9C%EC%9A%B8%20%EC%9A%A9%EC%82%B0%EA%B5%AC%20%EC%9A%A9%EC%82%B0%EB%8F%992%EA%B0%80/SCH/%EB%82%A8%EC%82%B0%EC%84%9C%EC%9A%B8%ED%83%80%EC%9B%8C',
        iconUrl: 'https://www.weather.go.kr/w//resources/icon/NY@64/A/Light/NB01.png',
        weather: '어제보다 4℃ 낮아요',
        temp: '14.9℃',
    },
]

const weatherMiddleware = async (req, res, next) => {
    if(!res.locals.partials) res.locals.partials = {}
    res.locals.partials.weatherContext = await getWeatherData()
    next()
}

module.exports = weatherMiddleware