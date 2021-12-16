const { User } = require("../../models");

const putBalance = async (req, res, next) => {
  const ownerId = req.user._id;
  const newBalance = req.body.balance;
 
  const updateBalance = await User.findByIdAndUpdate(ownerId, {
    balance: newBalance,
    new: true,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      balance: newBalance,
    },
  });
};

module.exports = putBalance;
