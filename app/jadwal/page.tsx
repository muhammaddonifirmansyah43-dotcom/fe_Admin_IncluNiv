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
  ChevronLeft,
  ChevronRight,
  CalendarX2,
  ChevronDown,
} from "lucide-react";

type Status = "Selesai" | "Berlangsung" | "Akan datang";

type Jadwal = {
  waktu: string;
  mahasiswa: string;
  pendamping: string;
  lokasi: string;
  status: Status;
};

const schedules: Record<string, Jadwal[]> = {
  "2026-10-07": [
    {
      waktu: "07:00 - 08:30",
      mahasiswa: "Ahmad Machela",
      pendamping: "Gita Naura Kusuma (pengganti)",
      lokasi: "A307",
      status: "Selesai",
    },
    {
      waktu: "07:00 - 09:30",
      mahasiswa: "Raka Fadhillah",
      pendamping: "Lukito Adi Nugroho",
      lokasi: "Gedung dieng, ruang A403",
      status: "Berlangsung",
    },
    {
      waktu: "07:50 - 11:10",
      mahasiswa: "Ikhwanudin",
      pendamping: "Putra Adi",
      lokasi: "Gedung B, ruang E409",
      status: "Akan datang",
    },
    {
      waktu: "13:00 - 15:30",
      mahasiswa: "Zalvarina Azzahra",
      pendamping: "Djemba Jemba",
      lokasi: "Gedung A, ruang A403",
      status: "Akan datang",
    },
  ],

  "2026-10-08": [
    {
      waktu: "08:00 - 09:30",
      mahasiswa: "Rafi Pratama",
      pendamping: "Nadia Putri",
      lokasi: "Gedung C, ruang C201",
      status: "Akan datang",
    },
    {
      waktu: "10:00 - 11:30",
      mahasiswa: "Dimas Saputra",
      pendamping: "Bagas Maulana",
      lokasi: "Gedung A, ruang A205",
      status: "Akan datang",
    },
  ],

  "2026-10-09": [
    {
      waktu: "09:00 - 10:30",
      mahasiswa: "Salsa Maharani",
      pendamping: "Dinda Laras",
      lokasi: "Gedung B, ruang B302",
      status: "Akan datang",
    },
  ],

  "2026-10-05": [
    {
      waktu: "08:00 - 09:00",
      mahasiswa: "Aulia Rahman",
      pendamping: "Rizky Aditya",
      lokasi: "Gedung A, ruang A101",
      status: "Selesai",
    },
  ],
};

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

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTanggalIndonesia(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function isWeekend(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

export default function JadwalPage() {
  const [search, setSearch] = useState("");

  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const [filterStatus, setFilterStatus] = useState<
    "Semua" | "Berlangsung" | "Akan datang" | "Selesai"
  >("Semua");

  const [mode, setMode] = useState<"today" | "custom">("today");

  // Untuk demo 7 Oktober 2026.
  // Kalau nanti mau mengikuti tanggal asli laptop:
  // const today = new Date();
  const today = new Date(2026, 9, 7);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarTempDate, setCalendarTempDate] = useState<Date | null>(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showSemester, setShowSemester] = useState(false);

  const [semester, setSemester] = useState("Semester ganjil 2026/2027");

  const activeDate =
    mode === "today"
      ? today
      : selectedDate
      ? selectedDate
      : today;

  const activeDateKey = formatDateKey(activeDate);

  const semesterKosong = semester === "Semester genap 2026/2027";

  const rawSchedules = semesterKosong
    ? []
    : isWeekend(activeDate)
    ? []
    : schedules[activeDateKey] ?? [];

  const filteredSchedules = useMemo(() => {
    const keyword = search.toLowerCase();

    return rawSchedules.filter((item) => {
      const cocokSearch =
        item.mahasiswa.toLowerCase().includes(keyword) ||
        item.pendamping.toLowerCase().includes(keyword) ||
        item.lokasi.toLowerCase().includes(keyword);

      const cocokStatus =
        filterStatus === "Semua" || item.status === filterStatus;

      return cocokSearch && cocokStatus;
    });
  }, [rawSchedules, search, filterStatus]);

  function handleToday() {
    setMode("today");
    setSelectedDate(null);
    setCalendarTempDate(null);
    setShowCalendar(false);
  }

  function openCalendar() {
    setMode("custom");
    setShowCalendar(true);
    setShowStatusMenu(false);
    setCalendarTempDate(selectedDate);
  }

  function chooseDate(date: number) {
    setCalendarTempDate(new Date(2026, 9, date));
  }

  function applySelectedDate() {
    if (!calendarTempDate) return;

    setSelectedDate(calendarTempDate);
    setMode("custom");
    setShowCalendar(false);
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
              const active = label === "Penjadwalan";

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
            <section className="mb-5">
              <h1 className="text-[24px] font-bold text-[#17365d]">
                Jadwal Pendampingan!
              </h1>

              <p className="text-[12px] text-[#6f84a0] mt-1">
                Pantau jadwal pendampingan antara mahasiswa difabel dan volunteer.
              </p>
            </section>

            {/* SEARCH + SEMESTER */}
            <div className="flex flex-col xl:flex-row gap-3 mb-3">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#315b88]"
                />

                <input
                  type="text"
                  placeholder="Cari mahasiswa atau..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-10 rounded-md border border-[#b5cbe5] bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#4a8df8]"
                />
              </div>

              <div className="relative w-full xl:w-[220px]">
                <button
                  onClick={() => {
                    setShowSemester(!showSemester);
                    setShowStatusMenu(false);
                    setShowCalendar(false);
                  }}
                  className="w-full h-10 rounded-md border border-[#b5cbe5] bg-white px-3 text-[11px] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays size={17} className="text-[#4a8df8]" />
                    {semester}
                  </span>

                  <ChevronDown size={14} />
                </button>

                {showSemester && (
                  <div className="absolute z-40 top-[44px] right-0 w-full bg-white border border-[#b5cbe5] rounded-md shadow-lg overflow-hidden">
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
                        className="w-full px-3 py-2 text-left text-[11px] hover:bg-[#edf5ff] flex items-center gap-2"
                      >
                        <CalendarDays size={16} className="text-[#2f80ed]" />
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* DATE MODE */}
            <div className="flex gap-3 mb-4">
              {/* HARI INI + DROPDOWN STATUS */}
              <div className="relative">
                <button
                  onClick={() => {
                    handleToday();
                    setShowStatusMenu(!showStatusMenu);
                    setShowSemester(false);
                  }}
                  className={`h-9 rounded-md px-3 text-sm border flex items-center gap-2 ${
                    mode === "today"
                      ? "bg-[#3b82f6] border-[#3b82f6] text-white"
                      : "bg-white border-[#b5cbe5] text-[#16365f]"
                  }`}
                >
                  Hari ini
                  <ChevronDown size={14} />
                </button>

                {showStatusMenu && (
                  <div className="absolute top-[40px] left-0 z-50 w-[145px] overflow-hidden rounded-md border border-[#c7d7eb] bg-white shadow-lg">
                    {["Semua", "Berlangsung", "Akan datang", "Selesai"].map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setFilterStatus(
                              item as
                                | "Semua"
                                | "Berlangsung"
                                | "Akan datang"
                                | "Selesai"
                            );

                            setShowStatusMenu(false);
                            setMode("today");
                          }}
                          className={`block w-full px-3 py-2 text-left text-sm transition ${
                            filterStatus === item
                              ? "bg-[#e4efff] text-[#16365f] font-medium"
                              : "bg-white text-[#58718f] hover:bg-[#edf5ff]"
                          }`}
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* PILIH TANGGAL */}
              <div className="relative">
                <button
                  onClick={openCalendar}
                  className={`h-9 rounded-md px-3 text-sm border ${
                    mode === "custom"
                      ? "bg-[#3b82f6] border-[#3b82f6] text-white"
                      : "bg-white border-[#b5cbe5] text-[#16365f]"
                  }`}
                >
                  Pilih tanggal
                </button>

                {showCalendar && (
                  <div className="absolute z-50 top-[42px] left-0 w-[330px] rounded-xl border border-[#aebfda] bg-white shadow-xl p-3">
                    <div className="flex items-center justify-between mb-3">
                      <button className="p-1 text-[#5b7391]">
                        <ChevronLeft size={17} />
                      </button>

                      <h3 className="font-semibold text-[16px]">
                        Oktober 2026
                      </h3>

                      <button className="p-1 text-[#5b7391]">
                        <ChevronRight size={17} />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 text-center text-[11px] text-[#6c8099] mb-2">
                      {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(
                        (day) => (
                          <div key={day}>{day}</div>
                        )
                      )}
                    </div>

                    <div className="grid grid-cols-7 gap-y-2 text-center text-[12px]">
                      {[28, 29, 30].map((date) => (
                        <div
                          key={`old-${date}`}
                          className="text-slate-300 py-1"
                        >
                          {date}
                        </div>
                      ))}

                      {Array.from({ length: 31 }, (_, i) => i + 1).map(
                        (date) => {
                          const selected =
                            calendarTempDate?.getDate() === date;

                          const todayDate = today.getDate() === date;

                          return (
                            <button
                              key={date}
                              onClick={() => chooseDate(date)}
                              className={`w-7 h-7 mx-auto rounded-md transition ${
                                selected
                                  ? "bg-[#3b82f6] text-white"
                                  : todayDate
                                  ? "border border-[#3b82f6] text-[#3b82f6]"
                                  : "hover:bg-[#eaf3ff]"
                              }`}
                            >
                              {date}
                            </button>
                          );
                        }
                      )}
                    </div>

                    <button
                      disabled={!calendarTempDate}
                      onClick={applySelectedDate}
                      className={`w-full mt-4 h-9 rounded-md text-sm ${
                        calendarTempDate
                          ? "bg-[#3b82f6] text-white cursor-pointer"
                          : "bg-[#dfe6ef] text-[#9aa9bb] cursor-not-allowed"
                      }`}
                    >
                      Pilih
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* INFO DATE */}
            <div className="mb-3 text-[11px] text-[#6f84a0]">
              Menampilkan jadwal:{" "}
              <span className="font-medium text-[#17365d]">
                {mode === "today"
                  ? `Hari ini, ${formatTanggalIndonesia(today)}`
                  : formatTanggalIndonesia(activeDate)}
              </span>

              {mode === "today" && filterStatus !== "Semua" && (
                <span className="ml-1">
                  • Status:{" "}
                  <span className="font-medium text-[#17365d]">
                    {filterStatus}
                  </span>
                </span>
              )}
            </div>

            {/* TABLE */}
            <div className="rounded-md border border-[#9eb7d5] bg-white overflow-hidden">
              <div className="grid grid-cols-[1.1fr_1.4fr_1.4fr_1.3fr_0.9fr] bg-[#e4f0ff] px-4 py-3 text-[12px] font-semibold">
                <div>Waktu</div>
                <div>Mahasiswa</div>
                <div>Pendamping</div>
                <div>Lokasi</div>
                <div>Status</div>
              </div>

              <div className="min-h-[410px] max-h-[410px] overflow-y-auto">
                {semesterKosong ? (
                  <EmptyState
                    title="Data belum tersedia"
                    description="Belum ada jadwal pendampingan pada semester genap 2026/2027"
                  />
                ) : filteredSchedules.length > 0 ? (
                  filteredSchedules.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[1.1fr_1.4fr_1.4fr_1.3fr_0.9fr] px-4 py-3 text-[11px] border-t border-[#e5edf7] items-center min-h-[54px]"
                    >
                      <div>{item.waktu}</div>
                      <div>{item.mahasiswa}</div>
                      <div>{item.pendamping}</div>
                      <div>{item.lokasi}</div>
                      <div>
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="Tidak ada jadwal"
                    description={
                      mode === "today" && filterStatus !== "Semua"
                        ? `Tidak ada jadwal dengan status ${filterStatus.toLowerCase()} pada ${formatTanggalIndonesia(
                            activeDate
                          )}`
                        : `Tidak ada jadwal pendampingan pada tanggal ${formatTanggalIndonesia(
                            activeDate
                          )}`
                    }
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

function StatusBadge({ status }: { status: Status }) {
  const style =
    status === "Selesai"
      ? "border-green-300 bg-green-50 text-green-600"
      : status === "Berlangsung"
      ? "border-blue-300 bg-blue-50 text-blue-500"
      : "border-orange-300 bg-orange-50 text-orange-500";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] ${style}`}
    >
      {status}
    </span>
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
    <div className="min-h-[390px] flex flex-col items-center justify-center text-center px-6">
      <CalendarX2
        size={74}
        strokeWidth={1.8}
        className="text-[#3b82f6]"
      />

      <h2 className="mt-4 text-[18px] font-semibold text-[#17365d]">
        {title}
      </h2>

      <p className="mt-1 text-[11px] leading-4 text-[#6f84a0] max-w-[270px]">
        {description}
      </p>
    </div>
  );
}