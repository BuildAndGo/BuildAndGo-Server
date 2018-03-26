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
// })ee

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

router.get('/:id/inventory', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  req.requestedUser.reload({ include: [{ all: true }] })
  .then(() => req.requestedUser.getParts())
  .then(parts => res.json(parts))
  .catch(next);
});

router.put('/:id/inventory', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  let updatePart = req.body;
  req.requestedUser.getParts({ where: { typeId: updatePart.typeId } })
  .then(oldPart => req.requestedUser.removePart(oldPart))
  .then(() => Part.findById(updatePart.id))
  .then(newPart => {
    req.requestedUser.addPart(newPart, { through: { quantity: newPart.type.quantityNeeded }} )
    return newPart;
  })
  .then(addedPart => res.send(addedPart))
  .catch(next);
});

router.post('/:id/inventory', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  let part = req.body;
  Part.findById(part.id)
  .then(newPart => {
    req.requestedUser.addPart(newPart, { through: { quantity: newPart.type.quantityNeeded }} )
    return newPart;
  })
  .then(addedPart => res.send(addedPart))
  .catch(next);
});

router.delete('/:id/inventory', /* isLoggedIn, isAdmin, */ (req, res, next) => {
  req.requestedUser.getParts({ where: { id: req.body.id } })
  .then(result => {
    req.requestedUser.removePart(result);
    return req.body;
  })
  .then(deletedPart => res.send(deletedPart))
  .catch(next);
});
