const { Router } = require('express');
const Director = require('../model/Director');
const DirectorService = require('../services/DirectorService');
const { sign } = require('../utils/jwt');
const ensureAuth = require('../utils/ensureAuth');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/auth', async (req, res, next) => {
    try {
      const director = await DirectorService.create(req.body);

      res.cookie('session', sign(director), {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      });
      res.send(director);
    } catch (err) {
      err.status = 401;
      next(err);
    }
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  })

  .get('/', async (req, res, next) => {
    const getDirectors = await Director.find();
    res.send(getDirectors);
  })

  .get('/:id', ensureAuth, async (req, res, next) => {
    const aDirector = await Director.findFilmByDirectorId(req.params.id);
    res.send(aDirector);
  })

  .put('/:id', ensureAuth, async (req, res, next) => {
    try {
      const updateDirector = await Director.update(req.params.id, req.body);
      res.send(updateDirector);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const deleteDirector = await Director.delete(req.params.id);
      res.send(deleteDirector);
    } catch (err) {
      next(err);
    }
  });
