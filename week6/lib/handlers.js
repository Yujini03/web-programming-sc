const fortune = require('./fortune')
const tours = require('./tours')

exports.home = (req, res) => res.render('home', tours.toursContext)
exports.about = (req, res) => res.render('about', {fortune:fortune.getFortune()})
exports.specialUrl = (req, res) => res.render('special-price', {year:2024, month:1, rate:50})
exports.notFound = (req, res) => res.render('404')
exports.error = (req, res) => {
    res.status(500)
    res.render('error')
}
exports.header = (req, res)=> {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
}
exports.sectionTest = (req, res) => {
    res.locals.title = '웹프로그래밍2'
    res.render('section-test', {test_msg: '이 것은 테스트 메세지 입니다.'})
}

exports.serverError = (err, req, res, next) => {
    console.log(err)
    res.render('500')
}