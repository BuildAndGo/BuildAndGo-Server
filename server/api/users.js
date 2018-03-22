const router = require('express').Router()
const { User, Part } = require('../db/models')
module.exports = router

// router.get('/', (req, res, next) => {
//   User.findAll({
//     // explicitly select only the id and email fields - even though
//     // users' passwords are encrypted, it won't help if we just
//     // send everything to anyone who asks!
//   })
//     .then(users => res.json(users))
//     .catch(next)
// })

router.param('id', (req,res,next, id) => {
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
});

router.get('/:id', /* isLoggedIn, */ (req,res,next) => {
  req.requestedUser.reload()
  .then(user => res.json(user))
  .catch(next)
});

router.post('/', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  User.create(req.body)
  .then(user => res.json(user))
  .catch(next);
});

router.put('/:id', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  req.requestedUser.update(req.body)
    .then(() => req.user.reload({ include: [{ all: true }] }))
  .then(result => res.json(result))
  .catch(next);
});

router.delete('/:id', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  req.requestedUser.destroy()
  .then(() => res.json(req.user))
  .catch(next);
});

router.put('/:id/inventory', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  part = req.body;
  req.requestedUser.getParts({ where: { id: part.id } })
  .then(result => {
    result.quantity - part.quantity < 1 ? req.requestedUser.removePart(result) :
    req.requestedUser.removePart(result)
  })
  .then(() => res.send(req.requestedUser))
  .catch(next);
});

router.post('/:id/inventory', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  part = req.body;
  Part.findById(part.id)
  .then(result => req.requestedUser.addPart(result, { through: { quantity: part.quantity }} ))
  .then(() => res.send(req.requestedUser))
  .catch(next);
});

router.delete('/:id/inventory', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  req.requestedUser.getParts({ where: { id: req.body.id } })
  .then(result => req.requestedUser.removePart(result))
  .then(() => res.send(req.requestedUser.reload()))
  .catch(next);
});
