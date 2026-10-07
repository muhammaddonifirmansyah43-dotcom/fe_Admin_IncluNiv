"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  RotateCcw,
  UserRound,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { volunteers } from "@/data/volunteers";

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VolunteerDetailPage({
  params,
}: DetailPageProps) {
  const { id } = await params;

  const volunteer = volunteers.find((item) => item.id === id);

  if (!volunteer) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-bold text-[#0F2D5B]">
              data volunteer tidak ditemukan
            </h1>

            <Link
              href="/volunteer"
              className="mt-4 inline-flex rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white"
            >
              kembali ke data volunteer
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return <VolunteerDetailContent volunteer={volunteer} />;
}

function VolunteerDetailContent({
  volunteer,
}: {
  volunteer: (typeof volunteers)[number];
}) {
  const [activeTab, setActiveTab] = useState<"data" | "schedule">("data");

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            href="/volunteer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0F2D5B] hover:text-[#3B82F6]"
          >
            <ArrowLeft size={18} />
            kembali
          </Link>

          <button
            onClick={() =>
              alert("fitur reset password masih berupa tampilan frontend")
            }
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-[#0F2D5B] hover:bg-[#E6F0FF]"
          >
            <RotateCcw size={15} />
            reset password
          </button>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E6F0FF]">
              {volunteer.photo ? (
                <Image
                  src={volunteer.photo}
                  alt={volunteer.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={36} className="text-[#3B82F6]" />
              )}
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#0F2D5B]">
                {volunteer.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {volunteer.nim} · {volunteer.studyProgram} ·{" "}
                {volunteer.faculty}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setActiveTab("data")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === "data"
                ? "bg-[#3B82F6] text-white"
                : "border border-slate-200 bg-white text-[#0F2D5B]"
            }`}
          >
            Data diri
          </button>

          <button
            onClick={() => setActiveTab("schedule")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === "schedule"
                ? "bg-[#3B82F6] text-white"
                : "border border-slate-200 bg-white text-[#0F2D5B]"
            }`}
          >
            Jadwal kuliah
          </button>
        </div>

        {activeTab === "data" ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 font-semibold text-[#0F2D5B]">
                Informasi pribadi
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem
                  icon={<UserRound size={17} />}
                  label="Nama"
                  value={volunteer.name}
                />

                <InfoItem
                  icon={<UserRound size={17} />}
                  label="NIM"
                  value={volunteer.nim}
                />

                <InfoItem
                  icon={<GraduationCapIcon />}
                  label="Program Studi"
                  value={volunteer.studyProgram}
                />

                <InfoItem
                  icon={<GraduationCapIcon />}
                  label="Fakultas"
                  value={volunteer.faculty}
                />

                <InfoItem
                  icon={<Mail size={17} />}
                  label="Email"
                  value={volunteer.email}
                />

                <InfoItem
                  icon={<Phone size={17} />}
                  label="Nomor Telepon"
                  value={volunteer.phone}
                />
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle2 size={19} className="text-[#3B82F6]" />
                <h2 className="font-semibold text-[#0F2D5B]">
                  Keahlian
                </h2>
              </div>

              <div className="rounded-lg border border-[#E6F0FF] bg-[#E6F0FF]/60 p-4">
                <p className="text-sm leading-6 text-slate-600">
                  {volunteer.skills}
                </p>
              </div>
            </section>
          </div>
        ) : (
          <section className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-[#0F2D5B]">
                  Jadwal kuliah
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Jadwal perkuliahan volunteer
                </p>
              </div>

              <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-[#0F2D5B] outline-none focus:border-[#3B82F6]">
                <option>Semester ganjil 2026/2027</option>
                <option>Semester genap 2026/2027</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[650px] w-full text-sm">
                <thead>
                  <tr className="bg-[#E6F0FF] text-left text-[#0F2D5B]">
                    <th className="px-4 py-3 font-semibold">Hari</th>
                    <th className="px-4 py-3 font-semibold">Waktu</th>
                    <th className="px-4 py-3 font-semibold">Mata Kuliah</th>
                    <th className="px-4 py-3 font-semibold">Ruang</th>
                  </tr>
                </thead>

                <tbody>
                  {volunteer.schedule.map((schedule, index) => (
                    <tr
                      key={`${schedule.day}-${index}`}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-[#0F2D5B]">
                        {schedule.day}
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {schedule.time}
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {schedule.course}
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {schedule.room}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E6F0FF] text-[#3B82F6]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-[#0F2D5B]">
          {value}
        </p>
      </div>
    </div>
  );
}

function GraduationCapIcon() {
  return <CalendarDays size={17} />;
}