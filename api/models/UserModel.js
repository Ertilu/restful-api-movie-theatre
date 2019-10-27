const mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
const saltRounds = 10;

const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
        type: String,
        index: { unique: true },
		required: true,
	},

	password: {
        type: String,
        required: true
    },

	age: {
		type: Number,
		required: true,
	},

},

{
	timestamps: true
})

// hash user password before saving into database
UserSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

module.exports = mongoose.model('User', UserSchema)