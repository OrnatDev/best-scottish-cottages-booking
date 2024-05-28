import React, { useEffect, useState } from "react";
import Day from "./day/day.tsx";
import "./style.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Modal from 'react-modal';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

Modal.setAppElement('#root');

const currentDate = new Date();

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
            data-name="Right" />
    </svg>
);

type bookedDay = {
    day: number,
    month: string,
    year: number
}

const Calendar = () => {

    const [months, setMonths] = useState<{ days: number; name: string; week_days: number }[]>([]);
    const [year, setYear] = useState<string>((currentDate.getFullYear()).toString());
    const [quantityMonths, setQuantityMonths] = useState<number>(3);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [bookedDays, setBookedDays] = useState<bookedDay[]>([{ day: 21, month: "January", year: 2024 }, { day: 26, month: "January", year: 2024 }]);

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

        setMonths(generateMonths());
    }, [year]);

    const openModal = (day: number, month: string) => {
        setSelectedDay(day);
        setSelectedMonth(month);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedDay(null);
        setSelectedMonth(null);
    };

    return (
        <div className="calendar">
            <div className="switch_year">
                <div className="arrow" onClick={() => setYear((parseInt(year) - 1).toString())}>{arrowBack}</div>
                <div>{year}</div>
                <div className="arrow" onClick={() => setYear((parseInt(year) + 1).toString())}>{arrowNext}</div>
                <select defaultValue={3} onChange={(e) => setQuantityMonths(parseInt(e.target.value))}>
                    <option value="1">1 month</option>
                    <option value="2">2 months</option>
                    <option value="3">3 months</option>
                </select>
            </div>
            <Swiper
                spaceBetween={30}
                slidesPerView={quantityMonths}
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
                                    <Day year={year} bookedDays={null} key={j + "week_days" + year} monthName={null} day={null} openModal={() => { }} />
                                ))}
                                {Array.from({ length: month.days }, (_, i) => (
                                    <Day year={year} bookedDays={bookedDays} key={i + "days" + year} day={i + 1} monthName={month.name} openModal={() => openModal(i + 1, month.name)} />
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Additional Information"
                className="modal"
                overlayClassName="modal_overlay"
            >
                <h2>Additional Information</h2>
                <p>{selectedMonth} {selectedDay}, {year}</p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
}

export default Calendar;