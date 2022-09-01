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

// Delete a Spot Image
router.delete('./:imageId', requireAuth, async(req, res, next) => {
    
})


module.exports = router;
