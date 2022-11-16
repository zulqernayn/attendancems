import { isOff, returnMonthFillDates, WEEK_DAYS } from "../../utils/utils"
import DisabledDate from "./components/disabledDate"
import MarkedDate from "./components/markedDate"

export default function CalendarCard({dates=[],date=new Date()}:{dates:Array<number|null>,date:Date}){

    function calendarDatesMapping(fillDate:number|null,i:number){
        if(dates.includes(fillDate))
            return <MarkedDate>{fillDate}</MarkedDate>
        else if(isOff(i))
            return <DisabledDate>{fillDate}</DisabledDate>
        else
            return <p className="px-1 py-0.5 w-full text-center">{fillDate}</p>
    }
    
    return(
        <div className="flex flex-col gap-3 bg-zinc-900 p-4 rounded-2xl border-2 border-[slateblue]">
            <p className=" text-[2em] text-violet-500">{date.toLocaleString('default', { month: 'long' })}</p>
            <div>
                <div className="grid grid-cols-7 gap-2 justify-items-center">
                    {WEEK_DAYS.map(day=><p>{day}</p>)}
                </div>
                <div className="grid grid-cols-7 font-robotomono gap-2 justify-items-center">
                    {returnMonthFillDates(date).map(calendarDatesMapping)}
                </div>
            </div>
        </div>
    )
}
