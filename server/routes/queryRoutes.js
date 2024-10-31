const express = require('express');
const queryController = require('../controllers/queryController');

const router = express.Router();

router
    .route("/queries")
    .get(queryController.getAllQueries)
    .post(queryController.createQuery);

router
    .route('/queries/:id')
    .get(queryController.getQueryById)
    .put(queryController.updateQuery);

module.exports = router;
