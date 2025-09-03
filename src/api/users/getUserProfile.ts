import { api } from "../confg";

export async function apiGetUserProfile() {
	try {
		const token = localStorage.getItem("token");

		if (token) {
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}
		const response = await api.get<any>("users/profile");
		return response.data || "Usuario nao encontrado.";
	} catch(error: any) {
		const errorMessage = error.response?.data?.message || "Erro ao pegar usuario";
    	throw new Error(errorMessage);
	}
}