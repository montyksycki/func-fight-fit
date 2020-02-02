require('dotenv').config()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// const path = require('path')
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
// const flash = require('connect-flash')


// VIEWS + LAYOUTS
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
// app.use(flash)

// Setup
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())
// app.use(session({
// 	secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
// 	resave: true,
// 	saveUninitialized: true
// }))
app.use(methodOverride('_method'))

app.use(function(req, res, next) {
	// const options = { 
	// 	weekday: 'long',
	// 	day: '2-digit',
	// 	hour: '2-digit',
	// 	minute: '2-digit',
	// 	second: '2-digit',
	// 	year: 'numeric',
	// 	month: 'long',
	// 	hour12: true
	// 	}
	const date = new Date()
	// const date = new Date().toLocaleString('en-US', options)
	// const date = new Date().toISOString()
	// const date = new Date().toJSON()
	console.log(`Date: ${date.toISOString()}`)
	// console.log(date)
	next()
})

// ROUTES
const staticPagesRouter = require('./routes/static-pages')
const membersRouter = require('./routes/members')
const trainingProgramsRouter = require('./routes/trainingPrograms')
const schedulesRouter = require('./routes/schedules')
app.use('/', staticPagesRouter)
app.use('/members', membersRouter)
app.use('/trainingPrograms', trainingProgramsRouter)
app.use('/schedules', schedulesRouter)

// DATABASE
const mongoose = require('mongoose')
mongoose.set('createIndexes', true)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, 
																						 useUnifiedTopology: true,
																						 useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('+++ Connected to Mongoose +++'))

app.listen(process.env.PORT, () => console.log(`+++ Server Started on Port: ${process.env.PORT} +++`))