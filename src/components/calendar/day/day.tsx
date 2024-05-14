import React from "react";
import "./style.css"

type dayProps = {
    day: number | null
}

const Day = (props: dayProps) => {
    const [bgColor, setBgColor] = React.useState<string>("white");
    return <div
        className="day"
        style={{ backgroundColor: bgColor, cursor: "pointer", color: bgColor === "white" ? "black" : "white" }}
        onClick={() => setBgColor(bgColor === "white" ? "green" : "white")}>
        {props.day}
    </div>
}

export default Day;