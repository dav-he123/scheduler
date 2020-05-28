import React, { useState } from "react";

import Button from "components/Button";

import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || ""); //need to keep track of information for the name by using useState
  const [interviewer, setInterviewer] = useState(props.interviewer || null); //need to keep track of information for the interviewer by using useState
  const [error, setError] = useState("");

  const reset = function () {
    //created reset function so when user clicks Cancel button, the form valuse are cleared
    setName("");
    setInterviewer(null);
  };

  const cancel = function () {
    //cancel function calls the reset function to update the component
    reset();
    props.onCancel();
  };

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            // name={name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            data-testid="student-name-input"
            /*            
          This must be a controlled component
        */
          />

          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
