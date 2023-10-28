const express = require('express')
const expresshandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const handlers = require('./lib/handlers')

//핸들바 뷰 엔진 설정
app.engine('handlebars', expresshandlebars.engine({
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

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/section-test', handlers.sectionTest)

app.use(handlers.notFound)
app.use(handlers.serverError)

//require.main == module - 진입점 스크립트에만 특정 코드 블록을 실행하도록 설정.모듈과 진입점 스크립트를 구분하고 모듈화된 코드를 재사용하면서도 필요한 경우에만 스크립트가 실행되도록 할 수 있음. (이 파일이 직접 실행될 때 실행)
//require.main - Node.js 스크립트 파일이 직접 실행되었는지, module - 현재 모듈에 대한 정보
//module.exports = app - module은 현재 모듈을 나타내는 객체. exports는 현재 모듈을 다른 모듈에서 사용할 수 있도록 내보내는데 사용되는 객체.
//객체 app을 module.exports를 통해 내보냄. 다른 파일에서 이 모듈을 불러올 때 require로 사용 가능. const app = require('./이모듈의경로');
if(require.main == module) {
    app.listen(port, () => console.log(
        `Express started on http://localhost:${port};` +
        `press Ctrl-c to terminate...`))
}
else{
    module.exports = app
}