const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the booking schema here
const Booking = new Schema({
	child_name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		default: '',
	},
	postcode: {
		type: String,
		required: true,
	},
	continent: {
		type: String,
		required: true,
	},
	teeth: {
		type: Number,
		required: true,
	},
	currency: {
		type: String,
		required: true,
	},
	create_date: {
		type: Date,
		required: true,
	},
	modified_date: {
		type: Date,
		required: true,
	},
	open_status: {
		type: Boolean,
		default: true,
	},
	review_status: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
	},
	comments: {
		type: String,
		default: '',
	},
});

Booking.statics.findByUsername = function (username) {
	return this.find({
		username: username,
	});
};

Booking.statics.findByContinent = function (continent) {
	return this.find({
		continent: continent,
	});
};

Booking.statics.findByDate = function (getLastModified_date) {
	return this.find({
		modified_date: getLastModified_date,
	})
}

module.exports = mongoose.model('Booking', Booking);
