const { NotFound } = require("http-errors");
const { Transaction } = require("../../models");

const deleteTransaction = async (req, res, next) => {
  const { id } = req.params;

  const result = await Transaction.findByIdAndDelete({
    id,
    owner: req.user._id,
  });
  if (!result) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "Transaction deleted",
  });
};

module.exports = deleteTransaction;
