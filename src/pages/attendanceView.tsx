import { useEffect, useState } from "preact/hooks"
import { route } from "preact-router";
import "react-datepicker/dist/react-datepicker.css";
import CalendarCard from "../components/calendarCard/calendarCard";
import { returnUniqueMonthDates } from "../utils/utils";

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
            new Date(2022,9).toISOString(),
            new Date(2022,8).toISOString(),
            new Date(2022,7).toISOString(),
            new Date(2022,6).toISOString(),
            new Date(2022,5).toISOString(),
            new Date(2022,4).toISOString(),
            new Date(2022,3).toISOString(),
            new Date(2022,2).toISOString(),
            new Date(2022,1).toISOString(),
            new Date(2022,0).toISOString(),
        ]
        setAttendanceRecord(returnAttendanceObjs(attendance))
    }

    function returnAttendanceObjs(attendance:Array<string>){
        let uMonths=returnUniqueMonthDates(attendance).reverse()
        let attendanceObjs=uMonths.map(month=>{
            return {month:new Date(month),dates:attendance.map(date=>new Date(date).getMonth()===new Date(month).getMonth()&&new Date(date).getDate()).filter(i=>!!i)}
        })
        return attendanceObjs
    }

    useEffect(()=>{
        fetchAttendance()
    },[])
    
    return(
        <div className="min-h-screen grid grid-rows-[auto,1fr] grid-cols-1 justify-items-center justify-around items-center bg-zinc-800 text-white relative">
            <header className="w-full pl-5 pt-5 flex justify-start">
                <button className="p-1 px-2 hover:border-violet-800 border-2 border-transparent hover:bg-transparent bg-violet-800 rounded-xl transition-all hover:px-3" onClick={()=>route("/dashboard")}>
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back
                </button>
            </header>
            <div className="flex flex-wrap justify-center gap-3">
                {attendanceRecord.map(attObj=><CalendarCard dates={attObj.dates} date={attObj.month}/>)}
            </div>
        </div>
    )
}