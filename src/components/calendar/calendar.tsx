import React, { useEffect } from "react";
import Day from "./day/day.tsx";
import "./style.css";
import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';

const currentDate = new Date;
const arrowBack = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
        <path
            style={{ fill: "#232326" }}
            d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
            data-name="Left" />
    </svg>
);
const arrowNext = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
        <path
            style={{ fill: "#232326" }}
            d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
            data-name="Right"
        />
    </svg>
)

const Calendar = () => {
    const [months, setMonths] = React.useState<{ days: number; name: string; week_days: number }[]>([]);
    const [year, setYear] = React.useState<string>((currentDate.getFullYear()).toString());

    useEffect(() => {
        function generateMonths() {
            return [
                { days: 31, name: "January", week_days: new Date(`${year}-01-01`).getDay() },
                { days: (parseInt(year) % 4 === 0 && (parseInt(year) % 100 !== 0 || parseInt(year) % 400 === 0)) ? 29 : 28, name: "February", week_days: new Date(`${year}-02-01`).getDay() },
                { days: 31, name: "March", week_days: new Date(`${year}-03-01`).getDay() },
                { days: 30, name: "April", week_days: new Date(`${year}-04-01`).getDay() },
                { days: 31, name: "May", week_days: new Date(`${year}-05-01`).getDay() },
                { days: 30, name: "June", week_days: new Date(`${year}-06-01`).getDay() },
                { days: 31, name: "July", week_days: new Date(`${year}-07-01`).getDay() },
                { days: 31, name: "August", week_days: new Date(`${year}-08-01`).getDay() },
                { days: 30, name: "September", week_days: new Date(`${year}-09-01`).getDay() },
                { days: 31, name: "October", week_days: new Date(`${year}-10-01`).getDay() },
                { days: 30, name: "November", week_days: new Date(`${year}-11-01`).getDay() },
                { days: 31, name: "December", week_days: new Date(`${year}-12-01`).getDay() }
            ];
        }

        setMonths(generateMonths())
    }, [year]);



    return <div className="calendar">
        <div className="switch_year">
            <div className="arrow" onClick={() => setYear((parseInt(year) - 1).toString())}>{arrowBack}</div>
            <div>{year}</div>
            <div className="arrow" onClick={() => setYear((parseInt(year) + 1).toString())}>{arrowNext}</div>
        </div>
        <Swiper
            spaceBetween={30}
            slidesPerView={4}
            navigation
            modules={[Navigation, Pagination]}
            className="swiper"
        >
            {months.map(month =>
                <SwiperSlide className="swiper_slide" key={month.name + "slide"}>
                    <div key={month.name} className="month">
                        <p>{month.name} {year}</p>
                        <div className="week_days">
                            <div>MON</div>
                            <div>TUE</div>
                            <div>WED</div>
                            <div>THU</div>
                            <div>FRI</div>
                            <div>SAT</div>
                            <div>SUN</div>
                        </div>
                        <div className="days">
                            {Array.from({ length: month.week_days - 1 }, (_, j) => (
                                <Day key={j + "week_days"} day={null} />
                            ))}
                            {Array.from({ length: month.days }, (_, i) => (
                                <Day key={i + "days"} day={i + 1} />
                            ))}
                        </div>
                    </div>
                </SwiperSlide>
            )}
        </Swiper>
    </div>
}

export default Calendar;