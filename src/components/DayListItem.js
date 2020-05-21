import React from "react";
import "components/DayListItem.scss";

const classNames = require("classnames");

export default function DayListItem(props) {
  const formatSpots = () => {
    //formatSpots function determines the # of spots remaining in the specified day
    if (props.spots === 0) {
      return "no spots remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  };

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)} //onClick used to handle item click event that sets the day
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
