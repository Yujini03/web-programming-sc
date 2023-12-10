exports.home = (req, res) => {
    console.log("home handler")
    donut = req.cookies.donut
    signedDonut = req.signedCookies.signed_donut
    if (!donut) {
        console.log("Cookie donut is not exist.")
        res.cookie('donut', 'yami', {maxAge: 100000})
    }
    else {
        console.log(`Cookie donut(${donut}) is exist.`)
        res.locals.cookieValue = donut
        res.cookie('donut', 'yami', {maxAge: 100000})
    }
    if (!signedDonut) {
        console.log("Cookie signed_donut is not exist.")
        res.cookie('signed_donut', '아주 맛있어', {signed: true, maxAge:150000})
    }
    else {
        console.log(`Cookie signed_donut(${signedDonut}) is exist.`)
        res.locals.signedCookieValue = signedDonut
        res.cookie('signed_donut', '아주 맛있어', {signed: true, maxAge:150000})
    }
    if (!req.session.visit) {
        req.session.visit = 1
    }
    else {
        req.session.visit = req.session.visit + 1
    }
    res.locals.visitNumber = req.session.visit
    res.render('home')
  }
  
  exports.about = (req, res) => {
    console.log("about handler")
    res.render('about')
  }
  
  exports.notFound = (req, res) => {
    console.log("404 handler")
    res.render('404')
  }
  
  exports.serverError = (err, req, res, next) => {
    console.log("500 handler")
    res.render('500')
  }