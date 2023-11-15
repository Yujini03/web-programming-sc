module.exports = (req, res, next) => {
    if(req.session.flash) {
        res.locals.flash = req.session.flash
        console.log("Flash middleware called flash = "+req.session.flash)
    }
    else {
        console.log("flash middleware with no flash data")
    }
    delete req.session.flash
    next()
}