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
  axios
    .post(`${url}articles/${article_id}/comments`, {
      body: comment,
      created_by: userObj._id
    })
    .catch(console.log);
};
