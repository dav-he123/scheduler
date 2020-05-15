import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const setDay = (day) => setState({ ...state, day }); //previous state is ...spread

  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  console.log("State", state);

  function bookInterview(id, interview) {
    console.log("BBB", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // setState({
    //   ...state,
    //   appointments,
    // });

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      });
  }

  const scheduleList = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      const interview = getInterview(state, appointment.interview);
      const interviewers = getInterviewersForDay(state, state.day);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
        />
      );
    }
  );
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/interviewers`)),
    ]).then((all) => {
      console.log("all", all);

      setState((prev) => ({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
    // setDays(response.data);
  }, []);

  // console.log("appointments", state.appointments);

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
