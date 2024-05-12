import axios from "../utils/axios";

export async function getInformasi() {
  const { data } = await axios.get("informasi");
  console.log("data", data);

  return data;
}

export async function getInformasiById(id: string) {
  const { data } = await axios.get(`informasi/${id}`);
  console.log("data", data);

  return data;
}

export async function createInformasi(credentials: {
  judul: string;
  deskripsi: string;
  tanggal: string;
  waktu: string;
}) {
  await axios.post("informasi", credentials);
}