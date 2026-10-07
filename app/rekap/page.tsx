"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  LayoutDashboard,
  Users,
  UserRound,
  ClipboardList,
  CalendarCheck2,
  ChartNoAxesColumnIncreasing,
  Settings,
  LogOut,
  Search,
  PanelLeftClose,
  Menu,
  ChevronDown,
  ArrowLeft,
  UserRoundPlus,
} from "lucide-react";

type Riwayat = {
  tanggal: string;
  waktu: string;
  mahasiswa: string;
  lokasi: string;
  status: "Selesai";
};

type Pendamping = {
  id: number;
  nama: string;
  nim: string;
  prodi: string;
  fakultas: string;
  jumlahPendampingan: number;
  foto?: string;
  riwayat: Riwayat[];
};

const dataPendamping: Pendamping[] = [
  {
    id: 1,
    nama: "Anjani Tri Paundra",
    nim: "25314070710165",
    prodi: "Teknologi Informasi",
    fakultas: "Fakultas Ilmu Komputer",
    jumlahPendampingan: 23,
    riwayat: [
      {
        tanggal: "04-10-2026",
        waktu: "13:00 - 15:30",
        mahasiswa: "Ahmad Machela",
        lokasi: "Gedung Vokantin, Ruang A307",
        status: "Selesai",
      },
      {
        tanggal: "05-10-2026",
        waktu: "07:00 - 09:30",
        mahasiswa: "Anwar Reza",
        lokasi: "Gedung Vokantin, Ruang A305",
        status: "Selesai",
      },
      {
        tanggal: "05-10-2026",
        waktu: "09:31 - 12:00",
        mahasiswa: "Anwar Reza",
        lokasi: "Gedung Vokantin, Ruang A307",
        status: "Selesai",
      },
    ],
  },

  {
    id: 2,
    nama: "Agus Salim",
    nim: "23514070710021",
    prodi: "Sistem Informasi",
    fakultas: "Fakultas Ilmu Komputer",
    jumlahPendampingan: 21,
    riwayat: [
      {
        tanggal: "03-10-2026",
        waktu: "08:00 - 10:00",
        mahasiswa: "Raka Fadhillah",
        lokasi: "Gedung B, Ruang B204",
        status: "Selesai",
      },
      {
        tanggal: "06-10-2026",
        waktu: "13:00 - 14:30",
        mahasiswa: "Ikhwanudin",
        lokasi: "Gedung A, Ruang A301",
        status: "Selesai",
      },
    ],
  },

  {
    id: 3,
    nama: "Nadia Putri",
    nim: "24514070710034",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Ilmu Komputer",
    jumlahPendampingan: 18,
    riwayat: [
      {
        tanggal: "02-10-2026",
        waktu: "09:00 - 10:30",
        mahasiswa: "Dimas Saputra",
        lokasi: "Gedung C, Ruang C201",
        status: "Selesai",
      },
    ],
  },

  {
    id: 4,
    nama: "Bagas Maulana",
    nim: "24514070710045",
    prodi: "Teknologi Informasi",
    fakultas: "Fakultas Ilmu Komputer",
    jumlahPendampingan: 16,
    riwayat: [
      {
        tanggal: "01-10-2026",
        waktu: "10:00 - 11:30",
        mahasiswa: "Salsa Maharani",
        lokasi: "Gedung A, Ruang A205",
        status: "Selesai",
      },
    ],
  },
];

const sidebarMenus = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Data mahasiswa", icon: UserRound },
  { label: "Data Volunteer", icon: Users },
  { label: "Pengajuan", icon: ClipboardList },
  { label: "Penjadwalan", icon: CalendarCheck2 },
  { label: "Rekap volunteer", icon: ChartNoAxesColumnIncreasing },
  { label: "Notifikasi", icon: Bell },
  { label: "Pengaturan", icon: Settings },
];

export default function RekapPage() {
  const [search, setSearch] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [jumlahData, setJumlahData] =
    useState("15 data pendamping");

  const [periode, setPeriode] =
    useState("1 bulan terakhir");

  const [semester, setSemester] =
    useState("Semester ganjil 2026/2027");

  const [showJumlahData, setShowJumlahData] =
    useState(false);

  const [showPeriode, setShowPeriode] =
    useState(false);

  const [showSemester, setShowSemester] =
    useState(false);

  const [selectedPendamping, setSelectedPendamping] =
    useState<Pendamping | null>(null);

  const semesterKosong =
    semester === "Semester genap 2026/2027";

  const filteredPendamping = useMemo(() => {
    if (semesterKosong) return [];

    const keyword = search.toLowerCase().trim();

    return [...dataPendamping]
      .filter((item) => {
        return (
          item.nama.toLowerCase().includes(keyword) ||
          item.fakultas.toLowerCase().includes(keyword) ||
          item.prodi.toLowerCase().includes(keyword)
        );
      })
      .sort(
        (a, b) =>
          b.jumlahPendampingan -
          a.jumlahPendampingan
      );
  }, [search, semesterKosong]);

  if (selectedPendamping) {
    return (
      <DetailPendamping
        pendamping={selectedPendamping}
        onBack={() => setSelectedPendamping(null)}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#e8f2ff] text-[#17365d]">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          {/* HEADER */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* MAIN */}
          <main className="px-5 py-5 md:px-6">
            {/* TITLE */}
            <section className="mb-5">
              <h1 className="text-[25px] leading-tight font-bold text-[#17365d]">
                Rekap Pendamping!
              </h1>

              <p className="mt-1.5 text-[12px] text-[#6b819d]">
                Pantau jumlah pendampingan dan riwayat aktivitas
                pendamping berdasarkan periode terpilih.
              </p>
            </section>

            {/* SEARCH */}
            <div className="relative mb-3">
              <Search
                size={18}
                strokeWidth={1.8}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#294f7b]"
              />

              <input
                type="text"
                placeholder="Cari nama pendamping..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full h-[42px] rounded-md border border-[#b6cae2] bg-white pl-11 pr-4 text-[13px] text-[#17365d] placeholder:text-[#9aabc0] outline-none transition focus:border-[#4a8df8] focus:ring-2 focus:ring-[#4a8df8]/20"
              />
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-2.5 mb-4">
              {/* JUMLAH DATA */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowJumlahData(
                      !showJumlahData
                    );
                    setShowPeriode(false);
                    setShowSemester(false);
                  }}
                  className="h-[36px] min-w-[165px] rounded-md border border-[#b6cae2] bg-white px-3.5 text-[12px] flex items-center justify-between gap-3 text-[#17365d] hover:border-[#8aadd7] transition"
                >
                  {jumlahData}
                  <ChevronDown
                    size={14}
                    className="text-[#536f90]"
                  />
                </button>

                {showJumlahData && (
                  <div className="absolute top-[40px] left-0 z-50 w-full overflow-hidden rounded-md border border-[#c3d2e5] bg-white shadow-[0_8px_24px_rgba(23,54,93,0.16)]">
                    {[
                      "15 data pendamping",
                      "30 data pendamping",
                      "50 data pendamping",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setJumlahData(item);
                          setShowJumlahData(
                            false
                          );
                        }}
                        className={`w-full px-3.5 py-2.5 text-left text-[12px] transition ${
                          jumlahData === item
                            ? "bg-[#e8f1ff] text-[#17365d] font-medium"
                            : "bg-white text-[#647d99] hover:bg-[#f3f7fc]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* PERIODE */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowPeriode(
                      !showPeriode
                    );
                    setShowJumlahData(false);
                    setShowSemester(false);
                  }}
                  className="h-[36px] min-w-[155px] rounded-md border border-[#b6cae2] bg-white px-3.5 text-[12px] flex items-center justify-between gap-3 text-[#17365d] hover:border-[#8aadd7] transition"
                >
                  {periode}
                  <ChevronDown
                    size={14}
                    className="text-[#536f90]"
                  />
                </button>

                {showPeriode && (
                  <div className="absolute top-[40px] left-0 z-50 w-full overflow-hidden rounded-md border border-[#c3d2e5] bg-white shadow-[0_8px_24px_rgba(23,54,93,0.16)]">
                    {[
                      "1 minggu terakhir",
                      "2 minggu terakhir",
                      "1 bulan terakhir",
                      "2 bulan terakhir",
                      "1 semester",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setPeriode(item);
                          setShowPeriode(false);
                        }}
                        className={`w-full px-3.5 py-2.5 text-left text-[12px] transition ${
                          periode === item
                            ? "bg-[#e8f1ff] text-[#17365d] font-medium"
                            : "bg-white text-[#647d99] hover:bg-[#f3f7fc]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* SEMESTER */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSemester(
                      !showSemester
                    );
                    setShowJumlahData(false);
                    setShowPeriode(false);
                  }}
                  className="h-[36px] min-w-[235px] rounded-md border border-[#b6cae2] bg-white px-3.5 text-[11px] flex items-center justify-between gap-3 text-[#17365d] hover:border-[#8aadd7] transition"
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays
                      size={16}
                      className="text-[#3b82f6]"
                    />
                    {semester}
                  </span>

                  <ChevronDown
                    size={14}
                    className="text-[#536f90]"
                  />
                </button>

                {showSemester && (
                  <div className="absolute top-[40px] left-0 z-50 w-full overflow-hidden rounded-md border border-[#c3d2e5] bg-white shadow-[0_8px_24px_rgba(23,54,93,0.16)]">
                    {[
                      "Semester ganjil 2026/2027",
                      "Semester genap 2026/2027",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSemester(item);
                          setShowSemester(
                            false
                          );
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-[11px] transition ${
                          semester === item
                            ? "bg-[#e8f1ff] text-[#17365d] font-medium"
                            : "bg-white text-[#647d99] hover:bg-[#f3f7fc]"
                        }`}
                      >
                        <CalendarDays
                          size={16}
                          className="text-[#3b82f6]"
                        />
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-lg border border-[#9db8d8] bg-white shadow-[0_1px_2px_rgba(23,54,93,0.05)]">
              {/* HEADER */}
              <div className="grid grid-cols-[0.55fr_1.45fr_1.4fr_1.45fr_0.9fr] bg-[#dcecff] px-4 py-3.5 text-[12px] font-semibold text-[#17365d]">
                <div>No</div>
                <div>Nama</div>
                <div>Fakultas</div>
                <div>
                  Jumlah pendampingan
                </div>
                <div>Aksi</div>
              </div>

              {/* BODY */}
              <div className="min-h-[360px] max-h-[430px] overflow-y-auto">
                {semesterKosong ? (
                  <EmptyState
                    title="Data belum tersedia"
                    description="Belum ada data rekap pendamping pada semester genap 2026/2027."
                  />
                ) : filteredPendamping.length >
                  0 ? (
                  filteredPendamping.map(
                    (item, index) => (
                      <div
                        key={item.id}
                        className="grid min-h-[58px] grid-cols-[0.55fr_1.45fr_1.4fr_1.45fr_0.9fr] items-center border-t border-[#e7eef7] px-4 py-3 text-[11px] text-[#294867] transition hover:bg-[#f8fbff]"
                      >
                        <div className="font-medium">
                          {index + 1}
                        </div>

                        <div className="font-medium text-[#17365d]">
                          {item.nama}
                        </div>

                        <div>
                          {item.fakultas}
                        </div>

                        <div className="font-medium">
                          {
                            item.jumlahPendampingan
                          }
                        </div>

                        <div>
                          <button
                            onClick={() =>
                              setSelectedPendamping(
                                item
                              )
                            }
                            className="inline-flex min-w-[84px] items-center justify-center rounded-full bg-[#3b82f6] px-4 py-[7px] text-[10px] font-medium text-white transition hover:bg-[#3077e8]"
                          >
                            Lihat detail
                          </button>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <EmptyState
                    title="Data tidak ditemukan"
                    description="Tidak ada pendamping yang sesuai dengan pencarian."
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function DetailPendamping({
  pendamping,
  onBack,
  sidebarOpen,
  setSidebarOpen,
}: {
  pendamping: Pendamping;
  onBack: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) {
  return (
    <div className="min-h-screen bg-[#e8f2ff] text-[#17365d]">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          {/* HEADER */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* MAIN */}
          <main className="p-4 md:p-5">
            <div className="min-h-[640px] rounded-xl border border-[#9db8d8] bg-white p-4 shadow-[0_1px_2px_rgba(23,54,93,0.05)]">
              {/* BACK */}
              <button
                onClick={onBack}
                className="mb-4 flex h-8 w-8 items-center justify-center rounded-md text-[#3b82f6] transition hover:bg-[#edf5ff] hover:text-[#2563eb]"
                aria-label="Kembali"
                title="Kembali"
              >
                <ArrowLeft size={20} />
              </button>

              {/* PROFILE */}
              <div className="mb-4 rounded-lg border border-[#d2dfef] bg-white px-5 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f4a23b]">
                    <UserRound
                      size={44}
                      strokeWidth={1.5}
                      className="text-white"
                    />
                  </div>

                  <div className="min-w-0">
                    <h1 className="text-[21px] font-semibold text-[#17365d]">
                      {pendamping.nama}
                    </h1>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-[#8293a8]">
                      <span>
                        {pendamping.nim}
                      </span>

                      <span>|</span>

                      <span>
                        {pendamping.prodi}
                      </span>

                      <span>|</span>

                      <span>
                        {pendamping.fakultas}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOTAL */}
              <div className="mb-4 rounded-lg border border-[#8bb8ff] bg-[#fbfdff] px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#edf5ff]">
                    <UserRoundPlus
                      size={26}
                      className="text-[#3b82f6]"
                    />
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-[#6b819d]">
                      Jumlah pendampingan
                    </p>

                    <p className="mt-0.5 text-[16px] font-bold text-[#17365d]">
                      {
                        pendamping.jumlahPendampingan
                      }{" "}
                      Pendampingan
                    </p>
                  </div>
                </div>
              </div>

              {/* RIWAYAT */}
              <div className="overflow-hidden rounded-lg border border-[#9db8d8] bg-white">
                {/* HEADER */}
                <div className="grid grid-cols-[1.05fr_1.2fr_1.55fr_2fr_0.9fr] bg-[#dcecff] px-4 py-3.5 text-[11px] font-semibold text-[#17365d]">
                  <div>Tanggal</div>
                  <div>Waktu</div>
                  <div>Mahasiswa</div>
                  <div>Lokasi</div>
                  <div>Status</div>
                </div>

                {/* BODY */}
                <div className="min-h-[330px] max-h-[390px] overflow-y-auto">
                  {pendamping.riwayat.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="grid min-h-[58px] grid-cols-[1.05fr_1.2fr_1.55fr_2fr_0.9fr] items-center border-t border-[#e7eef7] px-4 py-3 text-[10px] text-[#294867] transition hover:bg-[#f8fbff]"
                      >
                        <div className="font-medium">
                          {item.tanggal}
                        </div>

                        <div>
                          {item.waktu}
                        </div>

                        <div>
                          {item.mahasiswa}
                        </div>

                        <div className="pr-3">
                          {item.lokasi}
                        </div>

                        <div>
                          <span className="inline-flex min-w-[64px] justify-center rounded-full border border-[#72df9b] bg-[#ebfff2] px-3 py-1 text-[9px] font-medium text-[#1f9d55]">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) {
  return (
    <aside
      className={`hidden lg:flex shrink-0 bg-[#153d70] text-white flex-col overflow-hidden transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-[220px]" : "w-0"
      }`}
    >
      <div className="h-[64px] min-w-[220px] flex items-center justify-between px-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#3183f7] flex items-center justify-center text-[11px] font-bold">
            IN
          </div>

          <div className="font-bold text-[16px] tracking-wide">
            INCLU
            <span className="text-[#ff7a1a]">
              NIV
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="w-8 h-8 flex items-center justify-center rounded-md text-white/80 hover:text-white hover:bg-white/10 transition"
          aria-label="Tutup sidebar"
          title="Tutup sidebar"
        >
          <PanelLeftClose size={17} />
        </button>
      </div>

      <nav className="min-w-[220px] px-3 py-4 space-y-1">
        {sidebarMenus.map(
          ({ label, icon: Icon }) => {
            const active =
              label === "Rekap volunteer";

            return (
              <button
                key={label}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-[11px] text-left text-[13px] transition ${
                  active
                    ? "bg-[#9bbce5] text-[#17365d] font-semibold"
                    : "text-white/95 hover:bg-white/10"
                }`}
              >
                <Icon
                  size={17}
                  strokeWidth={1.8}
                />

                <span>{label}</span>
              </button>
            );
          }
        )}
      </nav>

      <div className="min-w-[220px] mt-auto px-5 py-6">
        <button className="flex items-center gap-3 text-[13px] text-[#ff5b64] hover:text-[#ff7b82] transition">
          <LogOut size={17} />
          <span>keluar</span>
        </button>
      </div>
    </aside>
  );
}

function Header({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) {
  return (
    <header className="h-[64px] bg-[#153d70] flex items-center justify-between px-4 md:px-5 text-white">
      {/* LEFT HEADER */}
      <div className="flex items-center">
        {!sidebarOpen && (
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setSidebarOpen(true)
              }
              className="w-8 h-8 flex items-center justify-center rounded-md text-white hover:bg-white/10 transition"
              aria-label="Buka sidebar"
              title="Buka sidebar"
            >
              <Menu
                size={24}
                strokeWidth={1.8}
              />
            </button>

            <div className="font-bold text-[20px] tracking-wide">
              INCLU
              <span className="text-[#ff7a1a]">
                NIV
              </span>
            </div>
          </div>
        )}
      </div>

      {/* NOTIFIKASI */}
      <button
        type="button"
        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition"
        aria-label="Notifikasi"
      >
        <Bell
          size={19}
          strokeWidth={1.8}
        />
      </button>
    </header>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
      <ChartNoAxesColumnIncreasing
        size={68}
        strokeWidth={1.7}
        className="text-[#3b82f6]"
      />

      <h2 className="mt-3 text-[17px] font-semibold text-[#17365d]">
        {title}
      </h2>

      <p className="mt-1 max-w-[290px] text-[11px] leading-[17px] text-[#74879e]">
        {description}
      </p>
    </div>
  );
}