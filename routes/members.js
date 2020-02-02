const express = require('express')
const router = express.Router()
const Member = require('../models/member')
const passport = require('passport')

// SET VARIABLES
// router.use((req, res, next) => {
// 	res.locals.currentMember = req.member
// 	res.locals.errors = req.flash('error')
// 	res.locals.infos = req.flash('info')
// 	next()
// })

// router.get('/signup', (req, res) => {
// 	res.send('sign up')
// })

// router.get('/login', (req, res) => {
// 	res.send('login')
// })

// MEMBERS - ALL
router.get('/', async (req, res) => {
	try {
		const locals = {
			title: 'All Active Members'
		}
		const members = await Member.find().sort({ createdAt: 'descending' })
		res.render('members/index', { members, title: 'All Active Members' } )
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// MEMBER - NEW
router.get('/new', async (req, res) => {
		res.render('members/new', { title: 'Create New Member' })
})

// MEMBER - CREATE
router.post('/', async (req, res) => {
	const member = new Member({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		phone: req.body.phone,
		instructor: req.body.instructor,
		admin: req.body.admin
	})
	try {
		const newMember = await member.save()
		res.redirect('/members')
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// MEMBER - SHOW
router.get('/:id', getMember, async (req, res) => {
	try {
		const showMember = await res.member
		res.render('members/show', { showMember, title: 'Show Member' })
	} catch (err) {
		res.json({ message: err.message })
	}
})

// MEMBERS - EDIT
router.get('/:id/edit', getMember, async (req, res) => {
	try {
		const editMember = await res.member
	  res.render('members/edit', { editMember, title: 'Edit Member' })
	} catch {
		res.redirect('/members')
	}
})

// MEMBERS - UPDATE
router.put('/:id', getMember, async (req, res) => {
	const attributes = [
	'first_name',
	'last_name',
	'email',
	'phone' ]

	attributes.forEach(attribute => {
		if ( req.body[attribute] != null ) {
			res.member[attribute] = req.body[attribute] 
		}
	})

	// if ( req.body.first_name != null ) {
	// 	res.member.first_name = req.body.first_name 
	// }
	// if ( req.body.last_name != null ) {
	// 	res.member.last_name = req.body.last_name 
	// }
	// if ( req.body.email != null ) {
	// 	res.member.email = req.body.email 
	// }
	// if ( req.body.phone != null ) {
	// 	res.member.phone = req.body.phone 
	// }

	try {
		const updatedMember = await res.member.save()
		res.redirect('/members')
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// MEMBERS - DELETE
router.delete('/:id', getMember, async (req, res) => {
	try {
		await res.member.remove()
		res.redirect('/members')
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

async function getMember(req, res, next) {
	let member
	try {
		member = await Member.findById(req.params.id)
		if ( member == null ) {
			return res.status(404).json({ message: "Cannot find member" })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.member = member
	next()
}

module.exports = router