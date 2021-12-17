const { NotFound } = require("http-errors");
const moment = require('moment');

const { Transaction } = require("../../models");
const { getTransSummary } = require('../../helpers/index');

const getSummary = async (req, res, next) => {
  const { transType, date } = req.params;
  const { _id } = req.user;
  const data = await Transaction.find({ ownerId: _id, transactionType: transType });

  const normalizedData = data.filter(elem => String(elem.owner) === String(_id));

  const result = getTransSummary(date, normalizedData, transType);

  if (result.length === 0) {
    throw new NotFound(`Not found`);
  }

  res.json({
    status: "success",
    code: 204,
    data: result
  });
}

module.exports = getSummary;