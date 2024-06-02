const express = require('express');
const multer = require('multer');
const router = express.Router();
const fileService = require('../services/filesService');

// Set up multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  const folder = req.body.folder;
  const fileName = `${req.body.projectID}_${req.body.freelancerID}`;
  const fileType = req.body.fileType;

  try {
    const publicUrl = await fileService.uploadFile(req.file.buffer, folder, fileName, fileType); // Pass fileType to the uploadFile function
    res.status(200).json({ url: publicUrl });
  } catch (error) {
    res.status(500).send('Error uploading file: ' + error.message);
  }
});

module.exports = router;