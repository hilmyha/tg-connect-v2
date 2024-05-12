import axios from "../utils/axios";

export async function getPanic() {
  const { data } = await axios.get("panic");
  console.log("data", data);

  return data;
}

export async function createPanic(credentials: {
  latitude: string;
  longitude: string;
}) {
  await axios.post("panic", credentials);
}

