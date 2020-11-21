import axiosClient from "./axiosClient";

const cardApi = {
  getCards: (boardId, columnId) => {
    const url = `/boards/${boardId}/columns/${columnId}/cards`;
    return axiosClient.get(url);
  },
  addCard: (boardId, columnId, content) => {
    const url = `/boards/${boardId}/columns/${columnId}/cards`;
    const params = {
      content,
    };
    return axiosClient.post(url, params);
  },
  updateCard: (boardId, columnId, cardId, content) => {
    const url = `/boards/${boardId}/columns/${columnId}/cards/${cardId}`;
    const params = {
      content,
    };
    return axiosClient.put(url, params);
  },
  deleteCard: (boardId, columnId, cardId, content) => {
    const url = `/boards/${boardId}/columns/${columnId}/cards/${cardId}`;
    return axiosClient.delete(url);
  },
};

export default cardApi;
