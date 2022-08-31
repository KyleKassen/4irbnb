const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, sequelize, SpotImage, Sequelize } = require('../../db/models');
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

    newSpot.ownerId = req.user.toJSON().id;

    return res.json(newSpot);
})

module.exports = router;
