const { Router } = require('express');
const Film = require('../model/Film');
const ensureAuth = require('../utils/ensureAuth');
const { imgUpload } = require('../utils/awsS3');

module.exports = Router()
  .post('/', ensureAuth, imgUpload, async (req, res, next) => {
    try {
      const newFilm = await Film.insert({
        ...req.body,
        filmDirectorId: req.user.directorId,
        filmImg: req.file.location,
      });
      res.send(newFilm);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    const getFilms = await Film.find();
    res.send(getFilms);
  })

  .get('/:id', async (req, res, next) => {
    const aFilm = await Film.findById(req.params.id);
    res.send(aFilm);
  })

  .put('/:id', async (req, res, next) => {
    try {
      const updateFilm = await Film.update(req.params.id, req.body);
      res.send(updateFilm);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Film.update(req.params.id, {
      ...req.body,
      directorId: req.user.id,
    })
      .then((change) => res.send(change))
      .catch(next);
  })

  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const deleteFilm = await Film.delete(req.params.id);
      res.send(deleteFilm);
    } catch (err) {
      next(err);
    }
  });
