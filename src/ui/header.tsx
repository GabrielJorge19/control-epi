import { Building2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-slate-900 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <NavLink to="/" className="min-w-0 shrink">
          <div className="flex items-center gap-2.5">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-1.5">
              <Building2 className="size-5 text-slate-700" />
            </div>
            <div className="leading-tight">
              <p className="truncate text-sm font-semibold text-slate-900">Control EPI</p>
              <p className="hidden text-xs text-slate-500 sm:block">Controle de EPI</p>
            </div>
          </div>
        </NavLink>

        <nav className="flex flex-wrap items-center justify-end gap-1" aria-label="Principal">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/tool" className={navClass}>
            Ferramenta
          </NavLink>
          <NavLink to="/sobre" className={navClass}>
            <span className="sm:hidden">Sobre</span>
            <span className="hidden sm:inline">Sobre</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
