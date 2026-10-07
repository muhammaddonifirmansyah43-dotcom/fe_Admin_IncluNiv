import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/image/inclusive-campus-student-portrait.jpeg"
          alt="Mahasiswa INCLUNIV"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay putih transparan agar card lebih mudah dibaca */}
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* Isi halaman */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        {children}
      </div>
    </main>
  );
}