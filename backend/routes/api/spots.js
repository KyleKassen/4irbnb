const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, sequelize, SpotImage, User, ReviewImage, Booking, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');
const { response } = require('../../app');

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


// Get all Spots
router.get('/', async (req, res, next) => {

    // const spotAttributes = ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt']

    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                as: 'previewImage',
                attributes: ['url'],
                where: {
                    preview: true
                },
                required: false,
            }
        ],
        // attributes: [...spotAttributes, [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]],
        // attributes: {
        //     include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]]
        // },
        attributes: {
            include: [[sequelize.fn('ROUND', sequelize.fn("AVG", sequelize.col("Reviews.stars")), 1), "avgRating"]]
        },
        group: ['Spot.id', 'previewImage.id']
    });

    for (let i = 0; i < spots.length; i++) {
        let newSpot = spots[i].toJSON()
        // console.log(newSpot)
        if (newSpot.previewImage[0]) {
            let url = ''
            console.log(newSpot.previewImage[0].url)
            url = newSpot.previewImage[0].url
            newSpot.previewImage = url;
        }
        if (newSpot.avgRating) newSpot.avgRating = parseFloat(newSpot.avgRating);

        spots[i] = newSpot
    }

    return res.json({
        Spots: spots
    })
})

// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    // requireAuth(req)
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId: req.user.toJSON().id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    return res.json(newSpot);
})

// Add Image to Spot based on Spot id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    let { url, preview } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    let error = false;

    // Error handling
    if (!spot) {
        error = true
    } else if (req.user.id !== spot.ownerId) {
        error = true
    }

    if (error) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    // if preview is true we need to set preview to false for the old one
    if (preview) {
        const previewImage = await SpotImage.findOne({
            where: {
                preview: true
            }
        });
        if (previewImage) {
            previewImage.preview = false;
            await previewImage.save();
        };
    } else preview = false;

    const newSpotImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview
    })

    return res.json({
        id: newSpotImage.id,
        url: newSpotImage.url,
        preview: newSpotImage.preview
    });
});

router.get('/current', requireAuth, async (req, res, next) => {

    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                as: 'previewImage',
                attributes: ['url'],
                where: {
                    preview: true
                },
                required: false,
            }
        ],
        attributes: {
            include: [[sequelize.fn('ROUND', sequelize.fn("AVG", sequelize.col("Reviews.stars")), 1), "avgRating"]]
        },
        group: ['Spot.id', 'previewImage.id']
    });

    for (let i = 0; i < spots.length; i++) {
        let newSpot = spots[i].toJSON()
        // console.log(newSpot)
        if (newSpot.previewImage[0]) {
            let url = ''
            console.log(newSpot.previewImage[0].url)
            url = newSpot.previewImage[0].url
            newSpot.previewImage = url;
        }
        if (newSpot.avgRating) newSpot.avgRating = parseFloat(newSpot.avgRating);

        spots[i] = newSpot
    }

    return res.json({
        Spots: spots
    });
})

// Get Details of Spot by Id
router.get('/:spotId', async (req, res, next) => {
    let spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include: [
            {
                model: Review,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [sequelize.fn('ROUND', sequelize.fn("AVG", sequelize.col("Reviews.stars")), 1), "avgRating"],
                [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"]
            ]
        },
        group: ['Spot.id']
    });

    // Error handling
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    const images = await SpotImage.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['id', 'url', 'preview']
    });

    const spotOwner = await spot.getUser({
        attributes: ['id', 'firstName', 'lastName']
    });

    spot = spot.toJSON()
    spot.SpotImages = images;
    spot.Owner = spotOwner;

    return res.json({
        Spots: spot
    });
})

router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const oldSpot = await Spot.findByPk(req.params.spotId);

    let error = false
    if (!oldSpot) {
        error = true
    } else if (req.user.id !== oldSpot.ownerId) error = true;

    if (error) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    oldSpot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    return res.json(oldSpot)
});

// Create a Review for a Spot
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body;

    const currSpot = await Spot.findByPk(req.params.spotId);

    if (!currSpot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    const oldReview = await Review.findOne({
        where: {
            spotId: currSpot.id,
            userId: req.user.id
        }
    })

    if (oldReview) {
        res.status(403);
        return res.json({
            message: "User already has a review for this spot",
            statusCode: res.statusCode
        })
    }


    const newReview = await currSpot.createReview({
        userId: currSpot.ownerId,
        review,
        stars
    })

    return res.json(newReview);
});

// Get Reviews by Spot id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spotReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    if (!spotReviews.length) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    return res.json(spotReviews);
})

// Create a Booking Based on a Spot id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {

    const { startDate, endDate } = req.body;
    const {spotId} = req.params;

    const currSpot = await Spot.findByPk(spotId);

    if(!currSpot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    //Require proper authorization implementation
    if(req.user.id === currSpot.ownerId) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

})


// Get All Bookings for a Spot By Id
router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {
    const {spotId} = req.params;

    const currBookings = await Booking.findAll({
        where: {
            spotId
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
            required: false
        }
    });

    const notOwnerBooking = await Booking.findAll({
        where: {
            spotId
        },
        attributes: ['spotId', 'startDate', 'endDate']
    })

    if(!currBookings.length) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: res.statusCode
        })
    }

    if (req.user.id !== spotId) {
        return res.json({
            Bookings: notOwnerBooking
        })
    } else return currBookings;

})

module.exports = router;
