import { returnMonthFillDates, WEEK_DAYS } from "../../utils/utils"

export default function CalendarCard({dates=[],date=new Date()}:{dates:Array<number|null>,date:Date}){

    const today=new Date()

    
    function calendarDatesMapping(fillDate:number|null,i:number){
        if(dates.includes(fillDate))
            return <p className="bg-violet-400 bg-opacity-10 rounded px-1 py-0.5 w-full text-center text-violet-400">{fillDate}</p>
        else if(!((i+1)%7) || !((i)%7))
            return <p className="text-zinc-500 rounded px-1 py-0.5 w-full text-center">{fillDate}</p>
        else
            return <p className="rounded px-1 py-0.5 w-full text-center">{fillDate}</p>
    }
    
    return(
        <div className="flex flex-col gap-3 bg-zinc-900 h-fit p-4 rounded-xl">
            <p className=" text-3xl text-violet-500">{date.toLocaleString('default', { month: 'long' })}</p>
           <div>
               <div className="grid grid-cols-7 gap-2 justify-items-center">
                {WEEK_DAYS.map(day=><p>{day}</p>)}
                </div>
               <div className="grid grid-cols-7 gap-2 justify-items-center">
                {returnMonthFillDates(date).map(calendarDatesMapping)}
                </div>
           </div>
        </div>
    )
}
