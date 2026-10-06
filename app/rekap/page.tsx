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

  const [jumlahData, setJumlahData] = useState("15 data pendamping");
  const [periode, setPeriode] = useState("1 bulan terakhir");
  const [semester, setSemester] = useState("Semester ganjil 2026/2027");

  const [showJumlahData, setShowJumlahData] = useState(false);
  const [showPeriode, setShowPeriode] = useState(false);
  const [showSemester, setShowSemester] = useState(false);

  const [selectedPendamping, setSelectedPendamping] =
    useState<Pendamping | null>(null);

  const semesterKosong = semester === "Semester genap 2026/2027";

  const filteredPendamping = useMemo(() => {
    if (semesterKosong) return [];

    const keyword = search.toLowerCase();

    return [...dataPendamping]
      .filter((item) => {
        return (
          item.nama.toLowerCase().includes(keyword) ||
          item.fakultas.toLowerCase().includes(keyword) ||
          item.prodi.toLowerCase().includes(keyword)
        );
      })
      .sort((a, b) => b.jumlahPendampingan - a.jumlahPendampingan);
  }, [search, semesterKosong]);

  if (selectedPendamping) {
    return (
      <DetailPendamping
        pendamping={selectedPendamping}
        onBack={() => setSelectedPendamping(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#dcecff] text-[#16365f]">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex w-[236px] shrink-0 bg-[#143a69] text-white flex-col">
          <div className="h-[64px] flex items-center justify-between px-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#2f80ed] flex items-center justify-center text-xs font-bold">
                IN
              </div>

              <div className="font-bold text-lg">
                INCLU<span className="text-[#ff7a1a]">NIV</span>
              </div>
            </div>

            <PanelLeftClose size={16} />
          </div>

          <nav className="px-3 py-4 space-y-1">
            {sidebarMenus.map(({ label, icon: Icon }) => {
              const active = label === "Rekap volunteer";

              return (
                <button
                  key={label}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                    active
                      ? "bg-[#9bbbe3] text-[#143a69] font-semibold"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={17} />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto px-5 py-5">
            <button className="flex items-center gap-3 text-sm text-red-400">
              <LogOut size={17} />
              <span>keluar</span>
            </button>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          <header className="h-[64px] bg-[#143a69] flex items-center justify-end px-5 text-white">
            <Bell size={18} />
          </header>

          <main className="p-4 md:p-5">
            {/* TITLE */}
            <section className="mb-5">
              <h1 className="text-[24px] font-bold text-[#17365d]">
                Rekap Pendamping!
              </h1>

              <p className="text-[12px] text-[#6f84a0] mt-1">
                Pantau jumlah pendampingan dan riwayat aktivitas pendamping
                berdasarkan periode terpilih.
              </p>
            </section>

            {/* SEARCH */}
            <div className="relative mb-3">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#315b88]"
              />

              <input
                type="text"
                placeholder="Cari nama pendamping..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 rounded-md border border-[#b5cbe5] bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#4a8df8]"
              />
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3 mb-4">
              {/* JUMLAH DATA */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowJumlahData(!showJumlahData);
                    setShowPeriode(false);
                    setShowSemester(false);
                  }}
                  className="h-9 min-w-[170px] rounded-md border border-[#b5cbe5] bg-white px-3 text-sm flex items-center justify-between gap-3"
                >
                  {jumlahData}
                  <ChevronDown size={14} />
                </button>

                {showJumlahData && (
                  <div className="absolute top-[40px] left-0 z-50 w-full bg-white border border-[#b5cbe5] rounded-md shadow-lg overflow-hidden">
                    {[
                      "15 data pendamping",
                      "30 data pendamping",
                      "50 data pendamping",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setJumlahData(item);
                          setShowJumlahData(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-[#edf5ff]"
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
                    setShowPeriode(!showPeriode);
                    setShowJumlahData(false);
                    setShowSemester(false);
                  }}
                  className="h-9 min-w-[160px] rounded-md border border-[#b5cbe5] bg-white px-3 text-sm flex items-center justify-between gap-3"
                >
                  {periode}
                  <ChevronDown size={14} />
                </button>

                {showPeriode && (
                  <div className="absolute top-[40px] left-0 z-50 w-full bg-white border border-[#b5cbe5] rounded-md shadow-lg overflow-hidden">
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
                        className="w-full px-3 py-2 text-left text-sm hover:bg-[#edf5ff]"
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
                    setShowSemester(!showSemester);
                    setShowJumlahData(false);
                    setShowPeriode(false);
                  }}
                  className="h-9 min-w-[235px] rounded-md border border-[#b5cbe5] bg-white px-3 text-[12px] flex items-center justify-between gap-3"
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays size={17} className="text-[#3b82f6]" />
                    {semester}
                  </span>

                  <ChevronDown size={14} />
                </button>

                {showSemester && (
                  <div className="absolute top-[40px] left-0 z-50 w-full bg-white border border-[#b5cbe5] rounded-md shadow-lg overflow-hidden">
                    {[
                      "Semester ganjil 2026/2027",
                      "Semester genap 2026/2027",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSemester(item);
                          setShowSemester(false);
                        }}
                        className="w-full px-3 py-2 text-left text-[12px] hover:bg-[#edf5ff] flex items-center gap-2"
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
            <div className="rounded-md border border-[#9eb7d5] bg-white overflow-hidden">
              <div className="grid grid-cols-[0.55fr_1.5fr_1.4fr_1.6fr_0.9fr] bg-[#e4f0ff] px-4 py-3 text-[12px] font-semibold">
                <div>No</div>
                <div>Nama</div>
                <div>Fakultas</div>
                <div>Jumlah pendampingan</div>
                <div>Aksi</div>
              </div>

              <div className="min-h-[430px] max-h-[430px] overflow-y-auto">
                {semesterKosong ? (
                  <EmptyState
                    title="Data belum tersedia"
                    description="Belum ada data rekap pendamping pada semester genap 2026/2027."
                  />
                ) : filteredPendamping.length > 0 ? (
                  filteredPendamping.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[0.55fr_1.5fr_1.4fr_1.6fr_0.9fr] px-4 py-3 text-[11px] border-t border-[#e5edf7] items-center min-h-[55px]"
                    >
                      <div>{index + 1}</div>

                      <div>{item.nama}</div>

                      <div>{item.fakultas}</div>

                      <div>{item.jumlahPendampingan}</div>

                      <div>
                        <button
                          onClick={() => setSelectedPendamping(item)}
                          className="rounded-full bg-[#3b82f6] px-4 py-1.5 text-[10px] text-white hover:bg-[#2f73dc] transition"
                        >
                          Lihat detail
                        </button>
                      </div>
                    </div>
                  ))
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
}: {
  pendamping: Pendamping;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#dcecff] text-[#16365f]">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex w-[236px] shrink-0 bg-[#143a69] text-white flex-col">
          <div className="h-[64px] flex items-center justify-between px-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#2f80ed] flex items-center justify-center text-xs font-bold">
                IN
              </div>

              <div className="font-bold text-lg">
                INCLU<span className="text-[#ff7a1a]">NIV</span>
              </div>
            </div>

            <PanelLeftClose size={16} />
          </div>

          <nav className="px-3 py-4 space-y-1">
            {sidebarMenus.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white hover:bg-white/10"
              >
                <Icon size={17} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto px-5 py-5">
            <button className="flex items-center gap-3 text-sm text-red-400">
              <LogOut size={17} />
              <span>keluar</span>
            </button>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          <header className="h-[64px] bg-[#143a69] flex items-center justify-end px-5 text-white">
            <Bell size={18} />
          </header>

          <main className="p-3 md:p-4">
            <div className="rounded-xl border border-[#9eb7d5] bg-white p-4 min-h-[640px]">
              {/* BACK */}
              <button
                onClick={onBack}
                className="mb-4 flex items-center gap-2 text-[#3b82f6] hover:text-[#2563eb]"
              >
                <ArrowLeft size={20} />
              </button>

              {/* PROFILE */}
              <div className="rounded-lg border border-[#d2dfef] bg-white px-5 py-5 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-[78px] h-[78px] rounded-full bg-[#f4a23b] flex items-center justify-center overflow-hidden">
                    <UserRound
                      size={48}
                      strokeWidth={1.5}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <h1 className="text-[22px] font-semibold text-[#17365d]">
                      {pendamping.nama}
                    </h1>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-[#8293a8]">
                      <span>{pendamping.nim}</span>
                      <span>|</span>
                      <span>{pendamping.prodi}</span>
                      <span>|</span>
                      <span>{pendamping.fakultas}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOTAL */}
              <div className="rounded-lg border border-[#8bb8ff] px-4 py-4 mb-4">
                <div className="flex items-center gap-3">
                  <UserRoundPlus size={34} className="text-[#3b82f6]" />

                  <div>
                    <p className="text-[11px] font-medium">
                      Jumlah pendampingan
                    </p>

                    <p className="text-[16px] font-bold text-[#17365d]">
                      {pendamping.jumlahPendampingan} Pendampingan
                    </p>
                  </div>
                </div>
              </div>

              {/* RIWAYAT */}
              <div className="rounded-md border border-[#9eb7d5] bg-white overflow-hidden">
                <div className="grid grid-cols-[1.1fr_1.2fr_1.6fr_2fr_0.9fr] bg-[#e4f0ff] px-4 py-3 text-[11px] font-semibold">
                  <div>Tanggal</div>
                  <div>Waktu</div>
                  <div>Mahasiswa</div>
                  <div>Lokasi</div>
                  <div>Status</div>
                </div>

                <div className="min-h-[355px] max-h-[355px] overflow-y-auto">
                  {pendamping.riwayat.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[1.1fr_1.2fr_1.6fr_2fr_0.9fr] px-4 py-3 text-[10px] border-t border-[#e5edf7] items-center min-h-[54px]"
                    >
                      <div>{item.tanggal}</div>
                      <div>{item.waktu}</div>
                      <div>{item.mahasiswa}</div>
                      <div>{item.lokasi}</div>

                      <div>
                        <span className="inline-flex rounded-full border border-green-300 bg-green-50 px-3 py-1 text-[9px] text-green-600">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
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
    <div className="min-h-[420px] flex flex-col items-center justify-center text-center px-6">
      <ChartNoAxesColumnIncreasing
        size={70}
        strokeWidth={1.8}
        className="text-[#3b82f6]"
      />

      <h2 className="mt-4 text-[18px] font-semibold text-[#17365d]">
        {title}
      </h2>

      <p className="mt-1 text-[11px] leading-4 text-[#6f84a0] max-w-[300px]">
        {description}
      </p>
    </div>
  );
}