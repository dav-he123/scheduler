import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const dayList = props.days.map((day) => {
    //DayList component maps over the days array to return DayListItem component as children
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  //Renders the list of components in React to identify each component
  return <ul>{dayList}</ul>;
}
