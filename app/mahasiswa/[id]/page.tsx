"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  dataMahasiswa,
  Ikon,
  menuSidebar,
} from "../DataMahasiswa";

import styles from "../mahasiswa.module.css";
import detail from "./detail.module.css";

type IkonDetail =
  | "back"
  | "reset"
  | "user"
  | "school"
  | "wheelchair"
  | "mail"
  | "phone"
  | "support"
  | "lock";

function IkonData({
  nama,
  ukuran = 36,
}: {
  nama: IkonDetail;
  ukuran?: number;
}) {
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
      {nama === "back" && (
        <path d="M22 12H3M11 4L3 12L11 20" />
      )}

      {nama === "reset" && (
        <path d="M5 3L3 9L9 10M3 9A9 9 0 1 1 3 15" />
      )}

      {nama === "user" && (
        <>
          <circle cx="12" cy="6" r="4" />
          <path d="M7 15H17A5 5 0 0 1 22 20V22H2V20A5 5 0 0 1 7 15Z" />
        </>
      )}

      {nama === "school" && (
        <path
          fill="currentColor"
          stroke="none"
          d="M2 7L12 1L22 7V10H2ZM3 21H21V23H3ZM4 11H7V20H4ZM10 11H14V20H10ZM17 11H20V20H17Z"
        />
      )}

      {nama === "wheelchair" && (
        <>
          <circle
            cx="9"
            cy="3"
            r="2"
            fill="currentColor"
            stroke="none"
          />
          <path d="M9 7L10 15H17L22 21M10 9H16M5 11A7 7 0 0 0 14 21" />
        </>
      )}

      {nama === "mail" && (
        <>
          <rect x="2" y="4" width="20" height="16" />
          <path d="M2 4L12 14L22 4M2 20L9 13M22 20L15 13" />
        </>
      )}

      {nama === "phone" && (
        <>
          <rect x="2" y="2" width="20" height="20" />
          <path d="M6 22V18L10 15V9A3 3 0 0 1 16 9V15L20 18V22" />
        </>
      )}

      {nama === "support" && (
        <path d="M12 10L7 5A3 3 0 0 1 12 1A3 3 0 0 1 17 5ZM4 23V19L1 12V7C1 5 4 5 4 7V12L7 17L5 12C5 10 7 10 8 12L11 17L10 23M20 23V19L23 12V7C23 5 20 5 20 7V12L17 17L19 12C19 10 17 10 16 12L13 17L14 23" />
      )}

      {nama === "lock" && (
        <>
          <rect
            x="4"
            y="10"
            width="16"
            height="13"
            rx="1"
            fill="currentColor"
          />
          <path d="M7 10V6A5 5 0 0 1 17 6V10" />
          <circle
            cx="12"
            cy="17"
            r="1.5"
            fill="white"
            stroke="white"
          />
        </>
      )}
    </svg>
  );
}

/* DATA JADWAL KULIAH */
const jadwalKuliah = [
  {
    hari: "Senin",
    baris: [
      {
        waktu: "13:00 - 15:30",
        mataKuliah: "Algoritma Pemrograman",
        ruang: "A307",
      },
      {
        waktu: "",
        mataKuliah: "& Struktur Data",
        ruang: "",
      },
      { waktu: "", mataKuliah: "", ruang: "" },
      { waktu: "", mataKuliah: "", ruang: "" },
    ],
  },
  {
    hari: "Selasa",
    baris: [
      {
        waktu: "07:00 - 09:30",
        mataKuliah: "Pemrograman Berorientasi Project",
        ruang: "A305",
      },
      {
        waktu: "09:31 - 12:00",
        mataKuliah: "Statistika & Probabilitas",
        ruang: "A307",
      },
      { waktu: "", mataKuliah: "", ruang: "" },
      { waktu: "", mataKuliah: "", ruang: "" },
    ],
  },
  {
    hari: "Rabu",
    baris: [
      {
        waktu: "10:20 - 13:50",
        mataKuliah: "Pemrograman Web",
        ruang: "A310",
      },
      { waktu: "", mataKuliah: "", ruang: "" },
      { waktu: "", mataKuliah: "", ruang: "" },
      { waktu: "", mataKuliah: "", ruang: "" },
    ],
  },
  {
    hari: "Kamis",
    baris: [
      { waktu: "", mataKuliah: "", ruang: "" },
      {
        waktu: "08:20 - 09:40",
        mataKuliah: "Interaksi Manusia dan Komputer",
        ruang: "A309",
      },
      { waktu: "", mataKuliah: "", ruang: "" },
      { waktu: "", mataKuliah: "", ruang: "" },
    ],
  },
];

/* DATA RIWAYAT PENDAMPINGAN */
const riwayatPendampingan = [
  {
    tanggal: "04-10-2026",
    waktu: "13:00 - 15:30",
    volunteer: "Gita Naura Kusuma",
    lokasi: "Gedung Vokantin, Ruang A307",
    status: "Belum",
  },
  {
    tanggal: "05-10-2026",
    waktu: "07:00 - 09:30",
    volunteer: "Lukito Adi Nugroho",
    lokasi: "Gedung Vokantin, Ruang A305",
    status: "Selesai",
  },
  {
    tanggal: "05-10-2026",
    waktu: "09:31 - 12:00",
    volunteer: "Lukito Adi Nugroho",
    lokasi: "Gedung Vokantin, Ruang A307",
    status: "Selesai",
  },
];

export default function DetailMahasiswaPage() {
  const params = useParams<{ id: string }>();

  const [sidebarTerbuka, setSidebarTerbuka] = useState(true);
  const [tabAktif, setTabAktif] = useState(0);
  const [modalReset, setModalReset] = useState(false);
  const [notifikasiReset, setNotifikasiReset] = useState(false);
  const [fotoGagal, setFotoGagal] = useState(false);
  const [semester, setSemester] = useState(
    "Semester ganjil 2026/2027",
  );

  const mahasiswa = dataMahasiswa.find(
    (item) => item.id === Number(params.id),
  );

  useEffect(() => {
    if (!modalReset) return;

    function tutupModal(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalReset(false);
      }
    }

    document.addEventListener("keydown", tutupModal);

    return () => {
      document.removeEventListener("keydown", tutupModal);
    };
  }, [modalReset]);

  if (!mahasiswa) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <Link href="/pengajuan" className={styles.backLink}>
            ← Kembali ke data mahasiswa
          </Link>

          <div className={styles.detailCard}>
            <h1>Data mahasiswa tidak ditemukan.</h1>
          </div>
        </main>
      </div>
    );
  }

  const adalahAhmad = mahasiswa.id === 1;

  const programStudi = adalahAhmad
    ? "Teknologi Informasi"
    : "—";

  const email = adalahAhmad
    ? "Ahmadmacheda@gmail.com"
    : "—";

  const telepon = adalahAhmad
    ? "+62 84512345678"
    : "—";

  const kebutuhan = adalahAhmad
    ? "Membutuhkan bantuan mobilitas saat berpindah antar ruang kelas dan mengakses fasilitas kampus"
    : "Belum ada data kebutuhan dukungan.";

  const dataDiri: {
    ikon: IkonDetail;
    nilai: string;
    kecil?: boolean;
  }[] = [
    { ikon: "user", nilai: mahasiswa.nama },
    { ikon: "school", nilai: mahasiswa.nim },
    { ikon: "school", nilai: programStudi },
    { ikon: "school", nilai: mahasiswa.fakultas },
    { ikon: "wheelchair", nilai: mahasiswa.disabilitas },
    { ikon: "mail", nilai: email, kecil: true },
    { ikon: "phone", nilai: telepon },
  ];

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
            <div className={detail.brandWithLogo}>
              <img
                src="/mahasiswa/logo.png"
                alt=""
                className={detail.brandImage}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className={styles.sidebarLogo}>
                INCL<span>UNIV</span>
              </div>
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
        <section className={detail.frame}>
          {/* KARTU IDENTITAS */}
          <div className={detail.profileCard}>
            <Link
              href="/pengajuan"
              className={detail.backButton}
              aria-label="Kembali ke data mahasiswa"
            >
              <IkonData nama="back" ukuran={42} />
            </Link>

            <button
              type="button"
              className={detail.resetButton}
              onClick={() => setModalReset(true)}
            >
              <IkonData nama="reset" ukuran={36} />
              <span>Reset password</span>
            </button>

            <div className={detail.identity}>
              {adalahAhmad && !fotoGagal ? (
                <img
                  src="/pengajuan/ahmad.png"
                  alt={mahasiswa.nama}
                  className={detail.avatar}
                  onError={() => setFotoGagal(true)}
                />
              ) : (
                <div className={detail.avatarPlaceholder}>
                  <IkonData nama="user" ukuran={65} />
                </div>
              )}

              <div className={detail.identityText}>
                <h1>{mahasiswa.nama}</h1>

                <div className={detail.identityMeta}>
                  <span>{mahasiswa.nim}</span>
                  <span>{programStudi}</span>
                  <span>{mahasiswa.fakultas}</span>
                </div>
              </div>
            </div>
          </div>

          {/* TOMBOL TAB */}
          <div
            className={detail.tabs}
            role="tablist"
            aria-label="Detail mahasiswa"
          >
            {[
              "Data diri",
              "Jadwal kuliah",
              "Riwayat pendampingan",
            ].map((nama, index) => (
              <button
                key={nama}
                id={`detail-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={tabAktif === index}
                aria-controls="detail-panel"
                className={
                  tabAktif === index ? detail.activeTab : ""
                }
                onClick={() => setTabAktif(index)}
              >
                {nama}
              </button>
            ))}
          </div>

          {/* ISI TAB DALAM SATU HALAMAN */}
          <div
            id="detail-panel"
            className={detail.panel}
            role="tabpanel"
            aria-labelledby={`detail-tab-${tabAktif}`}
          >
            {/* TAB DATA DIRI */}
            {tabAktif === 0 && (
              <div className={detail.cards}>
                <div className={detail.infoCard}>
                  {dataDiri.map((item, index) => (
                    <div key={index} className={detail.infoRow}>
                      <span className={detail.iconCircle}>
                        <IkonData nama={item.ikon} ukuran={45} />
                      </span>

                      <p
                        className={
                          item.kecil ? detail.smallText : ""
                        }
                      >
                        {item.nilai}
                      </p>
                    </div>
                  ))}
                </div>

                <div className={detail.supportCard}>
                  <h2>
                    <IkonData nama="support" ukuran={74} />
                    <span>Kebutuhan dukungan</span>
                  </h2>

                  <div className={detail.supportBox}>
                    <IkonData nama="wheelchair" ukuran={56} />
                    <p>{kebutuhan}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB JADWAL KULIAH */}
            {tabAktif === 1 && (
              <div className={detail.tablePanel}>
                <div className={detail.semester}>
                  <Ikon nama="calendar" ukuran={28} />

                  <select
                    aria-label="Semester"
                    value={semester}
                    onChange={(event) =>
                      setSemester(event.target.value)
                    }
                  >
                    <option>Semester ganjil 2026/2027</option>
                    <option>Semester genap 2026/2027</option>
                  </select>
                </div>

                <div className={detail.tableScroll}>
                  <table
                    className={`${detail.detailTable} ${detail.scheduleTable}`}
                  >
                    <colgroup>
                      <col style={{ width: "24%" }} />
                      <col style={{ width: "18%" }} />
                      <col style={{ width: "38%" }} />
                      <col style={{ width: "20%" }} />
                    </colgroup>

                    <thead>
                      <tr>
                        <th scope="col">Hari</th>
                        <th scope="col">Waktu</th>
                        <th scope="col">Mata kuliah</th>
                        <th scope="col">Ruang</th>
                      </tr>
                    </thead>

                    <tbody>
                      {adalahAhmad &&
                      semester === "Semester ganjil 2026/2027" ? (
                        jadwalKuliah.map((kelompok) =>
                          kelompok.baris.map((baris, index) => (
                            <tr key={`${kelompok.hari}-${index}`}>
                              {index === 0 && (
                                <td
                                  rowSpan={kelompok.baris.length}
                                  className={detail.dayCell}
                                >
                                  {kelompok.hari}
                                </td>
                              )}

                              <td>{baris.waktu || "\u00A0"}</td>

                              <td className={detail.courseCell}>
                                {baris.mataKuliah || "\u00A0"}
                              </td>

                              <td>{baris.ruang || "\u00A0"}</td>
                            </tr>
                          )),
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className={detail.emptyCell}
                          >
                            Belum ada jadwal kuliah.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB RIWAYAT PENDAMPINGAN */}
            {tabAktif === 2 && (
              <div className={detail.historyPanel}>
                <div className={detail.tableScroll}>
                  <table
                    className={`${detail.detailTable} ${detail.historyTable}`}
                  >
                    <colgroup>
                      <col style={{ width: "17%" }} />
                      <col style={{ width: "16%" }} />
                      <col style={{ width: "21%" }} />
                      <col style={{ width: "31%" }} />
                      <col style={{ width: "15%" }} />
                    </colgroup>

                    <thead>
                      <tr>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Waktu</th>
                        <th scope="col">Volunteer</th>
                        <th scope="col">Lokasi</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {adalahAhmad ? (
                        <>
                          {riwayatPendampingan.map((item, index) => (
                            <tr key={index}>
                              <td>{item.tanggal}</td>
                              <td>{item.waktu}</td>
                              <td>{item.volunteer}</td>
                              <td>{item.lokasi}</td>

                              <td>
                                <span
                                  className={
                                    item.status === "Selesai"
                                      ? detail.finished
                                      : detail.pending
                                  }
                                >
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}

                          {/* Garis kosong di bawah data */}
                          {Array.from({ length: 8 }, (_, index) => (
                            <tr
                              key={`baris-kosong-${index}`}
                              aria-hidden="true"
                              className={detail.blankHistoryRow}
                            >
                              <td colSpan={5}>&nbsp;</td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className={detail.emptyCell}
                          >
                            Belum ada riwayat pendampingan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* MODAL RESET PASSWORD */}
      {modalReset && (
        <div
          className={detail.overlay}
          onClick={() => setModalReset(false)}
        >
          <div
            className={detail.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            onClick={(event) => event.stopPropagation()}
          >
            <IkonData nama="lock" ukuran={64} />

            <h2 id="reset-title">Reset Password?</h2>

            <p>
              Apakah anda yakin ingin mereset password
              <br />
              akun {mahasiswa.nama}?
              <br />
              {adalahAhmad && (
                <>
                  Password baru akan dikirim ke email{" "}
                  <strong>{email}</strong>
                </>
              )}
            </p>

            <div className={detail.modalButtons}>
              <button
                type="button"
                autoFocus
                onClick={() => setModalReset(false)}
              >
                Batal
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalReset(false);
                  setNotifikasiReset(true);
                }}
              >
                <IkonData nama="reset" ukuran={28} />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFIKASI DEMO */}
      {notifikasiReset && (
        <div className={detail.toast} role="status">
          <span className={detail.check}>✓</span>

          <div>
            <strong>Password berhasil direset</strong>
            <p>Simulasi reset password berhasil.</p>
          </div>

          <button
            type="button"
            aria-label="Tutup notifikasi"
            onClick={() => setNotifikasiReset(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}