const router = require('express').Router()
const { Part } = require('../db/models')
// const { makeError, isLoggedIn, isAdmin } = require('../../utils')
module.exports = router

router.param('id', (req, res, next, id) => {
  Part.findById(id)
  .then(part => {
    if (!part) {
      throw Error;
    } else {
      req.part = part;
    }
    next();
  })
  .catch(next)
})

router.get('/', (req,res,next) => {
  Part.findAll({ include: [{ all: true }] })
  .then(parts => res.json(parts))
  .catch(next)
})

router.get('/:id', /* isLoggedIn, */ (req,res,next) => {
  req.part.reload({ include: [{ all: true }] })
  .then(part => res.json(part))
  .catch(next)
})

router.post('/', /* isLoggedIn, isAdmin, */ (req,res,next) => {
  Part.create(req.body)
  .then(part => res.json(part))
  .catch(next)
})

router.put('/:id', /* isLoggedIn, */ (req,res,next) => {
  req.part.update(req.part)
  .then(() => req.part.reload({ include: [{ all: true }] }))
})
