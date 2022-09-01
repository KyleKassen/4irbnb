const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, sequelize, SpotImage, User, ReviewImage, Booking, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

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

    res.json(currBookings);
})

module.exports = router;
