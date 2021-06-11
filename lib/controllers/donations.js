const { Router } = require('express');
const Donation = require('../model/Donation');
const FileServices = require('../services/FileService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    FileServices;

    try {
      const newDonation = await FileServices.insert(req.body);
      res.send(newDonation);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    const getDonations = await Donation.find();
    res.send(getDonations);
  })

  .get('/:id', async (req, res, next) => {
    const aDonation = await Donation.findById(req.params.id);
    res.send(aDonation);
  })

  .put('/:id', async (req, res, next) => {
    try {
      const updateDonation = await Donation.update(req.params.id, req.body);
      res.send(updateDonation);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const deleteDonation = await Donation.delete(req.params.id);
      res.send(deleteDonation);
    } catch (err) {
      next(err);
    }
  });
