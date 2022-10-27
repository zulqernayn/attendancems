import { useState } from "preact/hooks";
import { toast } from "react-hot-toast";

function RegisterationView() {
  const [pending, setPending] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <form
        onSubmit={registerUser}
        className={`rounded-2xl p-4 flex flex-col w-fit border-2 border-slate-200 bg-slate-100`}
      >
        <h1 className="font-signika text-2xl text-slate-700">
          Registration Form
        </h1>
        <label>Email</label>
        <input
          placeholder="your email.."
          className="px-3 shadow-xl py-1 bg-white border-2 border-black rounded-xl"
          name="email"
          type="text"
        />
        <label>Full Name</label>
        <input
          placeholder="your name.."
          className="px-3 shadow-xl py-1 bg-white border-2 border-black rounded-xl"
          name="fullname"
          type="text"
          required
        />
        <label>Password</label>
        <input
          placeholder="your password.."
          className="px-3 shadow-xl py-1 bg-white border-2 border-black rounded-xl"
          name="password"
          type="password"
          required
        />
        <button
          disabled={pending}
          type="submit"
          className={`flex justify-center gap-4 items-center rounded-xl hover:bg-green-300 hover:shadow-emerald-200 border-2 border-slate-300 hover:border-green-300 bg-green-200  hover:shadow-xl py-1 mt-4`}
        >
          {pending ? "Loading..." : "Register"}
          <i className="fas fa-arrow-right-long"></i>
        </button>
        <div className="flex flex-col items-center">
            <p>Or</p>
            <a className="w-full text-center p-1 px-3 rounded-xl hover:bg-blue-300 hover:shadow-blue-200 bg-blue-200 hover:shadow-xl border-blue-300 border-2" href="http://localhost:3000/login">Login</a>
        </div>
      </form>
    </div>
  );

  async function registerUser(e: Event) {
    e.preventDefault();
    setPending(true);
    const { email, password, fullname } = e.target as HTMLFormElement;
    try {
      const res = await fetch("http://localhost:5000/createUser", {
        method: "POST",
        body: JSON.stringify({
          email: email.value,
          name: fullname.value,
          password: password.value,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const result = await res.json();
      if (!result.error) toast.success(result.message);
      else throw new Error(result.message);
      setPending(false);
    } catch (err: any) {
      setPending(false);
      toast.error(`Error:${err.message}`);
      console.error(err);
    }
  }
}

export default RegisterationView;
