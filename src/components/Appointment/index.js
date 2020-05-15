import React, { useState } from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";

import Form from "components/Appointment/Form";

export default function Appointment(props) {
  // const interviewerList = function () {
  //   props.interviewers.map((value) => {
  //     return <Show interviewers={value.interviewers} />;
  //   });
  // };

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          // interviewers={[]}
          // onSave={action("onSave")}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}
