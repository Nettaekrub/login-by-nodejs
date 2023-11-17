module.exports = (req, res) => {

    let email = ""
    let password = ""
    let username = ""
    let data = req.flash('data')[0]

    if (typeof data != "undefined") {
        email = data.email
        password = data.password
        username = data.username
    }

    res.render('register', {
        errors: req.flash('validationErrors'),
        username:  username,
        email: email,
        password: password
    })

}