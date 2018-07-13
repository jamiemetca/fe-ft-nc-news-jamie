import axios from "axios";

const url = "https://calm-forest-98675.herokuapp.com/api/";

export const getFromApi = endPoint => {
  return axios.get(`${url}${endPoint}`).catch(console.log);
};

export const updateVote = (direction, route, _id, updateState) => {
  updateState(direction, _id);
  axios.put(`${url}${route}/${_id}?vote=${direction}`).catch(console.log);
};

export const postComment = (comment, userObj, article_id) => {
  console.log(article_id);
  // address isn't working, saying undefined
  // axios.put(`${url}articles/${article_id}/comments`).then(commentObj => {
  //   console.dir(commentObj);
  // });
  // console.log(comment);
  // console.log(userObj);
};
