import axios, { axiosFile } from "../utils/axios";

export async function getDokumenWarga() {
  const { data } = await axiosFile.get("dokumen-warga");
  console.log("data from server", data);
  return data;
}

export async function getDokumenWargaById(id: string) {
  const { data } = await axiosFile.get(`dokumen-warga/${id}`);
  console.log("data from server", data);
  return data;
}

export async function createDokumenWarga(data: {
  dokumen: string;
  keterangan: boolean;
}) {
  try {
    const formData = new FormData();
    if (data.dokumen) {
      formData.append("dokumen", {
        name: data.dokumen.split("/").pop(),
        type:
          data.dokumen.split(".").pop() === "jpg" ? "image/jpeg" : "image/png",
        uri: data.dokumen,
      });
    }
    // formData.append("keterangan", data.keterangan);

    const response = await axiosFile.post("dokumen-warga", formData);
    return response;
  } catch (error: any) {
    console.log(error);
  }
}

export async function updateDokumen(
  id: string,
  data: {
    dokumen: string;
    keterangan: boolean;
  }
) {
  const response = await axios.put(`dokumen-warga/${id}`, data);
  return response;
}

export async function deleteDokumenWarga(id: string) {
  await axios.delete(`dokumen-warga/${id}`);
}
