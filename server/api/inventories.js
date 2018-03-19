const router = require('express').Router()
const { Inventory } = require('../db/models')
const { makeError, isLoggedIn, isAdmin } = require('../../utils')
module.exports = router

router.param('id', (req, res, next, id) => {
  User.findById(id)
  .then(user => {
    if (!user) {
      throw Error;
    } else {
      req.requestedUser = user;
    }
    next();
  })
  .catch(next)
})
