const express = require('express');
const router = express.Router();
const { imgUpload } = require('../utils/awsS3');

//Image upload into S3 bucket
router.post('/img-upload', (req, res) => {
  imgUpload(req, res, (error) => {
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      if (req.file === undefined) {
        res.json('Error: No File Selected');
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        res.json({
          image: imageName,
          location: imageLocation,
        });
      }
    }
  });
});

module.exports = router;
