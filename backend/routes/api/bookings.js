const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, sequelize, SpotImage, User, ReviewImage, Booking, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

const validateBooking = [
    check('endDate')
        .custom((value,{req}) => {
            console.log(Date.parse(value))
            console.log(Date.parse(req.body.endDate))
            if(Date.parse(value) <= Date.parse(req.body.startDate)) {
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
        if(currBooking.Spot.previewImage[0]) {
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
router.put('/:bookingId', requireAuth, validateBooking, async(req, res, next) => {

    const {bookingId} = req.params;
    const {startDate, endDate} = req.body;

    const updateBooking = await Booking.findByPk(bookingId);

    // Error handling
    if (!bookingId) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: res.statusCode
        })
    }

    // Past booking cant be edited
    console.log(Date.now())

    //Require proper authorization implementation
    if(req.user.id !== updateBooking.userId) {
        res.status(403)
        return res.json({
            message: "Forbidden",
            statusCode: res.statusCode
        })
    }


})

module.exports = router;
