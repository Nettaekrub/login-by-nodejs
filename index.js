const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

//Mongo connect
mongoose.connect('mongodb+srv://admin:1212312121@cluster0.jpc8bv1.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

global.loggedIn = null

//middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')

//controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')

app.use(express.static('public')) //บอกว่าใช้ folder ไหน
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({ //secret key **need to use**
    secret: 'Kuy ai here'
}))
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine', 'ejs')

app.get('/', indexController) // route page
app.get('/home', authMiddleware, homeController)
app.get('/login', redirectIfAuth, loginController) // login
app.get('/register', redirectIfAuth, registerController) // regis
app.get('/logout', logoutController) // log
app.post('/user/register', redirectIfAuth, storeController)
app.post('/user/login', redirectIfAuth, loginUserController) 


app.listen(4000, () => {
    console.log("อยู่ port 4000 ครับ")
})
