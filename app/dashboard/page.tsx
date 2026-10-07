"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Ikon, menuSidebar } from "../mahasiswa/DataMahasiswa";
import styles from "./dashboard.module.css";

const pengajuanDiproses = [
  {
    id: 1,
    nama: "Agus Salim",
    nim: "25314070711198",
    tanggal: "01-10-2026",
    status: "Disetujui",
  },
  {
    id: 2,
    nama: "Imron Syahrozi",
    nim: "25314070711100",
    tanggal: "30-09-2026",
    status: "Disetujui",
  },
  {
    id: 3,
    nama: "Putra Adi",
    nim: "253140707110078",
    tanggal: "27-09-2026",
    status: "Disetujui",
  },
  {
    id: 4,
    nama: "Anjani Tri Paundra",
    nim: "253140707110165",
    tanggal: "21-09-2026",
    status: "Disetujui",
  },
  {
    id: 5,
    nama: "Djemba Jemba",
    nim: "25314070711190",
    tanggal: "11-09-2026",
    status: "Disetujui",
  },
];

const grafikPendampingan = [
  { nama: "Anjani tri paundra", jumlah: 23 },
  { nama: "Agus Salim", jumlah: 21 },
  { nama: "Putra Adi", jumlah: 20 },
  { nama: "Djemba jemba", jumlah: 18 },
  { nama: "Imron syahrozi", jumlah: 16 },
  { nama: "Gita Naura Kusuma", jumlah: 15 },
  { nama: "Lukito Adi", jumlah: 13 },
  { nama: "Hermansyah", jumlah: 11 },
  { nama: "Fabian Eka", jumlah: 8 },
  { nama: "Tri Gundolo", jumlah: 5 },
];

const ringkasan = [
  {
    nama: "Mahasiswa",
    jumlah: 64,
    keterangan: "Mahasiswa terdaftar",
    href: "/pengajuan",
    ikon: "users" as const,
  },
  {
    nama: "Volunteer",
    jumlah: 20,
    keterangan: "Volunteer terdaftar",
    href: "/volunteer",
    ikon: "users" as const,
  },
  {
    nama: "Pengajuan",
    jumlah: 7,
    keterangan: "Menunggu diproses",
    href: "/pengajuan",
    ikon: "clipboard" as const,
  },
  {
    nama: "Pendampingan",
    jumlah: 14,
    keterangan: "Hari ini",
    href: "/jadwal",
    ikon: "calendar" as const,
  },
];

function Panah({ ukuran = 32 }: { ukuran?: number }) {
  return (
    <svg
      width={ukuran}
      height={ukuran}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 16H29M17 4L29 16L17 28" />
    </svg>
  );
}

/* GRAFIK BARU */
function GrafikPendampingan() {
  return (
    <div
      className={styles.barChart}
      role="img"
      aria-label={grafikPendampingan
        .map(
          (item) =>
            `${item.nama}: ${item.jumlah} pendampingan`,
        )
        .join(". ")}
    >
      <div className={styles.chartPlot}>
        {/* Garis dan angka sumbu */}
        {[0, 5, 10, 15, 20, 25].map((nilai) => (
          <div
            key={nilai}
            className={styles.gridLine}
            style={{
              bottom: `${(nilai / 30) * 100}%`,
            }}
          >
            <span>{nilai}</span>
          </div>
        ))}

        {/* Batang grafik */}
        <div className={styles.chartBars}>
          {grafikPendampingan.map((item) => (
            <div
              key={item.nama}
              className={styles.barColumn}
            >
              <div
                className={styles.bar}
                style={{
                  height: `${(item.jumlah / 30) * 100}%`,
                }}
              >
                <span className={styles.barValue}>
                  {item.jumlah}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nama di bawah grafik */}
      <div className={styles.chartLabels}>
        {grafikPendampingan.map((item) => (
          <span key={item.nama}>{item.nama}</span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const [sidebarTerbuka, setSidebarTerbuka] = useState(true);
  const [modalKeluar, setModalKeluar] = useState(false);
  const [logoGagal, setLogoGagal] = useState(false);

  const [detailPengajuan, setDetailPengajuan] = useState<
    (typeof pengajuanDiproses)[number] | null
  >(null);

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalKeluar(false);
        setDetailPengajuan(null);
      }
    }

    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  return (
    <div
      className={`${styles.page} ${
        sidebarTerbuka ? styles.sidebarOpen : ""
      }`}
    >
      {/* HEADER */}
      <header className={styles.header}>
        {!sidebarTerbuka && (
          <div className={styles.headerBrand}>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Buka sidebar"
              onClick={() => setSidebarTerbuka(true)}
            >
              <Ikon nama="menu" ukuran={42} />
            </button>

            <div className={styles.logoText}>
              INCL<span>UNIV</span>
            </div>
          </div>
        )}

        <Link
          href="/notifikasi"
          className={styles.notification}
          aria-label="Notifikasi"
        >
          <Ikon nama="bell" ukuran={40} />
        </Link>
      </header>

      {/* SIDEBAR */}
      {sidebarTerbuka && (
        <aside className={styles.sidebar}>
          <div className={styles.sidebarBrand}>
            <div className={styles.brand}>
              {!logoGagal && (
                <img
                  src="/mahasiswa/logo.png"
                  alt=""
                  className={styles.logoImage}
                  onError={() => setLogoGagal(true)}
                />
              )}

              <div className={styles.logoText}>
                INCL<span>UNIV</span>
              </div>
            </div>

            <button
              type="button"
              className={styles.iconButton}
              aria-label="Tutup sidebar"
              onClick={() => setSidebarTerbuka(false)}
            >
              <Ikon nama="panel" ukuran={28} />
            </button>
          </div>

          <nav className={styles.navigation}>
            {menuSidebar.map((menu, index) => (
              <Link
                key={`${menu.nama}-${index}`}
                href={menu.href}
                className={
                  menu.nama === "Dashboard"
                    ? styles.activeNav
                    : ""
                }
                aria-current={
                  menu.nama === "Dashboard"
                    ? "page"
                    : undefined
                }
              >
                <Ikon nama={menu.ikon} ukuran={38} />
                <span>{menu.nama}</span>
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={styles.logout}
            onClick={() => setModalKeluar(true)}
          >
            <Ikon nama="logout" ukuran={36} />
            <span>keluar</span>
          </button>
        </aside>
      )}

      {/* ISI DASHBOARD */}
      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>Selamat datang kembali, Admin!</h1>
          <p>
            Berikut ringkasan layanan pendampingan hari ini
          </p>
        </div>

        {/* KARTU RINGKASAN */}
        <section
          className={styles.summary}
          aria-label="Ringkasan layanan"
        >
          {ringkasan.map((item) => (
            <Link
              key={item.nama}
              href={item.href}
              className={styles.summaryCard}
            >
              <Ikon nama={item.ikon} ukuran={48} />

              <div className={styles.summaryContent}>
                <h2>{item.nama}</h2>

                <div className={styles.summaryNumber}>
                  <strong>{item.jumlah}</strong>
                  <Panah />
                </div>

                <p>{item.keterangan}</p>
              </div>
            </Link>
          ))}
        </section>

        {/* PENGAJUAN */}
        <section className={styles.applicationCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Ikon nama="clipboard" ukuran={42} />

              <div>
                <h2>Pengajuan yang telah diproses</h2>
                <p>
                  Pantau seluruh pengajuan yang telah diproses
                </p>
              </div>
            </div>

            <Link
              href="/pengajuan"
              className={styles.moreLink}
            >
              <span>Lihat semua pengajuan</span>
              <Panah ukuran={30} />
            </Link>
          </div>

          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "24%" }} />
                <col style={{ width: "17%" }} />
                <col style={{ width: "17%" }} />
              </colgroup>

              <thead>
                <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">NIM</th>
                  <th scope="col">Tanggal pengajuan</th>
                  <th scope="col">Status</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {pengajuanDiproses.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{item.nim}</td>
                    <td>{item.tanggal}</td>

                    <td>
                      <span className={styles.approved}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className={styles.detailButton}
                        onClick={() => setDetailPengajuan(item)}
                      >
                        Lihat detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* GRAFIK */}
        <section className={styles.chartCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Ikon nama="chart" ukuran={42} />
              <h2>Grafik pendampingan terbanyak</h2>
            </div>

            <select
              className={styles.period}
              aria-label="Periode grafik"
              defaultValue="7"
            >
              <option value="7">7 Hari terakhir</option>
            </select>
          </div>

          <div className={styles.chartContainer}>
            <GrafikPendampingan />
          </div>

          <Link href="/rekap" className={styles.chartLink}>
            <span>Lihat semua rekap pendampingan</span>
            <Panah ukuran={26} />
          </Link>
        </section>
      </main>

      {/* KONFIRMASI KELUAR */}
      {modalKeluar && (
        <div
          className={styles.overlay}
          onClick={() => setModalKeluar(false)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            aria-describedby="logout-description"
            onClick={(event) => event.stopPropagation()}
          >
            <Ikon nama="logout" ukuran={88} />

            <h2 id="logout-title">
              Anda yakin ingin keluar?
            </h2>

            <p id="logout-description">
              Apakah Anda yakin ingin keluar dari akun admin
              InClUniv?
            </p>

            <div className={styles.modalButtons}>
              <button
                type="button"
                autoFocus
                onClick={() => setModalKeluar(false)}
              >
                Batal
              </button>

              <button
                type="button"
                onClick={() => router.replace("/login")}
              >
                Ya, keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL DATA CONTOH PENGAJUAN */}
      {detailPengajuan && (
        <div
          className={styles.overlay}
          onClick={() => setDetailPengajuan(null)}
        >
          <div
            className={`${styles.modal} ${styles.detailModal}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="application-title">Detail pengajuan</h2>

            <dl className={styles.detailList}>
              <div>
                <dt>Nama</dt>
                <dd>{detailPengajuan.nama}</dd>
              </div>

              <div>
                <dt>NIM</dt>
                <dd>{detailPengajuan.nim}</dd>
              </div>

              <div>
                <dt>Tanggal pengajuan</dt>
                <dd>{detailPengajuan.tanggal}</dd>
              </div>

              <div>
                <dt>Status</dt>
                <dd>{detailPengajuan.status}</dd>
              </div>
            </dl>

            <button
              type="button"
              autoFocus
              className={styles.closeDetail}
              onClick={() => setDetailPengajuan(null)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}