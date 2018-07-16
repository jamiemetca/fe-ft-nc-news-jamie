import React from "react";

const Error = props => {
  const { status, message } = props.location.state;
  props.history.goBack();
  return (
    <div>
      <p>{`${status} ${message}`}</p>
      <h3>{"Something went wrong, taking you back"}</h3>;
    </div>
  );
};
export default Error;
