const { NotFound } = require("http-errors");

const { Transaction } = require("../../models");
const { getTransSummary } = require('../../helpers/index');

const getSummary = async (req, res, next) => {
  
  const { type, date } = req.params;
  const { _id } = req.user;
  const userData = await Transaction.find({ owner: _id, transactionType: type });

  const result = getTransSummary(date, userData, type);

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