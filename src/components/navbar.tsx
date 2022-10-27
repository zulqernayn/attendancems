import { JSX } from "preact"

const Navbar=({title,children}:{title:String | undefined,children?:JSX.Element})=>(
    <nav className="flex justify-between w-full">
        <h1 className="text-5xl ">{title ?? "User"}</h1>
        {children}
    </nav>
)

export default Navbar