const router = require('express').Router();
const { Inventory } = require('../db/models');
// const { makeError, isLoggedIn, isAdmin } = require('../../utils');
module.exports = router;

router.param('id', (req, res, next, id) => {
  Inventory.findById(id)
  .then(inventory => {
    if (!inventory) {
      throw Error;
    } else {
      req.inventory = inventory;
    }
    next();
  })
  .catch(next)
});

router.get('/:id', /* isLoggedIn, */ (req,res,next) => {
  req.inventory.reload({ include: [{ all: true }] })
  .then(inventory => res.json(inventory))
  .catch(next)
});

router.post('/', /* isLoggedIn, */ (req,res,next) => {
  Inventory.create(req.body)
  .then(inventory => res.json(inventory))
  .catch(next)
});

router.put('/:id', /* isLoggedIn, */ (req,res,next) => {
  req.inventory.update(req.body)
  .then(() => req.user.reload({ include: [{ all: true }] }))
});

router.delete('/:id', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  req.inventory.destroy()
  .then(() => res.json(req.inventory))
  .catch(next);
})
