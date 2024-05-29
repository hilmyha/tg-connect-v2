import axios from "../utils/axios";

export async function getUser() {
  const { data } = await axios.get("admin");
  console.log("data from server", data);

  return data;
}

export async function getUserById(id: string) {
  const { data } = await axios.get(`admin/${id}`);
  console.log("data from server", data);

  return data;
}

export async function updateUser(
  id: string,
  credentials: {
    name: string;
    email: string;
    is_admin: boolean;
    password: string;
    user_id: number;
  }
) {
  const response = await axios.put(`admin/${id}`, credentials);
  return response;
}
