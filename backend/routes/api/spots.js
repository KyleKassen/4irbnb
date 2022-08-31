const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, sequelize, SpotImage, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();


// Get all Spots
router.get('/', async (req, res, next) => {

    const spotAttributes = ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt']

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
        attributes: [...spotAttributes, [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]],
        // attributes: {
        //     include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]]
        // },
        group: ['Spot.id', 'previewImage.id']
    });

    for(let i = 0; i < spots.length; i++) {
        let newSpot = spots[i].toJSON()
        // console.log(newSpot)
        if (newSpot.previewImage[0]) {
            let url = ''
            console.log(newSpot.previewImage[0].url)
            url = newSpot.previewImage[0].url
            newSpot.previewImage = url;
        }

        spots[i] = newSpot
    }

    return res.json({
        Spots: spots
    })
})

module.exports = router;
