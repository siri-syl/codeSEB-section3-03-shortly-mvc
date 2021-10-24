const express = require('express');
const router = express.Router();
const linksController = require('../controllers/links');

/* GET links listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/', linksController.get);
router.get('/:id', linksController.redirect);
router.post('/', linksController.post);

module.exports = router;
