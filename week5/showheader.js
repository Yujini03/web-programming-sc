const express = require('express')
const expressHandlebars = require('express-handlebars')
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

app.get('/greeting', (req, res) => {
    res.render('greeting', {
    message: 'Hello esteemed programmer!',
    style: req.query.style,
    //userid: req.cookies.userid,
    //username: req.session.userid
    })
})

//JSON은 웹 API의 응답, 설정 파일, 데이터 저장 및 교환 등 다양한 용도로 사용됩니다. JavaScript에서도 JSON을 내장 객체로 제공하고 있으며, 
//다른 프로그래밍 언어에서도 JSON 파싱 및 생성 라이브러리를 제공하여 데이터를 다루는 데 사용됩니다.
app.get('/api/tours', (req, res) => res.json(tours.tours))
app.get('/api/tours/find/:id', (req, res) => {
    console.log(req.params.id)
    //HTTP 요청의 URL 매개 변수(parameter)에서 id라는 이름의 변수를 추출하여 콘솔에 출력
    //"/user/123"과 같은 URL을 요청했다고 가정해봅시다. 이 URL에서 "123"은 id라는 매개 변수의 값
    const p = tours.tours.find(p => p.id === parseInt(req.params.id))
    //find() 메소드는 콜백 함수로 조건을 검사하며, 여기서는 p.id와 req.params.id를 비교합니다. 
    //parseInt()를 사용하여 req.params.id를 정수로 변환한 다음, 해당 값과 p 배열 요소의 id 속성을 비교합니다.
    if(!p) return res.status(404).json({error: '해당하는 여행 상품이 없습니다.'})
    //상품이 발견되지 않으면 출력.
    if(req.body.name) p.name = req.body.name
    if(req.body.price) p.price = req.body.price
    res.json({success: true, name: p.name}) //success : 클라이언트에게 해당 요청이 성공했음.name:클라이언트는 이 응답을 통해 해당 상품의 이름을 얻음
})
//app.put은 수정, app.delete는 삭제
app.put('/api/tours/:id', (req, res) => {
    console.log(req.params.id)
    const p = tours.tours.find(p => p.id === parseInt(req.params.id))
    if(!p) return res.status(404).json({error: '해당하는 여행 상품이 없습니다.'})
    if(req.body.name) p.name = req.body.name
    if(req.body.price) p.price = req.body.price
    res.json({success: true, name: p.name})
})
app.delete('/api/tours/:id', (req, res) => {
    console.log(req.params.id)
    const idx = tours.tours.findIndex(tour => tour.id === parseInt(req.params.id))
    if(idx < 0) return res.status(404).json({error: '해당하는 여행 상품이 없습니다.'})
    tours.tours.splice(idx, 1) //idx는 삭제할 요소의 인덱스. 1은 제거할 요소의 수.
    res.json({success: true, name: tour.name})
})
app.get('/api/toursFmt', handlers.tours)

app.use(handlers.notFound)
app.use(handlers.serverError)

app.disable('x-powered-by')
//"X-Powered-By" 헤더를 응답에서 제거하게 됩니다. 
//이로써 애플리케이션의 기술 스택과 버전 정보가 클라이언트에게 노출되지 않으므로, 보안을 강화할 수 있습니다.

app.listen(port, () => console.log(`Express started on http://localhost:${port};` +
`press Ctrl-c to terminate...`))