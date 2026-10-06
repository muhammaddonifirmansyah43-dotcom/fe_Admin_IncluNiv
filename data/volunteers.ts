export type Schedule = {
  day: string;
  time: string;
  course: string;
  room: string;
};

export type Volunteer = {
  id: string;
  name: string;
  nim: string;
  faculty: string;
  studyProgram: string;
  email: string;
  phone: string;
  photo?: string;
  skills: string;
  schedule: Schedule[];
};

export const volunteers: Volunteer[] = [
  {
    id: "1",
    name: "Gita Naura Kusuma",
    nim: "253140707111136",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "gita.naura@example.com",
    phone: "+62 84512345678",
    skills:
      "Mampu berkomunikasi dengan baik dan mendampingi mahasiswa dalam kegiatan perkuliahan.",
    schedule: [
      {
        day: "Senin",
        time: "07:00 - 07:50",
        course: "Pemrograman Mobile",
        room: "Gedung A401",
      },
      {
        day: "Senin",
        time: "07:50 - 10:20",
        course: "Pemrograman Mobile",
        room: "Gedung A403",
      },
      {
        day: "Selasa",
        time: "08:00 - 09:30",
        course: "Manajemen Komputer",
        room: "Gedung A402",
      },
      {
        day: "Rabu",
        time: "10:00 - 11:30",
        course: "Jaringan Komputer",
        room: "Gedung A402",
      },
    ],
  },

  {
    id: "2",
    name: "Lukito Adi Nugroho",
    nim: "253140707111143",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "lukito.adi@example.com",
    phone: "+62 81234567890",
    skills:
      "Mampu membantu mahasiswa dalam aktivitas akademik dan memiliki komunikasi interpersonal yang baik.",
    schedule: [
      {
        day: "Senin",
        time: "08:00 - 09:30",
        course: "Sistem Operasi",
        room: "Gedung A301",
      },
      {
        day: "Selasa",
        time: "10:00 - 11:30",
        course: "Basis Data",
        room: "Gedung A302",
      },
    ],
  },

  {
    id: "3",
    name: "Alya Putri Ramadhani",
    nim: "253140707111152",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "alya.putri@example.com",
    phone: "+62 81345678901",
    skills:
      "Terampil bekerja dalam tim dan mampu memberikan pendampingan akademik secara komunikatif.",
    schedule: [
      {
        day: "Senin",
        time: "10:00 - 11:30",
        course: "Algoritma dan Pemrograman",
        room: "Gedung A201",
      },
      {
        day: "Rabu",
        time: "08:00 - 09:30",
        course: "Interaksi Manusia dan Komputer",
        room: "Gedung A203",
      },
    ],
  },

  {
    id: "4",
    name: "Rizky Maulana Putra",
    nim: "253140707111167",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "rizky.maulana@example.com",
    phone: "+62 81123456789",
    skills:
      "Memiliki kemampuan komunikasi yang baik dan terbiasa bekerja bersama mahasiswa lain.",
    schedule: [
      {
        day: "Selasa",
        time: "07:00 - 08:40",
        course: "Pemrograman Dasar",
        room: "Gedung A102",
      },
      {
        day: "Kamis",
        time: "08:00 - 09:30",
        course: "Manajemen Proyek",
        room: "Gedung A305",
      },
    ],
  },

  {
    id: "5",
    name: "Nabila Salsabila",
    nim: "253140707111174",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "nabila.salsabila@example.com",
    phone: "+62 82123456789",
    skills:
      "Mampu memberikan dukungan akademik dan memiliki kemampuan adaptasi yang baik.",
    schedule: [
      {
        day: "Senin",
        time: "13:00 - 14:30",
        course: "Desain UI dan UX",
        room: "Gedung A205",
      },
      {
        day: "Rabu",
        time: "10:00 - 11:30",
        course: "Pemrograman Web",
        room: "Gedung A405",
      },
    ],
  },

  {
    id: "6",
    name: "Fajar Ramadhan",
    nim: "253140707111181",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "fajar.ramadhan@example.com",
    phone: "+62 82234567890",
    skills:
      "Memiliki kemampuan problem solving dan komunikasi yang mendukung kegiatan pendampingan.",
    schedule: [
      {
        day: "Selasa",
        time: "09:00 - 10:30",
        course: "Jaringan Komputer",
        room: "Gedung A402",
      },
      {
        day: "Kamis",
        time: "13:00 - 14:30",
        course: "Keamanan Informasi",
        room: "Gedung A307",
      },
    ],
  },

  {
    id: "7",
    name: "Siti Aulia Rahma",
    nim: "253140707111195",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "siti.aulia@example.com",
    phone: "+62 82345678901",
    skills:
      "Komunikatif, sabar, dan mampu membantu mahasiswa dalam aktivitas akademik.",
    schedule: [
      {
        day: "Senin",
        time: "09:00 - 10:30",
        course: "Basis Data",
        room: "Gedung A302",
      },
      {
        day: "Rabu",
        time: "13:00 - 14:30",
        course: "Sistem Informasi",
        room: "Gedung A204",
      },
    ],
  },

  {
    id: "8",
    name: "Dimas Arya Saputra",
    nim: "253140707111203",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "dimas.arya@example.com",
    phone: "+62 82456789012",
    skills:
      "Terbiasa membantu kegiatan kelompok dan memiliki komunikasi interpersonal yang baik.",
    schedule: [
      {
        day: "Selasa",
        time: "13:00 - 14:30",
        course: "Sistem Operasi",
        room: "Gedung A301",
      },
      {
        day: "Kamis",
        time: "10:00 - 11:30",
        course: "Pemrograman Mobile",
        room: "Gedung A403",
      },
    ],
  },

  {
    id: "9",
    name: "Nadia Maharani",
    nim: "253140707111218",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "nadia.maharani@example.com",
    phone: "+62 82567890123",
    skills:
      "Mampu berkomunikasi secara efektif dan mendukung mahasiswa dalam kegiatan perkuliahan.",
    schedule: [
      {
        day: "Senin",
        time: "14:00 - 15:30",
        course: "Manajemen Proyek",
        room: "Gedung A305",
      },
      {
        day: "Rabu",
        time: "07:00 - 08:30",
        course: "Algoritma dan Pemrograman",
        room: "Gedung A201",
      },
    ],
  },

  {
    id: "10",
    name: "Bagas Pratama",
    nim: "253140707111224",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "bagas.pratama@example.com",
    phone: "+62 82678901234",
    skills:
      "Memiliki kemampuan bekerja sama dan membantu mahasiswa dalam kegiatan akademik.",
    schedule: [
      {
        day: "Selasa",
        time: "08:00 - 09:30",
        course: "Pemrograman Web",
        room: "Gedung A405",
      },
      {
        day: "Kamis",
        time: "14:00 - 15:30",
        course: "Kewirausahaan",
        room: "Gedung A406",
      },
    ],
  },

  {
    id: "11",
    name: "Citra Ayu Lestari",
    nim: "253140707111231",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "citra.ayu@example.com",
    phone: "+62 82789012345",
    skills:
      "Sabar dalam berinteraksi dan mampu memberikan pendampingan secara terstruktur.",
    schedule: [
      {
        day: "Senin",
        time: "10:30 - 12:00",
        course: "Desain UI dan UX",
        room: "Gedung A205",
      },
      {
        day: "Rabu",
        time: "09:00 - 10:30",
        course: "Basis Data",
        room: "Gedung A302",
      },
    ],
  },

  {
    id: "12",
    name: "Yoga Prasetyo",
    nim: "253140707111245",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "yoga.prasetyo@example.com",
    phone: "+62 82890123456",
    skills:
      "Memiliki kemampuan teknis dan komunikasi yang mendukung proses pendampingan.",
    schedule: [
      {
        day: "Selasa",
        time: "10:30 - 12:00",
        course: "Keamanan Informasi",
        room: "Gedung A307",
      },
      {
        day: "Kamis",
        time: "07:00 - 08:30",
        course: "Jaringan Komputer",
        room: "Gedung A402",
      },
    ],
  },

  {
    id: "13",
    name: "Intan Permata Sari",
    nim: "253140707111259",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "intan.permata@example.com",
    phone: "+62 82901234567",
    skills:
      "Mampu berkomunikasi dengan baik dan mendukung mahasiswa dalam proses pembelajaran.",
    schedule: [
      {
        day: "Senin",
        time: "11:00 - 12:30",
        course: "Sistem Informasi",
        room: "Gedung A204",
      },
      {
        day: "Rabu",
        time: "14:00 - 15:30",
        course: "Manajemen Komputer",
        room: "Gedung A402",
      },
    ],
  },

  {
    id: "14",
    name: "Rafi Akbar",
    nim: "253140707111264",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "rafi.akbar@example.com",
    phone: "+62 83012345678",
    skills:
      "Terampil bekerja dalam tim dan memiliki kemampuan komunikasi yang baik.",
    schedule: [
      {
        day: "Selasa",
        time: "14:00 - 15:30",
        course: "Pemrograman Mobile",
        room: "Gedung A403",
      },
      {
        day: "Kamis",
        time: "09:00 - 10:30",
        course: "Sistem Operasi",
        room: "Gedung A301",
      },
    ],
  },

  {
    id: "15",
    name: "Maya Anggraini",
    nim: "253140707111278",
    faculty: "Fakultas Vokasi",
    studyProgram: "Teknologi Informasi",
    email: "maya.anggraini@example.com",
    phone: "+62 83123456789",
    skills:
      "Komunikatif dan memiliki kepedulian terhadap kebutuhan mahasiswa dalam kegiatan akademik.",
    schedule: [
      {
        day: "Senin",
        time: "08:30 - 10:00",
        course: "Interaksi Manusia dan Komputer",
        room: "Gedung A203",
      },
      {
        day: "Rabu",
        time: "11:00 - 12:30",
        course: "Pemrograman Web",
        room: "Gedung A405",
      },
    ],
  },
];