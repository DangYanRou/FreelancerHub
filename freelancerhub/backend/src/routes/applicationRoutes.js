const express = require('express');
const router = express.Router();
const applicationService = require('../services/applicationService');

router.post('/', async (req, res) => {
  try {
    const { proposalData, notifications } = req.body;
    const message = await applicationService.submitApplication(proposalData, notifications);
    res.send(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;