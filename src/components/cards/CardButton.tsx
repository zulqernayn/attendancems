import { JSX } from "preact";

const CardButton = ({clickHandler,desc,icon,title,disabled=false}:{clickHandler:JSX.MouseEventHandler<HTMLButtonElement>,desc:string,icon:string,title:string,disabled?:boolean}) => {
    return (
        <button onClick={clickHandler} disabled={disabled}>
            <p>{desc}</p>
            <div className="icon">
                <i className={`${icon}`}></i>
            </div>
            <h1>{title}</h1>
        </button>
    );
}

export default CardButton;
