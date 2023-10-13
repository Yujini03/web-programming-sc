const express = require('express')
const expresshandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const handlers = require('./lib/handlers')

//핸들바 뷰 엔진 설정
app.engine('handlebars', expresshandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)
app.get('/about', handlers.about)

app.use(handlers.notFound)
app.use(handlers.serverError)

if(require.main == module) {
    app.listen(port, () => console.log(
        `Express started on http://localhost:${port};` +
        `press Ctrl-c to terminate...`))
}
else{
    module.exports = app
}