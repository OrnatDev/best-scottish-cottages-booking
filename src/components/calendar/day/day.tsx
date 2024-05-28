import React from "react";
import "./style.css"

type bookedDay = {
    day: number,
    month: string,
    year: number
}

type dayProps = {
    day: number | null,
    openModal: () => void,
    monthName: string | null,
    bookedDays: bookedDay[] | null,
    year: string
}

const Day = (props: dayProps) => {

    let bgColor = "white";

    props.bookedDays !== null && props.bookedDays.map(item => {
        if (props.day === item.day && props.monthName === item.month && parseInt(props.year) === item.year) {
            bgColor = "red";
        }
    })

    return props.day === null ? <div></div> : <div
        className="day"
        style={{ backgroundColor: bgColor, cursor: "pointer", color: bgColor === "white" ? "black" : "white" }}
        onClick={props.openModal}>
        {props.day}
    </div>
}

export default Day;