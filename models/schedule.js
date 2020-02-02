const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
	time: {
		type: Date,
		required: true,
		unique: true
	},
	weekday: {
		type: Date,
		required: true
	},
	trainingProgram: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'TrainingProgram'
	}
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = Schedule