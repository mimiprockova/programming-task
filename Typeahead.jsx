import React from "react";

function Typeahead(props) {
  const list = props.colorsList;
  const items = list.map((color, idx) => <li key={idx}>{color}</li>);
  return <div>{items}</div>;
}

export default Typeahead;
