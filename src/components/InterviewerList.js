import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  console.log("PROPS", props);

  const interviewerList = props.interviewers.map((item) => {
    return (
      <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={item.id === props.value} //updated name of InterviewerList props to value
        setInterviewer={(e) => props.onChange(item.id)} //updated name of InterviewerList props to onChange
      />
    );
  });

  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}
