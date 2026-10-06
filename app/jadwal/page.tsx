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
  ChevronLeft,
  ChevronRight,
  CalendarX2,
  ChevronDown,
} from "lucide-react";

type Status = "Selesai" | "Berlangsung" | "Akan datang";

type FilterStatus =
  | "Semua"
  | "Berlangsung"
  | "Akan datang"
  | "Selesai";

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
      lokasi: "Gedung Dieng, ruang A403",
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

const statusOptions: FilterStatus[] = [
  "Semua",
  "Berlangsung",
  "Akan datang",
  "Selesai",
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

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [filterStatus, setFilterStatus] =
    useState<FilterStatus>("Semua");

  const [mode, setMode] = useState<"today" | "custom">("today");

  // Untuk demo presentasi 7 Oktober 2026.
  // Kalau nanti ingin mengikuti tanggal asli laptop:
  // const today = new Date();
  const today = new Date(2026, 9, 7);

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [calendarTempDate, setCalendarTempDate] =
    useState<Date | null>(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showSemester, setShowSemester] = useState(false);

  const [semester, setSemester] = useState(
    "Semester ganjil 2026/2027"
  );

  const activeDate =
    mode === "today"
      ? today
      : selectedDate
      ? selectedDate
      : today;

  const activeDateKey = formatDateKey(activeDate);

  const semesterKosong =
    semester === "Semester genap 2026/2027";

  const rawSchedules = semesterKosong
    ? []
    : isWeekend(activeDate)
    ? []
    : schedules[activeDateKey] ?? [];

  const filteredSchedules = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return rawSchedules.filter((item) => {
      const cocokSearch =
        item.mahasiswa.toLowerCase().includes(keyword) ||
        item.pendamping.toLowerCase().includes(keyword) ||
        item.lokasi.toLowerCase().includes(keyword);

      const cocokStatus =
        filterStatus === "Semua" ||
        item.status === filterStatus;

      return cocokSearch && cocokStatus;
    });
  }, [rawSchedules, search, filterStatus]);

  function closeOtherDropdowns() {
    setShowSemester(false);
    setShowStatusMenu(false);
    setShowCalendar(false);
  }

  function handleToday() {
    setMode("today");
    setSelectedDate(null);
    setCalendarTempDate(null);
    setShowCalendar(false);
  }

  function openCalendar() {
    setMode("custom");
    setShowStatusMenu(false);
    setShowSemester(false);
    setShowCalendar(true);
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
    <div className="min-h-screen bg-[#e8f2ff] text-[#17365d]">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
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
              onClick={() => setSidebarOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-md text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Tutup sidebar"
              title="Tutup sidebar"
            >
              <PanelLeftClose size={17} />
            </button>
          </div>

          <nav className="min-w-[220px] px-3 py-4 space-y-1">
            {sidebarMenus.map(({ label, icon: Icon }) => {
              const active =
                label === "Penjadwalan";

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
            })}
          </nav>

          <div className="min-w-[220px] mt-auto px-5 py-6">
            <button className="flex items-center gap-3 text-[13px] text-[#ff5b64] hover:text-[#ff7b82] transition">
              <LogOut size={17} />
              <span>keluar</span>
            </button>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          {/* HEADER */}
          <header className="h-[64px] bg-[#153d70] flex items-center justify-between px-4 md:px-5 text-white">
            {/* KIRI HEADER */}
            <div className="flex items-center">
              {!sidebarOpen && (
                <div className="hidden lg:flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
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

          {/* MAIN */}
          <main className="px-5 py-5 md:px-6">
            {/* TITLE */}
            <section className="mb-5">
              <h1 className="text-[25px] leading-tight font-bold text-[#17365d]">
                Jadwal Pendampingan!
              </h1>

              <p className="mt-1.5 text-[12px] text-[#6b819d]">
                Pantau jadwal pendampingan antara mahasiswa difabel dan volunteer.
              </p>
            </section>

            {/* SEARCH + SEMESTER */}
            <div className="flex flex-col xl:flex-row gap-3 mb-3">
              <div className="relative flex-1">
                <Search
                  size={18}
                  strokeWidth={1.8}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#294f7b]"
                />

                <input
                  type="text"
                  placeholder="Cari mahasiswa atau pendamping..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full h-[42px] rounded-md border border-[#b6cae2] bg-white pl-11 pr-4 text-[13px] text-[#17365d] placeholder:text-[#9aabc0] outline-none transition focus:border-[#4a8df8] focus:ring-2 focus:ring-[#4a8df8]/20"
                />
              </div>

              <div className="relative w-full xl:w-[230px]">
                <button
                  onClick={() => {
                    const next = !showSemester;
                    closeOtherDropdowns();
                    setShowSemester(next);
                  }}
                  className="w-full h-[42px] rounded-md border border-[#b6cae2] bg-white px-3.5 text-[11px] flex items-center justify-between gap-2 hover:border-[#8aadd7] transition"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <CalendarDays
                      size={17}
                      className="shrink-0 text-[#3b82f6]"
                    />

                    <span className="truncate">
                      {semester}
                    </span>
                  </span>

                  <ChevronDown
                    size={14}
                    className="shrink-0 text-[#536f90]"
                  />
                </button>

                {showSemester && (
                  <div className="absolute right-0 top-[46px] z-50 w-full overflow-hidden rounded-md border border-[#b6cae2] bg-white shadow-[0_6px_20px_rgba(23,54,93,0.16)]">
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
                        className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-[11px] transition ${
                          semester === item
                            ? "bg-[#edf5ff] text-[#17365d] font-medium"
                            : "bg-white text-[#536f90] hover:bg-[#f4f8fd]"
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

            {/* FILTER DATE */}
            <div className="flex items-center gap-2.5 mb-3">
              {/* HARI INI */}
              <div className="relative">
                <button
                  onClick={() => {
                    handleToday();

                    const next =
                      !showStatusMenu;

                    setShowStatusMenu(next);
                    setShowSemester(false);
                  }}
                  className={`h-[36px] rounded-md px-3.5 text-[12px] border flex items-center gap-2 font-medium transition ${
                    mode === "today"
                      ? "bg-[#3b82f6] border-[#3b82f6] text-white shadow-sm"
                      : "bg-white border-[#b6cae2] text-[#17365d] hover:border-[#8aadd7]"
                  }`}
                >
                  Hari ini
                  <ChevronDown size={14} />
                </button>

                {showStatusMenu && (
                  <div className="absolute top-[40px] left-0 z-50 w-[150px] overflow-hidden rounded-lg border border-[#c3d2e5] bg-white shadow-[0_8px_24px_rgba(23,54,93,0.16)]">
                    {statusOptions.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setFilterStatus(item);
                          setShowStatusMenu(
                            false
                          );
                          setMode("today");
                        }}
                        className={`block w-full px-3.5 py-2.5 text-left text-[12px] transition ${
                          filterStatus === item
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

              {/* PILIH TANGGAL */}
              <div className="relative">
                <button
                  onClick={openCalendar}
                  className={`h-[36px] rounded-md px-3.5 text-[12px] border font-medium transition ${
                    mode === "custom"
                      ? "bg-[#3b82f6] border-[#3b82f6] text-white shadow-sm"
                      : "bg-white border-[#b6cae2] text-[#17365d] hover:border-[#8aadd7]"
                  }`}
                >
                  Pilih tanggal
                </button>

                {showCalendar && (
                  <div className="absolute z-50 top-[42px] left-0 w-[320px] rounded-xl border border-[#aebfda] bg-white p-4 shadow-[0_10px_30px_rgba(23,54,93,0.20)]">
                    {/* CALENDAR HEADER */}
                    <div className="mb-4 flex items-center justify-between">
                      <button className="w-8 h-8 rounded-md flex items-center justify-center text-[#5b7391] hover:bg-[#edf4fc] transition">
                        <ChevronLeft
                          size={17}
                        />
                      </button>

                      <h3 className="text-[15px] font-semibold text-[#17365d]">
                        Oktober 2026
                      </h3>

                      <button className="w-8 h-8 rounded-md flex items-center justify-center text-[#5b7391] hover:bg-[#edf4fc] transition">
                        <ChevronRight
                          size={17}
                        />
                      </button>
                    </div>

                    {/* DAYS */}
                    <div className="grid grid-cols-7 mb-2 text-center text-[10px] font-medium text-[#71859e]">
                      {[
                        "Sen",
                        "Sel",
                        "Rab",
                        "Kam",
                        "Jum",
                        "Sab",
                        "Min",
                      ].map((day) => (
                        <div key={day}>
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* DATES */}
                    <div className="grid grid-cols-7 gap-y-1.5 text-center text-[11px]">
                      {[28, 29, 30].map(
                        (date) => (
                          <div
                            key={`old-${date}`}
                            className="flex h-8 items-center justify-center text-[#c4ceda]"
                          >
                            {date}
                          </div>
                        )
                      )}

                      {Array.from(
                        { length: 31 },
                        (_, i) => i + 1
                      ).map((date) => {
                        const selected =
                          calendarTempDate?.getDate() ===
                          date;

                        const todayDate =
                          today.getDate() ===
                          date;

                        const dateObject =
                          new Date(
                            2026,
                            9,
                            date
                          );

                        const weekend =
                          isWeekend(
                            dateObject
                          );

                        return (
                          <button
                            key={date}
                            onClick={() =>
                              chooseDate(date)
                            }
                            className={`mx-auto flex h-8 w-8 items-center justify-center rounded-md transition ${
                              selected
                                ? "bg-[#3b82f6] text-white font-medium"
                                : todayDate
                                ? "border border-[#3b82f6] text-[#3b82f6] font-medium"
                                : weekend
                                ? "text-[#a5b2c2] hover:bg-[#f2f6fb]"
                                : "text-[#273f5f] hover:bg-[#eaf3ff]"
                            }`}
                          >
                            {date}
                          </button>
                        );
                      })}
                    </div>

                    {/* APPLY */}
                    <button
                      disabled={
                        !calendarTempDate
                      }
                      onClick={
                        applySelectedDate
                      }
                      className={`mt-4 h-[36px] w-full rounded-md text-[12px] font-medium transition ${
                        calendarTempDate
                          ? "bg-[#3b82f6] text-white hover:bg-[#3077e8]"
                          : "bg-[#e1e7ef] text-[#9ba9b9] cursor-not-allowed"
                      }`}
                    >
                      Pilih
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* INFO DATE */}
            <div className="mb-3 text-[11px] text-[#72859d]">
              Menampilkan jadwal:{" "}
              <span className="font-medium text-[#17365d]">
                {mode === "today"
                  ? `Hari ini, ${formatTanggalIndonesia(
                      today
                    )}`
                  : formatTanggalIndonesia(
                      activeDate
                    )}
              </span>

              {mode === "today" &&
                filterStatus !== "Semua" && (
                  <>
                    <span className="mx-1.5">
                      •
                    </span>

                    <span>
                      Status:{" "}
                      <span className="font-medium text-[#17365d]">
                        {filterStatus}
                      </span>
                    </span>
                  </>
                )}
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-lg border border-[#9db8d8] bg-white shadow-[0_1px_2px_rgba(23,54,93,0.05)]">
              {/* HEADER */}
              <div className="grid grid-cols-[1.05fr_1.4fr_1.65fr_1.55fr_0.95fr] bg-[#dcecff] px-4 py-3.5 text-[12px] font-semibold text-[#17365d]">
                <div>Waktu</div>
                <div>Mahasiswa</div>
                <div>Pendamping</div>
                <div>Lokasi</div>
                <div>Status</div>
              </div>

              {/* BODY */}
              <div className="min-h-[360px] max-h-[430px] overflow-y-auto">
                {semesterKosong ? (
                  <EmptyState
                    title="Data belum tersedia"
                    description="Belum ada jadwal pendampingan pada semester genap 2026/2027."
                  />
                ) : filteredSchedules.length >
                  0 ? (
                  filteredSchedules.map(
                    (item, index) => (
                      <div
                        key={`${item.mahasiswa}-${index}`}
                        className="grid min-h-[58px] grid-cols-[1.05fr_1.4fr_1.65fr_1.55fr_0.95fr] items-center border-t border-[#e7eef7] px-4 py-3 text-[11px] text-[#294867] transition hover:bg-[#f8fbff]"
                      >
                        <div className="font-medium">
                          {item.waktu}
                        </div>

                        <div>
                          {item.mahasiswa}
                        </div>

                        <div className="pr-3 leading-4">
                          {item.pendamping}
                        </div>

                        <div className="pr-3 leading-4">
                          {item.lokasi}
                        </div>

                        <div>
                          <StatusBadge
                            status={
                              item.status
                            }
                          />
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <EmptyState
                    title="Tidak ada jadwal"
                    description={
                      mode === "today" &&
                      filterStatus !==
                        "Semua"
                        ? `Tidak ada jadwal dengan status ${filterStatus.toLowerCase()} pada ${formatTanggalIndonesia(
                            activeDate
                          )}.`
                        : `Tidak ada jadwal pendampingan pada tanggal ${formatTanggalIndonesia(
                            activeDate
                          )}.`
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

function StatusBadge({
  status,
}: {
  status: Status;
}) {
  const style =
    status === "Selesai"
      ? "border-[#72df9b] bg-[#ebfff2] text-[#1f9d55]"
      : status === "Berlangsung"
      ? "border-[#80b4ff] bg-[#eef6ff] text-[#2878e8]"
      : "border-[#ffac68] bg-[#fff4e8] text-[#f07818]";

  return (
    <span
      className={`inline-flex min-w-[72px] justify-center rounded-full border px-3 py-1 text-[9px] font-medium ${style}`}
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
    <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
      <CalendarX2
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