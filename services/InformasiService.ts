import axios from "../utils/axios";

export async function getInformasi() {
  const { data } = await axios.get("informasi");
  console.log("data", data);

  return data;
}

export async function getInformasiById(id: string) {
  const response = await axios.get(`informasi/${id}`);
  return response;
}

export async function createInformasi(credentials: {
  judul: string;
  deskripsi: string;
  tanggal: string;
  waktu: string;
}) {
  await axios.post("informasi", credentials);
}

export async function deleteInformasi(id: string) {
  await axios.delete(`informasi/${id}`);
}
