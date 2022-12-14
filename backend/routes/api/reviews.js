const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, sequelize, SpotImage, ReviewImage, User, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

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
    if (currReview.userId !== req.user.id) {
        res.status(403)
        return res.json({
            message: "Forbidden",
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
        if (currReview.Spot.previewImage[0]) {
            currReview.Spot.previewImage = currReview.Spot.previewImage[0].url;
            currReviews[i] = currReview
        } else {
            currReview.Spot.previewImage = null;
        }
    }

    res.json({
        Reviews: currReviews
    })
});


// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {

    const { review, stars } = req.body;

    const oldReview = await Review.findByPk(req.params.reviewId);

    if (!oldReview) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    };

    //Require proper authorization implimintation
    if (req.user.id !== oldReview.userId) {
        res.status(403)
        return res.json({
            message: "Forbidden",
            statusCode: res.statusCode
        })
    };

    oldReview.update({
        review,
        stars
    })

    res.json(oldReview)
});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {


    const oldReview = await Review.findByPk(req.params.reviewId)

    // Error handling
    if (!oldReview) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found",
            statusCode: res.statusCode
        })
    }

    //Require proper authorization implementation
    if (req.user.id !== oldReview.userId) {
        res.status(403)
        return res.json({
            message: "Forbidden",
            statusCode: res.statusCode
        })
    }

    await oldReview.destroy();

    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statausCode: 200
    })
})

module.exports = router;
