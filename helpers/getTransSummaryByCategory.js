const  _ = require('lodash');

const getTransSummaryByCategory = (trans, transType) => {
  if (trans.length <= 0) {
    return;
  };

  const getTransWithMonth = trans => {

    const processedTrans = trans.reduce((acc, element) => {
      const newTrans = {};

      if (transType === element._doc.transactionType) {
      
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
	
  return processedTrans;
};

module.exports = getTransSummaryByCategory;