import React, { useState } from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import useVisualMode from "hooks/useVisualMode";

import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    console.log("NAME", name);

    transition(SAVING);
    console.log("ID", props.id);
    console.log("INTERVIEW", interview);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function appointmentDelete() {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={props.onEdit}
          // onDelete={props.onDelete}
          onDelete={() => transition(CONFIRM)}
          // onDelete={() => appointmentDelete()}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          // interviewers={[]}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}

      {mode === SAVING && <Status message="Saving....." />}

      {mode === DELETING && <Status message="Deleting....." />}

      {mode === CONFIRM && (
        <Confirm
          // interviewers={props.interviewers}
          message={"Are you sure you would like to delete?"}
          onConfirm={() => appointmentDelete()}
          // onCancel={props.onDelete}
          onCancel={() => transition(SHOW)}
        />
      )}
    </article>
  );
}
