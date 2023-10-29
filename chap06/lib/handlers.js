const fortune = require('./fortune')
const tours = require('./tours.js')

exports.home = (req, res) => res.render('home')
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
exports.serverError = (err, req, res, next) => {
    console.log(err)
    res.render('500')
}
exports.tours = (req, res) => {
    const toursXml = '<?xml version="1.0"?><tours>' +
      tours.tours.map(p => 
        `<tour price="${p.price}" id="${p.id}">${p.name}</tour>`
        ).join('') + '</tours>'
    const toursXmlTxt = '<?xml version="1.0"?><tours>' +
        tours.tours.map(p => 
          `<tour price="${p.price}" id="${p.id}">${p.name}</tour>`
          ).join('') + '</tours>'
    const toursTxt = tours.tours.map( p =>
        `${p.id}: ${p.name} (${p.price})`
        ).join('\n')
    res.format({
        'application/json': () => res.json(tours.tours),
        'application/xml': () => res.type('application/xml').send(toursXml),
        'text/xml': () => res.type('text/xml').send(toursXmlTxt),
        'text/plain': () => res.type('text/plain').send(toursTxt),
    })
}