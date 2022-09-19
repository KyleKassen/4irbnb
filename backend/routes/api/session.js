const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Email or username is required.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
    handleValidationErrors
  ];

// Log in
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    let user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials are invalid.'];
        return next(err);
    }

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

// Get current user
router.get('/', async (req, res, next) => {
    // let answer = await restoreUser;
    // console.log(req.user)
    if (req.user === null) return res.json(null);
    const currUser = req.user.toJSON();
    delete currUser.createdAt;
    delete currUser.updatedAt;
    return res.json(currUser);
})

// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

// Restore session user
router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
        return res.json({
            user: user.toSafeObject()
        });
    } else return res.json({});
}
);

module.exports = router;
