import axiosClient from "./axiosClient";

const boardApi = {
	getPrivateBoards: () => {
		const url = "/boards/private";
		return axiosClient.get(url);
	},
	getPublicBoards: () => {
		const url = "/boards/public";
		return axiosClient.get(url);
	},
	getBoard: (boardId) => {
		const url = `/boards/${boardId}`;
		return axiosClient.get(url);
	},
	createBoard: (name) => {
		const url = `/boards/`;
		const params = {
			name,
		}
		return axiosClient.post(url, params);
	},
	deleteBoard: (boardId) => {
		const url = `/boards/${boardId}`;
		return axiosClient.delete(url);
	},
	updateBoard: (boardId, name) => {
		const url = `/boards/${boardId}`;
		const params = {
			name,
		};
		return axiosClient.put(url, params);
	},
	shareBoard: (boardId) => {
		const url = `/boards/${boardId}`;
		const params = {
			public: true,
		};
		return axiosClient.put(url, params);
	},
	privateBoard: (boardId) => {
		const url = `/boards/${boardId}`;
		const params = {
			public: false,
		};
		return axiosClient.put(url, params);
	},
}

export default boardApi;