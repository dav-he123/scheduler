import React from "react";

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

  function save(interview) {
    //save function allows a interview to be booked/added
    if (interview.interviewer === null) {
      transition(ERROR_SAVE, true);
    } else {
      transition(SAVING);
      props
        .bookInterview(props.id, interview)
        .then((prev) => {
          console.log("Name testing");
          console.log("Previous", prev);
          transition(SHOW);
        })
        .catch((error) => {
          transition(ERROR_SAVE, true);
        });
    }
  }

  function appointmentDelete(event) {
    //appointmentDelete function allows a interview to be deleted

    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    // components are rendered to be displayed from the client side
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={(name, interviewer) =>
            save({ student: name, interviewer, newInterview: true })
          }
          onCancel={() => back()}
        />
      )}

      {mode === SAVING && <Status message="Saving....." />}

      {mode === DELETING && <Status message="Deleting....." />}

      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={() => appointmentDelete()}
          onCancel={() => back()}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
          onSave={(name, interviewer) =>
            save({ student: name, interviewer, newInterview: false })
          }
          onCancel={() => back()}
        />
      )}

      {mode === ERROR && ( //error message displays when there is an error
        <Error message={"There is an error"} onClose={() => back()} />
      )}

      {mode === ERROR_SAVE && ( //error message displays when error with save
        <Error message={"There is an error with save"} onClose={() => back()} />
      )}

      {mode === ERROR_DELETE && ( //error message displays when error with delete
        <Error
          message={"There is an error with delete"}
          onClose={() => back()}
        />
      )}
    </article>
  );
}
