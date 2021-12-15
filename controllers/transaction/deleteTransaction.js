const { NotFound } = require("http-errors");
const { Transaction } = require("../../models");

const deleteTransaction = async (req, res, next) => {
  const { id } = req.params;

  const result = await Transaction.findOneAndDelete({
    id,
    owner: req.user._id,
  });
  if (!result) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

module.exports = deleteTransaction;
