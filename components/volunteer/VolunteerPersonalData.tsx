"use client";

import {
  UserRound,
  Hash,
  GraduationCap,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";

type VolunteerPersonalDataProps = {
  name: string;
  nim: string;
  studyProgram: string;
  faculty: string;
  email: string;
  phone: string;
  skills: string;
};

type InformationItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InformationItem({
  icon,
  label,
  value,
}: InformationItemProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Icon */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E6F0FF]">
        <div className="text-[#3B82F6]">
          {icon}
        </div>
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-[11px] leading-4 text-[#8a9bb5]">
          {label}
        </p>

        <p className="truncate text-[13px] font-medium leading-5 text-[#0F2D5B]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function VolunteerPersonalData({
  name,
  nim,
  studyProgram,
  faculty,
  email,
  phone,
  skills,
}: VolunteerPersonalDataProps) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.25fr_0.85fr]">
      {/* =========================
          DATA DIRI
      ========================== */}
      <div className="rounded-xl border border-[#d8e3f2] bg-white p-5 shadow-[0_1px_4px_rgba(15,45,91,0.06)]">
        <h2 className="mb-5 text-[16px] font-semibold text-[#0F2D5B]">
          Informasi pribadi
        </h2>

        <div className="space-y-4">
          <InformationItem
            icon={<UserRound size={17} strokeWidth={1.8} />}
            label="Nama"
            value={name}
          />

          <InformationItem
            icon={<Hash size={17} strokeWidth={1.8} />}
            label="NIM"
            value={nim}
          />

          <InformationItem
            icon={<GraduationCap size={17} strokeWidth={1.8} />}
            label="Program Studi"
            value={studyProgram}
          />

          <InformationItem
            icon={<Building2 size={17} strokeWidth={1.8} />}
            label="Fakultas"
            value={faculty}
          />

          <InformationItem
            icon={<Mail size={17} strokeWidth={1.8} />}
            label="Email"
            value={email}
          />

          <InformationItem
            icon={<Phone size={17} strokeWidth={1.8} />}
            label="Nomor Telepon"
            value={phone}
          />
        </div>
      </div>

      {/* =========================
          KEAHLIAN
      ========================== */}
      <div className="rounded-xl border border-[#d8e3f2] bg-white p-5 shadow-[0_1px_4px_rgba(15,45,91,0.06)]">
        <div className="mb-5 flex items-center gap-2">
          <CheckCircle2
            size={20}
            strokeWidth={2}
            className="text-[#3B82F6]"
          />

          <h2 className="text-[16px] font-semibold text-[#0F2D5B]">
            Keahlian
          </h2>
        </div>

        <div className="rounded-lg border border-[#d9e6f7] bg-[#E6F0FF] p-4">
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              <UserRound
                size={17}
                strokeWidth={1.8}
                className="text-[#3B82F6]"
              />
            </div>

            <p className="text-[12px] leading-5 text-[#38506f]">
              {skills}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}