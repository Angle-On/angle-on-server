//Run function
//Call in the AWS util and model File.insert
const Film = require('../model/Film');
const { imgUpload } = require('../utils/awsS3');


module.exports = class FileService {
  static async filmCreate(req, res){
    console.log('REQ.BODY', req.body);

    imgUpload(req, res, (error) => { 
      console.log(error, 'HELLOOOO HELP');
      if(error) {
        console.log('errors', error);
        res.json({ error });
      } else {
        if(req.file === undefined) {
          res.json('Error: No File Selected');
        } else {
          const imageName = req.file.key;
          const imageLocation = req.file.location;
          return Film.insert({...req.body, filmImg: imageLocation});
        }
      }
    });
  }
};
