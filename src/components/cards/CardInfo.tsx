const CardInfo = ({desc,icon,title,faCustoms}:{desc:string,icon:string,title:string,faCustoms?:string}) => {
    return (
        <div>
            <p>{desc}</p>
            <div className="icon">
                <i className={`${icon}`} style={faCustoms}></i>
            </div>
            <h1>{title}</h1>
        </div>
    );
}

export default CardInfo;
