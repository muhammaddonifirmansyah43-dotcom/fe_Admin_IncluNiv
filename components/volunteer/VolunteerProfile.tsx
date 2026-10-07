"use client";

import {
  UserRound,
  GraduationCap,
  Building2,
} from "lucide-react";

type VolunteerProfileProps = {
  name: string;
  nim: string;
  studyProgram: string;
  faculty: string;
  photo?: string;
};

export default function VolunteerProfile({
  name,
  nim,
  studyProgram,
  faculty,
  photo,
}: VolunteerProfileProps) {
  return (
    <div className="w-full rounded-xl border border-[#d8e3f2] bg-white px-5 py-4 shadow-[0_1px_4px_rgba(15,45,91,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          {/* Foto */}
          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E6F0FF]">
            {photo ? (
              <img
                src={photo}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound
                size={38}
                strokeWidth={1.8}
                className="text-[#3B82F6]"
              />
            )}
          </div>

          {/* Identitas */}
          <div className="min-w-0">
            <h1 className="truncate text-[20px] font-semibold text-[#0F2D5B]">
              {name}
            </h1>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[#7183a0]">
              <span>{nim}</span>

              <span className="text-[#b4bfd0]">|</span>

              <span>{studyProgram}</span>

              <span className="text-[#b4bfd0]">|</span>

              <span>{faculty}</span>
            </div>
          </div>
        </div>

        {/* Reset Password */}
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg border border-[#d6e1f0] bg-white px-3 py-2 text-[12px] font-medium text-[#0F2D5B] transition hover:border-[#3B82F6] hover:bg-[#E6F0FF]"
        >
          <span className="text-[15px]">↻</span>
          <span className="hidden sm:inline">reset password</span>
        </button>
      </div>
    </div>
  );
}