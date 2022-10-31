const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTH_DATES = new Array(30).fill(null).map((_, i) => i + 1);

export function returnMonthNameFromNumber(month:number){
  return MONTHS[month]
}

export function returnMonthFillDates(date: Date):Array<null|number> {
  const BLANKS = new Array(new Date(date.getFullYear(), date.getMonth(), 1).getDay()).fill(null);
  return [...BLANKS,...MONTH_DATES]
}

export function isOff(date:number,otherOffDates:Array<number>=[]){
  if(!((date+1)%7) || !((date)%7))
    return true
  return otherOffDates.includes(date)
}