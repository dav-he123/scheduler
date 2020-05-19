import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  console.log("props", props);

  const interviewerList = props.interviewers.map((item) => {
    // console.log("propsthird", props.interviewer);

    return (
      <InterviewerListItem
        key={item ? item.id : 100}
        name={item ? item.name : "David"}
        avatar={item ? item.avatar : "https://i.imgur.com/LpaY82x.png"}
        selected={item ? item.id === props.value : 1}
        setInterviewer={(e) => props.onChange(item.id)} //important
      />
    );
  });

  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  return (
    <section
      className="interviewers"
      // onClick={() => props.setInterviewer(props.name)}
    >
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}
