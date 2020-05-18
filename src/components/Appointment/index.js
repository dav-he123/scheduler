import React, { useState } from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR = "ERROR";

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
    // console.log("ID", props.id);
    // console.log("INTERVIEW", interview);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function appointmentDelete(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          // interviewer={props.interview.interviewer.name}
          // onDelete={props.onDelete}
          // onDelete={() => appointmentDelete()}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.name}
          // student={props.interview.student}
          // interviewers={[]}
          name={props.interview.student}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === ERROR && (
        <Error message={"There is an error"} onClose={() => back()} />
      )}

      {mode === ERROR_SAVE && (
        <Error message={"There an error with save"} onClose={() => back()} />
      )}

      {mode === ERROR_DELETE && (
        <Error message={"There an error with delete"} onClose={() => back()} />
      )}
    </article>
  );
}
