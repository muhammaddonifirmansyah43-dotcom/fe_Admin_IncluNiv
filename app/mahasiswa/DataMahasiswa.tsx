"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import styles from "./mahasiswa.module.css";

type Mahasiswa = {
  id: number;
  nama: string;
  nim: string;
  fakultas: string;
  disabilitas: string;
};

type NamaIkon =
  | "menu"
  | "panel"
  | "bell"
  | "dashboard"
  | "users"
  | "clipboard"
  | "calendar"
  | "chart"
  | "logout"
  | "search"
  | "eye"
  | "trash";

export function Ikon({
  nama,
  ukuran = 32,
}: {
  nama: NamaIkon;
  ukuran?: number;
}) {
  const bentuk: Record<NamaIkon, ReactNode> = {
    menu: <path d="M2 4H22M2 12H22M2 20H22" />,

    panel: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M9 3V21" />
      </>
    ),

    bell: (
      <>
        <path d="M5 17H19L18 14V9A6 6 0 0 0 6 9V14Z" />
        <path d="M10 20A2 2 0 0 0 14 20M11 3V1H13V3" />
      </>
    ),

    dashboard: (
      <path d="M3 3H9V9H3ZM15 3H21V9H15ZM3 15H9V21H3ZM15 15H21V21H15Z" />
    ),

    users: (
      <>
        <circle cx="9" cy="7" r="4" />
        <ellipse cx="9" cy="18" rx="7" ry="4" />
        <path d="M17 3A4 4 0 0 1 17 11M18 14C24 14 24 21 18 22" />
      </>
    ),

    clipboard: (
      <>
        <rect x="6" y="4" width="12" height="18" rx="1" />
        <path d="M9 4V2H15V4M9 8H15M9 11H15M9 14H15M9 17H15" />
      </>
    ),

    calendar: (
      <>
        <rect x="2" y="5" width="20" height="17" rx="1" />
        <path d="M7 2V8M17 2V8M2 10H22" />
      </>
    ),

    chart: (
      <path d="M3 21V11H8V21M8 21V4H13V21M13 21V8H18V21M2 21H21" />
    ),

    logout: (
      <>
        <path d="M10 5V2H21V22H10V19" />
        <path d="M15 12H2M6 8L2 12L6 16" />
      </>
    ),

    search: (
      <>
        <circle cx="10" cy="10" r="7" />
        <path d="M15 15L22 22" />
      </>
    ),

    eye: (
      <>
        <path
          d="M1 12S5 5 12 5S23 12 23 12S19 19 12 19S1 12 1 12Z"
          fill="currentColor"
          stroke="none"
        />
        <circle
          cx="12"
          cy="12"
          r="3.5"
          stroke="white"
          strokeWidth="2"
        />
      </>
    ),

    trash: (
      <>
        <path d="M3 5H21M9 5V2H15V5M5 5V22H19V5" />
        <path d="M9 9V18M15 9V18" />
      </>
    ),
  };

  return (
    <svg
      width={ukuran}
      height={ukuran}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {bentuk[nama]}
    </svg>
  );
}

/* Sepuluh mahasiswa pertama sesuai gambar. */
const dataDariGambar: Mahasiswa[] = [
  {
    id: 1,
    nama: "Ahmad Macheda",
    nim: "253140707000065",
    fakultas: "Fakultas Vokasi",
    disabilitas: "Tuna Daksa",
  },
  {
    id: 2,
    nama: "Anwar Reza",
    nim: "253140707000987",
    fakultas: "Fakultas Vokasi",
    disabilitas: "Tuna Rungu",
  },
  {
    id: 3,
    nama: "Raka Fadhillah",
    nim: "253140707111115",
    fakultas: "Fakultas Vokasi",
    disabilitas: "Tuna Daksa",
  },
  {
    id: 4,
    nama: "Fabian Al-farizi",
    nim: "253140707112000",
    fakultas: "Fakultas Ilmu Komputer",
    disabilitas: "Tuna Netra",
  },
  {
    id: 5,
    nama: "Dewi Putri Ayu",
    nim: "253140707111090",
    fakultas: "Fakultas Pertanian",
    disabilitas: "Tuna Netra",
  },
  {
    id: 6,
    nama: "Valdifa Azril",
    nim: "253140707111090",
    fakultas: "Fakultas Pertanian",
    disabilitas: "Tuna Daksa",
  },
  {
    id: 7,
    nama: "Taufiq Akbar",
    nim: "253140707001122",
    fakultas: "Fakultas Ilmu Administrasi",
    disabilitas: "Tuna Daksa",
  },
  {
    id: 8,
    nama: "Ikhwanudin",
    nim: "253140707110156",
    fakultas: "Fakultas Teknologi Pertanian",
    disabilitas: "Tuna Rungu",
  },
  {
    id: 9,
    nama: "Zalvarina Azzahra",
    nim: "253140707111181",
    fakultas: "Fakultas Pertanian",
    disabilitas: "Tuna Rungu",
  },
  {
    id: 10,
    nama: "Putri Maharani",
    nim: "253140707111164",
    fakultas: "Fakultas Vokasi",
    disabilitas: "Tuna Daksa",
  },
];

/* Data tambahan berikut merupakan data contoh. */
const namaTambahan = [
  "Aditya Pratama",
  "Aisyah Putri",
  "Bagas Saputra",
  "Bella Aprilia",
  "Cahya Ramadhan",
  "Citra Lestari",
  "Dimas Arya",
  "Dinda Safitri",
  "Eko Setiawan",
  "Elsa Maharani",
  "Fajar Nugraha",
  "Farah Aulia",
  "Galih Permana",
  "Ghina Amalia",
  "Hafiz Maulana",
  "Hana Zahra",
  "Ilham Akbar",
  "Indah Permata",
  "Johan Prasetyo",
  "Jihan Nabila",
  "Kevin Adiputra",
  "Kirana Ayuningtyas",
  "Luthfi Hakim",
  "Laras Kusuma",
  "Muhammad Rizki",
  "Melati Anggraini",
  "Naufal Hidayat",
  "Nadia Khairunnisa",
  "Omar Farhan",
  "Olivia Putri",
  "Panji Wicaksono",
  "Puspita Sari",
  "Qais Alfarizi",
  "Qonita Azzahra",
  "Rizky Firmansyah",
  "Rania Zahira",
  "Satria Wijaya",
  "Salma Nadhira",
  "Teguh Santoso",
  "Tiara Anindya",
  "Umar Fadli",
  "Ulfa Rahmawati",
  "Vino Mahendra",
  "Vania Aurelia",
  "Wahyu Kurniawan",
  "Winda Kartika",
  "Yoga Prabowo",
  "Yasmin Alifa",
  "Zaki Mubarak",
  "Zahra Hanifah",
  "Arif Darmawan",
  "Nabila Fitri",
  "Bima Pamungkas",
  "Salsabila Rahma",
];

const fakultasContoh = [
  "Fakultas Vokasi",
  "Fakultas Pertanian",
  "Fakultas Ilmu Komputer",
  "Fakultas Ilmu Administrasi",
  "Fakultas Teknologi Pertanian",
];

const disabilitasContoh = [
  "Tuna Daksa",
  "Tuna Rungu",
  "Tuna Netra",
];

export const dataMahasiswa: Mahasiswa[] = [
  ...dataDariGambar,
  ...namaTambahan.map((nama, index) => ({
    id: index + 11,
    nama,
    nim: `253140707${String(index + 2001).padStart(6, "0")}`,
    fakultas: fakultasContoh[index % fakultasContoh.length],
    disabilitas:
      disabilitasContoh[index % disabilitasContoh.length],
  })),
];

export const menuSidebar: {
  nama: string;
  href: string;
  ikon: NamaIkon;
}[] = [
  { nama: "Dashboard", href: "/dashboard", ikon: "dashboard" },
  { nama: "Data mahasiswa", href: "/mahasiswa", ikon: "users" },
  { nama: "Data Volunteer", href: "/volunteer", ikon: "users" },
  { nama: "Pengajuan", href: "/pengajuan", ikon: "clipboard" },
  { nama: "Penjadwalan", href: "/jadwal", ikon: "calendar" },
  { nama: "Rekap volunteer", href: "/rekap", ikon: "chart" },
  { nama: "Notifikasi", href: "/notifikasi", ikon: "bell" },
];

export default function DataMahasiswa() {
  const [sidebarTerbuka, setSidebarTerbuka] = useState(false);
  const [mahasiswaList, setMahasiswaList] = useState(dataMahasiswa);
  const [pencarian, setPencarian] = useState("");
  const [jenisDisabilitas, setJenisDisabilitas] = useState("");
  const [jumlahData, setJumlahData] = useState(15);
  const [menuAktif, setMenuAktif] = useState<number | null>(null);

  // Tambahan untuk konfirmasi hapus.
  const [mahasiswaHapus, setMahasiswaHapus] =
    useState<Mahasiswa | null>(null);

  useEffect(() => {
    function handleKlikLuar(event: MouseEvent) {
      if (
        event.target instanceof Element &&
        !event.target.closest("[data-menu-mahasiswa]")
      ) {
        setMenuAktif(null);
      }
    }

    function handleKeyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuAktif(null);
        setMahasiswaHapus(null);
      }
    }

    document.addEventListener("click", handleKlikLuar);
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("click", handleKlikLuar);
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  const hasilFilter = mahasiswaList.filter((mahasiswa) => {
    const kataKunci = pencarian.trim().toLowerCase();

    const cocokPencarian =
      `${mahasiswa.nama} ${mahasiswa.nim}`
        .toLowerCase()
        .includes(kataKunci);

    const cocokDisabilitas =
      jenisDisabilitas === "" ||
      mahasiswa.disabilitas === jenisDisabilitas;

    return cocokPencarian && cocokDisabilitas;
  });

  const dataDitampilkan = hasilFilter.slice(0, jumlahData);

  function hapusMahasiswa(id: number) {
    setMahasiswaList((data) =>
      data.filter((mahasiswa) => mahasiswa.id !== id),
    );

    setMenuAktif(null);
  }

  function tampilkanFakultas(fakultas: string) {
    if (
      fakultas === "Fakultas Vokasi" ||
      fakultas === "Fakultas Pertanian"
    ) {
      return fakultas;
    }

    return (
      <>
        Fakultas
        <br />
        {fakultas.replace("Fakultas ", "")}
      </>
    );
  }

  return (
    <div
      className={`${styles.page} ${
        sidebarTerbuka ? styles.sidebarOpen : ""
      }`}
    >
      {/* HEADER */}
      <header className={styles.header}>
        {!sidebarTerbuka && (
          <div className={styles.brand}>
            <button
              type="button"
              className={styles.menuButton}
              aria-label="Buka sidebar"
              onClick={() => setSidebarTerbuka(true)}
            >
              <Ikon nama="menu" ukuran={44} />
            </button>

            <div className={styles.logo}>
              INCL<span>UNIV</span>
            </div>
          </div>
        )}

        <Link
          href="/notifikasi"
          className={styles.notificationButton}
          aria-label="Notifikasi"
        >
          <Ikon nama="bell" ukuran={42} />
        </Link>
      </header>

      {/* SIDEBAR */}
      {sidebarTerbuka && (
        <aside className={styles.sidebar}>
          <div className={styles.sidebarBrand}>
            <div className={styles.sidebarLogo}>
              INCL<span>UNIV</span>
            </div>

            <button
              type="button"
              aria-label="Tutup sidebar"
              onClick={() => setSidebarTerbuka(false)}
            >
              <Ikon nama="panel" ukuran={28} />
            </button>
          </div>

          <nav className={styles.sidebarNav}>
            {menuSidebar.map((menu, index) => (
              <Link
                key={`${menu.nama}-${index}`}
                href={menu.href}
                className={
                  menu.nama === "Data mahasiswa"
                    ? styles.activeNav
                    : ""
                }
              >
                <Ikon nama={menu.ikon} ukuran={40} />
                <span>{menu.nama}</span>
              </Link>
            ))}
          </nav>

          <Link href="/login" className={styles.logout}>
            <Ikon nama="logout" ukuran={36} />
            <span>keluar</span>
          </Link>
        </aside>
      )}

      <main className={styles.main}>
        {/* JUDUL */}
        <div className={styles.heading}>
          <h1>Data mahasiswa!</h1>

          <p>
            Kelola data mahasiswa difabel dan pantau kebutuhan
            pendampingan mereka.
          </p>
        </div>

        {/* SEARCH DAN FILTER */}
        <div className={styles.toolbar}>
          <label className={styles.searchBox}>
            <Ikon nama="search" ukuran={32} />

            <input
              type="search"
              aria-label="Cari mahasiswa"
              placeholder="Cari mahasiswa...."
              value={pencarian}
              onChange={(event) => {
                setPencarian(event.target.value);
                setMenuAktif(null);
              }}
            />
          </label>

          <div className={styles.selectBox}>
            <select
              aria-label="Jenis disabilitas"
              value={jenisDisabilitas}
              onChange={(event) => {
                setJenisDisabilitas(event.target.value);
                setMenuAktif(null);
              }}
            >
              <option value="">Jenis disabilitas</option>
              <option value="Tuna Daksa">Tuna Daksa</option>
              <option value="Tuna Rungu">Tuna Rungu</option>
              <option value="Tuna Netra">Tuna Netra</option>
            </select>

            <span
              className={styles.chevron}
              aria-hidden="true"
            />
          </div>

          <div className={styles.selectBox}>
            <select
              className={styles.limitSelect}
              aria-label="Jumlah data mahasiswa"
              value={jumlahData}
              onChange={(event) => {
                setJumlahData(Number(event.target.value));
                setMenuAktif(null);
              }}
            >
              <option value={15}>15 data mahasiswa</option>
              <option value={30}>30 data mahasiswa</option>
              <option value={64}>64 data mahasiswa</option>
            </select>

            <span
              className={styles.chevron}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* TABEL */}
        <div className={styles.tableContainer}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <colgroup>
                <col className={styles.numberColumn} />
                <col className={styles.nameColumn} />
                <col className={styles.nimColumn} />
                <col className={styles.facultyColumn} />
                <col className={styles.disabilityColumn} />
                <col className={styles.actionColumn} />
              </colgroup>

              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">NIM</th>
                  <th scope="col">Fakultas</th>
                  <th scope="col">Jenis disabilitas</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {dataDitampilkan.map((mahasiswa, index) => (
                  <tr key={mahasiswa.id}>
                    <td>{index + 1}</td>

                    <td className={styles.nameCell}>
                      {mahasiswa.nama}
                    </td>

                    <td className={styles.nimCell}>
                      {mahasiswa.nim}
                    </td>

                    <td className={styles.facultyCell}>
                      {tampilkanFakultas(mahasiswa.fakultas)}
                    </td>

                    <td>{mahasiswa.disabilitas}</td>

                    <td>
                      <div
                        className={styles.actionWrapper}
                        data-menu-mahasiswa
                      >
                        <button
                          type="button"
                          className={styles.actionButton}
                          aria-label={`Aksi untuk ${mahasiswa.nama}`}
                          aria-expanded={
                            menuAktif === mahasiswa.id
                          }
                          onClick={() =>
                            setMenuAktif((sebelumnya) =>
                              sebelumnya === mahasiswa.id
                                ? null
                                : mahasiswa.id,
                            )
                          }
                        >
                          <span />
                          <span />
                          <span />
                        </button>

                        {menuAktif === mahasiswa.id && (
                          <div className={styles.actionMenu}>
                            <Link
                              href={`/mahasiswa/${mahasiswa.id}`}
                              className={styles.detailButton}
                              onClick={() => setMenuAktif(null)}
                            >
                              <Ikon nama="eye" ukuran={34} />
                              <span>Lihat detail</span>
                            </Link>

                            <button
                              type="button"
                              className={styles.deleteButton}
                              onClick={() => {
                                setMahasiswaHapus(mahasiswa);
                                setMenuAktif(null);
                              }}
                            >
                              <Ikon nama="trash" ukuran={34} />
                              <span>Hapus</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {dataDitampilkan.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className={styles.emptyCell}
                    >
                      Data mahasiswa tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className={styles.footer}>
          Menampilkan {dataDitampilkan.length} dari{" "}
          {hasilFilter.length} data mahasiswa
        </p>
      </main>

      {/* MODAL KONFIRMASI HAPUS */}
      {mahasiswaHapus && (
        <div
          className={styles.deleteOverlay}
          onClick={() => setMahasiswaHapus(null)}
        >
          <div
            className={styles.deleteModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            aria-describedby="delete-description"
            onClick={(event) => event.stopPropagation()}
          >
            <Ikon nama="trash" ukuran={64} />

            <h2 id="delete-title">Hapus Data Mahasiswa?</h2>

            <p id="delete-description">
              Apakah anda yakin ingin menghapus data
              <br />
              mahasiswa <strong>{mahasiswaHapus.nama}</strong>?
              <br />
              data yang dihapus tidak bisa dipulihkan
            </p>

            <div className={styles.deleteButtons}>
              <button
                type="button"
                autoFocus
                onClick={() => setMahasiswaHapus(null)}
              >
                Batal
              </button>

              <button
                type="button"
                onClick={() => {
                  hapusMahasiswa(mahasiswaHapus.id);
                  setMahasiswaHapus(null);
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}