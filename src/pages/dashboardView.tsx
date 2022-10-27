import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { toast } from "react-hot-toast";
import CardButton from "../components/cards/CardButton";
import Cards from "../components/cards/cardcontainer";
import CardInfo from "../components/cards/CardInfo";
import CardLink from "../components/cards/CardLink";

const DashBoardView = ({email}:{email:String}) => {

    const [userData,setUserData]=useState({email:"loading...",name:"loading...",isTodayMarked:false})
    const [isDataLoading,setIsDataLoading]=useState(false)

    async function handleMarkAttendance(){
        setIsDataLoading(true)
        const res = await fetch("http://localhost:5000/marktoday",{credentials:"include"})
        const result=await res.json()
        if(res.status!==200)
            toast.error(result.message)
        await fetchDashBoardData()
        setIsDataLoading(false)

    }

    function handleLogout(){
        fetch("http://localhost:5000/logout",{credentials:"include"}).then(res=>{
            if(res.status===200){
                localStorage.clear()
                route('/login')
                toast.success("Successfully Logged Out!")
            } else{
                toast.error("Error:Error in logging out!")
            }
        })
    }

    async function fetchDashBoardData(){
        setIsDataLoading(true)
        const res=await fetch("http://localhost:5000/getdashboarddata",{credentials:'include'})
        if(res.status===301)
            route('/login')
        else{
            const data=await res.json()
            setUserData(data)
        }
        setIsDataLoading(false)
    }
    
//@ts-ignore
    useEffect(()=>{
        fetchDashBoardData()
    },[])

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-[#111]">
            <Cards>
                <CardInfo title={userData.name} desc={userData.email} icon="fas fa-user-circle"/>
                <CardLink title="View Attendance" desc="View your attendance" icon="fas fa-calendar" link="/viewAttendance"/>
                {userData.isTodayMarked?
                    <CardInfo
                        title="Marked"
                        desc="Already Marked!"
                        icon="fas fa-check"
                    />
                    :
                    <CardButton
                        title="Mark Attendance"
                        desc="Click to mark your today's attendance"
                        icon="fas fa-pen"
                        clickHandler={handleMarkAttendance}
                        disabled={isDataLoading}
                    />
                }
                <CardButton
                    title="Logout"
                    desc="Logout of your current session"
                    icon="fas fa-sign-out"
                    clickHandler={handleLogout}
                    />
            </Cards>
        </div>
    );
}

export default DashBoardView;
