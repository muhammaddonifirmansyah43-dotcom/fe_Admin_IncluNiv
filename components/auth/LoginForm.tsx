"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, LockKeyhole, User, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (value: string) => {
    setUsername(value);

    if (error) {
      setError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!username.trim() && !password.trim()) {
      setError("username dan kata sandi wajib diisi.");
      return;
    }

    if (!username.trim()) {
      setError("username wajib diisi.");
      return;
    }

    if (!password.trim()) {
      setError("kata sandi wajib diisi.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (username.trim() === "admin123" && password === "admin123") {
        router.push("/dashboard");
        return;
      }

      setIsLoading(false);
      setError("username atau kata sandi salah.");
    }, 800);
  };

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
            Selamat datang
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Masuk untuk mengakses layanan INCLUNIV
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-semibold text-[#0F2D5B]"
            >
              Username
            </label>

            <div className="relative">
              <User
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(event) =>
                  handleUsernameChange(event.target.value)
                }
                placeholder="Masukkan username atau email"
                autoComplete="username"
                disabled={isLoading}
                className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 ${
                  error
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100"
                } disabled:cursor-not-allowed disabled:bg-slate-50`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#0F2D5B]"
              >
                Password
              </label>
            </div>

            <div className="relative">
              <LockKeyhole
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) =>
                  handlePasswordChange(event.target.value)
                }
                placeholder="Masukkan password"
                autoComplete="current-password"
                disabled={isLoading}
                className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 ${
                  error
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100"
                } disabled:cursor-not-allowed disabled:bg-slate-50`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#0F2D5B]"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {/* Forgot password */}
            <div className="mt-2 flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#3B82F6] transition hover:text-[#0F2D5B] hover:underline"
              >
                Lupa kata sandi?
              </Link>
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

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-xl bg-[#3B82F6] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* Mock credential information */}
        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          Demo login: admin123 / admin123
        </p>
      </div>
    </div>
  );
}