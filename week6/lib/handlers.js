const fortune = require('./fortune')
const tours = require('./tours')

exports.home = (req, res) => res.render('home', tours.toursContext)
exports.about = (req, res) => res.render('about', {fortune:fortune.getFortune()})
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
    res.render('section-test')
}

exports.serverError = (err, req, res, next) => {
    console.log(err)
    res.render('500')
}