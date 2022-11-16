import { useEffect, useState } from "preact/hooks"
import { route } from "preact-router";
import "react-datepicker/dist/react-datepicker.css";
import CalendarCard from "../components/calendarCard/calendarCard";
import { returnUniqueMonthDates } from "../utils/utils";
import { getUserAttendance } from "../services/apiServices";

export default function AttendanceView(){

    const [attendanceRecord,setAttendanceRecord]:[attendanceRecord:Array<any>,setAttendanceRecord:Function]=useState([])
    
    async function fetchAttendance(){
        const attendance = await getUserAttendance()
        let uniqueMonths=returnUniqueMonthDates(attendance)
        const dates=new Array(12).fill(null).map((_,i)=>new Date(2022,i,1).toISOString())
        let attendanceObjs=uniqueMonths.map(month=>{
            return {month:new Date(month),dates:attendance.map(date=>new Date(date).getMonth()===new Date(month).getMonth()&&new Date(date).getDate()).filter(i=>!!i)}
        })
        setAttendanceRecord(attendanceObjs)
        console.log("attendanceObjs",attendanceObjs)
        console.log("unique months",uniqueMonths)
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
            <div className="flex flex-wrap justify-center items-stretch gap-3">
                {
                    attendanceRecord.length>0
                    ?
                    attendanceRecord.map(attObj=><CalendarCard dates={attObj.dates} date={attObj.month}/>)
                    :
                    <div className="text-5xl text-zinc-600 ">
                        No Data
                        <i className="text-zinc-400 text-3xl ml-2 fas fa-faucet-drip"></i>
                    </div>
                }
            </div>
        </div>
    )
}