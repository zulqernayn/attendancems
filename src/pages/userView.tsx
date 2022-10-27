import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-hot-toast";
import Card from "../components/Card";
import Navbar from "../components/navbar";

const UserView = ({email}:{email:String}) => {

    const [isAttendanceMarked,setIsAttendanceMarked]=useState(false)
    const [leaveRequestState,setLeaveRequestState]=useState("Not Requested")
    const [userData,setUserData]=useState({email:"loading...",name:"loading...",isTodayMarked:false})

    async function handleMarkAttendance(){
        const res = await fetch("http://localhost:5000/marktoday",{credentials:"include"})
        const result=await res.json()
        if(res.status!==200)
            toast.error(result.message)
        fetchDashBoardData()
    }

    async function handleRequestLeave(){
        const res = await fetch("http://localhost:5000/requestLeave",{
            method:"POST",
            body:JSON.stringify({
                email:email
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        const data=await res.text()
        if(res.ok)
            setLeaveRequestState(data)
        else
            alert(data)
    }

    async function fetchDashBoardData(){
        const res=await fetch("http://localhost:5000/getdashboarddata",{credentials:'include'})
        if(res.status===301)
            route('/login')
        else{
            const data=await res.json()
            setUserData(data)
        }
    }
    
//@ts-ignore
    useEffect(()=>{
        fetchDashBoardData()
    },[])

    return (
        <>
            <Navbar title={userData.name}>
                <button className="button">
                    <a href="http://localhost:5000/logout">Logout</a>
                </button>
            </Navbar>
            <div className="card-container h-full flex gap-2 items-center justify-center drop-shadow-[0_50px_50px_rgba(0,0,0,0.3)]">
                <Card {...(!userData.isTodayMarked && {clickHandler:handleMarkAttendance})}>
                    <p>{userData.isTodayMarked ? "Your attendance has already been marked" : "Mark your today's attendance"}</p>
                    <div className=" text-7xl text-sky-900 w-full text-center">
                        {userData.isTodayMarked ? <i className="fas fa-check"></i>:<i className="fas fa-pen"></i>}
                    </div>
                    <h2 className="card-heading">{userData.isTodayMarked ? "Attendance Marked!":"Mark Attendance"}</h2>
                </Card>
                <Card clickHandler={()=>route(`/user/${email}/viewAttendance`)}>
                    <p>View your attendance record</p>
                    <div className=" text-7xl text-sky-900 w-full text-center">
                        <i className="fas fa-calendar"></i>
                    </div>
                    <h2 className="card-heading">View Attendance</h2>
                </Card>
            </div>
        </>
    );
}

export default UserView;
