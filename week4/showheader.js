const express = require('express')
const expressHandlebars = require('express-Handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const handlers = require('./lib/handlers.js')

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout:'main'
}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/form', (req, res) => {
    console.log(`receiving contact form ${req.body.name} <${req.body.email}>`)
    res.redirect(303, '/thanks')
    //라이언트를 다른 URL인 'thanks'로 리다이렉트시킵니다. 
    //303은 리다이렉션 상태 코드로, "See Other"를 나타내며 클라이언트에게 새로운 URL로 이동하라는 것을 알려줍니다
})
app.get('/thanks', handlers.thanks)
app.get('/login', handlers.thank)
app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/headers', handlers.header)

app.use(handlers.notFound)
app.use(handlers.serverError)

app.disable('x-powered-by')
//"X-Powered-By" 헤더를 응답에서 제거하게 됩니다. 
//이로써 애플리케이션의 기술 스택과 버전 정보가 클라이언트에게 노출되지 않으므로, 보안을 강화할 수 있습니다.

app.listen(port, () => console.log(`Express started on http://localhost:${port};` +
`press Ctrl-c to terminate...`))