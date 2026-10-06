"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { Pengajuan } from "@/data/pengajuan";

type PengajuanTableProps = {
  data: Pengajuan[];
};

export default function PengajuanTable({
  data,
}: PengajuanTableProps) {
  const renderStatus = (status: Pengajuan["status"]) => {
    if (status === "Disetujui") {
      return (
        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-[10px] font-medium text-green-600">
          Disetujui
        </span>
      );
    }

    if (status === "Diproses") {
      return (
        <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-[10px] font-medium text-[#F97316]">
          Diproses
        </span>
      );
    }

    return (
      <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-[10px] font-medium text-red-500">
        Tidak dapat dipenuhi
      </span>
    );
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-[#E6F0FF]">
              <th className="w-12 px-3 py-3 text-center text-[11px] font-semibold text-[#0F2D5B]">
                No
              </th>

              <th className="px-3 py-3 text-left text-[11px] font-semibold text-[#0F2D5B]">
                Nama
              </th>

              <th className="px-3 py-3 text-left text-[11px] font-semibold text-[#0F2D5B]">
                NIM
              </th>

              <th className="px-3 py-3 text-center text-[11px] font-semibold text-[#0F2D5B]">
                Tanggal pengajuan
              </th>

              <th className="px-3 py-3 text-center text-[11px] font-semibold text-[#0F2D5B]">
                Status
              </th>

              <th className="px-3 py-3 text-center text-[11px] font-semibold text-[#0F2D5B]">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 transition hover:bg-[#E6F0FF]/40"
                >
                  <td className="px-3 py-3 text-center text-[10px] text-slate-500">
                    {index + 1}
                  </td>

                  <td className="px-3 py-3 text-[10px] font-medium text-[#0F2D5B]">
                    {item.name}
                  </td>

                  <td className="px-3 py-3 text-[10px] text-slate-500">
                    {item.nim}
                  </td>

                  <td className="px-3 py-3 text-center text-[10px] text-slate-500">
                    {item.date}
                  </td>

                  <td className="px-3 py-3 text-center">
                    {renderStatus(item.status)}
                  </td>

                  <td className="px-3 py-3 text-center">
                    <Link
                      href={`/pengajuan/${item.id}`}
                      className="inline-flex items-center gap-1 rounded-md bg-[#3B82F6] px-3 py-1.5 text-[10px] font-medium text-white transition hover:bg-[#0F2D5B]"
                    >
                      <Eye size={12} />
                      Lihat detail
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-xs text-slate-400"
                >
                  Data pengajuan tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 px-4 py-3">
        <p className="text-[10px] text-slate-400">
          Menampilkan {data.length} dari {data.length} data pengajuan
        </p>
      </div>
    </div>
  );
}