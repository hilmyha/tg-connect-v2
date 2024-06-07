import { axiosFile } from "../utils/axios";

export async function getLaporan() {
  const { data } = await axiosFile.get("laporan");
  return data;
}

export async function createLaporan(data: {
  kategori: string;
  perihal: string;
  isi: string;
  img_url: string;
}) {
  try {
    const formData = new FormData();
    formData.append("kategori", data.kategori);
    formData.append("perihal", data.perihal);
    formData.append("isi", data.isi);
    // Jika ada gambar yang dipilih, tambahkan sebagai objek data langsung ke FormData
    if (data.img_url) {
      formData.append("img_url", {
        name: data.img_url.split("/").pop(),
        type: data.img_url.split(".").pop() === "jpg" ? "image/jpeg" : "image/png",
        uri: data.img_url,
      });
    }

    const response = await axiosFile.post("laporan", formData);
    return response;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getLaporanById(id: string) {
  const response = await axiosFile.get(`laporan/${id}`);
  return response;
}

export async function deleteLaporan(id: string) {
  const response = await axiosFile.delete(`laporan/${id}`);
  return response;
}
