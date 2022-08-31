const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, sequelize, SpotImage, ReviewImage, User, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        // .exists({ checkFalsy: true })
        .matches(/^[0-9\.\-]+$/)
        .withMessage('Latitude is not valid'),
    check('lng')
        // .exists({ checkFalsy: true })
        .matches(/^[0-9\.\-]+$/)
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .isIn([1, 2, 3, 4, 5])
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

// Create an Image for a Review
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    const { url } = req.body;
    const { reviewId } = req.params;
    // console.log(reviewId)
    // console.log(typeof reviewId);

    if (!reviewId) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    }

    const currReview = await Review.findByPk(reviewId)


    if (!currReview) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    }

    // Require Proper authorization error
    if ( currReview.userId !== req.user.id) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    }

    // Get all reviewImages to find the count
    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    });

    if (reviewImages.length > 9) {
        res.status(403);
        return res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }

    const newReviewImage = await currReview.createReviewImage({
        url
    });

    return res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    });

});

// Get Reviews of Current User
router.get('/current', requireAuth, async (req, res, next) => {

    const currReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                include: {
                    model: SpotImage,
                    as: 'previewImage',
                    where: {
                        preview: true
                    },
                    required: false
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    // Format the previewImage for Spot section
    for (let i = 0; i < currReviews.length; i++) {
        let currReview = currReviews[i].toJSON();
        currReview.Spot.previewImage = currReview.Spot.previewImage[0];
        currReviews[i] = currReview
    }

    res.json({
        Reviews: currReviews
    })
})

module.exports = router;
