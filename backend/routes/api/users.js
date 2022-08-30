const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
    check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    // .withMessage('Please provide a username with at least 4 characters.'),
    .withMessage('Username is required'),
  check('firstName')
    .exists({ checkFalsy: true})
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true})
    .withMessage('Last Name is required'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    let errors = {};

    const dbEmail = await User.findOne({
      where: {
        email: email
      }
    });
    const dbUsername = await User.findOne({
      where: {
        username: username
      }
    })

    if (dbEmail) errors.email = "User with that email already exists";
    if (dbUsername) errors.username = "User with that username already exists";

    if (Object.keys(errors)) {
      res.status(403);
      return res.json({
        message: "User already exists",
        statusCode: res.statusCode,
        errors
      })
    }


    let user = await User.signup({ firstName, lastName, email, username, password });

    const token = await setTokenCookie(res, user);

    user = user.toJSON()
    delete user.createdAt;
    delete user.updatedAt;
    user.token = token;

    return res.json({
        ...user
    });
}
);

module.exports = router;
