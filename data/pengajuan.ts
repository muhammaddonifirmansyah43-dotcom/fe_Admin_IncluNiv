export type PengajuanStatus =
  | "Diproses"
  | "Disetujui"
  | "Tidak dapat dipenuhi";

export type Pengajuan = {
  id: string;
  name: string;
  nim: string;
  studyProgram: string;
  faculty: string;
  date: string;
  status: PengajuanStatus;
  reason: string;
  schedule: string;
  dateRequest: string;
};

export const pengajuanData: Pengajuan[] = [
  {
    id: "1",
    name: "Gita Naura Kusuma",
    nim: "253140707111136",
    studyProgram: "Teknologi Informasi",
    faculty: "Fakultas Vokasi",
    date: "30-09-2026",
    status: "Diproses",
    reason:
      "Saya sedang sakit dan perlu beristirahat, sehingga tidak dapat melakukan pendampingan sesuai jadwal.",
    schedule: "Rabu, 30 September 2026, pukul 08:00-10:00",
    dateRequest: "30 September 2026",
  },

  {
    id: "2",
    name: "Lukito Adi Nugroho",
    nim: "253140707111143",
    studyProgram: "Teknologi Informasi",
    faculty: "Fakultas Vokasi",
    date: "30-09-2026",
    status: "Disetujui",
    reason:
      "Saya sedang sakit dan perlu beristirahat, sehingga tidak dapat melakukan pendampingan sesuai jadwal.",
    schedule: "Rabu, 30 September 2026, pukul 08:00-10:00",
    dateRequest: "30 September 2026",
  },

  {
    id: "3",
    name: "Anjani Tri Paundra",
    nim: "253140707111065",
    studyProgram: "Teknologi Informasi",
    faculty: "Fakultas Ilmu Komputer",
    date: "30-09-2026",
    status: "Tidak dapat dipenuhi",
    reason:
      "Saya sedang sakit dan perlu beristirahat, sehingga tidak dapat melakukan pendampingan sesuai jadwal.",
    schedule: "Rabu, 30 September 2026, pukul 08:00-10:00",
    dateRequest: "30 September 2026",
  },

  {
    id: "4",
    name: "Dimas Pratama",
    nim: "253140707111070",
    studyProgram: "Teknik Informatika",
    faculty: "Fakultas Teknik",
    date: "29-09-2026",
    status: "Disetujui",
    reason:
      "Mengajukan izin karena memiliki keperluan keluarga.",
    schedule: "Kamis, 1 Oktober 2026, pukul 09:00-11:00",
    dateRequest: "29 September 2026",
  },

  {
    id: "5",
    name: "Salsa Putri",
    nim: "253140707111080",
    studyProgram: "Sistem Informasi",
    faculty: "Fakultas Ilmu Komputer",
    date: "28-09-2026",
    status: "Diproses",
    reason:
      "Mengajukan izin karena kondisi kesehatan kurang baik.",
    schedule: "Jumat, 2 Oktober 2026, pukul 10:00-12:00",
    dateRequest: "28 September 2026",
  },

  {
    id: "6",
    name: "Raka Maulana",
    nim: "253140707111090",
    studyProgram: "Teknik Sipil",
    faculty: "Fakultas Teknik",
    date: "28-09-2026",
    status: "Tidak dapat dipenuhi",
    reason:
      "Mengajukan izin karena terdapat kegiatan lain pada waktu pendampingan.",
    schedule: "Senin, 5 Oktober 2026, pukul 08:00-10:00",
    dateRequest: "28 September 2026",
  },

  {
    id: "7",
    name: "Nadia Rahma",
    nim: "253140707111100",
    studyProgram: "Administrasi Bisnis",
    faculty: "Fakultas Vokasi",
    date: "27-09-2026",
    status: "Disetujui",
    reason:
      "Mengajukan izin karena memiliki keperluan akademik.",
    schedule: "Selasa, 6 Oktober 2026, pukul 13:00-15:00",
    dateRequest: "27 September 2026",
  },

  {
    id: "8",
    name: "Fajar Ramadhan",
    nim: "253140707111110",
    studyProgram: "Teknologi Informasi",
    faculty: "Fakultas Vokasi",
    date: "27-09-2026",
    status: "Diproses",
    reason:
      "Mengajukan izin karena kondisi kesehatan.",
    schedule: "Rabu, 7 Oktober 2026, pukul 08:00-10:00",
    dateRequest: "27 September 2026",
  },
];