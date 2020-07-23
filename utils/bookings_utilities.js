const Booking = require('../models/booking');


const getAllBookings = (req) => {
	console.log('user: ', req.user.username);
	if (req.user.admin) {
		console.log('this is an admin user');
		return Booking.find();
	}
	if (req.user.username) {
		return Booking.findByUsername(req.user.username);
	}
	return null;
};

const getContinent = (req) => {
	if (req.user.admin && req.query.continent) {
		return Booking.findByContinent(req.query.continent);
	}
}

const getBookingById = (req) => {
	return Booking.findById(req.params.id);
};

const addBooking = (req) => {
	let date = Date.now();
	req.body.create_date = date;
	req.body.modified_date = date;
	return new Booking(req.body);
};

function deleteBooking(req) {
	return Booking.findByIdAndRemove(req.params.id);
}

function updateBooking(req) {
	req.body.modified_date = Date.now();
	return Booking.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
}

function archiveBooking(req) {
	if (Booking.modified_date < Booking.getLastModifiedDate)
	return Booking.findByDate(req.params.modified_date, req.body, {
		open_status: true,
	});
}

module.exports = {
	getAllBookings,
	getBookingById,
	addBooking,
	deleteBooking,
	updateBooking,
	getContinent,
	archiveBooking,
};
