const express = require('express')
const expresshandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const handlers = require('./lib/handlers.js')
const weatherMiddleware = require('./lib/middleware/weather.js')

app.engine('handlebars', expresshandlebars.engine({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            console.log('name = '+name)
            console.log('options = '+options)
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            console.log('this._sections[name] = '+this._sections[name])
            return null
        },
    },
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(weatherMiddleware)

app.get('/', handlers.home)
app.get('/section-test', handlers.sectionTest)
app.get('/january-special', handlers.specialUrl)

app.use(handlers.notFound)
app.use(handlers.serverError)

app.listen(port, () => console.log(`Server started at port : ${port}`))