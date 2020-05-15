export function getAppointmentsForDay(state, day) {
  let finalArr = [];

  const appointmentDays = state.days.filter((key) => {
    return key.name === day;
  });

  // console.log(appointmentDays);

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

  const interviewersDays = state.days.filter((key) => {
    return key.name === day;
  });

  // console.log(appointmentDays);

  if (interviewersDays.length === 0) {
    return [];
  }

  // console.log("AAAAA", interviewersDays);

  let interviewersArr = interviewersDays[0].appointments;
  for (let key of interviewersArr) {
    finalArr.push(state.interviewers[key]);
  }
  return finalArr;
}
