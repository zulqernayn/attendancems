import { JSX } from "preact";

const CardButton = ({clickHandler,desc,icon,title}:{clickHandler:JSX.MouseEventHandler<HTMLButtonElement>,desc:string,icon:string,title:string}) => {
    return (
        <button onClick={clickHandler}>
            <p>{desc}</p>
            <div className="icon">
                <i className={`${icon}`}></i>
            </div>
            <h1>{title}</h1>
        </button>
    );
}

export default CardButton;
