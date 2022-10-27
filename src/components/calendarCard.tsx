export default function CalendarCard({month,attendance}:{month:string,attendance:Array<Number>}){
    // const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    return(
        <div className=" h-fit shadow-xl p-2 rounded-2xl bg-slate-100 relative">
            <p className="p-2 text-4xl col-span-full">{month}</p>
            <div className="p-2 rounded-2xl z-10 relative gap-2 grid grid-cols-7 justify-center items-center">
                {
                    [...Array(31).keys()].map(x=>{
                        if(attendance.includes(x+1))
                            return <p className="p-2 text-green-800 bg-green-200 rounded-2xl text-center">{x+1}</p>
                        return <p className="p-2 text-red-700 bg-red-100 rounded-2xl text-center">{x+1}</p>
                    })
                }
            </div>
        </div>
    )
}