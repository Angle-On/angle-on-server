const { Router } = require('express');
const Investor = require('../model/Investor');
const ensureAuth = require('../utils/ensureAuth');
const InvestorService = require('../services/InvestorService');

// const FileServices = require('../services/FileService');
const { sign } = require('../utils/jwt');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    // FileServices;

    try {
      const newInvestor = await Investor.insert(req.body);
      res.send(newInvestor);
    } catch(err) {
      next(err);
    }
  })

  .post('/auth', async (req, res, next) => {
    try {
      const investor = await InvestorService.create(req.body);

      res.cookie('session', sign(investor), {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,

      });
      res.send(investor);
    } catch(err) {
      err.status = 401;
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    const getInvestors = await Investor.find();
    res.send(getInvestors);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  })

  .get('/:id', async (req, res, next) => {
    const aInvestor = await Investor.findById(req.params.id);
    res.send(aInvestor);
  })

  .put('/:id', ensureAuth, async (req, res, next) => {
    try {
      const updateInvestor = await Investor.update(req.params.id, req.body);
      res.send(updateInvestor);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const deleteInvestor = await Investor.delete(req.params.id);
      res.send(deleteInvestor);
    } catch(err) {
      next(err);
    }
  });
