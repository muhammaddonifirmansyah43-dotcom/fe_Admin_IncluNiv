"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PengajuanTable from "@/components/pengajuan/PengajuanTable";
import { pengajuanData } from "@/data/pengajuan";

export default function PengajuanPage() {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return pengajuanData;
    }

    return pengajuanData.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.nim.toLowerCase().includes(keyword)
    );
  }, [search]);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* ================= HEADER HALAMAN ================= */}
        <div>
          <h1 className="text-xl font-bold text-[#0F2D5B]">
            Pengajuan Perizinan!
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Pantau pengajuan izin volunteer dan status persetujuannya.
          </p>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama, NIM..."
              className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs text-[#0F2D5B] outline-none transition placeholder:text-slate-400 focus:border-[#3B82F6]"
            />
          </div>

          <select className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs text-[#0F2D5B] outline-none focus:border-[#3B82F6]">
            <option>15 pengajuan</option>
            <option>10 pengajuan</option>
            <option>25 pengajuan</option>
          </select>
        </div>

        {/* ================= TABLE ================= */}
        <PengajuanTable data={filteredData} />
      </div>
    </DashboardLayout>
  );
}