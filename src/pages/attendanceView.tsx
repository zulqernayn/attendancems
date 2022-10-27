import { useEffect, useState } from "preact/hooks"
import CalendarCard from "../components/calendarCard"

export default function AttendanceView({email}:{email:string}){

    const [attendanceRecord,setAttendanceRecord]:[attendanceRecord:Array<Object>,setAttendanceRecord:Function]=useState([])
    
    async function fetchAttendance(){
        const res=await fetch(`http://localhost:5000/getAttendance?email=${email}`)
        const data=await res.json()
        const {marked,leaves,...presentDays}=data
        const attendance=[]
        for(let year in presentDays){
            for(let month in presentDays[year]){
                attendance.push({
                    month:new Date(2022,Number(month)).toLocaleDateString('default',{month:'long'}),
                    attendance:presentDays[year][month]
                })
            }
        }
        console.log(attendance)
        console.log(data)
        setAttendanceRecord(attendance)
    }

    //@ts-ignore
    useEffect(fetchAttendance,[])
    
    return(
        <div className="w-full h-full grid grid-custom gap-8 p-8 justify-items-center justify-around items-center">
            {attendanceRecord.map((data,index)=>{
                if(index>11)return
                //@ts-ignore
                return <CalendarCard {...data}/>
            })}
        </div>
    )
}