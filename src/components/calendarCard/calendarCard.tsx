import { returnMonthFillDates, WEEK_DAYS } from "../../utils/utils"

export default function CalendarCard({dates=[],month=0}:{dates:Array<string>,month:number}){

    const today=new Date()

    
    function calendarDatesMapping(date:number|null|string,i:number){
        let filterDatesOfThisMonth:Array<string|number|null>=dates.filter(date=>{
            return new Date(date).getMonth()===month
        })
        filterDatesOfThisMonth=filterDatesOfThisMonth.map(date=>new Date(date).getDay())
        if(filterDatesOfThisMonth.includes(date))
            <p className="bg-sky-300">{date}</p>
        else
            <p>{date}</p>
    }
    
    return(
        <div className="flex flex-col gap-3 bg-zinc-900 h-fit p-4 rounded-xl">
            <p className=" text-3xl text-violet-500">{today.toLocaleString('default', { month: 'long' })}</p>
           <div>
               <div className="grid grid-cols-7 gap-2 justify-items-center">
                {WEEK_DAYS.map(day=><p>{day}</p>)}
                </div>
               <div className="grid grid-cols-7 gap-2 justify-items-center">
                {returnMonthFillDates(new Date()).map(calendarDatesMapping)}
                </div>
           </div>
        </div>
    )
}
