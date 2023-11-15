// slightly modified version of the official W3C HTML5 email regex:
// https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
  '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
  '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')
  

exports.home = (req, res) => {
  console.log("home handler")
  monster = req.cookies.monster
  signedMonster = req.signedCookies.signed_monster
  console.log("Cookies from client : "+monster+", "+signedMonster)
  res.cookie('monster', 'big bear')
  res.cookie('signed_monster', 'big bear signed', {signed: true})
  req.session.userName = 'Anonymous'
  req.session.flash = {
    type: 'danger',
    intro: 'Test flash by session',
    message: 'A simple test message for session check.',
  }
  //res.render('home')
  res.redirect(303, '/about')
}

exports.about = (req, res) => {
  console.log("about handler")
  res.render('about')
}

exports.notFound = (req, res) => res.render('404')

exports.serverError = (err, req, res, next) => res.render('500')