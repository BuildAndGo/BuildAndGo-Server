const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
// router.use('/inventories', require('./inventories'));
router.use('/parts', require('./parts'));
router.use('/types', require('./types'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error)
});
