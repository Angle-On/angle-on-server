const { Router } = require('express');
const Director = require('../model/Director');
const FileServices = require('../services/FileService');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verify');
const UserService = require('../services/UserService');
const { sign } = require('../utils/jwt');

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

  .post('/auth', async (req, res, next) => {
    try {
      const director = await UserService.create(req.body);

      res.cookie('session', sign(director), {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,

      });
      res.send(director);
    } catch (err) {
      err.status = 401;
      next(err);
    }
  })

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
