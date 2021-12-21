const  _ = require('lodash');

const getTransSummary = (data, trans, transType) => {
  if (trans.length <= 0) {
    return;
  };

  const normalizedYear = Number(data.slice(6));

  const monthesUA = [
  { month: 1, monthName: 'Январь' },
  { month: 2, monthName: 'Февраль' },
  { month: 3, monthName: 'Март' },
  { month: 4, monthName: 'Апрель' },
  { month: 5, monthName: 'Май' },
  { month: 6, monthName: 'Июнь' },
  { month: 7, monthName: 'Июль' },
  { month: 8, monthName: 'Август' },
  { month: 9, monthName: 'Сентябрь' },
  { month: 10, monthName: 'Октябрь' },
  { month: 11, monthName: 'Ноябрь' },
  { month: 12, monthName: 'Декабрь' }
];

  const getTransWithMonth = trans => {

    const processedTrans = trans.reduce((acc, element) => {
      const newTrans = {};

      const month = Number(element._doc.date.slice(3, 6));
      const year = Number(element._doc.date.slice(6));

      if (year === normalizedYear && transType === element._doc.transactionType) {
      
      newTrans.month = month;
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
    .groupBy('month')
    .map((objs, key) => ({
        'month': key,
        'sum': _.sumBy(objs, 'sum') }))
    .value();

  for (let i = 0; i < processedTrans.length; i++) {
    for (let j = 0; j < monthesUA.length; j++){
      if (Number(processedTrans[i].month) === Number(monthesUA[j].month)) {
          processedTrans[i]['monthName'] = monthesUA[j].monthName;
      }
    }
  };

  for (let i = 0; i < processedTrans.length; i++) {
    processedTrans[i].month = processedTrans[i].month - 1;
  }

  processedTrans.sort((a, b) => b.month - a.month)
	
  processedTrans.forEach(elem => elem.sum = elem.sum.toFixed(2));
	return processedTrans;
}

module.exports = getTransSummary;