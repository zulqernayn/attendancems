export default function CalendarCard({dates=[]}:{dates:Array<string>}){

    const MONTHS=new Set(dates.map(date=>new Date(date.split("T")[0]).getMonth()+1))
    
    const today=new Date()
    
    const WEEK_DAYS=[
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa",
    ]
    
    const MONTH_DATES=new Array(30).fill(null).map((_,i)=>i+1)
    const BLANKS=new Array(new Date(today.getFullYear(),today.getMonth(),1).getDay()).fill(null)
    
    return(
        <div className="flex flex-col gap-3 bg-zinc-900 h-fit p-4 rounded-xl">
            <p className=" text-3xl text-violet-500">{today.toLocaleString('default', { month: 'long' })}</p>
           <div>
               <div className="grid grid-cols-7 gap-2 justify-items-center">
                {WEEK_DAYS.map(day=><p>{day}</p>)}
                </div>
               <div className="grid grid-cols-7 gap-2 justify-items-center">
                {[...BLANKS,...MONTH_DATES].map(date=>{
                    const filteredDate=dates.filter(el=>new Date(el).getDay()===date)
                })}
                </div>
           </div>
        </div>
    )
}