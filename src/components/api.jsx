import axios from "axios";

const url = "https://calm-forest-98675.herokuapp.com/api/";

export const getFromApi = endPoint => {
  return axios.get(`${url}${endPoint}`);
};

export const updateVote = (direction, route, _id, updateState) => {
  updateState(direction, _id);
  axios.put(`${url}${route}/${_id}?vote=${direction}`).catch(console.log);
};

export const postComment = (comment, userObj, article_id) => {
  return axios.post(`${url}articles/${article_id}/comments`, {
    body: comment,
    created_by: userObj._id,
    created_at: Number(userObj.created_at)
  });
  // Should I have optimistically rendered?
};

export const postArticle = articleObj => {
  return axios.post(`${url}topics/${articleObj.belongs_to}/articles`, {
    title: articleObj.title,
    body: articleObj.body,
    created_by: articleObj.created_by
  });
};
