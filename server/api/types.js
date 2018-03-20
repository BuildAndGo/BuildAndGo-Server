const router = require('express').Router()
const { Type } = require('../db/models')
// const { makeError, isLoggedIn, isAdmin } = require('../../utils')
module.exports = router

router.param('id', (req, res, next, id) => {
  Type.findById(id)
  .then(type => {
    if (!type) {
      throw Error;
    } else {
      req.type = type;
    }
    next();
  })
  .catch(next)
});

router.get('/', (req,res,next) => {
  Type.findAll({ include: [{ all: true }] })
  .then(types => res.json(types))
  .catch(next)
});

router.get('/:id', /* isLoggedIn, */ (req,res,next) => {
  req.type.reload({ include: [{ all: true }] })
  .then(type => res.json(type))
  .catch(next)
});

router.post('/', /* isLoggedIn, isAdmin, */ (req,res,next) => {
  Type.create(req.body)
  .then(type => res.json(type))
  .catch(next)
})

router.put('/:id', /* isLoggedIn, isAdmin, */ (req,res,next) => {
  req.type.update(req.body)
  .then(() => req.type.reload({ include: [{ all: true }] }))
});

router.delete('/:id', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  req.type.destroy()
  .then(() => res.json(req.type))
  .catch(next);
})
