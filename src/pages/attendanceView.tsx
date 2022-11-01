import { useEffect, useState } from "preact/hooks"
import { route } from "preact-router";
import "react-datepicker/dist/react-datepicker.css";
import CalendarCard from "../components/calendarCard/calendarCard";

export default function AttendanceView({email}:{email:string}){

    const [attendanceRecord,setAttendanceRecord]:[attendanceRecord:Array<any>,setAttendanceRecord:Function]=useState([])
    const [date,setDate]=useState(new Date())
    
    async function fetchAttendance(){
        const res=await fetch(`http://localhost:5000/userAttendance`,{credentials:"include"})
        const data=await res.json()
        // const {attendance}=data.userDto
        const attendance=[
            new Date(2022,11).toISOString(),
            new Date(2022,10).toISOString(),
            new Date(2022,10).toISOString(),
            new Date(2022,10).toISOString(),
            new Date(2022,7).toISOString(),
            new Date(2022,6).toISOString(),
            new Date(2022,5).toISOString(),
            new Date(2022,4).toISOString(),
        ]
        setAttendanceRecord(returnAttendanceObjs(attendance))
    }

    function returnAttendanceObjs(attendance:Array<string>){
        let months=new Array(12).fill([])
        attendance.forEach(date=>{
            let iMonth=new Date(date).getMonth()
            months[iMonth]=[...months[iMonth],new Date(date).getDate()]
        })
        months=months.map(i=>i.length>0?i:null)
        let attendanceArr=months.map((dates:Array<number>|null,i:number)=>{
            if(!dates||dates.length===0) return
            return {month:i,dates}
        }).filter(i=>i)
        return attendanceArr
    }

    useEffect(()=>{
        fetchAttendance()
    },[])
    
    return(
        <div className="w-full h-full grid grid-rows-[auto,1fr] grid-cols-1 justify-items-center justify-around items-center bg-zinc-800 text-white relative">
            <header className="w-full px-10 pt-10 flex justify-start">
                <button className="p-1 px-2 hover:border-violet-800 border-2 border-transparent hover:bg-transparent bg-violet-800 rounded-xl transition-all hover:px-3" onClick={()=>route("/dashboard")}>
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back
                </button>
            </header>
            <div className="grid grid-cols-2 w-full justify-items-center">
                <h1>Attendance</h1>
                {attendanceRecord.map(attObj=><CalendarCard dates={attObj.dates} date={new Date()}/>)}
            </div>
        </div>
    )
}