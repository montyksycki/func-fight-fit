// const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')

// const SALT_FACTOR = 10

const trainingProgramSchema = new mongoose.Schema({
	trainingProgramTitle: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	genderAge: {
		type: String,
		required: true
	},
	trainingProgramType: {
		type: String,
		required: true
	},
	level: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

// const noop = function() {}

// memberSchema.pre('save', (done) => {
// 	var member = this;
// 	if ( !member.isModified('password') ) {
// 		return done();
// 	}

// 	bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
// 		if (err) { return done(err) }
// 		bcrypt.hash(member.password, salt, noop, (err, hashedPassword) => {
// 			if (err) { return done(err) }
// 			member.password = hashedPassword
// 			done()
// 		})
// 	})
// })

// memberSchema.methods.checkPassword = (guess, done) => {
// 	bcrypt.compare(guess, this.password, (err, isMatch) => {
// 		done(err, isMatch)
// 	})
// }

const TrainingProgram = mongoose.model('TrainingProgram', trainingProgramSchema)

module.exports = TrainingProgram


// 'trainingProgramTitle',
// 'description',
// 'genderAge',
// 'trainingProgramType',
// 'level'
