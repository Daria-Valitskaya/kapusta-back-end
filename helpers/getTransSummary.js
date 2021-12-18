const  _ = require('lodash');

const getTransSummary = (data, trans, transType) => {
  if (trans.length <= 0) {
    return;
  };

  const monthToCheck = Number(data.slice(3, 6));
  const normalizedMonth = monthToCheck === 1
    ? 13
    : monthToCheck;
  const normalizedYear = monthToCheck === 1
    ? Number(data.slice(6)) - 1
    : Number(data.slice(6));

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

      if (year === normalizedYear && month < normalizedMonth && transType === element._doc.transactionType) {
      
      newTrans.month = month;
        newTrans.sum = element._doc.sum;

        acc.push(newTrans);
      }
      return acc;
    }, [])

    return processedTrans;
  };

  const transWithMonth = getTransWithMonth(trans);

  for (let i = 0; i < transWithMonth.length; i++) {
    for (let j = 0; j < monthesUA.length; j++){
      transWithMonth[i].month =
        Number(transWithMonth[i].month) === Number(monthesUA[j].month)
          ? monthesUA[j].monthName
          : transWithMonth[i].month;
    }
  };

const processedTrans =
  _(transWithMonth)
    .groupBy('month')
    .map((objs, key) => ({
        'month': key,
        'sum': _.sumBy(objs, 'sum') }))
    .value();
	
  processedTrans.forEach(elem => elem.sum = elem.sum.toFixed(2));
  processedTrans.reverse();
	return processedTrans;
}

module.exports = getTransSummary;