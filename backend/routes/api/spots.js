const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Spot,
  Review,
  sequelize,
  SpotImage,
  User,
  ReviewImage,
  Booking,
  Sequelize,
} = require("../../db/models");
const { check, query } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op, operatorsAliases, literal } = require("sequelize");
const { response } = require("../../app");

const router = express.Router();

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    // .exists({ checkFalsy: true })
    .matches(/^[0-9\.\-]+$/)
    .withMessage("Latitude is not valid"),
  check("lng")
    // .exists({ checkFalsy: true })
    .matches(/^[0-9\.\-]+$/)
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required")
    .matches(/^[0-9\.\-]+$/)
    .withMessage("Price must be a number"),
  handleValidationErrors,
];

const validateGetAllSpot = [
  check("page")
    .default(10)
    .isInt({ min: 0 })
    .withMessage("Page must be greater than or equal to 0")
    .isInt({ max: 10 })
    .withMessage("Page must be less than or equal to 10"),
  check("size")
    .default(30)
    .isInt({ min: 0, max: 30 })
    .withMessage("Size must be greater than or equal to 0"),
  check("maxLat")
    .optional({ checkFalsy: true })
    .matches(/^[0-9\.\-]+$/)
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    .optional({ checkFalsy: true })
    .matches(/^[0-9\.\-]+$/)
    .withMessage("Minimum latitude is invalid"),
  check("maxLng")
    .optional({ checkFalsy: true })
    .matches(/^[0-9\.\-]+$/)
    .withMessage("Maximum longitude is invalid"),
  check("minLng")
    .optional({ checkFalsy: true })
    .matches(/^[0-9\.\-]+$/)
    .withMessage("Minimum longitude is invalid"),
  check("maxPrice")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  check("minPrice")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  handleValidationErrors,
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .isIn([1, 2, 3, 4, 5])
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const validateBooking = [
  check("endDate")
    .custom((value, { req }) => {
      console.log(Date.parse(value));
      console.log(Date.parse(req.body.endDate));
      if (Date.parse(value) <= Date.parse(req.body.startDate)) {
        throw new Error();
      }
      return true;
    })
    .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors,
];

const validateImage = [
  check("url")
    .custom((value, { req }) => {
      if (!value.match(/\.(jpeg|jpg|gif|png)$/)) {
        throw new Error();
      }
      return true;
    })
    .withMessage("Image URL invalid: .jpeg .jpg .gif .png accepted"),
  handleValidationErrors,
];

// Get all Spots
router.get("/", validateGetAllSpot, async (req, res, next) => {
  const { maxLat, minLat, maxLng, minLng, maxPrice, minPrice, search } =
    req.query;

  const page = req.query.page === undefined ? 0 : parseInt(req.query.page);
  const size = req.query.size === undefined ? 30 : parseInt(req.query.size);

  let queryParams = {};

  queryParams.limit = size;
  queryParams.offset = page > 0 ? size * (page - 1) : 0;

  if (maxLat || minLat || maxLng || minLng || maxPrice || minPrice) {
    queryParams.where = {};
    if (maxLat && minLat)
      queryParams.where.at = { [Op.between]: [minLat, maxLat] };
    else if (maxLat) queryParams.where.lat = { [Op.lte]: maxLat };
    else if (minLat) queryParams.where.lat = { [Op.gte]: minLat };

    if (maxLng && minLng)
      queryParams.where.at = { [Op.between]: [minLng, maxLng] };
    else if (maxLng) queryParams.where.lng = { [Op.lte]: maxLng };
    else if (minLng) queryParams.where.lng = { [Op.gte]: minLng };

    if (maxPrice && minPrice)
      queryParams.where.at = { [Op.between]: [minPrice, maxPrice] };
    else if (maxPrice) queryParams.where.price = { [Op.lte]: maxPrice };
    else if (minPrice) queryParams.where.price = { [Op.gte]: minPrice };
  }
  console.log(queryParams);

  // return res.json(queryParams);

  let spots;

  if (search) {
    const lowerSearch = search.toLowerCase();
    const nameSpots = await Spot.findAll({
    //   include: [
    //     {
    //       model: Review,
    //       attributes: [],
    //     },
    //   ],
      group: ["Spot.id"],
      where: {
        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + lowerSearch + '%')
      },
    });

    const citySpots = await Spot.findAll({
    //   include: [
    //     {
    //       model: Review,
    //       attributes: [],
    //     },
    //   ],
      group: ["Spot.id"],
      where: {
        city: sequelize.where(sequelize.fn('LOWER', sequelize.col('city')), 'LIKE', '%' + lowerSearch + '%')
      },
    });
    spots = citySpots > nameSpots ? citySpots : nameSpots;
  }

  const allSpots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        as: "previewImage",
        attributes: ["url"],
        where: {
          preview: true,
        },
        required: false,
      },
    ],
    // attributes: {
    //     include: [[sequelize.fn('ROUND', sequelize.fn("AVG", sequelize.col("Reviews.stars")), 1), "avgRating"]]
    // },
    group: ["Spot.id"],
    ...queryParams,
  });

  if (search) {
      const spotIds = spots.map(spot => spot.id)
    console.log('spotids are: ',spotIds)
      spots = allSpots.filter(spot => spotIds.includes(spot.id))
      console.log('spotids are: ',spots)
  } else {
    spots = allSpots
  }


  for (let i = 0; i < spots.length; i++) {
    // Get the average rating for each spot
    const avg = await Review.findAll({
      where: {
        spotId: spots[i].id,
      },
      // attributes: {
      //     include: [[sequelize.fn('ROUND', sequelize.fn("AVG", sequelize.col("stars")), 1), "avgRating"]]
      // }
    });

    let avgRating = null;
    if (avg.length) {
      for (let i = 0; i < avg.length; i++) {
        avgRating += avg[i].toJSON().stars;
      }
      avgRating = avgRating / avg.length;
    }

    // Format the previewImage to have a value of a string instead of an object with a string
    let newSpot = spots[i].toJSON();
    if (newSpot.previewImage[0]) {
      let url = "";
      console.log(newSpot.previewImage[0].url);
      url = newSpot.previewImage[0].url;
      newSpot.previewImage = url;
    } else newSpot.previewImage = null;

    newSpot.avgRating = avgRating;
    newSpot.reviewCount = avg.length;
    spots[i] = newSpot;
  }

  return res.json({
    Spots: spots,
    page: page,
    size: size,
  });
});

// Create a Spot
router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  // requireAuth(req)
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

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
    price,
  });

  return res.json(newSpot);
});

// Add Image to Spot based on Spot id
router.post(
  "/:spotId/images",
  validateImage,
  requireAuth,
  async (req, res, next) => {
    let { url, preview } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
        statusCode: res.statusCode,
      });
    }

    // Error handling
    if (req.user.id !== spot.ownerId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: res.statusCode,
      });
    }

    // if (!url.match(/\.(jpeg|jpg|gif|png)$/)) {
    //     res.status(404);
    //     return res.json({
    //         message: "Preview Image Url is invalid",
    //         statusCode: res.statusCode
    //     })
    // }

    let itsId = 0;
    // if preview is true we need to set preview to false for the old one
    if (preview) {
      const previewImage = await SpotImage.findOne({
        where: {
          preview: true,
          spotId: req.params.spotId,
        },
      });
      if (previewImage) {
        previewImage.preview = false;
        await previewImage.save();
      }
    } else preview = false;

    const newSpotImage = await SpotImage.create({
      spotId: req.params.spotId,
      url,
      preview,
    });

    return res.json({
      id: newSpotImage.id,
      url: newSpotImage.url,
      preview: newSpotImage.preview,
    });
  }
);

router.get("/current", requireAuth, async (req, res, next) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        as: "previewImage",
        attributes: ["url"],
        where: {
          preview: true,
        },
        required: false,
      },
    ],
    attributes: {
      include: [
        [
          sequelize.fn(
            "ROUND",
            sequelize.fn("AVG", sequelize.col("Reviews.stars")),
            1
          ),
          "avgRating",
        ],
      ],
    },
    group: ["Spot.id", "previewImage.id"],
  });

  for (let i = 0; i < spots.length; i++) {
    let newSpot = spots[i].toJSON();

    if (newSpot.previewImage[0]) {
      let url = "";
      console.log(newSpot.previewImage[0].url);
      url = newSpot.previewImage[0].url;
      newSpot.previewImage = url;
    } else newSpot.previewImage = null;
    if (newSpot.avgRating) newSpot.avgRating = parseFloat(newSpot.avgRating);

    spots[i] = newSpot;
  }

  return res.json({
    Spots: spots,
  });
});

// Get Details of Spot by Id
router.get("/:spotId", async (req, res, next) => {
  let spot = await Spot.findOne({
    where: {
      id: req.params.spotId,
    },
    include: [
      {
        model: Review,
        attributes: [],
      },
    ],
    attributes: {
      include: [
        [
          sequelize.fn(
            "ROUND",
            sequelize.fn("AVG", sequelize.col("Reviews.stars")),
            1
          ),
          "avgRating",
        ],
        [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
      ],
    },
    group: ["Spot.id"],
  });

  // Error handling
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode,
    });
  }

  const images = await SpotImage.findAll({
    where: {
      spotId: req.params.spotId,
    },
    attributes: ["id", "url", "preview"],
  });

  const spotOwner = await spot.getUser({
    attributes: ["id", "firstName", "lastName"],
  });

  spot = spot.toJSON();
  spot.SpotImages = images;
  spot.Owner = spotOwner;

  return res.json(spot);
});

router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const oldSpot = await Spot.findByPk(req.params.spotId);

  let error = false;
  if (!oldSpot) {
    error = true;
  } else if (req.user.id !== oldSpot.ownerId) error = true;

  if (error) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode,
    });
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
    price,
  });

  return res.json(oldSpot);
});

// Create a Review for a Spot
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const { review, stars } = req.body;

    const currSpot = await Spot.findByPk(req.params.spotId);

    if (!currSpot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
        statusCode: res.statusCode,
      });
    }

    const oldReview = await Review.findOne({
      where: {
        spotId: currSpot.id,
        userId: req.user.id,
      },
    });

    if (oldReview) {
      res.status(403);
      return res.json({
        message: "User already has a review for this spot",
        statusCode: res.statusCode,
      });
    }

    const newReview = await currSpot.createReview({
      userId: req.user.toJSON().id,
      review,
      stars,
    });

    return res.json(newReview);
  }
);

// Get Reviews by Spot id
router.get("/:spotId/reviews", async (req, res, next) => {
  const spotReviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  if (!spotReviews.length) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode,
    });
  }

  return res.json({
    Reviews: spotReviews,
  });
});

// Create a Booking Based on a Spot id
router.post(
  "/:spotId/bookings",
  requireAuth,
  validateBooking,
  async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const { spotId } = req.params;

    const currSpot = await Spot.findOne({
      where: {
        id: spotId,
      },
    });

    // Error handling
    if (!currSpot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
        statusCode: res.statusCode,
      });
    }

    //Require proper authorization implementation
    if (req.user.id === currSpot.ownerId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: res.statusCode,
      });
    }

    // Booking Conflict

    let startDateConflict = false;
    let endDateConflict = false;

    const allBookings = await Booking.findAll({
      where: {
        spotId,
      },
    });

    for (let i = 0; i < allBookings.length; i++) {
      let booking = allBookings[i].toJSON();
      let bookStart = Date.parse(booking.startDate);
      let bookEnd = Date.parse(booking.endDate);
      let startDateTime = Date.parse(startDate);
      let endDateTime = Date.parse(endDate);

      if (startDateTime >= bookStart && startDateTime <= bookEnd) {
        console.log("true");
        startDateConflict = true;
      }
      if (endDateTime >= bookStart && endDateTime <= bookEnd) {
        console.log("true");
        endDateConflict = true;
      }
    }

    let errors = {};
    if (startDateConflict)
      errors.startDate = "Start date conflicts with an existing booking";
    if (endDateConflict)
      errors.endDate = "End date conflicts with an existing booking";

    if (startDateConflict || endDateConflict) {
      res.status(403);
      return res.json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: res.statusCode,
        errors,
      });
    }

    // Done with error handling, do the task
    const newBooking = await currSpot.createBooking({
      startDate,
      endDate,
      userId: req.user.id,
    });
    return res.json(newBooking);
  }
);

// Get All Bookings for a Spot By Id
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;

  const bookingSpot = await Spot.findByPk(spotId);
  if (!bookingSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode,
    });
  }

  const currBookings = await Booking.findAll({
    where: {
      spotId,
    },
    include: {
      model: User,
      attributes: ["id", "firstName", "lastName"],
      required: false,
    },
  });

  const notOwnerBooking = await Booking.findAll({
    where: {
      spotId,
    },
    attributes: ["spotId", "startDate", "endDate"],
  });

  if (req.user.id !== bookingSpot.ownerId) {
    return res.json({
      Bookings: notOwnerBooking,
    });
  } else
    return res.json({
      Bookings: currBookings,
    });
});

// Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const oldSpot = await Spot.findByPk(req.params.spotId);

  // Error handling
  if (!oldSpot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: res.statusCode,
    });
  }

  //Require proper authorization implementation
  if (req.user.id !== oldSpot.ownerId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
      statusCode: res.statusCode,
    });
  }

  await oldSpot.destroy();

  res.status(200);
  return res.json({
    message: "Successfully deleted",
    statausCode: 200,
  });
});

module.exports = router;
