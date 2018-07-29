import React from "react";
import * as api from "./api";

const VoteButton = ({ direction, route, _id, updateState, voted }) => {
  if (voted) {
    voted === "up" ? (direction = "down") : (direction = "up");
  }
  return (
    <button
      className='button is-small'
      type="button"
      onClick={() => api.updateVote(direction, route, _id, updateState)}
    >{'Vote'}</button>
  );
};

export default VoteButton;
