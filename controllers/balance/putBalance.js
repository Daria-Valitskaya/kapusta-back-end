const moment = require("moment");
const { User } = require("../../models");
const { Transaction } = require("../../models");


const putBalance = async (req, res, next) => {
  const ownerId = req.user._id;
  const oldEquity = req.user.balance;
  const newEquity = req.body.balance;
  const finalEquity = !oldEquity ? newEquity : newEquity - oldEquity;

  const newTransaction = {
    date: moment(new Date()).format("DD.MM.YYYY"),
    description: "Данные введенные вручную",
    sum: Math.abs(finalEquity),
    category: "Прочее",
    transactionType: finalEquity >= 0 ? "income" : "expense",
    owner: ownerId,
  };

  const addedEquity = await Transaction.create(
    newTransaction
  );
  

  const updateEquity = await User.findByIdAndUpdate(ownerId, {
    balance: newEquity,
    new: true,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      updatedEquity: updateEquity.balance,
      addedEquity,
    },
  });
};

module.exports = putBalance;