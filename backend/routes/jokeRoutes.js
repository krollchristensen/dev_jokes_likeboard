// backend/routes/jokeRoutes.js
const express = require('express');
const router = express.Router();

const jokeController = require('../controllers/jokeController');

// Endpoints (lille og simpelt)
router.get('/',        jokeController.getAll);
router.get('/random',  jokeController.getRandom);   // bonus/ekstra
router.put('/:id/like', jokeController.likeOne);

module.exports = router;
