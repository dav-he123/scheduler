import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
  },

  {
    id: 4,
    time: "3pm",
  },
];

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // console.log(day);
  // const [days, setDay] = useState([]);

  const setDay = (day) => setState({ ...state, day }); //previous state is ...spread

  // const setDays = (days) => setState({ ...state, days });

  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
  });

  console.log("State", state);

  const scheduleList = appointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

  // useEffect(() => {
  //   axios.get(`http://localhost:8001/api/days`).then((response) => {
  //     console.log(response);

  //     Promise.all([
  //       Promise.resolve(`/api/days`),
  //       Promise.resolve(`/api/appointments`),
  //       Promise.resolve("third"),
  //     ]).then((all) => {
  //       setState((state) => ({
  //         days: all[0],
  //         appointments: all[1],
  //         third: all[2],
  //       }));
  //     });
  //     // setDays(response.data);
  //   }, []);
  // });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
      Promise.resolve(axios.get("third")),
    ]).then((all) => {
      setState((prev) => ({
        days: all[0],
        appointments: all[1],
        third: all[2],
      }));
    });
    // setDays(response.data);
  }, []);

  // setState(state => ({...state, days: response.data}))

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
          {/* <DayList days={days} setDay={setDay} /> */}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {scheduleList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
