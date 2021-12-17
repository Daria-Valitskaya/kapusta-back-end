const { Transaction } = require("../../models");
const { NotFound } = require("http-errors");


const getTransForPeriod = async (req, res, next) => {
    
    
    const getForPeriod = async (id, type, period) => {
        const data = await Transaction.find({ owner: id, transactionType: type });
      
        const filtered = data.filter((obj) => {
          const sLiceDateForYear = obj.date.slice(6);
          const sLiceDateForMonth = obj.date.slice(3);
          const sLiceDateForData = obj.date;
          return (sLiceDateForMonth === period) || (sLiceDateForYear === period) || (sLiceDateForData=== period);
        });
      
        return filtered;
    };

    const { type, period } = req.params;
    const { _id } = req.user;

    const result = await getForPeriod(_id, type, period);
    const sumForMonth = result.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.sum; }, 0);

  if (result.length === 0) {
    throw new NotFound(`Not found`);
  }

  res.json({
    status: "success",
    code: 204,
    data: result, sumForMonth

    
  });
};
module.exports = getTransForPeriod;