import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import Navbar from "../components/navbar";
import DataTable from "../components/dataTable";
import TableLabels from "../components/tableLabels";

const AdminView = () => {

    const [record,setRecord]=useState([
        {
            email:"zain720@gmail.com",
            presents:12,
            absents:3,
            leaves:5,
            password:"string"
        },
        {
            email:"zainh@gmail.com",
            presents:14,
            absents:4,
            leaves:3,
            password:"anotherString"
        }
    ])

    //@ts-ignore
    useEffect(async ()=>{
        setRecord(await fetchAttendanceRecord())
    })
    
    return(
        <div className="h-full p-5 flex justify-center">
                <DataTable/>
        </div>
    )
}

export default AdminView;

async function fetchAttendanceRecord() {
    const res=await fetch("http://localhost:5000/getAllRecord")
    const data=await res.json()
    return data
}
