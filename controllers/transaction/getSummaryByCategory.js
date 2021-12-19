const { NotFound } = require("http-errors");

const { Transaction } = require("../../models");
const { getTransSummaryByCategory } = require('../../helpers/index');

const getSummaryByCategory = async (req, res, next) => {
  
  const { type, date } = req.params;
  const { _id } = req.user;
  const data = await Transaction.find({ owner: _id, transactionType: type });

  const userData = data.filter(elem => String(elem.owner) === String(_id));

  const result = getTransSummaryByCategory( date, userData, type);

  if (result.length === 0) {
    throw new NotFound(`Not found`);
  }

  res.json({
    status: "success",
    code: 204,
    data: result
  });
};

module.exports = getSummaryByCategory;