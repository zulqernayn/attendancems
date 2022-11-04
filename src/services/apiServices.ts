export async function getUserAttendance() : Promise<string[]>{
    const requestOptions:RequestInit = {credentials:"include"}
    const requestUrl=`${import.meta.env.VITE_SERVER_URL}userAttendance`
    const res=await fetch(requestUrl,requestOptions)
    const data=await res.json()
    return data.userDto.attendance.reverse()
}