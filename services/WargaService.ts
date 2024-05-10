import axios from "../utils/axios";

export async function getWarga() {
  const { data } = await axios.get("warga");
  console.log("data", data);

  return data;
}

export async function getWargaById(id: string) {
  const { data } = await axios.get(`warga/${id}`);
  console.log("data", data);

  return data;
}

export async function createWarga(credentials: {
  nama_kk: string;
  blok: string;
  jalan: string;
  jumlah_keluarga: number;
  status_kependudukan: boolean;
  nomor_hp: string;
}) {
  await axios.post("warga", credentials);
}

export async function updateWarga(
  id: string,
  credentials: {
    nama_kk: string;
    blok: string;
    jalan: string;
    jumlah_keluarga: number;
    status_kependudukan: boolean;
    nomor_hp: string;
  }
) {
  const response = await axios.put(`warga/${id}`, credentials);
  return response;
}

export async function deleteWarga(id: string) {
  const response = await axios.delete(`warga/${id}`);
  return response;
}

export async function recapData() {
  const { data } = await axios.get("recap");
  console.log("data", data);

  return data;
}
