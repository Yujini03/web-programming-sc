const fortune = require('./fortune.js')
const tours = require('./tours.js')

exports.home = (req, res) => res.render('home')
exports.about = (req, res) => res.render('about', {fortune:fortune.getFortune()})
exports.thanks = (req, res) => res.render('thanks')
exports.notFound = (req, res) => res.render('404')
exports.header = (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers).map(([key, value]) => `${key}:${value}`)
    //요청 객체 req의 headers속성에는 HTTP 요청의 헤더 정보가 포함되어 있습니다.Object.entries를 사용하여 헤더 객체를 [key, value] 쌍의 배열로 변환하고, 
    //map함수를 사용하여 각 헤더 항목을 'key:value' 형식의 문자열로 변환합니다. 이를 통해 모든 헤더 정보를 문자열의 배열인header`에 저장합니다.
    res.send(headers.join('\n'))
    //header 배열을 클라이언트로 보내고, 각 헤더는 개행 문자('\n')로 구분되어 텍스트 형식으로 반환
}
exports.thank = (req, res) => {
    console.log("Thanks called")
    res.render('thank')
}
exports.serverError = (err, req, res, next) => {
    console.log(err)
    res.render('500')
}

exports.tours = (req, res) => {
    const toursXml = '<?xml version="1.0"?><tours>' + //<?xml version="1.0"?> : XML 문서의 버전. <tours> : XML 문서의 루트 요소
      tours.tours.map(p => 
        `<tour price="${p.price}" id="${p.id}">${p.name}</tour>`
        ).join('') + '</tours>'
        //tours.tours.map(p => ... 부분은 배열 tours.tours의 각 요소를 순회하면서 새로운 배열을 생성하는 JavaScript의 배열 메서드인 
        //map을 사용하고 있습니다. 여기서 p는 배열의 각 요소를 대표하는 임시 변수입니다.
    const toursXmlTxt = '<?xml version="1.0"?><tours>' +
        tours.tours.map(p => 
          `<tour price="${p.price}" id="${p.id}">${p.name}</tour>`
          ).join('') + '</tours>'

    const toursTxt = tours.tours.map( p =>
        `${p.id}: ${p.name} (${p.price})`
        ).join('\n')

    //format() : 클라이언트의 요청에 따라 JSON, XML 또는 텍스트 형식으로 응답. 즉, 클라이언트의 요청 헤더에 따라 형식 응답
    res.format({
        'application/json': () => res.json(tours.tours),
        'application/xml': () => res.type('application/xml').send(toursXml),
        'text/xml': () => res.type('text/xml').send(toursXmlTxt),
        'text/plain': () => res.type('text/plain').send(toursTxt),
    })
}
