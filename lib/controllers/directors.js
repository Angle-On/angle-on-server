const { Router } = require('express');
const Director = require('../model/Director');
const FileServices = require('../services/FileService');
const jwt = require('jsonwebtoken');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    FileServices;

    try {
      const newDirector = await FileServices.insert(req.body);
      res.send(newDirector);
    } catch (err) {
      next(err);
    }
  })

  // .get('/auth', (req, res, next) => {
  //   try {
  //     const decoded = jwt.verify(req.cookies);

  //     res.cookie('session', token, {
  //       httpOnly: true,
  //       maxAge: ONE_DAY_IN_MS,
  //       // sameSite: 'Lax' | 'None' | 'Strict',
  //       // secure: true
  //     });

  //     res.send(director);
  //   } catch (err) {
  //     err.status = 401;
  //     next(err);
  //   }
  // })

  .get('/', async (req, res, next) => {
    const getDirectors = await Director.find();
    res.send(getDirectors);
  })

  .get('/:id', async (req, res, next) => {
    const aDirector = await Director.findById(req.params.id);
    res.send(aDirector);
  })

  .put('/:id', async (req, res, next) => {
    try {
      const updateDirector = await Director.update(req.params.id, req.body);
      res.send(updateDirector);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const deleteDirector = await Director.delete(req.params.id);
      res.send(deleteDirector);
    } catch (err) {
      next(err);
    }
  });
