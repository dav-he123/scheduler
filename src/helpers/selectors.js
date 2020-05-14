export function getAppointmentsForDay(state, day) {
  let arr = [];

  const appointmentDays = state.days.filter((key) => {
    return key.name == day;
  });

  // console.log(appointmentDays);

  if (appointmentDays.length === 0) {
    return [];
  }

  let appointmentArr = appointmentDays[0].appointments;
  for (let key of appointmentArr) {
    arr.push(state.appointments[key]);
  }
  return arr;
}
