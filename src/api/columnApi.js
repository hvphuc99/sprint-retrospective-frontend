import axiosClient from "./axiosClient";

const columnApi = {
	getColumns: (boardId) => {
		const url = `/boards/${boardId}/columns`;
		return axiosClient.get(url);
	},
}

export default columnApi;