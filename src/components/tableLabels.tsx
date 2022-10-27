export default function TableLabels(){
    const labels=[
        "Email",
        "Password",
        "Days Present",
        "Days Absent",
        "Leaves",
        "Actions",
    ]
    return(
        <tr className="contents">
            {labels.map(label=><th>{label}</th>)}
        </tr>
    )
}