const express = require('express')
const router = express.Router()
const TrainingProgram = require('../models/trainingProgram')

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

// TRAINING-PROGRAM - ALL
router.get('/', async (req, res) => {
	try {
		const locals = {
			title: 'All Training Programs'
		}
		const trainingPrograms = await TrainingProgram.find().sort({ createdAt: 'descending' })
		res.render('trainingPrograms/index', { trainingPrograms, title: 'All Training Programs' } )
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// TRAINING-PROGRAM - NEW
router.get('/new', async (req, res) => {
		res.render('trainingPrograms/new', { title: 'Create New Training Program' })
})

// TRAINING-PROGRAM - CREATE
router.post('/', async (req, res) => {
	const trainingProgram = new TrainingProgram({
		trainingProgramTitle: req.body.trainingProgramTitle,
		description: req.body.description,
		trainingProgramType: req.body.trainingProgramType,
		genderAge: req.body.genderAge,
		level: req.body.level
	})
	try {
		const newTrainingProgram = await trainingProgram.save()
		res.redirect('/trainingPrograms')
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// TRAINING-PROGRAM - SHOW
router.get('/:id', getTrainingProgram, async (req, res) => {
	try {
		const showTrainingProgram = await res.program
		res.render('trainingPrograms/show', { showTrainingProgram, title: 'Show Training Program' })
	} catch (err) {
		res.json({ message: err.message })
	}
})

// TRAINING-PROGRAM - EDIT
router.get('/:id/edit', getTrainingProgram, async (req, res) => {
	try {
		const editTrainingProgram = await res.program
		// const radioValue = document.getElementsByClassName("radioProgramType").getAttribute("value")
		// if ( radioValue == editTrainingProgram.trainingProgramType ) {
		// return radioValue.color = red
		// radioValue.checked = true
	// }
		// setRadioValue
	  res.render('trainingPrograms/edit', { editTrainingProgram, title: 'Edit Training Program Details' })
		// console.log(editTrainingProgram.trainingProgramType)
	} catch {
		res.redirect('/trainingPrograms')
	}
})

// TRAINING-PROGRAM - UPDATE
router.put('/:id', getTrainingProgram, async (req, res) => {
	const attributes = [
	'trainingProgramType',
	'level',
	'genderAge',
	'trainingProgramTitle',
	'description'	]

	attributes.forEach(attribute => {
		if ( req.body[attribute] != null ) {
			res.program[attribute] = req.body[attribute] 
		}
	})

	try {
		const updatedTrainingProgram = await res.program.save()
		res.redirect('/trainingPrograms')
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// TRAINING-PROGRAM - DELETE
router.delete('/:id', getTrainingProgram, async (req, res) => {
	try {
		await res.program.remove()
		res.redirect('/trainingPrograms')
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

async function getTrainingProgram(req, res, next) {
	let program
	try {
		program = await TrainingProgram.findById(req.params.id)
		if ( program == null ) {
			return res.status(404).json({ message: "Cannot find training program." })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.program = program
	next()
}

module.exports = router