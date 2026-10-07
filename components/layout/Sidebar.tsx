"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  UserRound,
  BarChart3,
} from "lucide-react";

const menus = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Data Mahasiswa",
    href: "/mahasiswa",
    icon: GraduationCap,
  },
  {
    label: "Data Volunteer",
    href: "/volunteer",
    icon: Users,
  },
  {
    label: "Pengajuan",
    href: "/pengajuan",
    icon: ClipboardList,
  },
  {
    label: "Penjadwalan",
    href: "/jadwal",
    icon: CalendarDays,
  },
  {
    label: "Rekap volunteer",
    href: "/rekap",
    icon: BarChart3,
  },
  {
    label: "Notifikasi",
    href: "#",
    icon: Bell,
  },
];

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export default function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Tutup sidebar"
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-[#0F2D5B] text-white transition-all duration-300
        ${collapsed ? "w-[76px]" : "w-[250px]"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-[72px] items-center border-b border-white/10 px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Image
              src="/logo-incluniv.png"
              alt="INCLUNIV"
              width={38}
              height={38}
              className="shrink-0 object-contain"
            />

            {!collapsed && (
              <span className="truncate text-lg font-bold tracking-wide">
                INCLUNIV
              </span>
            )}
          </div>

          <button
            onClick={onToggle}
            className="hidden rounded-md p-1.5 hover:bg-white/10 lg:block"
            aria-label="Collapse sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active =
              menu.href !== "#" &&
              (pathname === menu.href ||
                pathname.startsWith(`${menu.href}/`));

            return (
              <Link
                key={menu.label}
                href={menu.href}
                onClick={onMobileClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition
                  ${
                    active
                      ? "bg-[#3B82F6] text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <Icon size={18} className="shrink-0" />

                {!collapsed && (
                  <span className="truncate">{menu.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-orange-300 hover:bg-white/10">
            <LogOut size={18} />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}