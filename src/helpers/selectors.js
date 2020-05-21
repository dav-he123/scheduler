export function getAppointmentsForDay(state, day) {
  let finalArr = [];

  const appointmentDays = state.days.filter((key) => {
    return key.name === day;
  });

  if (appointmentDays.length === 0) {
    return [];
  }

  let appointmentArr = appointmentDays[0].appointments;
  for (let key of appointmentArr) {
    finalArr.push(state.appointments[key]);
  }
  return finalArr;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    return {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
}

export function getInterviewersForDay(state, day) {
  let finalArr = [];

  // console.log("BBBBB", state.days);

  // console.log("DAY", day);

  const interviewersDays = state.days.filter((key) => {
    return key.name === day;
  });

  if (interviewersDays.length === 0) {
    return [];
  }

  let interviewersArr = interviewersDays[0].interviewers;
  for (let key of interviewersArr) {
    finalArr.push(state.interviewers[key]);
    // console.log("KEY1", key);
    // console.log("stateforinterviewers", state.interviewers);
  }
  return finalArr;
}
