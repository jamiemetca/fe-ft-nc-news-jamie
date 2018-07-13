import axios from "axios";

const url = "https://calm-forest-98675.herokuapp.com/api/";

export const getFromApi = endPoint => {
  return axios.get(`${url}${endPoint}`).catch(console.log);
};

export const updateVote = (direction, route, _id, updateState) => {
  updateState(direction, _id);
  axios.put(`${url}${route}/${_id}?vote=${direction}`).catch(console.log);
};

export const postComment = (comment, userObj) => {
  console.log(comment);
  console.log(userObj);
};
