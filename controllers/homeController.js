const User = require('../models/User')

module.exports = async (req, res) => {

    let UserData = await User.findById(req.session.userId) // หาจาก id ของ user
    res.render('home', {
        UserData
    })
}