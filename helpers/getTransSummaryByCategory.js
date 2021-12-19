const  _ = require('lodash');

const num = parseFloat(10).toFixed(2);

const getTransSummaryByCategory = (data, trans, transType) => {
  if (trans.length <= 0) {
    return;
  };

  const normalizedMonth = Number(data.slice(3, 6));
  const normalizedYear = Number(data.slice(6));

  const getTransWithMonth = trans => {

    const processedTrans = trans.reduce((acc, element) => {
      const newTrans = {};

      const month = Number(element._doc.date.slice(3, 6));
      const year = Number(element._doc.date.slice(6));

      if (year === normalizedYear && month === normalizedMonth && transType === element._doc.transactionType) {
      
        newTrans.category = element._doc.category;
        newTrans.sum = element._doc.sum;

        acc.push(newTrans);
      }
      
      return acc;
    }, [])

    return processedTrans;
  };

  const transWithMonth = getTransWithMonth(trans);

  const processedTrans =
    _(transWithMonth)
      .groupBy('category')
      .map((objs, key) => ({
        'category': key,
        'sum': _.sumBy(objs, 'sum')
      }))
      .value();
	
  processedTrans.forEach(elem => elem.sum = elem.sum.toFixed(2));
  return processedTrans;
};

module.exports = getTransSummaryByCategory;