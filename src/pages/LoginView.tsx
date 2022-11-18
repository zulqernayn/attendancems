import { Link, route } from "preact-router"
import {toast} from "react-hot-toast"

function LoginView(){

  return(
    <div className="min-h-screen flex flex-col items-center justify-center">
        {/* @ts-ignore */}
      <form onSubmit={authenticateUser} className={`rounded-2xl p-4 flex flex-col w-fit border-2 border-slate-200 bg-slate-100`}>
          <h1 className="font-signika text-2xl text-slate-700">
            Login Form
            {/* sdfg */}
          </h1>
          <label>Email</label>
          <input placeholder="your email.." className="px-3 shadow-xl py-1 bg-white border-2 border-black rounded-xl" name="email" type="email" required />
          <label>Password</label>
          <input placeholder="your password.." className="px-3 shadow-xl py-1 bg-white border-2 border-black rounded-xl" name="password" type="password" required />
          <button type="submit" className={`rounded-xl hover:bg-green-300 hover:shadow-green-200 bg-green-200 hover:shadow-xl border-green-300 border-2 py-1 mt-4`}>Login</button>
          <div className="flex flex-col items-center">
            <p>Or</p>
            <Link className="w-full text-center p-1 px-3 rounded-xl hover:bg-blue-300 hover:shadow-blue-200 bg-blue-200 hover:shadow-xl border-blue-300 border-2" href="/">Register</Link>
          </div>
      </form>
  </div>
  )
    
  async function authenticateUser(e:Event) {
    e.preventDefault()
    const email=(e.target as HTMLFormElement).email.value
    const password=(e.target as HTMLFormElement).password.value
    const res = await fetch("http://localhost:5000/authenticateUser",{
      credentials:"include",
      method:"POST",
      body:JSON.stringify({email,password}),
      headers:{"Content-type":"application/json;charset=UTF-8"}
    })
    const result = await res.json()
    console.log(result)
    if(result.authenticated){
      route(`/dashboard`)
    } else if(result.error){
      toast.error(result.message)   
    }
  }
}

export default LoginView