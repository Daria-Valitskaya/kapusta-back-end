const { Transaction, User } = require("../../models");

const expenses = async (req, res, next) => {
  const { balance } = req.user.balance;
  const newExpenses = { ...req.body, owner: req.user._id };

  const result = await Transaction.create(newExpenses);

  if (req.body.sum < 0 || req.body.transactionType == "expense") {
    await User.findByIdAndUpdate(
      req.user._id,
      { balance: req.user.balance - req.body.sum },
      { new: true }
    );
  }

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = expenses;
