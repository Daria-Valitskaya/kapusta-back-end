const  _ = require('lodash');
const moment = require('moment');

const getTransSummary = (data, trans, transType) => {
  if (trans.length <= 0) {
    return;
  };

  const normalizedYear = Number(moment(Number(data)).format('YYYY'));
  const normalizedMonth = Number(moment(Number(data)).format('MM'));
  
  const monthesUA = [
  { month: 1, monthName: 'Січень' },
  { month: 2, monthName: 'Лютий' },
  { month: 3, monthName: 'Березень' },
  { month: 4, monthName: 'Квітень' },
  { month: 5, monthName: 'Травень' },
  { month: 6, monthName: 'Червень' },
  { month: 7, monthName: 'Липень' },
  { month: 8, monthName: 'Серпень' },
  { month: 9, monthName: 'Вересень' },
  { month: 10, monthName: 'Жовтень' },
  { month: 11, monthName: 'Листопад' },
  { month: 12, monthName: 'Грудень' }
];

  const getTransWithMonth = trans => {

    const processedTrans = trans.reduce((acc, element) => {
      const newTrans = {};

      const splitedMonth = element._doc.date.split('.');
      const month = Number(splitedMonth[1]);
      
      const splitedYear = element._doc.date.split('.');
      const year = Number(splitedYear[2]);

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
	
	return processedTrans;
}

module.exports = getTransSummary;