import { JSX } from "preact";
import { route } from "preact-router";

const CardLink = ({link,desc,icon,title,children=undefined}:{children?:JSX.Element,link:string,desc:string,icon:string,title:string}) => {
    return (
        children ? children : 
        <button onClick={()=>{route(link)}}>
            <p>{desc}</p>
            <div className="icon">
                <i className={`${icon}`}></i>
            </div>
            <h1>{title}</h1>
        </button>
    );
}

export default CardLink;
