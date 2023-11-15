const express = require('express')
const expressHandlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const handlers = require('./lib/handlers')
const credentials = require('./credentials')
const flashMiddleware = require('./lib/middleware/flash')

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}))
app.use(flashMiddleware)

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)
app.get('/about', handlers.about)

app.use(handlers.notFound)
app.use(handlers.serverError)

const port = process.env.PORT || 3000

if(require.main === module) {
  app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` +
      '; press Ctrl-C to terminate.' )
  })
} else {
  module.exports = app
}