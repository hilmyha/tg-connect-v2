import axios from "../utils/axios";
import { deleteToken, setToken } from "./TokenService";

export async function register(credentials: {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const response = await axios.post("register", credentials);
  await setToken(response.data.data.token);
}

export async function login(credentials: {
  username: string;
  password: string;
}) {
  const { data } = await axios.post("login", credentials);
  console.log("response dari service", data.data.token);
  await setToken(data.data.token);
}

export async function loadUser() {
  const { data: user } = await axios.get("user");
  return user;
}

export async function logout() {
  await axios.post("logout", {});
  await deleteToken();
}
