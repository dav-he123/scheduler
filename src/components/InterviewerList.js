import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const interviewerList = props.interviewers.map((item) => {
    // console.log("propsthird", props.interviewer);
    return (
      <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={item.id === props.value}
        setInterviewer={(e) => props.onChange(item.id)} //important
      />
    );
  });

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
