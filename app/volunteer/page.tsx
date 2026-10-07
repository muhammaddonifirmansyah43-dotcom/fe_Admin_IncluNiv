"use client";

import { useMemo, useState } from "react";
import { Search, MoreHorizontal, Eye, Trash2, X } from "lucide-react";
import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { volunteers as initialVolunteers } from "@/data/volunteers";

export default function VolunteerPage() {
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("15");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const filteredVolunteers = useMemo(() => {
    const keyword = search.toLowerCase();

    return volunteers
      .filter(
        (volunteer) =>
          volunteer.name.toLowerCase().includes(keyword) ||
          volunteer.nim.toLowerCase().includes(keyword),
      )
      .slice(0, Number(limit));
  }, [volunteers, search, limit]);

  const volunteerToDelete = volunteers.find(
    (volunteer) => volunteer.id === deleteId,
  );

  const handleDelete = () => {
    if (!deleteId) return;

    setVolunteers((current) =>
      current.filter((volunteer) => volunteer.id !== deleteId),
    );

    setDeleteId(null);
    setOpenMenu(null);
    setToast("data volunteer berhasil dihapus");

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-[#0F2D5B]">
            Data Pendamping!
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Kelola data pendamping untuk mendukung layanan pendampingan
            mahasiswa disabilitas.
          </p>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari pendamping..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10"
              />
            </div>

            <select
              value={limit}
              onChange={(event) => setLimit(event.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#0F2D5B] outline-none focus:border-[#3B82F6]"
            >
              <option value="10">10 data volunteer</option>
              <option value="15">15 data volunteer</option>
              <option value="25">25 data volunteer</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <div className="max-h-[520px] min-w-[760px] overflow-y-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-[#E6F0FF]">
                  <tr className="text-left text-[#0F2D5B]">
                    <th className="w-14 px-4 py-3 font-semibold">No</th>
                    <th className="px-4 py-3 font-semibold">Nama</th>
                    <th className="px-4 py-3 font-semibold">NIM</th>
                    <th className="px-4 py-3 font-semibold">Fakultas</th>
                    <th className="w-24 px-4 py-3 text-center font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredVolunteers.map((volunteer, index) => (
                    <tr
                      key={volunteer.id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-slate-500">
                        {index + 1}
                      </td>

                      <td className="px-4 py-3 font-medium text-[#0F2D5B]">
                        {volunteer.name}
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {volunteer.nim}
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {volunteer.faculty}
                      </td>

                      <td className="relative px-4 py-3 text-center">
                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu === volunteer.id
                                ? null
                                : volunteer.id,
                            )
                          }
                          className="rounded-md p-1.5 text-[#3B82F6] hover:bg-[#E6F0FF]"
                        >
                          <MoreHorizontal size={20} />
                        </button>

                        {openMenu === volunteer.id && (
                          <div className="absolute right-4 top-10 z-30 w-36 rounded-lg border border-slate-200 bg-white p-1 text-left shadow-lg">
                            <Link
                              href={`/volunteer/${volunteer.id}`}
                              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#0F2D5B] hover:bg-[#E6F0FF]"
                              onClick={() => setOpenMenu(null)}
                            >
                              <Eye size={15} />
                              lihat detail
                            </Link>

                            <button
                              onClick={() => setDeleteId(volunteer.id)}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-orange-600 hover:bg-orange-50"
                            >
                              <Trash2 size={15} />
                              hapus
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredVolunteers.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-12 text-center text-slate-400"
                      >
                        data volunteer tidak ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500">
            Menampilkan {filteredVolunteers.length} dari {volunteers.length}{" "}
            data mahasiswa
          </div>
        </section>
      </div>

      {deleteId && volunteerToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0F2D5B]">
                  Hapus data volunteer?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  apakah anda yakin ingin menghapus data volunteer ini? data
                  yang telah dihapus tidak dapat dikembalikan.
                </p>
              </div>

              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-5 rounded-lg bg-[#E6F0FF] p-3">
              <p className="text-sm font-medium text-[#0F2D5B]">
                {volunteerToDelete.name}
              </p>
              <p className="text-xs text-slate-500">
                {volunteerToDelete.nim}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-[#0F2D5B] hover:bg-slate-50"
              >
                batal
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
              >
                hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[110] rounded-lg bg-[#0F2D5B] px-5 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </DashboardLayout>
  );
}