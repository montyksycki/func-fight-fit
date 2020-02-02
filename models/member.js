// const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')

// const SALT_FACTOR = 10

const memberSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	// password: {
	// 	type: String,
	// 	required: true
	// },
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	phone: {
		type: String
	},
	// title: {
	// 	type: String
	// },
	// instructor: {
	// 	type: Boolean,
	// 	default: false,
	// 	required: true
	// },
	// speciality: {
	// 	type: String,
	// 	required: true
	// },
	// admin: {
	// 	type: Boolean,
	// 	default: false,
	// 	required: true
	// },
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

const Member = mongoose.model('Member', memberSchema)

module.exports = Member
