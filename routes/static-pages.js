const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	var locals = {
		title: 'Welcome to Delete 007',
		description: '',
		header: ''
	}
	res.render('static-pages/index', locals)
})

router.get('/about', (req, res) => {
	var locals = {
		title: 'Delete 007 - About',
		description: '',
		header: ''
	}
	res.render('static-pages/about', locals)
})

router.get('/contact', (req, res) => {
	var locals = {
		title: 'Delete 007 - Contact',
		description: '',
		header: ''
	}
	res.render('static-pages/contact', locals)
})

router.get('/stats', (req, res) => {
	var locals = {
		title: 'Delete 007 - Stats',
		description: '',
		header: ''
	}
	res.render('static-pages/stats', locals)
})

router.get('/staff', (req, res) => {
	var locals = {
		title: 'Delete 007 - Staff',
		description: '',
		header: ''
	}
	res.render('static-pages/staff', locals)
})

module.exports = router