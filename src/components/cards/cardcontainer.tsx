import { JSX } from "preact";

const Cards = ({clickHandler,children}:{clickHandler?:JSX.MouseEventHandler<HTMLButtonElement>,children?:any}) => {
    return (
        <div className="card-container">
            {children}
        </div>
    );
}

export default Cards;
