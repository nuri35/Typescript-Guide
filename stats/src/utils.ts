export const dateStringToDate = (dateString: string): Date => {
  //dateString =  '28/10/2018'
  const dateParts = dateString.split('/').map((value: string): number => {
    return parseInt(value);
  }); // [28, 10, 2018]

  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // 2018-11-27T22:00:00.000Z database deki gibi gorunum
};

console.log(dateStringToDate('28/10/2018'));
