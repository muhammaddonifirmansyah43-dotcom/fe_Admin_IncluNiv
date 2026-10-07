"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  User,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { pengajuanData } from "@/data/pengajuan";

export default function PengajuanDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params.id);

  const pengajuan = pengajuanData.find(
    (item) => item.id === id
  );

  if (!pengajuan) {
    return (
      <DashboardLayout>
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <p className="text-sm text-[#0F2D5B]">
            Data pengajuan tidak ditemukan.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusStyle = () => {
    if (pengajuan.status === "Disetujui") {
      return {
        wrapper: "bg-green-100 border-green-300",
        icon: "text-green-600",
        title: "text-green-700",
      };
    }

    if (pengajuan.status === "Diproses") {
      return {
        wrapper: "bg-orange-100 border-orange-300",
        icon: "text-[#F97316]",
        title: "text-[#F97316]",
      };
    }

    return {
      wrapper: "bg-red-100 border-red-300",
      icon: "text-red-600",
      title: "text-red-600",
    };
  };

  const statusStyle = getStatusStyle();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* ================= KEMBALI ================= */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-medium text-[#0F2D5B] transition hover:text-[#3B82F6]"
        >
          <ArrowLeft size={16} />
          kembali
        </button>

        {/* ================= PROFILE ================= */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            {/* foto */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E6F0FF] text-[#3B82F6]">
              <User size={28} />
            </div>

            {/* identitas */}
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-[#0F2D5B]">
                {pengajuan.name}
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                {pengajuan.nim} · {pengajuan.studyProgram} ·{" "}
                {pengajuan.faculty}
              </p>
            </div>

            {/* status */}
            <div className="shrink-0">
              {pengajuan.status === "Disetujui" && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-medium text-green-600">
                  Disetujui
                </span>
              )}

              {pengajuan.status === "Diproses" && (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-medium text-[#F97316]">
                  Diproses
                </span>
              )}

              {pengajuan.status === "Tidak dapat dipenuhi" && (
                <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-medium text-red-600">
                  Tidak dapat dipenuhi
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ================= KETERANGAN ================= */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <FileText
              size={15}
              className="text-[#3B82F6]"
            />

            <h3 className="text-xs font-semibold text-[#0F2D5B]">
              Keterangan
            </h3>
          </div>

          <div className="rounded-md border border-[#3B82F6]/30 bg-white p-3">
            <p className="text-xs font-semibold text-[#0F2D5B]">
              Alasan izin
            </p>

            <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
              {pengajuan.reason}
            </p>

            <div className="mt-3 space-y-1 text-[10px] text-slate-500">
              <p>
                • Jadwal: {pengajuan.schedule}
              </p>

              <p>
                • Tanggal Pengajuan:{" "}
                {pengajuan.dateRequest}
              </p>
            </div>
          </div>
        </div>

        {/* ================= HASIL PROSES ================= */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays
              size={15}
              className="text-[#3B82F6]"
            />

            <h3 className="text-xs font-semibold text-[#0F2D5B]">
              Hasil proses
            </h3>
          </div>

          <div
            className={`rounded-md border p-4 ${statusStyle.wrapper}`}
          >
            <p
              className={`text-xs font-semibold ${statusStyle.title}`}
            >
              {pengajuan.status === "Disetujui" &&
                "✓ Disetujui"}

              {pengajuan.status === "Diproses" &&
                "⏳ Sedang diproses"}

              {pengajuan.status ===
                "Tidak dapat dipenuhi" &&
                "✕ Tidak dapat dipenuhi"}
            </p>

            <p
              className={`mt-1 text-[10px] ${statusStyle.icon}`}
            >
              {pengajuan.status === "Disetujui" &&
                "Pengajuan izin berhasil disetujui admin."}

              {pengajuan.status === "Diproses" &&
                "Pengajuan sedang dalam proses pemeriksaan."}

              {pengajuan.status ===
                "Tidak dapat dipenuhi" &&
                "Tidak dapat menemukan pendamping yang tersedia."}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}