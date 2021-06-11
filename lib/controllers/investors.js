const { Router } = require('express');
const Investor = require('../model/Investor');
const FileServices = require('../services/FileService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    FileServices;

    try {
      const newInvestor = await FileServices.create(req.body);
      res.send(newInvestor);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    const getInvestors = await Investor.find();
    res.send(getInvestors);
  })

  .get('/:id', async (req, res, next) => {
    const aInvestor = await Investor.findById(req.params.id);
    res.send(aInvestor);
  })

  .put('/:id', async (req, res, next) => {
    try {
      const updateInvestor = await Investor.update(req.params.id, req.body);
      res.send(updateInvestor);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const deleteInvestor = await Investor.delete(req.params.id);
      res.send(deleteInvestor);
    } catch (err) {
      next(err);
    }
  });
