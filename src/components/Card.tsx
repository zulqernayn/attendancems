import { JSX } from "preact";

const Card = ({clickHandler,children}:{clickHandler?:JSX.MouseEventHandler<HTMLButtonElement>,children?:any}) => {
    return (
        <button className="group card bg-blue-300 hover:bg-green-400 hover:text-slate-500  hover:border-black border-2 border-blue-300" onClick={clickHandler}>
            {children}
        </button>
    );
}

export default Card;
