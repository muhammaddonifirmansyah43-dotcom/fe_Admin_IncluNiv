"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Mail,
} from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("email wajib diisi.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setError("masukkan alamat email yang valid.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 800);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-[28px] bg-white/95 p-7 text-center shadow-2xl backdrop-blur-sm sm:p-9">
          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2
              size={34}
              className="text-green-500"
            />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[#0F2D5B] sm:text-3xl">
            Periksa email Anda
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Jika email tersebut terdaftar, kami telah mengirimkan instruksi
            untuk mengatur ulang kata sandi.
          </p>

          <Link
            href="/login"
            className="mt-7 flex w-full items-center justify-center rounded-xl bg-[#3B82F6] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Kembali ke login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-[28px] bg-white/95 p-7 shadow-2xl backdrop-blur-sm sm:p-9">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo-incluniv.png"
            alt="Logo INCLUNIV"
            width={170}
            height={70}
            className="h-auto w-auto max-w-[170px] object-contain"
            priority
          />
        </div>

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#0F2D5B] sm:text-3xl">
            Lupa kata sandi?
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Masukkan email yang terdaftar untuk menerima instruksi reset kata
            sandi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#0F2D5B]"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) =>
                  handleEmailChange(event.target.value)
                }
                placeholder="Masukkan email Anda"
                autoComplete="email"
                disabled={isLoading}
                className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 ${
                  error
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100"
                } disabled:cursor-not-allowed disabled:bg-slate-50`}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />

              <p>{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-xl bg-[#3B82F6] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Memproses..." : "Kirim tautan reset"}
          </button>

          {/* Back */}
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#0F2D5B]"
          >
            <ArrowLeft size={16} />
            Kembali ke login
          </Link>
        </form>
      </div>
    </div>
  );
}