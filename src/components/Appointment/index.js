import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
// import Confirm from "components/Appointment/Confirm";
// import Status from "components/Appointment/Status";
// import Error from "components/Appointment/Error";
// import Form from "components/Appointment/Form";

export default function Appointment(props) {
  // const variable = props.interview ? <Show /> : <Empty />;

  // const interviewerList = function () {
  //   props.interviewers.map((value) => {
  //     return <Show interviewers={value.interviewers} />;
  //   });
  // };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          interviewers={props.interview.interviewer}
          student={props.interview.student}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      ) : (
        <Empty onAdd={props.onAdd} />
      )}

      {/* <Empty onAdd={props.onAdd} />
      <Show
        interviewers={props.interviewers}
        student={props.student}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      /> */}

      {/* <Confirm
        message={props.message}
        onCancel={props.onCancel}
        onConfirm={props.onConfirm}
      />
      <Status message={props.message} />
      <Error message={props.message} onClose={props.onClose} /> */}
      {/* <Form
        message={props.message}
        interviewers={props.interviewers}
        // interviewer={props.interviewer.id}
        onSave={props.onSave}
        onCancel={props.onCancel}
      /> */}
    </article>
  );
}
