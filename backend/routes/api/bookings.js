const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, sequelize, SpotImage, User, ReviewImage, Booking, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

const validateBooking = [
    check('endDate')
        .custom((value, { req }) => {
            console.log(Date.parse(value))
            console.log(Date.parse(req.body.endDate))
            if (Date.parse(value) <= Date.parse(req.body.startDate)) {
                throw new Error()
            }
            return true;
        })
        .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
]

// Get All Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const currBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot,
            attributes: { exclude: ['createdAt', 'updatedAt', 'description'] },
            include: {
                model: SpotImage,
                as: 'previewImage',
                attributes: ['url'],
                where: {
                    preview: true
                },
                required: false
            }
        }
    });

    // Format the previewImage for Spot section
    for (let i = 0; i < currBookings.length; i++) {
        let currBooking = currBookings[i].toJSON();
        if (currBooking.Spot.previewImage[0]) {
            currBooking.Spot.previewImage = currBooking.Spot.previewImage[0].url;
            currBookings[i] = currBooking
        } else {
            currBooking.Spot.previewImage = null;
        }
    };

    res.json({
        Bookings: currBookings
    });
})

// Edit a booking
router.put('/:bookingId', requireAuth, validateBooking, async (req, res, next) => {

    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;

    const updateBooking = await Booking.findByPk(bookingId);

    // Error handling
    if (!updateBooking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: res.statusCode
        })
    }

    // Past booking cant be edited
    const bookingStart = updateBooking.toJSON().startDate;
    const bookingEnd = updateBooking.toJSON().endDate;

    if (Date.parse(bookingEnd) < Date.now()) {
        res.status(403)
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: res.statusCode
        })
    }

    //Require proper authorization implementation
    if (req.user.id !== updateBooking.userId) {
        res.status(403)
        return res.json({
            message: "Forbidden",
            statusCode: res.statusCode
        })
    }

    // Booking Conflict

    let startDateConflict = false;
    let endDateConflict = false;

    const allBookings = await Booking.findAll({
        where: {
            spotId: updateBooking.toJSON().spotId
        }
    })

    for (let i = 0; i < allBookings.length; i++) {
        let booking = allBookings[i].toJSON();
        let bookStart = Date.parse(booking.startDate);
        let bookEnd = Date.parse(booking.endDate);
        let startDateTime = Date.parse(startDate);
        let endDateTime = Date.parse(endDate);

        if (startDateTime >= bookStart && startDateTime <= bookEnd) {
            console.log('true')
            startDateConflict = true;
        }
        if (endDateTime >= bookStart && endDateTime <= bookEnd) {
            console.log('true')
            endDateConflict = true;
        }
    }

    let errors = {};
    if (startDateConflict) errors.startDate = "Start date conflicts with an existing booking";
    if (endDateConflict) errors.endDate = "End date conflicts with an existing booking";

    if (startDateConflict || endDateConflict) {
        res.status(403);
        return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: res.statusCode,
            errors
        })
    }

    const newBooking = await updateBooking.update({
        startDate,
        endDate
    })

    return res.json(newBooking);
})

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const oldBooking = await Booking.findOne({
        where: {
            id: req.params.bookingId
        },
        include: [
            {
                model: Spot
            }
        ]
    });

    // Error handling
    if (!oldBooking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: res.statusCode
        })
    }

    //Require proper authorization implementation
    if (!(req.user.id !== oldBooking.Spot.ownerId || req.user.id !== oldBooking.userId)) {
        res.status(403)
        return res.json({
            message: "Forbidden",
            statusCode: res.statusCode
        })
    }

    // Bookings that have been started can't be deleted
    if (Date.parse(oldBooking.startDate) < Date.now()) {
        res.status(403)
        return res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: res.statusCode
        })
    }


    await oldBooking.destroy();

    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statausCode: 200
    })
})

module.exports = router;
