import { useEffect, useState } from "preact/hooks"
import "./dataTable.css"

export default function DataTable(){

    const [record,setRecord]=useState([{
        NoRecord:"No Record to Show!"
    }])

    //@ts-ignore
    useEffect(async ()=>{
        const res=await fetch("http://localhost:5000/getRecord")
        const data=await res.json()
        setRecord([...data])
    },[])
    
    return(
        <div className="flex flex-col gap-3 drop-shadow-[0px_0px_20px_#0003]">
            <div className="grid grid-cols-[2rem_1fr_1fr_1fr_1fr_1fr] bg-[aquamarine] rounded-xl py-2 justify-items-center">
                {["Sr."].concat(Object.keys(record[0])).concat(["Actions"]).map(label=><p className="pl-2 border-r-2 w-full text-center border-gray-400 last:border-none">{label}</p>)}
            </div>
            {record.map((record,i)=>{
                return(
                    <div className="grid grid-cols-[2rem_1fr_1fr_1fr_1fr_1fr] rounded-xl items-center justify-items-start bg-white">
                        <p className="w-full text-gray-300 flex justify-center items-center h-full">{i+1}.</p>
                        {Object.values(record).map(value=><p className="pl-2 py-2 w-full border-r-2 border-gray-200">{value}</p>)}
                        <div className="flex p-1 w-full justify-center gap-2">
                            <button className="px-3 gap-1 p-1 bg-white border-2 hover:bg-[hsl(161,100%,95%)] rounded-lg flex items-center group">
                                Edit
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 scale-0 -ml-5 transition-all group-hover:scale-100 group-hover:ml-0">
                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                </svg>
                            </button>
                            <button className="px-3 gap-1 p-1 border-2 hover:bg-[#ff3030] hover:text-white rounded-xl flex items-center group">Delete
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 scale-0 -ml-5 transition-all group-hover:scale-100 group-hover:ml-0">
                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
        // <table>
        // <tr>
        //     {Object.keys(record[0]).concat(["Actions"]).map(label=><th>{label}</th>)}
        // </tr>
        
        // </table>
    )
}