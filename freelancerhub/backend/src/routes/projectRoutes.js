const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');

router.get('/:projectId', async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.projectId);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project', error: error.message });
  }
});


module.exports = router;