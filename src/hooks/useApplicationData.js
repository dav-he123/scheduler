import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    //updates the state
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  console.log("State", state);

  const setDay = (day) => setState({ ...state, day }); // updates the state with the new day

  useEffect(() => {
    Promise.all([
      // makes requests before updating the state
      Promise.resolve(axios.get(`http://localhost:8001/api/days`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/appointments`)),
      Promise.resolve(axios.get(`http://localhost:8001/api/interviewers`)),
    ]).then((all) => {
      console.log("all", all);

      setState((prev) => ({
        // action used to set the state to make sure value of days changes
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map(function (day) {
      //either decreases the keeps the spots remaining constant when adding or editing an appointment
      if (day.name === state.day && interview.newInterview) {
        day.spots--;
      }
      return day;
    });

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((prev) => {
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
      //increases the keeps the spots remaining when deleting an appointment

      if (day.name === state.day) {
        day.spots++;
      }

      return day;
    });

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
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
