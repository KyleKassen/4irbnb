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
router.delete('/:imageId', requireAuth, async(req, res, next) => {

    const oldImage = await ReviewImage.findOne({
        where: {
            id: req.params.imageId
        },
        include: {
            model: Review
        }
    });

    // Error handling
    if(!oldImage) {
        res.status(404)
        return res.json({
            message: "Review Image couldn't be found",
            statusCode: res.statusCode
        })
    }

    //Require proper authorization implementation
    if(req.user.id !== oldImage.Review.userId) {
        res.status(403)
        return res.json({
            message: "Forbidden",
            statusCode: res.statusCode
        })
    }

    await oldImage.destroy();

    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statausCode: 200
    })
})


module.exports = router;
