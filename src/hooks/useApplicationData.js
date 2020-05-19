import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  console.log("State", state);

  const setDay = (day) => setState({ ...state, day }); //previous state is ...spread

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/interviewers`)),
    ]).then((all) => {
      console.log("all", all);

      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    // console.log("BBB", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map(function (day) {
      // console.log("DAY HERE", day);

      if (day.name === state.day) {
        day.spots--;
      }

      // console.log("DAY HERE 2", day);

      return day;
    });

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((prev) => {
        console.log("BOOKINTERVIEW", prev);

        setState({
          ...state,
          days,
          appointments,
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map(function (day) {
      console.log("DAY HERE", day);

      if (day.name === state.day) {
        day.spots++;
      }

      console.log("DAY HERE 2", day);

      return day;
    });

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        console.log("HITS IN DELETE");

        setState({
          ...state,
          days,
          appointments,
        });
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
