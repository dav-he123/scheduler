import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      <Empty onAdd={props.onAdd} />
      <Show
        interviewers={props.interviewers}
        student={props.student}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />
      <Confirm
        message={props.message}
        onCancel={props.onCancel}
        onConfirm={props.onConfirm}
      />
      <Status message={props.message} />
      <Error message={props.message} onClose={props.onClose} />
    </article>
  );
}
