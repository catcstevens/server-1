const {
	getAllBookings,
	getBookingById,
	addBooking,
	deleteBooking,
	updateBooking,
	getContinent,
} = require('../utils/bookings_utilities');

const getBookings = (req, res) => {
	getAllBookings(req)
		.sort({
			modified_date: -1,
		})
		.exec((error, bookings) => {
			if (error) {
				res.status(500);
				return res.json({
					error: error.message,
				});
			}
			res.send(bookings);
		});
};

const getBookingsByContinent = (req, res) => {
	getContinent(req)
		.sort({
			modified_date: -1,
		})
		.exec((error, bookings) => {
			if (error) {
				res.status(500);
				return res.json({
					error: error.message,
				});
			}
			res.send(bookings);
		});
};

const getBooking = (req, res) => {
	getBookingById(req).exec((error, booking) => {
		if (error) {
			res.status(404);
			return res.send('Booking not found');
		}
		res.send(booking);
	});
};

const makeBooking = (req, res) => {
	req.body.modified_date = new Date();
	req.body.username = req.user.username;
	console.log('received booking req', req);
	addBooking(req).save((error, booking) => {
		if (error) {
			res.status;
			res.json({
				error: error.message,
			});
		}
		res.status(201);
		res.send(booking);
	});
};

const changeBooking = (req, res) => {
	updateBooking(req).exec((error, booking) => {
		if (error) {
			res.status(500);
			return res.json({
				error: error.message,
			});
		}
		res.status(200);
		res.send(booking);
	});
};

const removeBooking = (req, res) => {
	deleteBooking(req).exec((error, booking) => {
		if (error) {
			res.status(500);
			return res.json({
				error: error.message,
			});
		}
		res.sendStatus(204);
	});
};

module.exports = {
	getBookings,
	getBooking,
	makeBooking,
	changeBooking,
	removeBooking,
	getBookingsByContinent,
};
