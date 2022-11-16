export const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function returnMonthFillDates(date: Date):Array<null|number> {
  const BLANKS = new Array(new Date(date.getFullYear(), date.getMonth(), 1).getDay()).fill(null);
  const MONTH_DATES = new Array(new Date(0,date.getMonth(),0).getDate()).fill(null).map((_, i) => i + 1);
  return [...BLANKS,...MONTH_DATES]
}

export function isOff(date:number,otherOffDates:Array<number>=[]){
  if(!((date+1)%7) || !((date)%7))
    return true
  return otherOffDates.includes(date)
}

export function returnUniqueMonthDates(attendance:Array<string>):Array<string>{
  let dateArr:Array<string> = attendance.map(date=>{
      let iDate=new Date(date)
      return new Date(iDate.getFullYear(),iDate.getMonth()).toISOString()
  })
  dateArr=[...new Set(dateArr)]
  return dateArr
}